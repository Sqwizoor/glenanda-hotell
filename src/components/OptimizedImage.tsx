"use client";
import NextImage, { type ImageProps, type StaticImageData } from "next/image";
import * as React from "react";

// Env flags:
// NEXT_PUBLIC_DISABLE_IMAGE_OPTIMIZATION = "1" | "true" to force plain <img>
// NEXT_PUBLIC_IMG_QUALITY sets quality (30-100) when using NextImage

const disableOpt = process.env.NEXT_PUBLIC_DISABLE_IMAGE_OPTIMIZATION === "1" || process.env.NEXT_PUBLIC_DISABLE_IMAGE_OPTIMIZATION === "true";
const quality = (() => {
  const q = process.env.NEXT_PUBLIC_IMG_QUALITY;
  if (!q) return 80;
  const n = parseInt(q, 10);
  return isNaN(n) ? 80 : Math.min(100, Math.max(30, n));
})();

export interface OptimizedImageProps extends ImageProps {
  plain?: boolean; // per-image override
  unoptimizedFallbackClassName?: string; // optional diff styling when plain
}

export function OptimizedImage({ plain, unoptimizedFallbackClassName, priority, src, alt, className, ...rest }: OptimizedImageProps) {
  const forcePlain = plain || disableOpt;
  if (forcePlain) {
    const resolvedSrc = typeof src === "string" ? src : (src as StaticImageData).src;
    /* eslint-disable-next-line @next/next/no-img-element */
    return <img src={resolvedSrc} alt={alt} loading={priority ? "eager" : "lazy"} className={unoptimizedFallbackClassName || className} />;
  }
  return <NextImage src={src} alt={alt} className={className} priority={priority} quality={quality} {...rest} />;
}

export default OptimizedImage;
