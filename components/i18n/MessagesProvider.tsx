"use client";

import { createContext, useContext } from "react";
import type { Messages } from "@/lib/messages";

const MessagesContext = createContext<Messages | null>(null);

export function MessagesProvider({
  messages,
  children,
}: {
  messages: Messages;
  children: React.ReactNode;
}) {
  return <MessagesContext.Provider value={messages}>{children}</MessagesContext.Provider>;
}

export function useMessages(): Messages {
  const v = useContext(MessagesContext);
  if (!v) {
    throw new Error("useMessages must be used within MessagesProvider");
  }
  return v;
}
