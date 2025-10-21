"use client";
import React, { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";

import BackButton from "../../../components/BackButton/BackButton";
import Headline from "../../../components/Headline/Headline";
import AddButton from "../../../components/AddButton/AddButton";
import { MonthYearPicker } from "../../../components/MonthYearPicker";
import {
  useGetOverviewAmountMutation,
  useGetOverviewAmountQuery,
  useGetOverviewsQuery,
} from "@repo/rtk/shared/querys/zaimu/Overviews.ts";
import OverviewLine from "../../../components/OverviewLine/OverviewLine";
import Link from "next/link";
import { OverviewsResponse } from "@repo/config/types/Overviews.ts";
const DEFAULT_QUERY = {
  date: "2025-10",
  user_id: "5cddbfdc-4c08-4813-ae98-c4e3c6651135",
  from: 0,
  to: 10,
};
export default function Overview() {
  const [val, setVal] = useState({ year: 2025, month: 9 as 9 }); // Oktober (0-basiert)
  const {
    data: overviews,
    refetch: refetchOverviews,
    isLoading: isLoadingOverviewsFetch,
    error: errorOverviewsFetch,
  } = useGetOverviewsQuery({
    date: DEFAULT_QUERY.date,
    user_id: DEFAULT_QUERY.user_id,
    from: DEFAULT_QUERY.from,
    to: DEFAULT_QUERY.to,
  });

  return (
    <div className={styles.page}>
      <div className={styles.headerContainer}>
        <BackButton text="Moritomo" color="--system-colors-system-cyan" />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.mainHeader}>
          <Headline text="Overview" color="--text-primary" type="titleLarge" />
          <AddButton
            text="Hinzufügen"
            color="--system-colors-system-cyan"
            onClick={() => {}}
          />
        </div>
        <div className="p-6">
          <MonthYearPicker
            value={val}
            onChange={setVal}
            minYear={2025}
            maxYear={2035}
            locale="de-DE"
            monthWidth="long"
          />
          <div className="mt-4 text-sm text-gray-600">
            Ausgewählt: {val.year}-{String(val.month + 1).padStart(2, "0")}
          </div>
        </div>
        {overviews?.map((overview) => (
          <OverviewLine
            key={overview.id}
            title={overview.name}
            subtitle={overview.type}
            date={overview.date}
            id={overview.id}
            
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
