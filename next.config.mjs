import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const nextConfig = {
  // Коректне трасування файлів, якщо вище по шляху є зайві package-lock (наприклад у домашній теці)
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
