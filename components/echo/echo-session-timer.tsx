"use client";

import { useEffect, useState } from "react";

import { useGameStore } from "@/game/state/game-store";

function formatElapsedTime(elapsedMilliseconds: number): string {
  const totalSeconds = Math.floor(elapsedMilliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

export function EchoSessionTimer() {
  const sessionStartedAt = useGameStore((state) => state.sessionStartedAt);

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (sessionStartedAt === null) {
      setElapsedTime(0);
      return;
    }

    const updateElapsedTime = () => {
      setElapsedTime(Date.now() - sessionStartedAt);
    };

    updateElapsedTime();

    const interval = window.setInterval(updateElapsedTime, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [sessionStartedAt]);

  return <span className="text-primary">{formatElapsedTime(elapsedTime)}</span>;
}
