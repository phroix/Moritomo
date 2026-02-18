// packages/design-system/src/hooks/useTheme.ts
import { useSelector } from "react-redux";
import { semanticColors } from "../Colors";
import type { ColorMode } from "../Colors";

// Jede App injiziert ihren eigenen System-Mode-Resolver
export function createUseTheme(useSystemColorMode: () => ColorMode) {
  return function useTheme() {
    const storedMode = useSelector((state: any) => state.theme.mode);
    const systemMode = useSystemColorMode();

    const resolvedMode: ColorMode =
      storedMode === "system" ? systemMode : storedMode;

    return {
      mode: resolvedMode,
      colors: semanticColors[resolvedMode],
    };
  };
}
