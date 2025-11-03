"use client";
import FlowText from "../FlowText/FlowText";
import styles from "./BackButton.module.css";
import { ChevronLeft } from "lucide-react";
import { useMemo } from "react";

type HeadlineProps = {
  text: string;
  color: string;
  onClick: () => void;
};

export default function BackButton({
  text,
  color = "--text-primary",
  onClick,
}: HeadlineProps) {
  const colorValue = useMemo(() => {
    return `var(${color})`;
  }, [color]);

  return (
    <div
      className={styles.backButton}
      onClick={onClick}
      style={{ textDecorationColor: colorValue }}
    >
      <ChevronLeft color={colorValue} />
      <FlowText text={text} type="bodyRegular" color={color} />
    </div>
  );
}
