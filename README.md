This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Image Optimization Toggle

This project adds a `SmartImage` component to optionally disable Next.js image optimization site‑wide.

Environment variables:

- `NEXT_PUBLIC_PLAIN_IMAGES=1` (or `true`) -> render plain `<img>` tags (no optimization, good for debugging or constrained environments).
- `NEXT_PUBLIC_IMG_QUALITY=85` -> override default quality (30–100, defaults to 75).

Example usage:
```tsx
import { SmartImage } from "@/components/SmartImage";
<SmartImage src="/room14.jpeg" alt="Suite" fill sizes="(min-width:1024px) 40vw, 100vw" />
```

When `NEXT_PUBLIC_PLAIN_IMAGES` is enabled, it falls back gracefully without motion wrappers.

### Simplified Global Wrapper (OptimizedImage)

For most cases you can now use the lighter `OptimizedImage` component which is optimized by default and only disables optimization if an env flag is set.

Environment variables:

- `NEXT_PUBLIC_DISABLE_IMAGE_OPTIMIZATION=1` (or `true`) -> force plain `<img>` for every `OptimizedImage`.
- `NEXT_PUBLIC_IMG_QUALITY=80` -> applies to both `SmartImage` and `OptimizedImage` when optimization is active.

Usage:
```tsx
import OptimizedImage from "@/components/OptimizedImage";

<OptimizedImage
	src="/logo.jpeg"
	alt="Logo"
	width={160}
	height={80}
	priority
/>;
```

Choose:
- Use `OptimizedImage` for simple cases (logo, static images).
- Use `SmartImage` when you want built‑in entrance motion or a per‑image forced plain render via `NEXT_PUBLIC_PLAIN_IMAGES`.

Migration tip: Gradually replace direct `next/image` imports with `OptimizedImage` to centralize future adjustments.
