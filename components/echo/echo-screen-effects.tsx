import { CRTOverlay } from "./crt-overlay";
import { Scanlines } from "./scanlines";

export function EchoScreenEffects() {
  return (
    <>
      <CRTOverlay />
      <Scanlines />
    </>
  );
}
