"use client";

import { useGameStore } from "@/game/state/game-store";
import { useEffect } from "react";
import { EchoNotification } from "./echo-notification";
import { EchoNotificationScheduler } from "./echo-notification-scheduler";

export function EchoSession() {
  const activeNotificationId = useGameStore(
    (state) => state.activeNotificationId,
  );
  const notificationAvailableId = useGameStore(
    (state) => state.notificationAvailableId,
  );
  const showNotification = useGameStore((state) => state.showNotification);

  useEffect(() => {
    if (activeNotificationId || notificationAvailableId) { return; }
    
    const timeout = window.setTimeout(() => {
      showNotification("session-start");
    }, 3000);

    return () => window.clearTimeout(timeout);
    
  }, [activeNotificationId, notificationAvailableId, showNotification]);

  return (
    <>
      <EchoNotificationScheduler />
      <EchoNotification />
    </>
  );
}
