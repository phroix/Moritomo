"use client";
import { useMemo, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import AddButton from "../../../components/AddButton/AddButton";
import BackButton from "../../../components/BackButton/BackButton";
import { useRouter } from "next/navigation";
import SumLine from "../../../components/SumLine/SumLine";
import { useCreateTransactionMutation, useDeleteTransactionMutation, useGetTransactionsQuery } from "@repo/rtk/shared/querys/zaimu/Transactions.ts";
import TransactionLine from "../../../components/TransactionLine/TransactionLine";
import Headline from "../../../components/Headline/Headline";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@repo/rtk/webHooks";
import { OverviewType } from "@repo/config/types/Overviews.ts";

const DEFAULT_QUERY = {
  date: "2025-10",
  overview_id: 1,
  from: 0,
  to: 10,
};

const DEFAULT_TRANSACTIONS = [
  {
    id: 1,
    name: "Lohn",
    amount: 1000,
    type: "positive",
    date: "2025-10-01",
    overview_id: 1,
  },
  {
    id: 2,
    name: "Miete",
    amount: -500,
    type: "negative",
    date: "2025-10-01",
    overview_id: 1,
  },
  {
    id: 3,
    name: "Essen",
    amount: -100,
    type: "negative",
    date: "2025-10-01",
    overview_id: 1,
  },
  {
    id: 4,
    name: "Transport",
    amount: -50,
    type: "negative",
    date: "2025-10-01",
    overview_id: 1,
  },
  {
    id: 5,
    name: "Freizeit",
    amount: -100,
    type: "negative",
    date: "2025-10-01",
    overview_id: 1,
  },
  {
    id: 6,
    name: "Shopping",
    amount: -200,
    type: "negative",
    date: "2025-10-01",
    overview_id: 1,
  },
  {
    id: 7,
    name: "Kleidung",
    amount: -100,
    type: "negative",
    date: "2025-10-01",
    overview_id: 1,
  },
];

export default function Transaction() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedOverview } = useAppSelector((state) => state.zaimu);
  const { selectedDate } = useAppSelector((state) => state.zaimu);

  const [dateValue, setDateValue] = useState({ year: 2025, month: 9 });

  const queryParams = {
    id: selectedOverview?.id,
    date: selectedDate,
    from: DEFAULT_QUERY?.from,
    to: DEFAULT_QUERY?.to,
    // ...(selectedOverview.keep_data && selectedOverview.date ? { date: selectedOverview.date } : {}),
    keep_data: selectedOverview?.keep_data,
    type: selectedOverview?.type as OverviewType,
  };

  const {
    data: transactionsData,
    refetch: refetchTransactions,
    isLoading: isLoadingTransactionsFetch,
    error: errorTransactionsFetch,
  } = useGetTransactionsQuery(queryParams);

  const [createTransaction, { isLoading: isCreateTransactionLoading }] =
    useCreateTransactionMutation();


  const transactions = useMemo(
    () =>
      transactionsData?.map((transaction) => ({
        id: transaction.id,
        name: transaction.name,
        amount: transaction.amount,
        type: transaction.type,
        date: transaction.date,
      })),
    [transactionsData]
  );

  const sumAmount = useMemo(() => {
    if (!transactions || transactions.length === 0) return 0;
    return transactions.reduce((sum, transaction) => {
      if (transaction.type === "positive") {
        return sum + transaction.amount;
      } else if (transaction.type === "negative") {
        return sum - transaction.amount;
      }
      return sum;
    }, 0);
  }, [transactions]);

  // console.log(selectedOverview);

  const divRef = useRef<HTMLDivElement>(null);

  // console.log(overviews);
  return (
    <div className={styles.page}>
      <div className={styles.headerContainer}>
        <BackButton
          text="Moritomo"
          color="--system-colors-system-cyan"
          onClick={() => {
            router.push("/zaimu/overview");
          }}
        />
      </div>
      <div className={styles.allOverviewContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.mainHeader}>
            <Headline
              text={selectedOverview.name ?? ""}
              type="titleRegular"
              color="--text-primary"
            />
            <AddButton
              text="Hinzufügen"
              color="--system-colors-system-cyan"
              onClick={async () => {
                await createTransaction({
                  name: "Neue Transaktion",
                  amount: 0,
                  type: "positive",
                  date: selectedDate,
                  overview_id: selectedOverview.id,
                });
              }}
            />
          </div>
          <div className={styles.sumContainer}>
            <SumLine title="Gesamt:" amount={sumAmount.toFixed(2)} />
          </div>
          <div ref={divRef} className={styles.overviewContainer}>
            {transactions?.map((transaction) => (
              <TransactionLine
                key={transaction.id}
                title={transaction.name}
                date={transaction.date}
                id={transaction.id}
                type={transaction.type}
                amount={transaction.amount}
                overview_id={DEFAULT_QUERY.overview_id}
                onClick={() => {}}
                isInFocus={false}
                onAmountChange={() => {}}
                onChangeTitles={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
