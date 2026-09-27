import { label } from "motion/react-client";
import React from "react";

interface EchoSystemStatusProps {
  status?: "online" | "offline" | "warning";
}

const statusConfig = {
    online: {
        label: "SYSTEM ONLINE",
        color: "text-echo-green"
    },
    offline: {
        label: "SYSTEM OFFLINE",
        color: "text-echo-error"
    },
    warning: {
        label: "SYSTEM WARNING",
        color: "text-echo-amber"
    }
}

export function EchoSystemStatus({status = "online"}: EchoSystemStatusProps) {
  const config = statusConfig[status];
  
  return (
    <div className={[
        'flex items-center gap-2',
        'font-mono text-[10px]',
        'uppercase tracking-[0.12em]',
        config.color,
      ].join(' ')}>
        <span className='animate-pulse'>●</span>
        <span>{config.label}</span>
      </div>
  )
}