import { useState } from "react";
import Image, { ImageProps } from "next/image";

export function SafeImage(props: ImageProps & { fallbackSrc?: string }) {
  const { fallbackSrc = "/fallback.png", ...rest } = props;
  const [src, setSrc] = useState(rest.src);

  return (
    <Image
      {...rest}
      src={src}
      onError={() => setSrc(fallbackSrc)}
    />
  );
} 