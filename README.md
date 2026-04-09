# Хваче — інтернет-магазин десертів і напоїв

Фронтенд на **Next.js 16** (App Router), українська мова. Дизайн і навігація (якорі категорій, повне меню, кошик у `localStorage`) збережені з попередньої версії на ASP.NET Core.

## Запуск

```bash
cd web
npm install
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000).

## Збірка

```bash
cd web
npm run build
npm start
```

## Структура

- `web/app` — сторінки (`/`, `/privacy`)
- `web/components` — шапка, футер, кошик, меню
- `web/lib/strings.ts` — тексти українською
- `web/public/images` — логотип і патерн
