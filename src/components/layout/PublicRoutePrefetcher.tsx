"use client";

import { useCallback, useEffect, useRef } from "react";

import { useRouter } from "@/i18n/navigation";

const PUBLIC_NAV_ROUTES = ["/websites", "/projects", "/blog"] as const;
const FALLBACK_PREFETCH_DELAY_MS = 1200;

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
};

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions,
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

function shouldSkipSpeculativePrefetch() {
  const connection = (navigator as NavigatorWithConnection).connection;
  return Boolean(
    connection?.saveData ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g",
  );
}

export default function PublicRoutePrefetcher() {
  const router = useRouter();
  const hasPrefetched = useRef(false);

  const prefetchPublicRoutes = useCallback(() => {
    if (hasPrefetched.current || shouldSkipSpeculativePrefetch()) {
      return;
    }

    hasPrefetched.current = true;
    PUBLIC_NAV_ROUTES.forEach((href) => {
      router.prefetch(href);
    });
  }, [router]);

  useEffect(() => {
    const win = window as WindowWithIdleCallback;

    if (win.requestIdleCallback) {
      const handle = win.requestIdleCallback(prefetchPublicRoutes, {
        timeout: 3000,
      });

      return () => {
        win.cancelIdleCallback?.(handle);
      };
    }

    const timeout = window.setTimeout(
      prefetchPublicRoutes,
      FALLBACK_PREFETCH_DELAY_MS,
    );

    return () => {
      window.clearTimeout(timeout);
    };
  }, [prefetchPublicRoutes]);

  return null;
}
