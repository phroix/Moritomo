"use client";
import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";

import BackButton from "../../../components/BackButton/BackButton";
import Headline from "../../../components/Headline/Headline";

export default function Overview() {
  return (
    <div className={styles.page}>
      <div className={styles.headerContainer}>
        <BackButton text="Moritomo" color="--system-colors-system-cyan" />
        <Headline text="Overview" color="--text-primary" type="titleLarge" />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.main}>content</div>
      </div>
    </div>
  );
}
