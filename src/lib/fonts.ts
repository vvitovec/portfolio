import localFont from "next/font/local";

export const fontSans = localFont({
  src: [
    {
      path: "../../public/fonts/manrope-latin.woff2",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "../../public/fonts/manrope-latin-ext.woff2",
      weight: "200 800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-manrope",
});

export const fontDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/fraunces-latin.woff2",
      weight: "400 700",
      style: "normal",
    },
    {
      path: "../../public/fonts/fraunces-latin-ext.woff2",
      weight: "400 700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-fraunces",
});
