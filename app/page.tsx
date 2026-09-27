"use client";

import { useCallback, useState } from "react";

import { EchoBoot } from "@/components/echo/echo-boot";
import { Button } from "@/components/ui/button";
import { EchoScreenEffects } from "@/components/echo/echo-screen-effects";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [booting, setBooting] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooting(false);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <EchoScreenEffects />

      {transitioning && (
        <div
          className={[
            "fixed inset-0 z-[10000]",
            "pointer-events-none",
            "bg-echo-background",
            "animate-echo-system-transition"
          ].join(" ")}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-3 text-center font-mono">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                ESTABLISHING LOCAL CONNECTION
              </p>

              <p className="text-xs uppercase tracking-[0.2em] text-primary">
                ACCESSING ECHO SYSTEM_
              </p>
            </div>
          </div>
        </div>
      )}
      {booting && <EchoBoot onComplete={handleBootComplete} />}

      <div className="relative flex min-h-screen items-center justify-center px-6 py-12">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          <div className="mb-10 space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              ECHO RESEARCH FACILITY
            </p>

            <h1 className="font-mono text-4xl font-semibold uppercase tracking-[0.15em] text-primary sm:text-6xl">
              Project ECHO
            </h1>

            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              The experiment never existed
            </p>
          </div>

          <div className="mb-10 w-full max-w-lg border border-border bg-card/80 p-6 backdrop-blur-sm">
            <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                System Status
              </span>

              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
                ● Ready
              </span>
            </div>

            <div className="space-y-2 text-left font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-muted-foreground">CORE</span>

                <span className="text-primary">ONLINE</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">MEMORY</span>

                <span className="text-primary">OK</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">SECURITY</span>

                <span className="text-echo-amber">DEGRADED</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">NETWORK</span>

                <span className="text-echo-text-muted">OFFLINE</span>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="min-w-56 font-mono uppercase tracking-[0.15em]"
            onClick={() => {
              setTransitioning(true);
              window.setTimeout(() => {
                router.push("/game");
              }, 700);
            }}
          >
            Begin Session
          </Button>

          <div className="mt-12 space-y-1 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            <p>PROJECT ECHO // INTERNAL SYSTEM</p>
            <p>© 1998–2006 ECHO RESEARCH DIVISION</p>
          </div>
        </div>
      </div>
    </main>
  );
}
