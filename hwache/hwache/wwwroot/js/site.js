const HWACHE_CART_KEY = 'hwache_cart_v1';

function hwacheGetCart() {
  try {
    const raw = localStorage.getItem(HWACHE_CART_KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function hwacheSaveCart(lines) {
  localStorage.setItem(HWACHE_CART_KEY, JSON.stringify(lines));
}

function hwacheCartI18n() {
  const el = document.getElementById('hw-cart-i18n');
  if (!el || !el.dataset) {
    return { empty: '', remove: '', currency: '₴' };
  }
  return {
    empty: el.dataset.empty || '',
    remove: el.dataset.remove || '',
    currency: el.dataset.currency || '₴',
  };
}

function hwacheCartSum(lines) {
  return lines.reduce((s, l) => s + l.price * l.qty, 0);
}

function hwacheCartCount(lines) {
  return lines.reduce((s, l) => s + l.qty, 0);
}

function hwacheRefreshCartUI() {
  const lines = hwacheGetCart();
  const listEl = document.getElementById('hwCartList');
  const emptyEl = document.getElementById('hwCartEmpty');
  const footerEl = document.getElementById('hwCartFooter');
  const totalEl = document.getElementById('hwCartTotal');
  const badge = document.getElementById('hwCartBadge');
  const i18n = hwacheCartI18n();

  if (!listEl || !emptyEl || !footerEl || !totalEl || !badge) return;

  listEl.innerHTML = '';
  const count = hwacheCartCount(lines);
  const sum = hwacheCartSum(lines);

  if (lines.length === 0) {
    emptyEl.hidden = false;
    footerEl.hidden = true;
    badge.hidden = true;
    badge.textContent = '0';
    return;
  }

  emptyEl.hidden = true;
  footerEl.hidden = false;
  badge.hidden = count === 0;
  badge.textContent = String(count);

  lines.forEach((line, idx) => {
    const li = document.createElement('li');
    li.className = 'hwache-cart-line mb-3 pb-3 border-bottom';

    const title = document.createElement('div');
    title.className = 'fw-semibold small';
    title.textContent = line.name;

    const row = document.createElement('div');
    row.className = 'd-flex align-items-center justify-content-between mt-2 gap-2';

    const group = document.createElement('div');
    group.className = 'btn-group btn-group-sm';
    group.setAttribute('role', 'group');

    const btnMinus = document.createElement('button');
    btnMinus.type = 'button';
    btnMinus.className = 'btn hwache-cart-qty-btn';
    btnMinus.textContent = '−';
    btnMinus.dataset.hwCartIdx = String(idx);
    btnMinus.dataset.hwCartDelta = '-1';

    const qtyLabel = document.createElement('span');
    qtyLabel.className = 'btn hwache-cart-qty-label disabled';
    qtyLabel.textContent = String(line.qty);

    const btnPlus = document.createElement('button');
    btnPlus.type = 'button';
    btnPlus.className = 'btn hwache-cart-qty-btn';
    btnPlus.textContent = '+';
    btnPlus.dataset.hwCartIdx = String(idx);
    btnPlus.dataset.hwCartDelta = '1';

    group.append(btnMinus, qtyLabel, btnPlus);

    const subtotal = document.createElement('span');
    subtotal.className = 'fw-bold text-nowrap';
    subtotal.textContent = `${line.price * line.qty} ${i18n.currency}`;

    row.append(group, subtotal);

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn btn-link btn-sm p-0 mt-2 text-decoration-none hwache-cart-remove';
    removeBtn.textContent = i18n.remove;
    removeBtn.dataset.hwCartIdx = String(idx);

    li.append(title, row, removeBtn);
    listEl.append(li);
  });

  totalEl.textContent = `${sum} ${i18n.currency}`;
}

function hwacheAddToCart(id, name, price) {
  const lines = hwacheGetCart();
  const existing = lines.find((l) => l.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    lines.push({ id, name, price, qty: 1 });
  }
  hwacheSaveCart(lines);
}

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('hwNav');
  if (nav && typeof bootstrap !== 'undefined') {
    nav.querySelectorAll('a.nav-link[href*="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992 && nav.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(nav).hide();
        }
      });
    });
  }

  hwacheRefreshCartUI();

  document.body.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.hwache-add-cart');
    if (addBtn) {
      const id = addBtn.dataset.productId;
      const name = addBtn.dataset.productName;
      const price = Number(addBtn.dataset.productPrice);
      if (id && name && Number.isFinite(price) && price >= 0) {
        hwacheAddToCart(id, name, price);
        hwacheRefreshCartUI();
      }
      return;
    }

    const t = e.target;
    if (!(t instanceof HTMLElement)) return;

    if (t.classList.contains('hwache-cart-qty-btn') && t.dataset.hwCartIdx != null) {
      const idx = Number(t.dataset.hwCartIdx);
      const delta = Number(t.dataset.hwCartDelta);
      const lines = hwacheGetCart();
      const line = lines[idx];
      if (!line) return;
      line.qty += delta;
      if (line.qty <= 0) lines.splice(idx, 1);
      hwacheSaveCart(lines);
      hwacheRefreshCartUI();
      return;
    }

    if (t.classList.contains('hwache-cart-remove') && t.dataset.hwCartIdx != null) {
      const idx = Number(t.dataset.hwCartIdx);
      const lines = hwacheGetCart();
      lines.splice(idx, 1);
      hwacheSaveCart(lines);
      hwacheRefreshCartUI();
    }
  });

  const clearBtn = document.getElementById('hwCartClear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      hwacheSaveCart([]);
      hwacheRefreshCartUI();
    });
  }
});
