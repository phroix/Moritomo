"use client";
import React, { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";

import BackButton from "../../../components/BackButton/BackButton";
import Headline from "../../../components/Headline/Headline";
import AddButton from "../../../components/AddButton/AddButton";
import { MonthYearPicker } from "../../../components/MonthYearPicker/MonthYearPicker";
import {
  useGetOverviewAmountQuery,
  useGetOverviewsQuery,
} from "@repo/rtk/shared/querys/zaimu/Overviews.ts";
import OverviewLine from "../../../components/OverviewLine/OverviewLine";
import Link from "next/link";
import { OverviewsResponse } from "@repo/config/types/Overviews.ts";
import SumLine from "../../../components/SumLine/SumLine";
import { useAppSelector } from "@repo/rtk/webHooks";
const DEFAULT_QUERY = {
  date: "2025-10",
  user_id: "5cddbfdc-4c08-4813-ae98-c4e3c6651135",
  from: 0,
  to: 10,
};

const DEFAULT_OVERVIEWS = [
  {
    id: 4,
    name: "Ausgaben",
    type: "monthly",
    date: null,
    user_id: "5cddbfdc-4c08-4813-ae98-c4e3c6651135",
    keep_data: false,
  },
  {
    id: 1,
    name: "Einkommen",
    type: "monthly",
    date: "2025-09",
    user_id: "5cddbfdc-4c08-4813-ae98-c4e3c6651135",
    keep_data: true,
  },
  {
    id: 2,
    name: "Fixkosten",
    type: "monthly",
    date: "2025-09",
    user_id: "5cddbfdc-4c08-4813-ae98-c4e3c6651135",
    keep_data: true,
  },
  {
    id: 3,
    name: "Fixkosten Monatlich",
    type: "monthly",
    date: "2025-09",
    user_id: "5cddbfdc-4c08-4813-ae98-c4e3c6651135",
    keep_data: true,
  },
  {
    id: 5,
    name: "Septemper ausgabe",
    type: "once",
    date: "2025-09",
    user_id: "5cddbfdc-4c08-4813-ae98-c4e3c6651135",
    keep_data: true,
  },
];
export default function Overview() {
  const [dateValue, setDateValue] = useState({ year: 2025, month: 9 });
  // const userId = useAppSelector((state) => state.moritomo);
  // console.log("userId", userId);
  const {
    data: overviews,
    refetch: refetchOverviews,
    isLoading: isLoadingOverviewsFetch,
    error: errorOverviewsFetch,
  } = useGetOverviewsQuery({
    date: `${dateValue.year}-${dateValue.month + 1}`,
    user_id: DEFAULT_QUERY.user_id,
    from: DEFAULT_QUERY.from,
    to: DEFAULT_QUERY.to,
  });
  const [sumAmount, setSumAmount] = useState(0);
  const handleAmountChange = React.useCallback(
    (amount: number) => {
      setSumAmount((prev) => prev + amount);
    },
    [overviews]
  );

  // Summe zurücksetzen, wenn sich der Monat ändert
  useEffect(() => {
    setSumAmount(0);
  }, [dateValue]);
  const [isInFocusId, setIsInFocusId] = useState<number | null>(null);
  const isInFocus = overviews?.find((overview) => overview.id === isInFocusId);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Wenn ref existiert und der Klick NICHT innerhalb des Elements war
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsInFocusId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prüfen ob Command (Mac) oder Control (Windows/Linux) + U gedrückt wurde
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "u") {
        event.preventDefault(); // optional, um Standardaktion (z. B. "Seitenquelle anzeigen") zu verhindern
        setIsInFocusId(null);
        // Hier deine Logik
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []); // keine Abhängigkeiten nötig

  return (
    <div className={styles.page}>
      <div className={styles.headerContainer}>
        <BackButton text="Moritomo" color="--system-colors-system-cyan" />
      </div>
      <div className={styles.allOverviewContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.mainHeader}>
            <MonthYearPicker
              value={dateValue}
              onChange={setDateValue}
              minYear={2025}
              maxYear={2035}
              locale="de-DE"
              monthWidth="long"
            />
            <AddButton
              text="Hinzufügen"
              color="--system-colors-system-cyan"
              onClick={() => {}}
            />
          </div>
          <div className={styles.sumContainer}>
            <SumLine title="Gesamt:" amount={sumAmount} />
          </div>
          <div ref={divRef} className={styles.overviewContainer}>
            {overviews?.map((overview) => (
              <OverviewLine
                key={overview.id}
                title={overview.name}
                subtitle={overview.type}
                date={overview.date}
                id={overview.id}
                isInFocus={isInFocusId === overview.id}
                onClick={() => {
                  setIsInFocusId(overview.id);
                }}
                onAmountChange={handleAmountChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
