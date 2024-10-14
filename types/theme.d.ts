// src/types/theme.d.ts
import { MD3Colors } from "react-native-paper";

declare global {
  namespace ReactNativePaper {
    interface MD3Colors {
      surfaceContainerLow: string;
    }
  }
}
