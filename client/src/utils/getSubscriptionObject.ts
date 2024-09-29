export default async function getSubscriptionObject(email: string) {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      // Register a service worker
      let registration = await navigator.serviceWorker.register('/service-worker.js', { scope: '/' });

      // Update the service worker and get the subscription
      // const subscription = await registration.update().then(registration => registration.pushManager.getSubscription());
      await registration.update()
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        // Subscription exists, send it to the server
        console.log(subscription);
        let res = await addSubscriptionToServer(subscription, email);
        return res;
      } else {
        // Subscription doesn't exist, subscribe the user
        const newSubscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.REACT_APP_PUBLIC_VAPID_KEY
        });

        // Send the new subscription to the server
        // console.log(newSubscription);
        let res = await addSubscriptionToServer(newSubscription, email);
        return res;
      }
    } catch (error) {
      console.error('Error occurred while registering service worker:', error);
      return false;
    }
  }
  return false;
}

async function addSubscriptionToServer(subscription: PushSubscription, email: string) {
  const data = { email, subscription };
  const serverURL = process.env.REACT_APP_SERVER_URL;

  try {
    let res = await fetch(`${serverURL}/userDetails/addSubscription`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (res.status === 200) return true;
    else {
      console.log(res);
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}