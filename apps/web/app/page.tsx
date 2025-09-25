"use client";
import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { colors } from "@repo/ui/colors";
import { useAppSelector, useAppDispatch } from "@repo/rtk/webHooks";
import { updateLang } from "@repo/rtk/lang";
// import {
//   useAppSelector,
//   useAppDispatch,
//   RootState,
//   updateLang,
// } from "@repo/rtk/webStore";

export default function Home() {
  const dispatch = useAppDispatch();
  const { selectedLang, de, en } = useAppSelector((state) => state.lang);

  return (
    <div className={styles.page}>
      <div style={{ color: colors.primary }}>{selectedLang}</div>
      <button onClick={() => dispatch(updateLang("en"))}>En</button>
      <button onClick={() => dispatch(updateLang("de"))}>De</button>
      <div style={{ color: colors.secondary }}>
        {selectedLang === "de" ? de.title : en.title}
      </div>
      <div style={{ color: colors.secondary }}>Secondary</div>
    </div>
  );
}
