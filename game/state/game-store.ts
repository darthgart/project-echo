import { EchoWindowState, GameState } from "@/types/game";
import { EchoNotificationId } from "@/types/notification";
import { create } from "zustand";

interface GameActions {
  startSession: () => void;
  openWindow: (window: Omit<EchoWindowState, "isOpen" | "zIndex">) => void;
  closeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  openFile: (fileId: string) => void;
  discoverClue: (clueId: string) => void;
  showNotification: (notificationId: EchoNotificationId) => void;
  openNotification: () => void;
  dismissNotification: () => void
  resetGame: () => void;
}

type GameStore = GameState & GameActions;

const initialState: GameState = {
  sessionStartedAt: null,
  windows: [],
  activeWindowId: null,
  openFileIds: [],
  discoveredClues: [],
  activeNotificationId: null,
  notificationAvailableId: null,
  deliveredNotificationIds: [],
  dismissedNotificationsIds: []
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,
  startSession: () => {
    set((state) => {
      if(state.sessionStartedAt !== null) {
        return state;
      }
      return {sessionStartedAt: Date.now()}
    });
  },

  openWindow: (window) => {
    set((state) => {
      const existingWindow = state.windows.find((item) => item.id === window.id);
      const highestZIndex = state.windows.reduce((highest, item) => Math.max(highest, item.zIndex), 0);
      const nextZIndex = highestZIndex + 1;

      if (existingWindow) {
        return {
          windows: state.windows.map((item) =>
            item.id === window.id
              ? {
                  ...item,
                  isOpen: true,
                  zIndex: nextZIndex,
                }
              : item,
          ),
          activeWindowId: window.id
        };
      }

      return {
        windows: [
          ...state.windows,
          {
            ...window,
            isOpen: true,
            zIndex: nextZIndex,
          },
        ],
        activeWindowId: window.id
      };
    });
  },

  closeWindow: (windowId: string) => {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === windowId
          ? {
              ...window,
              isOpen: false
            }
          : window
      ),
      activeWindowId:
        state.activeWindowId === windowId ? null : state.activeWindowId
    }));
  },

  focusWindow: (windowId) => {
    set((state) => {
      const windowExists = state.windows.some((window) => window.id === windowId && window.isOpen);

      if (!windowExists) {
        return state;
      }

      const highestZIndex = state.windows.reduce((highest, window) => Math.max(highest, window.zIndex), 0);

      return {
        windows: state.windows.map((window) =>
          window.id === windowId
            ? {
                ...window,
                zIndex: highestZIndex + 1
              }
            : window
        ),
        activeWindowId: windowId
      };
    });
  },

  openFile: (fileId) => {
    set((state) => {
      if (state.openFileIds.includes(fileId)) {
        return state;
      }

      return {
        openFileIds: [...state.openFileIds, fileId]
      };
    });
  },

  discoverClue: (clueId) => {
    set((state) => {
      if (state.discoveredClues.includes(clueId)) {
        return state;
      }

      return {
        discoveredClues: [...state.discoveredClues, clueId]
      };
    });
  },

  showNotification: (notificationId: EchoNotificationId) => {
    set((state) => {
     if (state.deliveredNotificationIds?.includes(notificationId)) {
       return state;
     }
     return {
       notificationAvailableId: notificationId,
       deliveredNotificationIds: [...state.deliveredNotificationIds, notificationId],
     };
    });
  },

  openNotification: () => {
    set((state) => {
      if (!state.notificationAvailableId) {
        return state;
      }
      return {
        activeNotificationId: state.notificationAvailableId,
        notificationAvailableId: null
      };
    });
  },

  dismissNotification: () => {
    set((state) => {
      if (!state.activeNotificationId) {
        return state;
      }
      const notificationId = state.activeNotificationId;
      return {
        activeNotificationId: null,
        dismissedNotificationsIds: [
          ...state.dismissedNotificationsIds,
          notificationId
        ],
        sessionStartedAt: notificationId === 'session-start' && state.sessionStartedAt === null 
          ? Date.now() 
          : state.sessionStartedAt
      };
    });
  },

  resetGame: () => {
    set(initialState);
  },
}));
