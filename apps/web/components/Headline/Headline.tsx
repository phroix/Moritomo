"use client";
import styles from "./Headline.module.css";
import { useMemo } from "react";

type HeadlineProps = {
  text: string;
  type:
    | "titleRegular"
    | "titleEmphasized"
    | "titleLarge"
    | "titleLargeEmphasized"
    | "subHeadline";
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

  const headline = useMemo(() => {
    switch (type) {
      case "titleRegular":
        return styles.titleRegular;
      case "titleEmphasized":
        return styles.titleEmphasized;
      case "titleLarge":
        return styles.titleLarge;
      case "titleLargeEmphasized":
        return styles.titleLargeEmphasized;
      case "subHeadline":
        return styles.subHeadline;
    }
  }, [type]);

  return (
    <div className={headline} style={{ color: colorValue }}>
      {text}
    </div>
  );
}
