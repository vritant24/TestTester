export default function () {
    var endpoint;
    var key;
    var authSecret;

    // Register a Service Worker.
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
    // Use the PushManager to get the user's subscription to the push service.
    return registration.pushManager.getSubscription()
    .then(function(subscription) {
        // If a subscription was found, return it.
        if (subscription) {
        return subscription;
        }

        // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
        // send notifications that don't have a visible effect for the user).
        return registration.pushManager.subscribe({ userVisibleOnly: true });
    });
    }).then(function(subscription) {
    // Retrieve the user's public key.
    var rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
    key = rawKey ?
            btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) :
            '';
    var rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : '';
    authSecret = rawAuthSecret ?
                btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) :
                '';

    endpoint = subscription.endpoint;

    // Send the subscription details to the server using the Fetch API.
    fetch('./register', {
        method: 'post',
        headers: {
        'Content-type': 'application/json'
        },
        body: JSON.stringify({
        endpoint: subscription.endpoint,
        key: key,
        authSecret: authSecret,
        }),
    });
    });
}