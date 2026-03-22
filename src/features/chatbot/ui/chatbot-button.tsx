"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useIntake } from "@/entities/intake/model/intake-context";
import { useActiveField } from "@/entities/form/model/active-field-context";
import { useCurrentStep } from "@/features/chatbot/model/use-current-step";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatbotButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pageContext = useCurrentStep();
  const { intakeData } = useIntake();
  const { activeFieldLabel, activeFieldOptions } = useActiveField();

  function buildUserContext(): string {
    const parts: string[] = [
      `Business type: ${intakeData.businessType}`,
      `Province: ${intakeData.location}`,
    ];
    if (intakeData.businessName) {
      parts.push(`Business name: ${intakeData.businessName}`);
    }
    parts.push("Available ownership structures: Sole Proprietorship, Corporation");
    return parts.join(". ");
  }

  // Inject greeting whenever the panel opens fresh (no prior messages)
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: pageContext.greeting }]);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close panel and reset when user navigates to a different page
  const prevContextLabel = useRef(pageContext.label);
  useEffect(() => {
    if (prevContextLabel.current !== pageContext.label) {
      prevContextLabel.current = pageContext.label;
      setOpen(false);
      setMessages([]);
      setInput("");
    }
  }, [pageContext.label]);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next,
          pageContext: pageContext.systemContext,
          userContext: buildUserContext(),
          currentField: activeFieldLabel ?? undefined,
          fieldOptions: activeFieldOptions ?? undefined,
        }),
      });

      if (!res.ok || !res.body) {
        const errorText = res.status === 429
          ? "The AI service is temporarily rate-limited. Please wait a moment and try again."
          : "Sorry, something went wrong. Please try again.";
        setMessages((prev) => [...prev, { role: "assistant", content: errorText }]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: assistantText };
          return updated;
        });
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex w-80 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
          {/* Header */}
          <div className="flex items-center gap-2.5 border-b border-slate-100 bg-red-800 px-4 py-3">
            <Image
              src="/chatbot-icon.png"
              alt="BuildBeaver"
              width={50}
              height={28}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">Ask BuildBeaver</span>
              <span className="text-[11px] text-red-200">
                {activeFieldLabel ? `Field: ${activeFieldLabel}` : pageContext.label}
              </span>
            </div>
          </div>

          {/* Message list */}
          <div className="flex h-72 flex-col gap-3 overflow-y-auto px-4 py-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-red-800 text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {msg.content}
                  {msg.role === "assistant" && loading && i === messages.length - 1 && msg.content === "" && (
                    <span className="inline-flex gap-1">
                      <span className="animate-bounce">·</span>
                      <span className="animate-bounce [animation-delay:0.15s]">·</span>
                      <span className="animate-bounce [animation-delay:0.3s]">·</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-slate-100 px-3 py-2.5">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              disabled={loading}
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-red-300 focus:ring-1 focus:ring-red-200 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-800 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 8L2 2l2.5 6L2 14l12-6z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating trigger button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-red-800 shadow-lg shadow-red-900/30 transition hover:scale-110 hover:bg-red-700 active:scale-95"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M5 5l10 10M15 5L5 15" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <Image
            src="/chatbot-icon.png"
            alt="BuildBeaver chat"
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
      </button>
    </div>
  );
}
