"use client";

import { ArrowUp, HardDrive } from "lucide-react";
import { useMemo, useState } from "react";

import { echoFiles } from "@/data/echo-files";
import type { EchoFile } from "@/types/file";

import { FileRow } from "./file-row";

interface FileSystemWindowProps {
  initialFolderId?: string;
  onOpenFile?: (file: EchoFile) => void;
}

export function FileSystemWindow({
  initialFolderId = "project-echo",
  onOpenFile,
}: FileSystemWindowProps) {
  const [currentFolderId, setCurrentFolderId] = useState(initialFolderId);

  const currentFolder = echoFiles.find(
    (file) => file.id === currentFolderId && file.type === "folder",
  );

  const currentFiles = useMemo(
    () =>
      echoFiles.filter(
        (file) => file.parentId === currentFolderId && file.status !== "hidden",
      ),
    [currentFolderId],
  );

  const parentFolder = currentFolder
    ? echoFiles.find(
        (file) => file.id === currentFolder.parentId && file.type === "folder",
      )
    : null;

  const handleOpenFile = (file: EchoFile) => {
    if (file.status !== "available") {
      return;
    }

    if (file.type === "folder") {
      setCurrentFolderId(file.id);
      return;
    }

    onOpenFile?.(file);
  };

  return (
    <div className="flex min-h-[420px] flex-col">
      <div className="flex h-10 items-center gap-2 border-b border-border bg-background-secondary px-3">
        <button
          type="button"
          disabled={!parentFolder}
          onClick={() => {
            if (parentFolder) {
              setCurrentFolderId(parentFolder.id);
            }
          }}
          className={[
            "flex size-6 items-center justify-center",
            "border border-transparent",
            "text-muted-foreground",
            "transition-colors",
            parentFolder
              ? "hover:border-border hover:text-primary"
              : "cursor-not-allowed opacity-30",
          ].join(" ")}
          aria-label="Go to parent folder"
        >
          <ArrowUp className="size-3" />
        </button>

        <div className="h-4 w-px bg-border" />

        <HardDrive className="size-3 text-primary" />

        <span className="truncate font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
          /PROJECT_ECHO
          {currentFolder &&
            currentFolder.id !== "project-echo" &&
            `/${currentFolder.name}`}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_90px_110px] gap-3 border-b border-border px-3 py-2">
        <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
          NAME
        </span>

        <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
          STATUS
        </span>

        <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
          SIZE
        </span>
      </div>

      <div className="flex-1 overflow-auto">
        {currentFiles.length > 0 ? (
          currentFiles.map((file) => (
            <FileRow key={file.id} file={file} onOpen={handleOpenFile} />
          ))
        ) : (
          <div className="flex h-40 items-center justify-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              DIRECTORY EMPTY
            </p>
          </div>
        )}
      </div>

      <footer className="flex items-center justify-between border-t border-border bg-background-secondary px-3 py-2">
        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
          {currentFiles.length} ITEMS
        </span>

        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
          LOCAL FILE SYSTEM
        </span>
      </footer>
    </div>
  );
}
