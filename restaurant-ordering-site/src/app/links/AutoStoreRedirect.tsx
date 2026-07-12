"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type StoreLinks = {
  android?: string;
  ios?: string;
};

const STORE_LINKS: Record<string, StoreLinks> = {
  "/links/ashandbeans": {
    android: "https://play.google.com/store/apps/details?id=com.restrova.ashandbeans",
    ios: "https://apps.apple.com/pk/app/ash-beans/id6759486466",
  },
  "/links/basmafood": {
    android: "https://play.google.com/store/apps/details?id=com.restrova.basmafood",
  },
  "/links/deliverooeats": {
    android: "https://play.google.com/store/apps/details?id=com.restrova.deliverooeats",
  },
  "/links/fruitninjapakistan": {
    android: "https://play.google.com/store/apps/details?id=com.restrova.fruitninjapakistan",
    ios: "https://apps.apple.com/pk/app/fruit-ninja-pakistan/id6783385415",
  },
  "/links/mccafe": {
    android: "https://play.google.com/store/apps/details?id=com.restrova.mccafe",
  },
  "/links/mirchandspicy": {
    android: "https://play.google.com/store/apps/details?id=com.restrova.mirchnspicy",
  },
  "/links/thespanishpizza": {
    android: "https://play.google.com/store/apps/details?id=com.restrova.spanishpizza",
  },
  "/links/yumzone": {
    android: "https://play.google.com/store/apps/details?id=com.restrova.yumzone",
  },
};

export default function AutoStoreRedirect() {
  const pathname = usePathname();

  useEffect(() => {
    const links = STORE_LINKS[pathname.replace(/\/$/, "")];
    if (!links) return;

    const userAgent = navigator.userAgent;
    const isAndroid = /Android/i.test(userAgent);
    const isIOS =
      /iPhone|iPad|iPod/i.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const storeUrl = isAndroid ? links.android : isIOS ? links.ios : undefined;

    if (storeUrl) window.location.assign(storeUrl);
  }, [pathname]);

  return null;
}
