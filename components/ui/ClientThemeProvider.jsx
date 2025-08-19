"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ClientThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
