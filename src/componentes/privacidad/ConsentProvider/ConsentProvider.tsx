"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  usePathname,
} from "next/navigation";

import styles from "../CookieConsent/CookieConsent.module.css";

export const CONSENT_VERSION = "2026-09-15";
export const CONSENT_STORAGE_KEY = "alred-consent";

type ConsentState = {
  version: string;
  analytics: boolean;
  decided: boolean;
  updatedAt: string;
};

type ConsentContextValue = {
  openPreferences: () => void;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const ConsentContext = createContext<ConsentContextValue | null>(null);
let consentSnapshot: ConsentState | null | undefined;
const consentListeners = new Set<() => void>();

function subscribeConsent(listener: () => void) {
  consentListeners.add(listener);
  return () => consentListeners.delete(listener);
}

function getConsentSnapshot() {
  if (consentSnapshot === undefined) consentSnapshot = readConsent();
  return consentSnapshot;
}

function getServerConsentSnapshot() {
  return null;
}

function readConsent(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<ConsentState>;
    if (value.version !== CONSENT_VERSION || typeof value.analytics !== "boolean" || value.decided !== true) {
      return null;
    }
    return {
      version: CONSENT_VERSION,
      analytics: value.analytics,
      decided: true,
      updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

function writeConsent(analytics: boolean) {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    analytics,
    decided: true,
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  consentSnapshot = state;
  consentListeners.forEach(listener => listener());
  return state;
}

function removeCookie(name: string) {
  const domains = [window.location.hostname, `.${window.location.hostname}`];
  for (const domain of domains) {
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
  }
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

function clearAnalyticsCookies() {
  document.cookie.split(";").forEach((part) => {
    const name = part.split("=")[0]?.trim();
    if (name && (/^_ga(?:_|$)/.test(name) || /^_cl(?:ck|sk)$/.test(name))) {
      removeCookie(name);
    }
  });
}

function updateClarityConsent(analytics: boolean) {
  window.clarity?.("consentv2", {
    analytics_Storage: analytics ? "granted" : "denied",
    ad_Storage: "denied",
  });
}

function loadScript(src: string, marker: string, onLoad: () => void) {
  if (document.querySelector(`script[data-alred-analytics="${marker}"]`)) {
    onLoad();
    return;
  }
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  script.dataset.alredAnalytics = marker;
  script.onload = onLoad;
  document.head.appendChild(script);
}

function loadGoogleAnalytics(id: string, onReady: () => void) {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? function gtag() {
    // eslint-disable-next-line prefer-rest-params -- must match Google's official snippet exactly
    window.dataLayer?.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
  });
  window.gtag("config", id, { send_page_view: false });
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`, "google-analytics", onReady);
}

function loadClarity(id: string, onReady: () => void) {
  window.clarity = window.clarity ?? ((...args: unknown[]) => {
    const clarity = window.clarity as unknown as { q?: unknown[] };
    clarity.q = clarity.q ?? [];
    clarity.q.push(args);
  });
  loadScript(`https://www.clarity.ms/tag/${encodeURIComponent(id)}`, "microsoft-clarity", onReady);
}

const ALLOWED_UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id"];

function buildPageLocation(pathname: string) {
  const search = new URLSearchParams(window.location.search);
  const kept = new URLSearchParams();
  for (const key of ALLOWED_UTM_PARAMS) {
    const value = search.get(key);
    if (value) kept.set(key, value);
  }
  const query = kept.toString();
  return `${window.location.origin}${pathname}${query ? `?${query}` : ""}`;
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) throw new Error("useConsent must be used inside ConsentProvider");
  return context;
}

export function ConsentProvider({ locale, children }: { locale: "es" | "en"; children: ReactNode }) {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analyticsChoice, setAnalyticsChoice] = useState(() =>
    typeof window === "undefined" ? false : readConsent()?.analytics ?? false,
  );
  const gaReady = useRef(false);
  const lastPagePath = useRef<string | null>(null);

  useEffect(() => {
    const open = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("[data-open-cookie-settings]")) {
        setPreferencesOpen(true);
      }
    };
    document.addEventListener("click", open);
    return () => document.removeEventListener("click", open);
  }, []);

  useEffect(() => {
    if (!preferencesOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreferencesOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [preferencesOpen]);

  useEffect(() => {
    if (!consent?.analytics) {
      updateClarityConsent(false);
      gaReady.current = false;
      return;
    }

    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

    if (gaId) loadGoogleAnalytics(gaId, () => {
      gaReady.current = true;
      window.dispatchEvent(new Event("alred:ga-ready"));
    });
    if (clarityId) loadClarity(clarityId, () => {
      updateClarityConsent(true);
    });
  }, [consent?.analytics]);

  useEffect(() => {
    const sendPageview = () => {
      if (!gaReady.current || !consent?.analytics || !window.gtag || lastPagePath.current === pathname) return;
      lastPagePath.current = pathname;
      window.gtag("event", "page_view", {
        page_title: document.title,
        page_location: buildPageLocation(pathname),
        page_path: pathname,
      });
    };
    sendPageview();
    window.addEventListener("alred:ga-ready", sendPageview);
    return () => window.removeEventListener("alred:ga-ready", sendPageview);
  }, [consent?.analytics, pathname]);

  const save = (analytics: boolean) => {
    writeConsent(analytics);
    setAnalyticsChoice(analytics);
    setPreferencesOpen(false);
    if (!analytics) {
      lastPagePath.current = null;
      gaReady.current = false;
      window.gtag?.("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
      });
      updateClarityConsent(false);
      clearAnalyticsCookies();
    }
  };

  const openPreferences = () => {
    setAnalyticsChoice(consent?.analytics ?? false);
    setPreferencesOpen(true);
  };

  const decided = Boolean(consent?.decided);
  const showPanel = !decided || preferencesOpen;

  return (
    <ConsentContext.Provider value={{ openPreferences }}>
      {children}
      {showPanel && (
        <aside className={styles.panel} aria-label={locale === "es" ? "Preferencias de cookies" : "Cookie preferences"}>
          {!preferencesOpen ? (
            <>
              <p className={styles.copy}>
                {locale === "es"
                  ? "Utilizamos analítica para entender cómo se usa Alred y seguir mejorando la experiencia y el funcionamiento de la web."
                  : "We use analytics to understand how Alred is used and keep improving the experience and performance of the website."}
              </p>
              <p className={styles.copySecondary}>
                {locale === "es"
                  ? "Puedes cambiar tus preferencias cuando quieras."
                  : "You can change your preferences at any time."}
              </p>
              <div className={styles.links}>
                <a href={`/${locale}/cookies`}>{locale === "es" ? "Más información" : "More information"}</a>
                <span aria-hidden="true">·</span>
                <button type="button" className={styles.textButton} onClick={() => save(false)}>{locale === "es" ? "Rechazar" : "Reject"}</button>
              </div>
              <div className={styles.actions}>
                <button type="button" className={styles.accept} onClick={() => save(true)}>{locale === "es" ? "Aceptar" : "Accept"}</button>
                <button type="button" className={styles.reject} onClick={openPreferences}>{locale === "es" ? "Configurar" : "Configure"}</button>
              </div>
            </>
          ) : (
            <div role="dialog" aria-modal="false" aria-labelledby="alred-consent-title">
              <div className={styles.preferenceHeader}>
                <h2 id="alred-consent-title">{locale === "es" ? "Preferencias" : "Preferences"}</h2>
                <button type="button" className={styles.close} onClick={() => setPreferencesOpen(false)} aria-label={locale === "es" ? "Cerrar preferencias" : "Close preferences"}>×</button>
              </div>
              <div className={styles.preferenceRow}>
                <div>
                  <strong>{locale === "es" ? "Necesarias" : "Necessary"}</strong>
                  <span>
                    {locale === "es"
                      ? "Permiten el funcionamiento básico de la web y recordar tus preferencias."
                      : "They enable the website's basic operation and remember your preferences."}
                  </span>
                </div>
                <span className={styles.alwaysOn}>{locale === "es" ? "Siempre activas" : "Always active"}</span>
              </div>
              <div className={styles.preferenceRow}>
                <div>
                  <strong>{locale === "es" ? "Analítica" : "Analytics"}</strong>
                  <span>
                    {locale === "es"
                      ? "Nos ayuda a conocer de forma agregada cómo se utiliza la web, detectar problemas y seguir mejorando la experiencia."
                      : "It helps us see in aggregate how the website is used, detect issues and keep improving the experience."}
                  </span>
                </div>
                <button type="button" className={`${styles.toggle} ${analyticsChoice ? styles.toggleOn : ""}`} role="switch" aria-checked={analyticsChoice} onClick={() => setAnalyticsChoice(value => !value)}><span /></button>
              </div>
              <div className={styles.preferenceActions}>
                <button type="button" className={styles.accept} onClick={() => save(analyticsChoice)}>{locale === "es" ? "Guardar preferencias" : "Save preferences"}</button>
                <button type="button" className={styles.reject} onClick={() => save(false)}>{locale === "es" ? "Rechazar analítica" : "Reject analytics"}</button>
                <button type="button" className={styles.textButton} onClick={() => save(true)}>{locale === "es" ? "Aceptar analítica" : "Accept analytics"}</button>
              </div>
            </div>
          )}
        </aside>
      )}
    </ConsentContext.Provider>
  );
}
