import { SourceSupportPanel } from "@/features/support/ui/source-support-panel";
import { BC_ADVISOR_CONTACT, CORE_SUPPORT_LINKS } from "@/shared/constants/resources";

export default function SupportPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-12">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900">Official BC Support</h1>
        <p className="mt-2 text-gray-600">
          Official links and contact points for registration, permits, guidance and human support.
        </p>
      </div>

      <div className="mt-8">
        <SourceSupportPanel
          title="Official BC Support"
          description="Official links and contact points."
          links={CORE_SUPPORT_LINKS}
          contacts={[BC_ADVISOR_CONTACT]}
        />
      </div>
    </main>
  );
}
