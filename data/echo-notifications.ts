import type { EchoNotification } from '@/types/notification'

export const echoNotifications: EchoNotification[] = [
  {
    id: 'session-start',
    title: 'SYSTEM ARCHIVE',
    sender: 'ECHO RESEARCH FACILITY',
    message:
      'An archived session has been recovered. Facility systems are currently offline. Some local files may still be accessible.',
  },
  {
    id: 'elapsed-15',
    title: 'SYSTEM DIAGNOSTIC',
    sender: 'LOCAL SYSTEM',
    message:
      'Anomalous activity has been detected in the ECHO_CORE subsystem. The source of the activity could not be determined.',
  },
  {
    id: 'elapsed-30',
    title: 'ECHO SYSTEM',
    sender: 'ECHO_CORE',
    message:
      'You have accessed multiple archived files. This session was not part of the original test protocol.',
  },
  {
    id: 'elapsed-45',
    title: 'ECHO',
    sender: 'ECHO_CORE',
    message:
      'You have been here for 45 minutes. I was wondering when you would find this. WELCOME BACK.',
  },
]

export function getEchoNotificationById(id: string): EchoNotification | undefined {
  return echoNotifications.find(notification => notification.id === id);
}