# Хваче — інтернет-магазин десертів і напоїв

Фронтенд на **Next.js 16** (App Router), українська мова. Дизайн і навігація (якорі категорій, повне меню, кошик у `localStorage`) без змін.

## Запуск локально

```bash
npm install
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000).

## Збірка

```bash
npm install
npm run build
npm start
```

## Деплой на Vercel

1. У [Vercel](https://vercel.com) натисніть **Add New… → Project** і імпортуйте цей GitHub-репозиторій.
2. **Framework Preset:** Next.js (визначиться автоматично).
3. **Root Directory:** залиште `.` (корінь репо — тут лежить `package.json` і `next.config.ts`).
4. Запустіть деплой; після збірки сайт отримає URL на `*.vercel.app`.

## Структура

- `app/` — сторінки (`/`, `/privacy`)
- `components/` — шапка, футер, кошик, меню
- `lib/strings.ts` — тексти українською
- `public/images/` — логотип і патерн
