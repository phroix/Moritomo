"use client";
import { ChevronRight, Circle, X } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import FlowText from "../FlowText/FlowText";
import Headline from "../Headline/Headline";
import styles from "./OverviewLine.module.css";
import {
  useDeleteOverviewMutation,
  useGetOverviewAmountQuery,
  useUpdateOverviewMutation,
} from "@repo/rtk/shared/querys/zaimu/Overviews.ts";
import { OverviewType } from "@repo/config/types/Overviews.ts";
import InputField from "../InputField/InputField";
import { useAppDispatch, useAppSelector } from "@repo/rtk/webHooks";
import { addOverviewAmount } from "@repo/rtk/shared/slices/Zaimu.ts";

type OverviewLineProps = {
  title: string;
  subtitle: string;
  date: string;
  id: number;
  user_id: string;
  keep_data: boolean;
  type: OverviewType;
  onClick: () => void;
  isInFocus: boolean;
  multi: number;
  // onAmountChange: (amount: number) => void;
  onChangeTitles: () => void;
  onDetailClick: () => void;
};

export default function OverviewLine({
  title,
  subtitle,
  date,
  type,
  id,
  user_id,
  keep_data,
  onClick,
  isInFocus,
  multi,
  // onAmountChange,
  onChangeTitles,
  onDetailClick,
}: OverviewLineProps) {
  const dispatch = useAppDispatch();
  const { selectedDate } = useAppSelector((state) => state.zaimu);
  const { data: overviewAmount } = useGetOverviewAmountQuery(
    {
      date: selectedDate,
      id,
      type,
      keep_data,
    },
    { skip: isInFocus }
  );
  console.log("multi");
  console.log(multi);
  // const totalAmount = overviewAmount?.[0]?.totalAmount ?? 0;
  const paidAmmount = overviewAmount?.paidAmmount;
  const totalAmount = overviewAmount?.totalAmount;
  // console.log(overviewAmount);
  // console.log(overviewAmount?.totalAmount);
  // console.log(overviewAmount?.[0]?.totalAmount);

  const [updateOverview, { isLoading: isUpdateOverviewLoading }] =
    useUpdateOverviewMutation();
  const [deleteOverview, { isLoading: isDeleteOverviewLoading }] =
    useDeleteOverviewMutation();

  const colorLabel = useMemo(() => `var(--labels-secondary)`, []);

  const actuaTitle = title;
  const actualSubtitle = subtitle;
  const actualMulti = multi;

  const [titleInputValue, setTitleInputValue] = useState(title);
  const [subtitleInputValue, setSubtitleInputValue] = useState(subtitle);
  const [multiInputValue, setMultiInputValue] = useState(multi);

  const [editing, setEditing] = useState<null | "title" | "subtitle" | "multi">(null);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const subtitleInputRef = useRef<HTMLInputElement>(null);
  const multiInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editing === "title") titleInputRef.current?.focus();
    if (editing === "subtitle") subtitleInputRef.current?.focus();
    if (editing === "multi") multiInputRef.current?.focus();
  }, [editing]);

  useEffect(() => {
    if (
      actuaTitle !== titleInputValue ||
      actualSubtitle !== subtitleInputValue ||
      actualMulti !== multiInputValue
    ) {
      onChangeTitles();
    }
  }, [titleInputValue, subtitleInputValue, multiInputValue]);

  useEffect(() => {
    if (!isInFocus) setEditing(null);
  }, [isInFocus]);

  useEffect(() => {
    if (overviewAmount !== undefined) {
      // onAmountChange(paidAmmount); // Rückgabe an den Eltern
      dispatch(addOverviewAmount(paidAmmount))
    }
  }, [overviewAmount]);


  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        isInFocus &&
        actuaTitle !== titleInputValue
      ) {
        event.preventDefault();
        const result = await updateOverview({
          overview_id: id,
          overview: {
            name: titleInputValue,
            type: subtitleInputValue as OverviewType,
            date: date,
            user_id: user_id,
            keep_data: keep_data,
          },
        });
        console.log(result);
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
      {isInFocus && (
        <div
          className={styles.trashIcon}
          onClick={() => {
            deleteOverview({ overview_id: id });
          }}
        >
          <X color="var(--system-colors-system-red)" size={20} />
        </div>
      )}
      <div className={styles.leftSide}>
        {(actuaTitle !== titleInputValue ||
          actualSubtitle !== subtitleInputValue) && (
            <Circle color="white" size={5} />
          )}
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
              <Headline
                text={id.toString()}
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

          {editing !== "subtitle" ? (
            <div
              onClick={() => setEditing("subtitle")}
              className={styles.subtitleContainer}
            >
              <Headline
                text={subtitleInputValue}
                type="subHeadline"
                color="--text-secondary"
              />
              {/* {actualSubtitle !== subtitleInputValue && (
              <Circle color="--system-colors-system-cyan" />
            )} */}
            </div>
          ) : (
            <div
              className={styles.inputContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <InputField
                ref={subtitleInputRef as React.RefObject<HTMLInputElement>}
                type="text"
                val={subtitleInputValue}
                onChange={(e) => setSubtitleInputValue(e.target.value)}
                onBlur={() => setEditing(null)}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.middleSide}>
        {editing !== "multi" ? (
          <div
            onClick={() => setEditing("multi")}
            className={styles.subtitleContainer}
          >
            <Headline
              text={multiInputValue + " x"}
              type="subHeadline"
              color="--text-secondary"
            />
          </div>
        ) : (
          <div
            className={styles.inputContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <InputField
              ref={multiInputRef as React.RefObject<HTMLInputElement>}
              type="number"
              val={multiInputValue}
              onChange={(e) => setSubtitleInputValue(e.target.value)}
              onBlur={() => setEditing(null)}
            />
          </div>
        )}
        <FlowText
          text={
            (totalAmount != null
              ? totalAmount?.toFixed(2)
              : 0.0
            ).toString() + " €"
          }
          type="bodyEmphasized"
          color={
            (totalAmount != null ? totalAmount : 0.0) >= 0
              ? "--system-colors-system-green"
              : "--system-colors-system-red"
          }
        />
      </div>

      <div className={styles.rightSide} onClick={onDetailClick}>
        <FlowText
          text="Detail"
          type="bodyEmphasized"
          color="--text-secondary"
        />
        <ChevronRight color={colorLabel} />
      </div>
    </div>
  );
}
