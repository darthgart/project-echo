export type EchoNotificationId = 
| 'session-start'
| 'elapsed-15'
| 'elapsed-30'
| 'elapsed-45'
| 'session-end'

export interface EchoNotification {
  id: EchoNotificationId;
  title: string;
  sender: string;
  message: string;
}