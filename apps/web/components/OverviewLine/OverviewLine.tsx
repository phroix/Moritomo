"use client";
import { ChevronRight, Circle } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import FlowText from "../FlowText/FlowText";
import Headline from "../Headline/Headline";
import styles from "./OverviewLine.module.css";
import { useGetOverviewAmountQuery } from "@repo/rtk/shared/querys/zaimu/Overviews.ts";

type OverviewLineProps = {
  title: string;
  subtitle: string;
  date: string;
  id: number;
  onClick: () => void;
  isInFocus: boolean;
  onAmountChange: (amount: number) => void;
};

export default function OverviewLine({
  title,
  subtitle,
  date,
  id,
  onClick,
  isInFocus,
  onAmountChange,
}: OverviewLineProps) {
  const { data: overviewAmount } = useGetOverviewAmountQuery(
    { date, id },
    { skip: isInFocus }
  );

  const colorLabel = useMemo(() => `var(--labels-secondary)`, []);

  const actuaTitle = title;
  const actualSubtitle = subtitle;

  const [titleInputValue, setTitleInputValue] = useState(title);
  const [subtitleInputValue, setSubtitleInputValue] = useState(subtitle);

  const [editing, setEditing] = useState<null | "title" | "subtitle">(null);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const subtitleInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editing === "title") titleInputRef.current?.focus();
    if (editing === "subtitle") subtitleInputRef.current?.focus();
  }, [editing]);

  useEffect(() => {
    if (!isInFocus) setEditing(null);
  }, [isInFocus]);

  useEffect(() => {
    if (overviewAmount !== undefined) {
      onAmountChange(overviewAmount); // Rückgabe an den Eltern
    }
  }, [overviewAmount, onAmountChange]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={styles.overviewLine + " " + (isInFocus ? styles.inFocus : "")}
      onClick={onClick}
    >
      <div className={styles.leftSide}>
        {(actuaTitle !== titleInputValue ||
          actualSubtitle !== subtitleInputValue) && (
          <Circle color="white" size={5} />
        )}
        <div className={styles.bothTitlesContainer}>
          {editing !== "title" ? (
            <div
              onClick={() => setEditing("title")}
              className={styles.titleContainer}
            >
              <Headline
                text={titleInputValue}
                type="titleRegular"
                color="--text-primary"
              />
            </div>
          ) : (
            <div
              className={styles.inputContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                ref={titleInputRef}
                type="text"
                value={titleInputValue}
                onChange={(e) => setTitleInputValue(e.target.value)}
                onBlur={() => setEditing(null)}
              />
            </div>
          )}

          {editing !== "subtitle" ? (
            <div
              onClick={() => setEditing("subtitle")}
              className={styles.subtitleContainer}
            >
              <Headline
                text={subtitleInputValue}
                type="subHeadline"
                color="--text-secondary"
              />
              {/* {actualSubtitle !== subtitleInputValue && (
              <Circle color="--system-colors-system-cyan" />
            )} */}
            </div>
          ) : (
            <div
              className={styles.inputContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                ref={subtitleInputRef}
                type="text"
                value={subtitleInputValue}
                onChange={(e) => setSubtitleInputValue(e.target.value)}
                onBlur={() => setEditing(null)}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.middleSide}>
        <FlowText
          text={(overviewAmount != null ? overviewAmount : 0).toString() + " €"}
          type="bodyEmphasized"
          color={
            (overviewAmount ?? 0) >= 0
              ? "--system-colors-system-green"
              : "--system-colors-system-red"
          }
        />
      </div>

      <div className={styles.rightSide}>
        <FlowText
          text="Detail"
          type="bodyEmphasized"
          color="--text-secondary"
        />
        <ChevronRight color={colorLabel} />
      </div>
    </div>
  );
}
