import { footerCopy, t } from "@/lib/strings";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="hwache-footer">
      <div className="container hwache-container py-4">
        <p className="hwache-footer__tag mb-1">{t.footerTagline}</p>
        <p className="hwache-footer__copy mb-0">{footerCopy(year)}</p>
      </div>
    </footer>
  );
}
