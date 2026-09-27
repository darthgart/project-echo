'use client';

import { FolderOpen, HardDrive, Radio, Terminal } from "lucide-react";
import { EchoSystemStatus } from "./echo-system-status";
import { EchoTaskbar } from "./echo-taskbar";
import { useGameStore } from "@/game/state/game-store";
import { EchoWindowManager } from "./echo-window-manager";

const desktopItems = [
  {
    id: "personnel",
    label: "PERSONNEL",
    type: "PERSONNEL" as const,
    icon: FolderOpen,
  },
  {
    id: "research",
    label: "RESEARCH",
    type: "RESEARCH" as const,
    icon: FolderOpen,
  },
  {
    id: "security",
    label: "SECURITY",
    type: "SECURITY" as const,
    icon: FolderOpen,
  },
  {
    id: "incident",
    label: "INCIDENT",
    type: "INCIDENT" as const,
    icon: FolderOpen,
  },
  {
    id: "echo_core",
    label: "ECHO_CORE",
    type: "ECHO_CORE" as const,
    icon: HardDrive,
  },
  {
    id: "terminal",
    label: "TERMINAL",
    type: "TERMINAL" as const,
    icon: Terminal,
  },
  {
    id: "cameras",
    label: "CAMERAS",
    type: "CAMERAS" as const,
    icon: Radio,
  },
];

export function EchoDesktop() {
    const openWindow = useGameStore(
        (state) => state.openWindow
    );

  return (
    <div className="flex min-h-screen flex-col bg-background animate-echo-page-in">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-background-secondary px-4">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
            PROJECT ECHO
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
            LOCAL SYSTEM
          </span>
        </div>
        <EchoSystemStatus />
      </header>
      <main className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 p-6">
          <div className="grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {desktopItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => openWindow({id: item.id, type: item.type, title: item.label})}
                  className={[
                    "group flex h-24 flex-col items-center justify-center gap-3",
                    "border border-transparent",
                    "transition-all duration-150",
                    "hover:border-border",
                    "hover:bg-card",
                  ].join(" ")}
                >
                  <Icon
                    className={[
                      "size-5",
                      "text-muted-foreground",
                      "transition-colors",
                      "group-hover:text-primary",
                    ].join(" ")}
                    strokeWidth={1.25}
                  />
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground group-hover:text-primary">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              ECHO RESEARCH FACILITY
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-primary">
              SYSTEM READY_
            </p>
          </div>
        </div>
        <EchoWindowManager />
      </main>
      <EchoTaskbar />
    </div>
  );
}
