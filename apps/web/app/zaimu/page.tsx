"use client";
import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { colors } from "@repo/ui/colors";
import { useAppSelector, useAppDispatch } from "@repo/rtk/webHooks";
import { updateLang } from "@repo/rtk/lang";
import Link from "next/link";
import { useTheme } from "next-themes";
import Overview from "./overview/page";

export default function Zaimu() {
  const dispatch = useAppDispatch();
  const { selectedLang, de, en } = useAppSelector((state) => state.lang);

  const { theme, setTheme } = useTheme();

  return (
    // <div className={styles.page}>
    <Overview />
    // </div>
  );
}
