"use client";

import { t } from "@/lib/strings";
import { useCart } from "./CartContext";

export function CartOffcanvas() {
  const { lines, setQtyDelta, removeLine, clear, total, count, hydrated } =
    useCart();

  return (
    <div
      className="offcanvas offcanvas-end hwache-cart-panel"
      tabIndex={-1}
      id="hwCartOffcanvas"
      aria-labelledby="hwCartOffcanvasLabel"
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title fw-bold" id="hwCartOffcanvasLabel">
          {t.cartTitle}
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label={t.cartClose}
        />
      </div>
      <div className="offcanvas-body d-flex flex-column">
        <p
          className="text-muted small mb-3"
          id="hwCartEmpty"
          hidden={!hydrated || lines.length > 0}
        >
          {t.cartEmpty}
        </p>
        <ul className="list-unstyled flex-grow-1 mb-0" id="hwCartList">
          {lines.map((line, idx) => (
            <li
              key={`${line.id}-${idx}`}
              className="hwache-cart-line mb-3 pb-3 border-bottom"
            >
              <div className="fw-semibold small">{line.name}</div>
              <div className="d-flex align-items-center justify-content-between mt-2 gap-2">
                <div className="btn-group btn-group-sm" role="group">
                  <button
                    type="button"
                    className="btn hwache-cart-qty-btn"
                    aria-label="−1"
                    onClick={() => setQtyDelta(idx, -1)}
                  >
                    −
                  </button>
                  <span className="btn hwache-cart-qty-label disabled">
                    {line.qty}
                  </span>
                  <button
                    type="button"
                    className="btn hwache-cart-qty-btn"
                    aria-label="+1"
                    onClick={() => setQtyDelta(idx, 1)}
                  >
                    +
                  </button>
                </div>
                <span className="fw-bold text-nowrap">
                  {line.price * line.qty} {t.cartCurrency}
                </span>
              </div>
              <button
                type="button"
                className="btn btn-link btn-sm p-0 mt-2 text-decoration-none hwache-cart-remove"
                onClick={() => removeLine(idx)}
              >
                {t.cartRemoveLine}
              </button>
            </li>
          ))}
        </ul>
        <div
          className="hwache-cart-footer mt-4 pt-3 border-top"
          id="hwCartFooter"
          hidden={lines.length === 0}
        >
          <div className="d-flex justify-content-between align-items-center fw-bold mb-3">
            <span>{t.cartTotal}</span>
            <span id="hwCartTotal">
              {total} {t.cartCurrency}
            </span>
          </div>
          <button
            type="button"
            className="btn hwache-btn-outline w-100"
            id="hwCartClear"
            onClick={clear}
          >
            {t.cartClear}
          </button>
        </div>
      </div>
    </div>
  );
}
