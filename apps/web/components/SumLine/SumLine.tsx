"use client";
import FlowText from "../FlowText/FlowText";
import Headline from "../Headline/Headline";
import styles from "./SumLine.module.css";
import { useAppSelector } from "@repo/rtk/webHooks";

type SumLineProps = {
  title: string;
};

export default function SumLine({
  title,
}: SumLineProps) {
  const overviewSumAmount = useAppSelector((state) => state.zaimu.overviewSumAmount);

  return (
    <div className={styles.sumLine}>
      <div className={styles.leftSide}>
        <Headline text={title} type="titleRegular" color="--text-primary" />
      </div>

      <div className={styles.middleSide}>
        <FlowText
          text={(overviewSumAmount != null ? overviewSumAmount.toFixed(2) : 0).toString() + " €"}
          type="bodyEmphasized"
          color={
            (overviewSumAmount ?? 0) >= 0
              ? "--system-colors-system-green"
              : "--system-colors-system-red"
          }
        />
      </div>
    </div>
  );
}
