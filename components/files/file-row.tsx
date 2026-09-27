"use client";

import {
  AlertTriangle,
  FileAudio,
  FileText,
  Folder,
  HardDrive,
  Lock,
  Video,
} from "lucide-react";

import type { EchoFile, EchoFileStatus, EchoFileType } from "@/types/file";

interface FileRowProps {
  file: EchoFile;
  onOpen: (file: EchoFile) => void;
}

const fileIcons: Record<EchoFileType, typeof Folder> = {
  folder: Folder,
  document: FileText,
  audio: FileAudio,
  video: Video,
  system: HardDrive,
};

const statusConfig: Record<
  EchoFileStatus,
  { label: string; className: string }
> = {
  available: {
    label: "OK",
    className: "text-echo-green",
  },
  locked: {
    label: "LOCKED",
    className: "text-echo-amber",
  },
  corrupted: {
    label: "CORRUPTED",
    className: "text-echo-error",
  },
  hidden: {
    label: "HIDDEN",
    className: "text-echo-text-muted",
  },
};

export function FileRow({ file, onOpen }: FileRowProps) {
  const Icon = fileIcons[file.type];
  const status = statusConfig[file.status];

  const isDisabled =
    file.status === "locked" ||
    file.status === "corrupted" ||
    file.status === "hidden";

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => {
        if (file.type === "folder") {
          onOpen(file);
        }
      }}
      onDoubleClick={() => onOpen(file)}
      className={[
        "group grid w-full grid-cols-[1fr_90px_110px]",
        "items-center gap-3",
        "border-b border-border/50",
        "px-3 py-2",
        "text-left",
        "transition-colors",
        isDisabled ? "cursor-not-allowed opacity-60" : "hover:bg-accent",
      ].join(" ")}
    >
      <div className="flex min-w-0 items-center gap-3">
        {isDisabled ? (
          file.status === "locked" ? (
            <Lock className="size-3 shrink-0 text-echo-amber" />
          ) : (
            <AlertTriangle className="size-3 shrink-0 text-echo-error" />
          )
        ) : (
          <Icon
            className={[
              "size-3 shrink-0",
              file.type === "folder"
                ? "text-echo-amber"
                : "text-muted-foreground",
              "group-hover:text-primary",
            ].join(" ")}
          />
        )}

        <span
          className={[
            "truncate font-mono text-[10px]",
            isDisabled ? "text-muted-foreground" : "text-foreground",
            "group-hover:text-primary",
          ].join(" ")}
        >
          {file.name}
        </span>
      </div>

      <span
        className={["font-mono text-[9px] uppercase", status.className].join(
          " ",
        )}
      >
        {status.label}
      </span>

      <span className="font-mono text-[9px] text-muted-foreground">
        {file.size ?? "--"}
      </span>
    </button>
  );
}
