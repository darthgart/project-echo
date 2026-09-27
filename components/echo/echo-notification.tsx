"use client";

import { getEchoNotificationById } from "@/data/echo-notifications";
import { useGameStore } from "@/game/state/game-store";
import { Bell, X } from "lucide-react";

export function EchoNotification() {
  const activeNotficationId = useGameStore(
    (state) => state.activeNotificationId,
  );
  const dismissNotification = useGameStore(
    (state) => state.dismissNotification,
  );

  if (!activeNotficationId) {
    return null;
  }

  const notification = getEchoNotificationById(activeNotficationId);

  if (!notification) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-9990 flex items-start justify-center px-4 pt-16">
      <div className="w-full max-w-lg border border-border bg-card shadow-2xl">
        <header className="flex items-center justify-between border-b border-border bg-background-secondary px-4 py-3">
          <div className="flex items-center gap-3">
            <Bell className="size-4 text-primary" />

            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
              NEW NOTIFICATION
            </span>
          </div>

          <button
            type="button"
            onClick={dismissNotification}
            className="text-muted-foreground transition-colors hover:text-destructive"
            aria-label="Close notification"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="space-y-6 p-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {notification.sender}
            </p>

            <h2 className="mt-2 font-mono text-sm uppercase tracking-[0.1em] text-foreground">
              {notification.title}
            </h2>
          </div>

          <div className="border-l border-primary/40 pl-4">
            <p className="font-mono text-xs leading-6 text-muted-foreground">
              {notification.message}
            </p>
          </div>

          <div className="flex justify-end border-t border-border pt-4">
            <button
              type="button"
              onClick={dismissNotification}
              className={[
                "border border-border",
                "px-4 py-2",
                "font-mono text-[10px]",
                "uppercase tracking-[0.15em]",
                "text-primary",
                "transition-colors",
                "hover:border-primary",
                "hover:bg-primary/5",
              ].join(" ")}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
