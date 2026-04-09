import Link from "next/link";
import {
  firmDrinks,
  hwAuth,
  hwCream,
  hwFruit,
  hwSpark,
  snacks,
  specials,
  type MenuRow,
} from "@/lib/menuProducts";
import { priceFrom, t } from "@/lib/strings";
import { AddToCartButton } from "./AddToCartButton";

function MenuRows({ items, quote }: { items: MenuRow[]; quote?: boolean }) {
  return (
    <ul className="hwache-menu-list hwache-menu-list--rows">
      {items.map((row) => (
        <li key={row.id} className="hwache-menu-row">
          <div className="hwache-menu-row__text">
            {quote ? (
              <>
                <span className="hwache-menu-list__name">«{row.name}»</span> —{" "}
                {row.desc}
              </>
            ) : (
              <>
                <span className="hwache-menu-list__name">{row.name}</span> —{" "}
                {row.desc}
              </>
            )}
          </div>
          <div className="hwache-menu-row__buy">
            <span className="hwache-menu-row__price">
              {priceFrom(row.price)}
            </span>
            <AddToCartButton
              productId={row.id}
              name={row.name}
              price={row.price}
            >
              {t.addToCart}
            </AddToCartButton>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function MenuCatalog() {
  return (
    <div className="hwache-menu-catalog mt-5 pt-4 hwache-menu-catalog--divider">
      <h2
        id="menu-full"
        className="hwache-section__title hwache-menu-catalog__main-title"
      >
        {t.menuFullTitle}
      </h2>

      <article id="menu-firm-drinks" className="hwache-menu-block">
        <h3 className="hwache-menu-block__title">{t.catFirm}</h3>
        <p className="hwache-menu-block__tag">{t.menuFirmSub}</p>
        <p className="hwache-menu-block__intro">{t.menuFirmIntro}</p>
        <MenuRows items={firmDrinks} quote />
      </article>

      <article id="menu-desserts-snacks" className="hwache-menu-block">
        <h3 className="hwache-menu-block__title">{t.catSnacks}</h3>
        <p className="hwache-menu-block__intro">{t.menuSnackIntro}</p>
        <MenuRows items={snacks} quote />
      </article>

      <article id="menu-specials" className="hwache-menu-block">
        <h3 className="hwache-menu-block__title">{t.catSpecials}</h3>
        <MenuRows items={specials} />
      </article>

      <article id="menu-hwache" className="hwache-menu-block">
        <h3 className="hwache-menu-block__title">{t.catHwache}</h3>
        <p className="hwache-menu-block__intro">{t.menuHwacheIntro}</p>
        <nav
          className="hwache-subnav"
          aria-label={t.menuHwacheSubnavAria}
        >
          <Link className="hwache-subnav__link" href="#hwache-fruit">
            {t.hwFruitTitle}
          </Link>
          <Link className="hwache-subnav__link" href="#hwache-creamy">
            {t.hwCreamTitle}
          </Link>
          <Link className="hwache-subnav__link" href="#hwache-sparkling">
            {t.hwSparkTitle}
          </Link>
          <Link className="hwache-subnav__link" href="#hwache-author">
            {t.hwAuthTitle}
          </Link>
          <Link className="hwache-subnav__link" href="#hwache-toppings">
            {t.menuToppingsTitle}
          </Link>
        </nav>

        <section id="hwache-fruit" className="hwache-menu-sub">
          <h4 className="hwache-menu-sub__title">{t.hwFruitTitle}</h4>
          <p className="hwache-menu-sub__lead">{t.hwFruitLead}</p>
          <MenuRows items={hwFruit} />
        </section>

        <section id="hwache-creamy" className="hwache-menu-sub">
          <h4 className="hwache-menu-sub__title">{t.hwCreamTitle}</h4>
          <p className="hwache-menu-sub__lead">{t.hwCreamLead}</p>
          <MenuRows items={hwCream} />
        </section>

        <section id="hwache-sparkling" className="hwache-menu-sub">
          <h4 className="hwache-menu-sub__title">{t.hwSparkTitle}</h4>
          <p className="hwache-menu-sub__lead">{t.hwSparkLead}</p>
          <MenuRows items={hwSpark} />
        </section>

        <section id="hwache-author" className="hwache-menu-sub">
          <h4 className="hwache-menu-sub__title">{t.hwAuthTitle}</h4>
          <MenuRows items={hwAuth} />
        </section>

        <section id="hwache-toppings" className="hwache-menu-sub">
          <h4 className="hwache-menu-sub__title">{t.menuToppingsTitle}</h4>
          <ul className="hwache-menu-list hwache-menu-list--bullets">
            <li>{t.top1}</li>
            <li>{t.top2}</li>
            <li>{t.top3}</li>
            <li>{t.top4}</li>
          </ul>
          <p className="hwache-menu-tip">
            <strong>{t.menuDeliveryTipLabel}</strong> {t.menuDeliveryTip}
          </p>
        </section>
      </article>
    </div>
  );
}
