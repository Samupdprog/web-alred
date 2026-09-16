"use client";

import Image from "next/image";
import {
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

import styles from "./IntroScreen.module.css";

const EXIT_DELAY = 2900;
const REMOVE_DELAY = 3700;

function subscribeToReducedMotion(
  onChange: () => void,
) {
  const media = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  media.addEventListener(
    "change",
    onChange,
  );

  return () => {
    media.removeEventListener(
      "change",
      onChange,
    );
  };
}

function getReducedMotionSnapshot() {
  return window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
}

function getReducedMotionServerSnapshot() {
  return true;
}

export function IntroScreen() {
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    document.body.classList.add("intro-active");
    const exitTimer = window.setTimeout(() => setLeaving(true), EXIT_DELAY);
    const removeTimer = window.setTimeout(() => {
      document.body.classList.remove("intro-active");
      setVisible(false);
    }, REMOVE_DELAY);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      document.body.classList.remove("intro-active");
    };
  }, [reducedMotion]);

  if (reducedMotion || !visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`${styles.intro} ${leaving ? styles.leaving : ""}`}
    >
      <div className={styles.ambient}>
        <i className={`${styles.glow} ${styles.glowOne}`} />
        <i className={`${styles.glow} ${styles.glowTwo}`} />
        <i className={`${styles.glow} ${styles.glowThree}`} />
      </div>

      <div className={styles.texture} />

      <div className={styles.stage}>
        <div className={styles.lockup}>
          <div className={styles.mark}>
            <Image
              className={styles.logo}
              src="/svg/Logos/logo-alred.svg"
              alt=""
              fill
              priority
              sizes="118px"
            />
            <Image
              className={styles.logoGhost}
              src="/svg/Logos/logo-alred.svg"
              alt=""
              fill
              priority
              sizes="118px"
            />
            <i className={styles.sheen} />
          </div>

          <span className={styles.word}>Alred</span>
        </div>

        <div className={styles.line}>
          <i />
        </div>
      </div>

      <div className={styles.exitLight} />
    </div>
  );
}
