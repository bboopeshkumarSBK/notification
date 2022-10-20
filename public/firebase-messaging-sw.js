importScripts("https://www.gstatic.com/firebasejs/6.2.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.2.3/firebase-messaging.js");

var config = {
  apiKey: "AIzaSyAuTwe4msvCy_UcPHy_ut6CGkJjg0trm9s",
  authDomain: "loyalty-app-c011b.firebaseapp.com",
  messagingSenderId: "600104612393",
};
firebase.initializeApp(config);

var messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  var dataFromServer = JSON.parse(payload.data.notification);
  var notificationTitle = dataFromServer.title;
  var notificationOptions = {
    body: dataFromServer.body,
    icon: dataFromServer.icon,
    data: {
      url: dataFromServer.url,
    },
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", function (event) {
  var urlToRedirect = event.notification.data.url;
  event.notification.close();
  event.waitUntil(self.clients.openWindow(urlToRedirect));
});

