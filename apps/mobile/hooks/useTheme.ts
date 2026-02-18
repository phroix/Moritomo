// apps/mobile/src/hooks/useTheme.ts
import { useColorScheme } from 'react-native';
import { createUseTheme } from '@repo/ui/useTheme';

function useSystemColorMode() {
  const scheme = useColorScheme();
  return scheme === 'dark' ? 'dark' : 'light';
}

export const useTheme = createUseTheme(useSystemColorMode);