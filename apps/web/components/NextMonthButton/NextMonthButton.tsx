"use client";
import FlowText from "../FlowText/FlowText";
import Headline from "../Headline/Headline";
import styles from "./NextMonthButton.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

type NextMonthButtonProps = {
  color: string;
  isReverse?: boolean;
  onClick: () => void;
};

export default function NextMonthButton({
  color = "--text-primary",
  isReverse,
  onClick,
}: NextMonthButtonProps) {
  const colorValue = useMemo(() => {
    return `var(${color})`;
  }, [color]);

  return (
    <div
      onClick={onClick}
      className={styles.addButton}
      style={{ textDecorationColor: colorValue }}
    >
      {isReverse ? (
        <ChevronRight color={colorValue} size={12} />
      ) : (
        <ChevronLeft color={colorValue} size={12} />
      )}
    </div>
  );
}
