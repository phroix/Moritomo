"use client";
import { useGetOverviewAmountQuery } from "@repo/rtk/shared/querys/zaimu/Overviews.ts";
import FlowText from "../FlowText/FlowText";
import Headline from "../Headline/Headline";
import styles from "./OverviewLine.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

type OverviewLineProps = {
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  id: number;
  onClick: () => void;
};

export default function OverviewLine({
  title,
  subtitle,
  // amount,
  date,
  id,
}: OverviewLineProps) {

  const {
    data: overviewAmount,
    refetch: refetchOverviews,
    isLoading: isLoadingOverviewsFetch,
    error: errorOverviewsFetch,
  } = useGetOverviewAmountQuery({
    date: date,
    id: id,
  });

  const colorLabel = useMemo(() => {
    return `var(--labels-secondary)`;
  }, []);

  console.log(overviewAmount);

  return (
    <div className={styles.overviewLine}>
      <div className={styles.leftSide}>
        <Headline text={title} type="titleRegular" color="--text-primary" />
        <Headline text={subtitle} type="subHeadline" color="--text-secondary" />
      </div>
      <div className={styles.middleSide}>
       <FlowText text={overviewAmount?.toString() || "0"} type="bodyEmphasized" color={overviewAmount >= 0 ? '--system-colors-system-green' : '--system-colors-system-red'} />
      </div>
      <div className={styles.rightSide}>
        <FlowText text={"Detail"} type="bodyEmphasized" color="--text-secondary" />
        <ChevronRight color={colorLabel} />
      </div>
    </div>
  );
