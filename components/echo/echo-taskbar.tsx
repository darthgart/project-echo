import { Terminal } from "lucide-react";
import { Separator } from "../ui/separator";
import { EchoNotificationCenter } from "./echo-notification-center";
import { EchoSessionTimer } from "./echo-session-timer";

export function EchoTaskbar({ sessionTime = "00:00:00" }) {
  return (
    <footer className="flex h-10 items-center justify-between border-t border-border bg-background-secondary px-3">
      <div className="flex h-full items-center gap-3">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
          <Terminal className="size-3" />
          <span>TERMINAL</span>
        </div>
        <Separator orientation="vertical" className="h-4" />
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          FILE SYSTEM
        </span>
      </div>
      <div className="flex items-center gap-4 font-mono text-[10px]">
        <EchoNotificationCenter />
        <Separator orientation="vertical" className="h-4" />
        <span className="text-muted-foreground">SESSION</span>
        <span className="text-primary"><EchoSessionTimer /></span>
      </div>
    </footer>
  );
}
