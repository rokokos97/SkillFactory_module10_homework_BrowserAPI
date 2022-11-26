const wssUrl = "wss://echo-ws-service.herokuapp.com";

function pageLoaded() {
  const input = document.querySelector(".input");
  const btnSend = document.querySelector(".btn-send");
  const btnLocation = document.querySelector(".btn-location");
  const chatMessageArea = document.querySelector(".chat-message-area");

  let socket = new WebSocket(wssUrl);

  socket.onopen = () => {
    writeInfoMessage("connection is established");
  };
  socket.onmessage = (e) => {
    if (e.data !== "[object GeolocationCoordinates]") {
      writeToChat(e.data, true);
    }
  };

  socket.onerror = () => {
    writeInfoMessage("connecting error");
  };

  btnSend.addEventListener("click", (e) => {
    e.preventDefault();
    sendMessage();
  });

  btnLocation.addEventListener("click", (e) => {
    e.preventDefault();
    sendLocation();
  });

  function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value = "";
  }

  function writeToChat(message, sender) {
    let messageHTML = `<div class="${
      sender ? "server-message" : "user-message"
    }">${message}</div>`;
    chatMessageArea.innerHTML += messageHTML;
  }

  function writeInfoMessage(message) {
    let messageHTML = `<div class="info-message">${message}</div>`;
    chatMessageArea.innerHTML += messageHTML;
  }

  function sendLocation() {
    if ("geolocation" in navigator) {
      let locationOptions = {
        enableHighAccuracy: true,
      };
      navigator.geolocation.getCurrentPosition(
        locationSuccess,
        locationError,
        locationOptions
      );
    } else {
      writeInfoMessage("Your browser don't support geolocation");
    }
  }
}

function locationSuccess(data) {
  let chatMessageArea = document.querySelector(".chat-message-area");
  let link = `https://www.openstreetmap.org/?mlat=${data.coords.latitude}&mlon=${data.coords.longitude}#map=19/${data.coords.latitude}/${data.coords.longitude}`;
  let messageHTML = `<div class="info-message"><a href="${link}" target="_blank">You are here</a></div>`;
  chatMessageArea.innerHTML += messageHTML;
}

function locationError() {
  let chatMessageArea = document.querySelector(".chat-message-area");
  chatMessageArea.innerHTML = `<div class="info-message">Problem with your geolocation</div>`;
}

document.addEventListener("DOMContentLoaded", pageLoaded);
