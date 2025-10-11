"use client";
import styles from "./FlowText.module.css";
import { useMemo } from "react";

type FlowTextProps = {
  text: string;
  type: "bodyRegular" | "type2" | "type3";
  color: string;
};

export default function FlowText({
  text,
  type,
  color = "--text-primary",
}: FlowTextProps) {
  const colorValue = useMemo(() => {
    return `var(${color})`;
  }, [color]);

  const flowText = useMemo(() => {
    switch (type) {
      case "bodyRegular":
        return styles.bodyRegular;
      case "type2":
        return styles.type2;
    }
  }, [type]);

  console.log(flowText);

  return (
    <div className={flowText} style={{ color: colorValue }}>
      {text}
    </div>
  );
}
