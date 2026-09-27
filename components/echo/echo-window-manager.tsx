"use client";

import { getEchoDocument } from "@/data/echo-documents";
import { useGameStore } from "@/game/state/game-store";
import type { EchoWindowType } from "@/types/game";
import type { EchoFile } from "@/types/file";

import { FileSystemWindow } from "@/components/files/file-system-window";

import { EchoWindow } from "./echo-window";
import { DocumentWindow } from "../documents/documents-window";

export function EchoWindowManager() {
  const windows = useGameStore((state) => state.windows);
  const openWindow = useGameStore((state) => state.openWindow);

  const openWindows = windows.filter((window) => window.isOpen);

  const handleOpenFile = (file: EchoFile) => {
    const document = getEchoDocument(file.id);

    if (!document) {
      return;
    }

    openWindow({
      id: `document-${file.id}`,
      type: "DOCUMENT",
      title: file.name,
    });
  };

  const renderWindowContent = (windowType: EchoWindowType) => {
    switch (windowType) {
      case "PERSONNEL":
        return (
          <FileSystemWindow
            initialFolderId="personnel"
            onOpenFile={handleOpenFile}
          />
        );

      case "RESEARCH":
        return (
          <FileSystemWindow
            initialFolderId="research"
            onOpenFile={handleOpenFile}
          />
        );

      case "SECURITY":
        return (
          <FileSystemWindow
            initialFolderId="security"
            onOpenFile={handleOpenFile}
          />
        );

      case "INCIDENT":
        return (
          <FileSystemWindow
            initialFolderId="incident"
            onOpenFile={handleOpenFile}
          />
        );

      case "ECHO_CORE":
        return (
          <FileSystemWindow
            initialFolderId="echo-core"
            onOpenFile={handleOpenFile}
          />
        );

      case "DOCUMENT":
        return null;

      default:
        return (
          <div className="p-6">
            <p className="font-mono text-sm text-primary">WINDOW READY_</p>
          </div>
        );
    }
  };

  return (
    <>
      {openWindows.map((window) => {
        if (window.type === "DOCUMENT") {
          const documentId = window.id.replace("document-", "");
          const document = getEchoDocument(documentId);

          if (!document) {
            return null;
          }

          return (
            <EchoWindow key={window.id} id={window.id} title={window.title}>
              <DocumentWindow document={document} />
            </EchoWindow>
          );
        }

        return (
          <EchoWindow key={window.id} id={window.id} title={window.title}>
            {renderWindowContent(window.type)}
          </EchoWindow>
        );
      })}
    </>
  );
}
