export type EchoFileType = "folder" | "document" | "audio" | "video" | "system";

export type EchoFileStatus = "available" | "locked" | "corrupted" | "hidden";

export interface EchoFile {
  id: string;
  name: string;
  type: EchoFileType;
  status: EchoFileStatus;
  parentId: string | null;
  description?: string;
  size?: string;
  modifiedAt?: string;
}
