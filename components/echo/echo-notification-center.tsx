"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useGameStore } from "@/game/state/game-store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getEchoNotificationById } from "@/data/echo-notifications";

export function EchoNotificationCenter() {
  const notificationAvailableId = useGameStore(
    (state) => state.notificationAvailableId,
  );

  const openNotification = useGameStore((state) => state.openNotification);

  const notification = notificationAvailableId
    ? getEchoNotificationById(notificationAvailableId)
    : null;

  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!notificationAvailableId) {
      setShowHint(false);
      return;
    }

    setShowHint(true);

    const timeout = window.setTimeout(() => {
      setShowHint(false);
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [notificationAvailableId]);

  return (
    <div className="relative">
      {showHint && (
        <div
          className={[
            "absolute bottom-[calc(100%+10px)] right-0",
            "w-64",
            "border border-primary/40",
            "bg-card",
            "px-4 py-3",
            "shadow-[0_0_20px_var(--echo-glow)]",
            "animate-in fade-in slide-in-from-bottom-2",
          ].join(" ")}
        >
          <div className="flex items-start gap-3">
            <Bell className="mt-0.5 size-4 shrink-0 text-primary" />

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
                NUEVO MENSAJE
              </p>

              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
                Tienes una nueva notificación
              </p>
            </div>
          </div>
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={[
              "group relative flex h-full items-center gap-2 px-3",
              "font-mono text-[10px] uppercase tracking-[0.12em]",
              "transition-all duration-200",
              notificationAvailableId
                ? "animate-echo-notification-pulse text-primary border border-primary/50"
                : "text-muted-foreground",
              notificationAvailableId
                ? "shadow-[0_0_12px_var(--echo-glow)]"
                : "",
              "hover:text-primary",
            ].join(" ")}
            aria-label="Notifications"
          >
            <Bell
              className={[
                "size-3.5 transition-all duration-200",
                notificationAvailableId
                  ? "animate-pulse drop-shadow-[0_0_6px_var(--echo-green)]"
                  : "",
              ].join(" ")}
            />

            {notificationAvailableId && (
              <>
                <span className={["text-primary", "animate-pulse"].join(" ")}>
                  NEW
                </span>
              </>
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-80 border-border bg-card">
          <DropdownMenuLabel className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            SYSTEM NOTIFICATIONS
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {notification ? (
            <button
              type="button"
              onClick={openNotification}
              className="w-full px-3 py-3 text-left transition-colors hover:bg-accent"
            >
              <div className="flex items-start gap-3">
                <Bell className="mt-0.5 size-3 shrink-0 text-primary" />

                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-primary">
                    {notification.sender}
                  </p>

                  <p className="mt-1 font-mono text-[10px] uppercase text-foreground">
                    {notification.title}
                  </p>

                  <p className="mt-2 line-clamp-2 font-mono text-[9px] leading-4 text-muted-foreground">
                    {notification.message}
                  </p>
                </div>
              </div>
            </button>
          ) : (
            <div className="px-3 py-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                NO NEW NOTIFICATIONS
              </p>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
