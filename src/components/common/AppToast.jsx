"use client";

import { Toaster } from "sonner";

export default function AppToast() {
  return (
    <Toaster
      position="top-right"
      visibleToasts={4}
      expand={false}
      duration={3000}
      gap={10}
    />
  );
}
