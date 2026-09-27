import type { ReactNode } from "react";
import { X } from "lucide-react";

import { useGameStore } from "@/game/state/game-store";

interface EchoWindowProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function EchoWindow({ id, title, children }: EchoWindowProps) {
  const closeWindow = useGameStore((state) => state.closeWindow);
  const focusWindow = useGameStore((state) => state.focusWindow);

  const windowState = useGameStore((state) =>
    state.windows.find((window) => window.id === id),
  );

  if (!windowState) {
    return null;
  }

  return (
    <section
      onMouseDown={() => focusWindow(id)}
      style={{ zIndex: windowState.zIndex }}
      className={[
        "absolute",
        "left-1/2 top-1/2",
        "-translate-x-1/2 -translate-y-1/2",
        "w-[min(90vw,720px)]",
        "max-h-[80vh]",
        "overflow-hidden",
        "border border-border",
        "bg-card",
        "shadow-2xl",
      ].join(" ")}
    >
      <header className="flex h-10 items-center justify-between border-b border-border bg-background-secondary px-3">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 bg-primary shadow-[0_0_8px_var(--echo-glow-strong)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground">
            {title}
          </span>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            closeWindow(id);
          }}
          className={[
            "flex size-6 items-center justify-center",
            "border border-transparent",
            "text-muted-foreground",
            "transition-colors",
            "hover:border-destructive",
            "hover:text-destructive",
          ].join(" ")}
          aria-label={`Close ${title}`}
        >
          <X className="size-3" />
        </button>
      </header>

      <div className="max-h-[calc(80vh-40px)] overflow-auto">{children}</div>
    </section>
  );
}
