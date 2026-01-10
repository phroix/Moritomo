"use client";
import { ChevronRight, Circle, X } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import FlowText from "../FlowText/FlowText";
import Headline from "../Headline/Headline";
import styles from "./TransactionLine.module.css";
import {
  useGetOverviewAmountQuery,
  useUpdateOverviewMutation,
} from "@repo/rtk/shared/querys/zaimu/Overviews.ts";
import { OverviewType } from "@repo/config/types/Overviews.ts";
import {
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} from "@repo/rtk/shared/querys/zaimu/Transactions.ts";
import {
  TransactionsRequest,
  TransactionType,
} from "@repo/config/types/Transactions.ts";
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
  const [deleteTransaction, { isLoading: isDeleteTransactionLoading }] =
    useDeleteTransactionMutation();

  const colorLabel = useMemo(() => `var(--labels-secondary)`, []);

  const actuaTitle = title;
  const actualAmount = amount;
  const actualType = type;
  const selfTransaction: TransactionsRequest = {
    name: title,
    amount,
    type,
    date,
    overview_id,
  };
  const [titleInputValue, setTitleInputValue] = useState(title);
  const [typeInputValue, setTypeInputValue] = useState<TransactionType>(type);
  const [amountInputValue, setAmountInputValue] = useState(amount);
  const [amountInputString, setAmountInputString] = useState(amount.toString());

  const [editing, setEditing] = useState<null | "title" | "amount">(null);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing === "title") titleInputRef.current?.focus();
    if (editing === "amount") {
      setAmountInputString(amountInputValue.toString());
      amountInputRef.current?.focus();
    }
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
      setAmountInputValue(amount);
      setAmountInputString(amount.toString());
    }
  }, [amount, onAmountChange]);

  const transactionsEditMode =
    title !== titleInputValue ||
    amount !== amountInputValue ||
    type !== typeInputValue;

  // console.log("amountInputValue", amountInputValue);
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        // isInFocus &&
        transactionsEditMode
        // true
      ) {
        event.preventDefault();
        console.log(
          "updateTransaction",
          titleInputValue,
          amountInputValue,
          typeInputValue
        );
        const result = await updateTransaction({
          transaction_id: id,
          transaction: {
            name: titleInputValue,
            amount: amountInputValue,
            type: typeInputValue,
          },
        });
        console.log("result", result);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [transactionsEditMode, typeInputValue, amountInputValue, titleInputValue]);

  // console.log("transactionsEditMode", transactionsEditMode);
  return (
    <div
      className={styles.overviewLine + " " + (isInFocus ? styles.inFocus : "")}
      onClick={onClick}
    >
      {isInFocus && (
        <div
          className={styles.trashIcon}
          onClick={() => {
            deleteTransaction({ transaction_id: id });
          }}
        >
          <X color="var(--system-colors-system-red)" size={20} />
        </div>
      )}
      <div className={styles.leftSide}>
        {transactionsEditMode && <Circle color="white" size={5} />}
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

      <div
        className={styles.middleSide}
        onClick={() => {
          setTypeInputValue(
            typeInputValue === "positive" ? "negative" : "positive"
          );
        }}
      >
        <FlowText
          text={typeInputValue === "positive" ? "+" : "-"}
          type="bodyEmphasized"
          color={
            typeInputValue === "positive"
              ? "--system-colors-system-green"
              : "--system-colors-system-red"
          }
        />
      </div>

      <div className={styles.rightSide} onClick={() => setEditing("amount")}>
        {editing !== "amount" ? (
          <FlowText
            text={
              (amountInputValue != null ? amountInputValue : 0).toString() +
              " €"
            }
            type="bodyEmphasized"
            color={
              typeInputValue === "positive"
                ? "--system-colors-system-green"
                : "--system-colors-system-red"
            }
          />
        ) : (
          <InputField
            ref={amountInputRef as React.RefObject<HTMLInputElement>}
            type="text"
            val={amountInputString}
            onChange={(e) => {
              const value = e.target.value.replace(",", ".");
              setAmountInputString(value);
            }}
            onBlur={() => {
              const numValue = Number(amountInputString);
              setAmountInputValue(isNaN(numValue) ? 0 : numValue);
              setEditing(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
