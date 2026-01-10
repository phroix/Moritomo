"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

type Props = {
  children: ReactNode;
  onDelete?: () => void;
  onMore?: () => void;
  /** Gesamte Breite der Aktionen (nach links aufziehbar), Default 176px (Mehr 88 + Löschen 88) */
  actionsWidth?: number;
  className?: string;
  /** Row opt. geschlossen rendern, wenn sich externe State ändert */
  closeSignal?: number | string | boolean;
};

export default function SwipeableRow({
  children,
  onDelete,
  onMore,
  actionsWidth = 176,
  className,
  closeSignal,
}: Props) {
  const x = useMotionValue(0);
  const [open, setOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement | null>(null);

  // Bei „outside click“ schließen
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!rowRef.current) return;
      if (!rowRef.current.contains(e.target as Node)) {
        snapTo(0);
      }
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  // Per Escape/Arrow steuern
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") snapTo(0);
      if (e.key === "ArrowLeft") snapTo(-actionsWidth);
      if (e.key === "ArrowRight") snapTo(0);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [actionsWidth]);

  // Von außen schließen, wenn closeSignal sich ändert
  useEffect(() => {
    if (closeSignal !== undefined) snapTo(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeSignal]);

  const snapTo = (val: number) => {
    x.set(val);
    setOpen(val !== 0);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const traveled = info.offset.x; // neg. bei linkswischen
    const v = info.velocity.x;
    const threshold = -actionsWidth * 0.35; // ab ca. 35% öffnen
    const fling = -300; // schneller Wisch öffnet
    if (traveled < threshold || v < fling) {
      snapTo(-actionsWidth);
    } else {
      snapTo(0);
    }
  };

  const handleMore = () => {
    onMore?.();
    snapTo(0);
  };

  const handleDelete = () => {
    onDelete?.();
    snapTo(0);
  };

  return (
    <div
      ref={rowRef}
      className={`relative select-none ${className ?? ""}`}
      style={{ touchAction: "pan-y" }} // erlaubt vertikales Scrollen, verhindert horizontales Scroll-Jitter
      aria-expanded={open}
    >
      {/* Unterlage mit Actions */}
      <div className="absolute inset-0 flex items-stretch justify-end gap-2 px-2">
        {onMore && (
          <button
            type="button"
            onClick={handleMore}
            className="my-1 w-20 rounded-xl bg-neutral-200 px-3 text-sm font-medium hover:bg-neutral-300 active:scale-[0.98] focus:outline-none focus-visible:ring"
            aria-label="Mehr Optionen"
          >
            Mehr
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="my-1 w-20 rounded-xl bg-red-500 px-3 text-sm font-medium text-white hover:bg-red-600 active:scale-[0.98] focus:outline-none focus-visible:ring"
            aria-label="Löschen"
          >
            Löschen
          </button>
        )}
      </div>

      {/* Vordergrund (dein eigentlicher Row-Content) */}
      <motion.div
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: -actionsWidth, right: 0 }}
        style={{ x }}
        onDragEnd={handleDragEnd}
        className="relative z-10 rounded-xl bg-white shadow-sm ring-1 ring-black/5"
      >
        {children}
      </motion.div>
    </div>
  );
}