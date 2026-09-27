import { EchoDesktop } from "@/components/echo/echo-desktop";
import { EchoScreenEffects } from "@/components/echo/echo-screen-effects";
import { EchoSession } from "@/components/echo/echo-session";

export default function GamePage() {
  return (
    <>
        <EchoDesktop />
        <EchoSession />
        <EchoScreenEffects />
    </>
  );
}