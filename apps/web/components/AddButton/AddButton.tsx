"use client";
import FlowText from "../FlowText/FlowText";
import Headline from "../Headline/Headline";
import styles from "./AddButton.module.css";
import { ChevronLeft } from "lucide-react";
import { useMemo } from "react";

type AddButtonProps = {
  text: string;
  color: string;
  onClick: () => void;
};

export default function AddButton({
  text,
  color = "--text-primary",
  onClick,
}: AddButtonProps) {
  const colorValue = useMemo(() => {
    return `var(${color})`;
  }, [color]);

  return (
    <div
      onClick={onClick}
      className={styles.addButton}
      style={{ textDecorationColor: colorValue}}
    >
      <FlowText text={text} type="bodyRegular" color={color} />
    </div>
  );
}
