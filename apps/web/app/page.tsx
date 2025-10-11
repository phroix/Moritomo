"use client";
import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { colors } from "@repo/ui/colors";
import { useAppSelector, useAppDispatch } from "@repo/rtk/webHooks";
import { updateLang } from "@repo/rtk/lang";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useLoginMutation, useLogoutMutation } from "@repo/rtk/auth";
import { updateMoritomoState } from "@repo/rtk/shared/slices/Moritomo.ts";

const email = "phirith01@proton.me";
const password = "phirith";

export default function Home() {
  const dispatch = useAppDispatch();
  const { selectedLang, de, en } = useAppSelector((state) => state.lang);
  const { authStatus } = useAppSelector((state) => state.moritomo);
  const { theme, setTheme } = useTheme();

  console.log(authStatus);

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  return (
    <div className={styles.page}>
      {authStatus === "nonAuthenticated" && (
        <>
          <button
            onClick={async () => {
              try {
                const result = await login({
                  email: email,
                  password: password,
                });
                if (result.data) {
                  console.log(result.data.session);
                  dispatch(
                    updateMoritomoState({
                      session: result.data.session,
                      authStatus: "authenticated",
                    })
                  ); // push("/");
                }
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Login
          </button>
          <button
            onClick={async () => {
              try {
                const result = await logout();
                if (result.data) {
                  console.log(result.data);
                  // dispatch(updateMoritomoState(result.data));
                  // push("/");
                }
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Logout
          </button>
        </>
      )}
      {authStatus === "authenticated" && (
        <>
          <Link href="/zaimu">
            <p>Zaimu</p>
          </Link>
          {theme === "dark" ? (
            <p onClick={() => setTheme("light")}>Light</p>
          ) : (
            <p onClick={() => setTheme("dark")}>Dark</p>
          )}
        </>
      )}
    </div>
  );
}
