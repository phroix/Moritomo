"use client";
import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { colors } from "@repo/ui/colors";
import { useAppSelector, useAppDispatch } from "@repo/rtk/webHooks";
import { updateLang } from "@repo/rtk/lang";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Zaimu() {
  const dispatch = useAppDispatch();
  const { selectedLang, de, en } = useAppSelector((state) => state.lang);

  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.page}>
      <Link href="/zaimu/overview">
        <p>Overview</p>
      </Link>
      <Link href="/zaimu/transaction">
        <p>Transaction</p>
      </Link>

    </div>
  );
}
