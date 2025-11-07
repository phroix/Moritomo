"use client";
import { ChevronRight, Circle } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import FlowText from "../FlowText/FlowText";
import Headline from "../Headline/Headline";
import styles from "./TransactionLine.module.css";
import {
  useGetOverviewAmountQuery,
  useUpdateOverviewMutation,
} from "@repo/rtk/shared/querys/zaimu/Overviews.ts";
import { OverviewType } from "@repo/config/types/Overviews.ts";
import { useUpdateTransactionMutation } from "@repo/rtk/shared/querys/zaimu/Transactions.ts";
import { TransactionType } from "@repo/config/types/Transactions.ts";
import InputField from "../InputField/InputField";

type OverviewLineProps = {
  title: string;
  date: string;
  id: number;
  type: TransactionType;
  amount: number;
  overview_id: number;
  onClick: () => void;
  isInFocus: boolean;
  onAmountChange: (amount: number) => void;
  onChangeTitles: () => void;
};

export default function OverviewLine({
  title,
  date,
  id,
  type,
  amount,
  overview_id,
  onClick,
  isInFocus,
  onAmountChange,
  onChangeTitles,
}: OverviewLineProps) {
  const [updateTransaction, { isLoading: isUpdateTransactionLoading }] =
    useUpdateTransactionMutation();

  const colorLabel = useMemo(() => `var(--labels-secondary)`, []);

  const actuaTitle = title;
  const [titleInputValue, setTitleInputValue] = useState(title);
  const [amountInputValue, setAmountInputValue] = useState(amount);

  const [editing, setEditing] = useState<null | "title" | "amount">(null);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing === "title") titleInputRef.current?.focus();
    if (editing === "amount") amountInputRef.current?.focus();
  }, [editing]);

  useEffect(() => {
    if (actuaTitle !== titleInputValue || amount !== amountInputValue) {
      onChangeTitles();
    }
  }, [titleInputValue]);

  useEffect(() => {
    if (!isInFocus) setEditing(null);
  }, [isInFocus]);

  useEffect(() => {
    if (amount !== undefined) {
      onAmountChange(amount); // Rückgabe an den Eltern
    }
  }, [amount, onAmountChange]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        isInFocus &&
        actuaTitle !== titleInputValue
      ) {
        event.preventDefault();
        console.log("overviewAmount");
        const result = await updateTransaction({
          transaction_id: id,
          transaction: {
            name: titleInputValue,
            amount: amount,
            type: type,
            date: date,
            overview_id: overview_id,
          },
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInFocus]);

  return (
    <div
      className={styles.overviewLine + " " + (isInFocus ? styles.inFocus : "")}
      onClick={onClick}
    >
      <div className={styles.leftSide}>
        {actuaTitle !== titleInputValue && <Circle color="white" size={5} />}
        <div className={styles.bothTitlesContainer}>
          {editing !== "title" ? (
            <div
              onClick={() => setEditing("title")}
              className={styles.titleContainer}
            >
              <Headline
                text={titleInputValue}
                type="titleRegular"
                color="--text-primary"
              />
            </div>
          ) : (
            <div
              className={styles.inputContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <InputField
                ref={titleInputRef as React.RefObject<HTMLInputElement>}
                type="text"
                val={titleInputValue}
                onChange={(e) => setTitleInputValue(e.target.value)}
                onBlur={() => setEditing(null)}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.middleSide} onClick={() => setEditing("amount")}>
        {editing !== "amount" ? (
          <FlowText
            text={(amount != null ? amount : 0).toString() + " €"}
            type="bodyEmphasized"
            color={
              type === "positive"
                ? "--system-colors-system-green"
                : "--system-colors-system-red"
            }
          />
        ) : (
          <InputField
            ref={amountInputRef as React.RefObject<HTMLInputElement>}
            type="text"
            val={amountInputValue.toString()}
            onChange={(e) => setAmountInputValue(Number(e.target.value))}
            onBlur={() => setEditing(null)}
          />
        )}
      </div>
    </div>
  );
}
