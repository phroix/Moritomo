"use client";
import { ChevronRight, Circle } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import FlowText from "../FlowText/FlowText";
import Headline from "../Headline/Headline";
import styles from "./SumLine.module.css";
import { useGetOverviewAmountQuery } from "@repo/rtk/shared/querys/zaimu/Overviews.ts";

type SumLineProps = {
  title: string;
  amount: number;
};

export default function SumLine({
  title,
  amount,
}: SumLineProps) {
  const colorLabel = useMemo(() => `var(--labels-secondary)`, []);

  return (
    <div className={styles.sumLine}>
      <div className={styles.leftSide}>
          <Headline text={title} type="titleRegular" color="--text-primary" />
      </div>

      <div className={styles.middleSide}>
        <FlowText
          text={(amount != null ? amount : 0).toString() + " €"}
          type="bodyEmphasized"
          color={
            (amount ?? 0) >= 0
              ? "--system-colors-system-green"
              : "--system-colors-system-red"
          }
        />
      </div>
    </div>
  );
}
