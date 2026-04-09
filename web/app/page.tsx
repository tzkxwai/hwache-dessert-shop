import Image from "next/image";
import Link from "next/link";
import { MenuCatalog } from "@/components/MenuCatalog";
import { AddToCartButton } from "@/components/AddToCartButton";
import { popularProducts } from "@/lib/menuProducts";
import { priceFrom, t } from "@/lib/strings";

export default function HomePage() {
  return (
    <>
      <section className="hwache-hero">
        <div className="container hwache-container">
          <div className="row align-items-center g-4 py-5">
            <div className="col-lg-6">
              <p
                className="hwache-hero__decor mb-1 d-flex align-items-center gap-2"
                aria-hidden="true"
              >
                <span className="hwache-spark hwache-spark--pink">✦</span>
                <span className="hwache-spark hwache-spark--lime">✧</span>
                <span className="hwache-spark hwache-spark--pink">✦</span>
              </p>
              <p className="hwache-badge mb-3">{t.heroBadge}</p>
              <h1 className="hwache-hero__title">{t.heroTitle}</h1>
              <p className="hwache-hero__lead">{t.heroSubtitle}</p>
              <p className="hwache-hero__note small mb-4">{t.heroNote}</p>
              <Link className="btn hwache-btn-primary btn-lg" href="/#menu">
                {t.heroCta}
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="hwache-hero-sticker">
                <span
                  className="hwache-hero-sticker__spark hwache-hero-sticker__spark--1 hwache-spark hwache-spark--lime"
                  aria-hidden="true"
                >
                  ✦
                </span>
                <span
                  className="hwache-hero-sticker__spark hwache-hero-sticker__spark--2 hwache-spark hwache-spark--pink"
                  aria-hidden="true"
                >
                  ✧
                </span>
                <span
                  className="hwache-hero-sticker__spark hwache-hero-sticker__spark--3 hwache-spark hwache-spark--pink"
                  aria-hidden="true"
                >
                  ✦
                </span>
                <div className="hwache-hero-sticker__frame">
                  <Image
                    src="/images/hwache-logo.png"
                    alt={t.brand}
                    width={400}
                    height={400}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="hwache-section">
        <div className="container hwache-container">
          <h2 className="hwache-section__title">{t.sectionCategories}</h2>
          <div className="row g-3 g-md-4 mb-4">
            <div className="col-6 col-md-3">
              <Link
                className="hwache-cat hwache-cat--link"
                href="/#menu-firm-drinks"
              >
                🥤<span>{t.catFirm}</span>
              </Link>
            </div>
            <div className="col-6 col-md-3">
              <Link
                className="hwache-cat hwache-cat--link"
                href="/#menu-desserts-snacks"
              >
                🍰<span>{t.catSnacks}</span>
              </Link>
            </div>
            <div className="col-6 col-md-3">
              <Link
                className="hwache-cat hwache-cat--link"
                href="/#menu-specials"
              >
                🥡<span>{t.catSpecials}</span>
              </Link>
            </div>
            <div className="col-6 col-md-3">
              <Link className="hwache-cat hwache-cat--link" href="/#menu-hwache">
                🍉<span>{t.catHwache}</span>
              </Link>
            </div>
          </div>
          <p className="text-center small hwache-cat-hint mb-5">
            {t.catJumpHint}
          </p>

          <h2 id="popular" className="hwache-section__title">
            {t.sectionPopular}
          </h2>
          <div className="row g-4">
            {popularProducts.map((p) => (
              <div key={p.id} className="col-md-6 col-xl-3">
                <article className="hwache-dish">
                  <div className="hwache-dish__emoji" aria-hidden="true">
                    {p.emoji}
                  </div>
                  <h3 className="hwache-dish__name">{p.name}</h3>
                  <p className="hwache-dish__desc">{p.desc}</p>
                  <div className="hwache-dish__row">
                    <span className="hwache-dish__price">
                      {priceFrom(p.price)}
                    </span>
                    <AddToCartButton
                      productId={p.id}
                      name={p.name}
                      price={p.price}
                    >
                      {t.addToCart}
                    </AddToCartButton>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <MenuCatalog />
        </div>
      </section>

      <section id="how" className="hwache-section hwache-section--muted">
        <div className="container hwache-container">
          <h2 className="hwache-section__title">{t.sectionHow}</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="hwache-step">
                <span className="hwache-step__num">1</span>
                <h3 className="hwache-step__title">{t.step1Title}</h3>
                <p className="hwache-step__text mb-0">{t.step1Desc}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="hwache-step">
                <span className="hwache-step__num">2</span>
                <h3 className="hwache-step__title">{t.step2Title}</h3>
                <p className="hwache-step__text mb-0">{t.step2Desc}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="hwache-step">
                <span className="hwache-step__num">3</span>
                <h3 className="hwache-step__title">{t.step3Title}</h3>
                <p className="hwache-step__text mb-0">{t.step3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
