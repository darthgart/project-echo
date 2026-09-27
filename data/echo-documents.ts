import type { EchoDocument } from "@/types/document";

export const echoDocuments: EchoDocument[] = [
  {
    id: "dr-harris",
    title: "DR_HARRIS.DAT",
    category: "PERSONNEL RECORD",
    content: `NAME       : HARRIS, MICHAEL
ID         : ECHO-004
ROLE       : LEAD RESEARCHER
STATUS     : DECEASED

LAST ACCESS: 2006-11-14 02:31

--------------------------------------------

PERSONNEL NOTES

Dr. Michael Harris was assigned as lead
researcher for Project ECHO.

He was responsible for the development of
the memory reconstruction protocol.

--------------------------------------------

INCIDENT NOTES

Subject displayed unusual resistance during
the final memory reconstruction procedure.

Further evaluation was scheduled for:

03:17

--------------------------------------------

FILE STATUS: ARCHIVED
`,
  },
];

export function getEchoDocument(documentId: string): EchoDocument | undefined {
  return echoDocuments.find((document) => document.id === documentId);
}
