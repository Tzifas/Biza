"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      theme="light"
      expand={false}
      richColors
      closeButton
      style={{
        zIndex: 9999,
      }}
    />
  );
}

export { toast } from "sonner";
