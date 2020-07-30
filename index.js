// Register service worker to control making site work offline
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function (register) {
      console.log('Service Worker Registered');
    })
};

(function () {
  Notification.requestPermission(function (result) {
   
    if (result !== "granted") {
      console.log("No notification permission granted!");
    } else {
      console.log("User choice granted", result);
      //configurePushSub();// Write your custom function that pushes your message
    }
  });
})();
