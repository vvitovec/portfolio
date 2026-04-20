"use client";

import { useEffect } from "react";

type LocaleHtmlAttrsProps = {
  locale: string;
};

export default function LocaleHtmlAttrs({ locale }: LocaleHtmlAttrsProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
