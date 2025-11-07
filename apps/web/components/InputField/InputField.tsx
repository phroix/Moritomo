"use client";
import FlowText from "../FlowText/FlowText";
import Headline from "../Headline/Headline";
import styles from "./InputField.module.css";
import { ChevronLeft } from "lucide-react";
import { useMemo } from "react";

type InputFieldProps = {
  ref: React.RefObject<HTMLInputElement>;
  type: string;
  val: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

export default function InputField({
  ref,
  type,
  val,
  onChange,
  onBlur,

}: InputFieldProps) {
  return (
    <div className={styles.inputFieldContainer}>
      <input
        ref={ref}
        type={type}
        value={val}
        onChange={onChange}
        onBlur={onBlur}
        className={styles.inputField}
      />
    </div>
  );
}
