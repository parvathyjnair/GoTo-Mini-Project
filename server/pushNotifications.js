// const webpush = require('web-push');
import webpush from 'web-push';

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  'mailto:haniroshan2002@gmail.com',
  publicVapidKey,
  privateVapidKey
);

async function sendPushNotification(subscription, payload) {
  await webpush.sendNotification(subscription, JSON.stringify(payload));
}

async function sendNotifications(subObjects, notification) {
  const notificationPromises = subObjects.map(subObject => {
    if (subObject?.endpoint) {
      return sendPushNotification(subObject, notification).catch(err => console.log(err));
    }
    return Promise.resolve(null); // For subObjects without an endpoint or when not needed
  });

  await Promise.allSettled(notificationPromises);
}

// module.exports = sendPushNotification;
// export default sendPushNotification;
export default sendNotifications;
