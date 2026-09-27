"use client";

import { FileText } from "lucide-react";

import type { EchoDocument } from "@/types/document";

interface DocumentWindowProps {
  document: EchoDocument;
}

export function DocumentWindow({ document }: DocumentWindowProps) {
  return (
    <div className="flex min-h-[420px] flex-col">
      <header className="flex h-10 items-center gap-3 border-b border-border bg-background-secondary px-3">
        <FileText className="size-3 text-primary" />

        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
          {document.category}
        </span>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <pre className="whitespace-pre-wrap font-mono text-[10px] leading-6 text-foreground">
          {document.content}
        </pre>
      </div>

      <footer className="flex items-center justify-between border-t border-border bg-background-secondary px-3 py-2">
        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
          {document.title}
        </span>

        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-echo-green">
          READ ONLY
        </span>
      </footer>
    </div>
  );
}
