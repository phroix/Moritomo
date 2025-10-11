"use client";
import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { colors } from "@repo/ui/colors";
import { useAppSelector, useAppDispatch } from "@repo/rtk/webHooks";
import { updateLang } from "@repo/rtk/lang";

export default function Overview() {

  return (
    <div className={styles.page}>
      <div>Overview</div>
    </div>
  );
}
