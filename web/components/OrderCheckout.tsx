"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { t } from "@/lib/strings";
import { useCart } from "./CartContext";

function buildOrderBody(params: {
  lines: { name: string; price: number; qty: number }[];
  total: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  time: string;
  comment: string;
}): string {
  const lines = params.lines
    .map(
      (l) =>
        `• ${l.name} × ${l.qty} — ${l.price * l.qty} ${t.cartCurrency}`
    )
    .join("\n");
  const parts = [
    `Замовлення «${t.brand}»`,
    "",
    lines,
    "",
    `${t.cartTotal}: ${params.total} ${t.cartCurrency}`,
    "",
    `${t.orderName}: ${params.name}`,
    `${t.orderPhone}: ${params.phone}`,
  ];
  if (params.email.trim()) {
    parts.push(`${t.orderEmail}: ${params.email.trim()}`);
  }
  parts.push(`${t.orderAddress}: ${params.address}`);
  if (params.time.trim()) {
    parts.push(`${t.orderTime}: ${params.time.trim()}`);
  }
  if (params.comment.trim()) {
    parts.push(`${t.orderComment}: ${params.comment.trim()}`);
  }
  return parts.join("\n");
}

export function OrderCheckout() {
  const { lines, total, hydrated } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);
  const [body, setBody] = useState("");
  const [copyLabel, setCopyLabel] = useState<string>(t.orderCopy);

  const canSubmit = useMemo(() => {
    return (
      lines.length > 0 &&
      name.trim().length > 0 &&
      phone.trim().length > 0 &&
      address.trim().length > 0
    );
  }, [lines.length, name, phone, address]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!canSubmit) return;
      const text = buildOrderBody({
        lines,
        total,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim(),
        time: time.trim(),
        comment: comment.trim(),
      });
      setBody(text);
      setSent(true);

      const recipient = t.orderEmailRecipient?.trim();
      if (recipient) {
        const subject = encodeURIComponent(`Замовлення ${t.brand}`);
        const mailBody = encodeURIComponent(text);
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${mailBody}`;
      }
    },
    [canSubmit, lines, total, name, phone, email, address, time, comment]
  );

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(body);
      setCopyLabel(t.orderCopied);
      setTimeout(() => setCopyLabel(t.orderCopy), 2500);
    } catch {
      setCopyLabel(t.orderCopied);
    }
  }, [body]);

  if (!hydrated) {
    return (
      <div className="container hwache-container hwache-page py-5 hwache-section--muted text-center">
        <p className="text-muted mb-0">…</p>
      </div>
    );
  }

  if (lines.length === 0 && !sent) {
    return (
      <div className="container hwache-container hwache-page py-5 hwache-section--muted text-center">
        <h1 className="hwache-page__title mb-3">{t.orderEmptyTitle}</h1>
        <p className="hwache-page__lead mx-auto" style={{ maxWidth: "28rem" }}>
          {t.orderEmptyHint}
        </p>
        <Link className="btn hwache-btn-primary btn-lg mt-3" href="/#menu">
          {t.orderToMenu}
        </Link>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="container hwache-container hwache-page py-5 hwache-section--muted">
        <h1 className="hwache-page__title mb-3">{t.orderSuccessTitle}</h1>
        <p className="hwache-page__lead mb-4">{t.orderSuccessText}</p>
        <div className="hwache-order-card p-4 mb-3">
          <pre className="hwache-order-pre mb-0 small">{body}</pre>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <button
            type="button"
            className="btn hwache-btn-primary"
            onClick={onCopy}
          >
            {copyLabel}
          </button>
          <Link className="btn hwache-btn-outline" href="/">
            {t.backHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container hwache-container hwache-page py-5 hwache-section--muted">
      <h1 className="hwache-page__title mb-2">{t.orderHeading}</h1>
      <p className="hwache-page__lead mb-4">{t.orderLead}</p>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="hwache-order-card p-4 h-100">
            <h2 className="h5 fw-bold mb-3" style={{ color: "var(--hw-pink)" }}>
              {t.orderSummaryTitle}
            </h2>
            <ul className="list-unstyled mb-0">
              {lines.map((line, idx) => (
                <li
                  key={`${line.id}-${idx}`}
                  className="d-flex justify-content-between gap-2 py-2 border-bottom border-opacity-25"
                >
                  <span className="small">
                    {line.name}{" "}
                    <span className="text-muted">×{line.qty}</span>
                  </span>
                  <span className="fw-semibold text-nowrap small">
                    {line.price * line.qty} {t.cartCurrency}
                  </span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between fw-bold mt-3 pt-2">
              <span>{t.cartTotal}</span>
              <span>
                {total} {t.cartCurrency}
              </span>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <form className="hwache-order-card p-4" onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="order-name" className="form-label fw-semibold">
                {t.orderName} *
              </label>
              <input
                id="order-name"
                className="form-control hwache-order-input"
                required
                autoComplete="name"
                placeholder={t.orderNamePh}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="order-phone" className="form-label fw-semibold">
                {t.orderPhone} *
              </label>
              <input
                id="order-phone"
                className="form-control hwache-order-input"
                required
                type="tel"
                autoComplete="tel"
                placeholder={t.orderPhonePh}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="order-email" className="form-label fw-semibold">
                {t.orderEmail}
              </label>
              <input
                id="order-email"
                className="form-control hwache-order-input"
                type="email"
                autoComplete="email"
                placeholder={t.orderEmailPh}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="order-address"
                className="form-label fw-semibold"
              >
                {t.orderAddress} *
              </label>
              <textarea
                id="order-address"
                className="form-control hwache-order-input"
                required
                rows={2}
                autoComplete="street-address"
                placeholder={t.orderAddressPh}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="order-time" className="form-label fw-semibold">
                {t.orderTime}
              </label>
              <input
                id="order-time"
                className="form-control hwache-order-input"
                placeholder={t.orderTimePh}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="order-comment"
                className="form-label fw-semibold"
              >
                {t.orderComment}
              </label>
              <textarea
                id="order-comment"
                className="form-control hwache-order-input"
                rows={3}
                placeholder={t.orderCommentPh}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <p className="small text-muted mb-3">{t.orderPrivacyNote}</p>
            <button
              type="submit"
              className="btn hwache-btn-primary btn-lg w-100"
              disabled={!canSubmit}
            >
              {t.orderSubmit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
