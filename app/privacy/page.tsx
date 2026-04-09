import type { Metadata } from "next";
import Link from "next/link";
import { t } from "@/lib/strings";

export const metadata: Metadata = {
  title: t.titleAbout,
};

export default function PrivacyPage() {
  return (
    <div className="container hwache-container hwache-page py-5 hwache-section--muted">
      <h1 className="hwache-page__title mb-3">{t.aboutTitle}</h1>
      <p className="lead hwache-page__lead">{t.aboutLead}</p>
      <p>{t.aboutP1}</p>
      <p>{t.aboutP2}</p>
      <p className="mt-4 mb-0">
        <Link className="btn hwache-btn-primary" href="/#menu">
          {t.backHome}
        </Link>
      </p>
    </div>
  );
}
