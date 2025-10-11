"use client";
import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { colors } from "@repo/ui/colors";
import { useAppSelector, useAppDispatch } from "@repo/rtk/webHooks";
import { updateLang } from "@repo/rtk/lang";
import Link from "next/link";

export default function Transaction() {
  return (
    <div className={styles.page}>
      <div>Transaction</div>
      <Link href="/">
        <p>Zurück</p>
      </Link>
    </div>
  );
}
