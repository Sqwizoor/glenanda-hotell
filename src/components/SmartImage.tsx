"use client";
import Image, { type ImageProps, type StaticImageData } from "next/image";
import * as React from "react";
import { motion } from "framer-motion";

interface SmartImageProps extends Omit<ImageProps, "placeholder"> {
  disableMotion?: boolean;
  asMotion?: boolean;
}

const isPlain = process.env.NEXT_PUBLIC_PLAIN_IMAGES === "1" || process.env.NEXT_PUBLIC_PLAIN_IMAGES === "true";
const quality = (() => {
  const q = process.env.NEXT_PUBLIC_IMG_QUALITY;
  if (!q) return 75;
  const n = parseInt(q, 10);
  return isNaN(n) ? 75 : Math.min(100, Math.max(30, n));
})();

export function SmartImage({ disableMotion, asMotion, alt, src, className, priority, ...rest }: SmartImageProps) {
  // If plain mode: just render a vanilla img (no Next optimization)
  if (isPlain) {
    const resolvedSrc = typeof src === "string" ? src : (src as StaticImageData).src;
    /* eslint-disable-next-line @next/next/no-img-element */
    return <img src={resolvedSrc} alt={alt || ""} className={className} loading={priority ? "eager" : "lazy"} />;
  }

  const Img = (
    <Image src={src} alt={alt} className={className} priority={priority} quality={quality} {...rest} />
  );

  if (disableMotion) return Img;
  const MotionWrapper = (asMotion ? motion.div : motion.span) as typeof motion.div;
  return (
    <MotionWrapper
      initial={{ opacity: 0, scale: 1.02 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={undefined}
    >
      {Img}
    </MotionWrapper>
  );
}

export default SmartImage;
