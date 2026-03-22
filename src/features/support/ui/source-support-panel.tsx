"use client";

import type { SourceLink, SupportContact } from "@/shared/types/business";

type SourceSupportPanelProps = {
  title?: string;
  description?: string;
  links: SourceLink[];
  contacts?: SupportContact[];
};

export function SourceSupportPanel({
  title = "Official BC Support",
  description = "Official links and contact points.",
  links,
  contacts = [],
}: SourceSupportPanelProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-800">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M8 1.5l5.5 2v4.2c0 3.2-2.2 5.9-5.5 6.8-3.3-.9-5.5-3.6-5.5-6.8V3.5l5.5-2z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            <path d="M5.5 8l1.6 1.6L10.8 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 rounded-lg border border-gray-200 px-3.5 py-3 transition hover:border-red-300 hover:bg-red-50"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gray-50 text-gray-600">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M6 3.5h6.5V10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.5 3.5L5.5 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.5 8.5v3H3.5v-7h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900">{link.label}</p>
              {link.note ? <p className="mt-0.5 text-xs leading-5 text-gray-600">{link.note}</p> : null}
            </div>
          </a>
        ))}
      </div>

      {contacts.length > 0 ? (
        <div className="mt-4 space-y-2.5 border-t border-gray-100 pt-4">
          {contacts.map((contact) => (
            <div key={contact.title} className="rounded-lg bg-gray-50 px-3.5 py-3">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-gray-600 ring-1 ring-gray-200">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="M4.2 2.8h2l1 2.4-1.3 1.2a9 9 0 004.7 4.7l1.2-1.3 2.4 1v2a1 1 0 01-1.1 1A11.1 11.1 0 012.8 3.9a1 1 0 011-1.1z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">{contact.title}</p>
                  {contact.note ? <p className="mt-0.5 text-xs leading-5 text-gray-600">{contact.note}</p> : null}
                  {contact.phone ? <p className="mt-2 text-xs text-gray-700">Phone: {contact.phone}</p> : null}
                  {contact.email ? <p className="text-xs text-gray-700">Email: {contact.email}</p> : null}
                  {contact.hours ? <p className="text-xs text-gray-500">{contact.hours}</p> : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
