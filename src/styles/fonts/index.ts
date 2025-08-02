import localFont from "next/font/local";
import { Montserrat } from "next/font/google";

const integralCF = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800", "900"],
  fallback: ["system-ui", "Arial", "sans-serif"],
  variable: "--font-integralCF",
});

const satoshi = localFont({
  src: [
    {
      path: "./Satoshi-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Satoshi-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Satoshi-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  fallback: ["sans-serif"],
  variable: "--font-satoshi",
});

export { integralCF, satoshi };
