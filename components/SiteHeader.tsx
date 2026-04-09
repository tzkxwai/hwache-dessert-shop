"use client";

import Image from "next/image";
import Link from "next/link";
import { t } from "@/lib/strings";
import { useCart } from "./CartContext";
import { NavCollapseFix } from "./NavCollapseFix";

export function SiteHeader() {
  const { count, hydrated } = useCart();

  return (
    <>
      <NavCollapseFix />
      <header className="hwache-header sticky-top">
        <nav className="navbar navbar-expand-lg">
          <div className="container hwache-container">
            <Link className="navbar-brand hwache-brand" href="/">
              <Image
                src="/images/hwache-logo.png"
                width={220}
                height={62}
                className="hwache-brand__logo"
                alt={t.brand}
                priority
              />
            </Link>
            <button
              className="navbar-toggler hwache-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#hwNav"
              aria-controls="hwNav"
              aria-expanded="false"
              aria-label={t.menuAria}
            >
              <span className="navbar-toggler-icon hwache-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="hwNav">
              <ul className="navbar-nav mx-auto gap-lg-2">
                <li className="nav-item">
                  <Link className="nav-link hwache-nav-link" href="/#menu">
                    {t.navMenu}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link hwache-nav-link" href="/#how">
                    {t.navHow}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link hwache-nav-link" href="/order">
                    {t.navOrder}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link hwache-nav-link"
                    href="/privacy"
                  >
                    {t.navAbout}
                  </Link>
                </li>
              </ul>
              <div className="d-flex align-items-center gap-2 hwache-nav-actions">
                <button
                  type="button"
                  className="hwache-cart-btn"
                  id="hwCartToggle"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#hwCartOffcanvas"
                  aria-controls="hwCartOffcanvas"
                  aria-label={t.cartOpenAria}
                >
                  <span className="hwache-cart-btn__icon" aria-hidden="true">
                    🛒
                  </span>
                  <span
                    className="hwache-cart-btn__badge"
                    id="hwCartBadge"
                    hidden={!hydrated || count === 0}
                  >
                    {count}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
