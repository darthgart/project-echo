import { EchoNotificationId } from "./notification";

export type EchoWindowType =
  | "PERSONNEL"
  | "RESEARCH"
  | "SECURITY"
  | "INCIDENT"
  | "ECHO_CORE"
  | "TERMINAL"
  | "CAMERAS"
  | "DOCUMENT";

export interface EchoWindowState {
  id: string;
  type: EchoWindowType;
  title: string;
  isOpen: boolean;
  zIndex: number;
}

export interface GameState {
  sessionStartedAt: number | null;
  windows: EchoWindowState[];
  activeWindowId: string | null;
  openFileIds: string[];
  discoveredClues: string[];
  activeNotificationId: EchoNotificationId | null;
  notificationAvailableId: EchoNotificationId | null;
  deliveredNotificationIds: EchoNotificationId[];
  dismissedNotificationsIds: EchoNotificationId[];
}
