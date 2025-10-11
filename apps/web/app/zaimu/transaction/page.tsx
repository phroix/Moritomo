"use client";
import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { colors } from "@repo/ui/colors";
import { useAppSelector, useAppDispatch } from "@repo/rtk/webHooks";
import { updateLang } from "@repo/rtk/lang";
import Link from "next/link";

const DEFAULT_QUERY = {
  date: "2025-09",
  user_id: "5cddbfdc-4c08-4813-ae98-c4e3c6651135",
  from: 0,
  to: 10,
};

export default function Transaction() {
  // const {
  //   data: overviews,
  //   refetch: refetchOverviews,
  //   isLoading: isLoadingOverviewsFetch,
  //   error: errorOverviewsFetch,
  // } = useGetOverviewsQuery({
  //   date: DEFAULT_QUERY.date,
  //   user_id: DEFAULT_QUERY.user_id,
  //   from: DEFAULT_QUERY.from,
  //   to: DEFAULT_QUERY.to,
  // });

  // console.log(overviews);
  return (
    <div className={styles.page}>
      {/* <div>{JSON.stringify(overviews)}</div> */}
      {/* <button onClick={() => refetchOverviews()}>Refetch</button> */}
      <Link href="/">
        <p>Zurück</p>
      </Link>
    </div>
  );
}
