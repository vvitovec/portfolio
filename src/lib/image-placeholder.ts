export function getBlurDataURL(width: number, height: number) {
  const shimmer = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g">
          <stop stop-color="hsl(210 20% 92%)" offset="20%" />
          <stop stop-color="hsl(210 20% 96%)" offset="50%" />
          <stop stop-color="hsl(210 20% 92%)" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="hsl(210 20% 92%)" />
      <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1.2s" repeatCount="indefinite" />
    </svg>
  `;

  const base64 = Buffer.from(shimmer).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}
