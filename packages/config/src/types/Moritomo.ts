type App = "moritomo" | "zaimu";
export type Mode = "regular" | "debug";

export interface ModeState {
  mode: Mode;
  app: App;
}