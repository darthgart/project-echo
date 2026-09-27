"use client";

import { useEffect, useState } from "react";

interface EchoBootProps {
  onComplete: () => void;
}

const bootMessages = [
  "Initializing ECHO Core...",
  "Loading system modules...",
  "Establishing secure connections...",
  "System online.",
];

export function EchoBoot({ onComplete }: EchoBootProps) {
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let messageIndex = 0;

    const interval = window.setInterval(() => {
      const message = bootMessages[messageIndex];

      if (!message) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          setCompleted(true);

          window.setTimeout(() => {
            onComplete();
          }, 500);
        }, 500);
        return;
      }

      setVisibleMessages((current) => [...current, message]);
      messageIndex += 1;
    }, 350);

    return () => {
      window.clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div
      className={[
        "fixed inset-0 z-50",
        "flex items-center justify-center",
        "bg-echo-background",
        "transition-opacity duration-500",
        completed ? "opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div className="w-full max-w-xl px-6">
        <div className="space-y-2 font-mono text-xs">
          {visibleMessages.map((message, index) => (
            <div key={`${message}-${index}`} className="flex gap-3">
              <span className="text-echo-text-muted">
                [{String(index + 1).padStart(2, "0")}]
              </span>

              <span className="text-echo-green">{message}</span>
            </div>
          ))}

          {visibleMessages.length === bootMessages.length && (
            <div className="pt-4 text-echo-green">SYSTEM READY_</div>
          )}
        </div>
      </div>
    </div>
  );
}
