# Хваче — інтернет-магазин десертів і напоїв

Фронтенд на **Next.js 16** (App Router), українська мова.

## Запуск

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

## Vercel

Проєкт у **корені** репозиторію (`package.json` поруч із `app/`). У налаштуваннях Vercel залиште **Root Directory** порожнім (`.`). Framework: **Next.js**.

## Структура

- `app/` — сторінки (`/`, `/privacy`, `/order`)
- `components/` — шапка, футер, кошик, меню
- `lib/strings.ts` — тексти українською
- `public/images/` — логотип і патерн
