"use client";

import { useEffect } from "react";
import { useGameStore } from "@/game/state/game-store";

/**
const notificationSchedule = [
  {
    id: "elapsed-15" as const,
    delay: 15 * 60 * 1000
  },
  {
    id: "elapsed-30" as const,
    delay: 30 * 60 * 1000
  },
  {
    id: "elapsed-45" as const,
    delay: 45 * 60 * 1000
  },
];
*/

const notificationSchedule = [
  {
    id: 'elapsed-15' as const,
    delay: 10 * 1000,
  },
  {
    id: 'elapsed-30' as const,
    delay: 20 * 1000,
  },
  {
    id: 'elapsed-45' as const,
    delay: 30 * 1000,
  },
]


export function EchoNotificationScheduler() {
  const sessionStartedAt = useGameStore((state) => state.sessionStartedAt);

  const activeNotificationId = useGameStore(
    (state) => state.activeNotificationId,
  );

  const notificationAvailableId = useGameStore(
    (state) => state.notificationAvailableId,
  );

  const deliveredNotificationIds = useGameStore(
    (state) => state.deliveredNotificationIds,
  );

  const showNotification = useGameStore((state) => state.showNotification);

  useEffect(() => {
    if (sessionStartedAt === null) {
      return;
    }

    const checkNotifications = () => {
      const elapsedTime = Date.now() - sessionStartedAt;

      if (activeNotificationId || notificationAvailableId) {
        return;
      }

      const nextNotification = notificationSchedule.find(
        (notification) =>
          elapsedTime >= notification.delay &&
          !deliveredNotificationIds.includes(notification.id)
      );

      if (nextNotification) {
        showNotification(nextNotification.id);
      }
    };

    checkNotifications();

    const interval = window.setInterval(checkNotifications, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [
    sessionStartedAt,
    activeNotificationId,
    notificationAvailableId,
    deliveredNotificationIds,
    showNotification
  ]);

  return null;
}
