"use client";
import styles from "./Headline.module.css";
import { useMemo } from "react";

type HeadlineProps = {
  text: string;
  type:
    | "titleRegular"
    | "titleEmphasized"
    | "titleLarge"
    | "titleLargeEmphasized";
  color: string;
};

export default function Headline({
  text,
  type,
  color = "--text-primary",
}: HeadlineProps) {
  const colorValue = useMemo(() => {
    return `var(${color})`;
  }, [color]);

  const flowText = useMemo(() => {
    switch (type) {
      case "titleRegular":
        return styles.titleRegular;
      case "titleEmphasized":
        return styles.titleEmphasized;
      case "titleLarge":
        return styles.titleLarge;
      case "titleLargeEmphasized":
        return styles.titleLargeEmphasized;
    }
  }, [type]);

  console.log(flowText);

  return (
    <div className={flowText} style={{ color: colorValue }}>
      {text}
    </div>
  );
}
