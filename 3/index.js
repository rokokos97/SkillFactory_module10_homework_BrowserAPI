const wssUrl = "wss://echo-ws-service.herokuapp.com";

function pageLoaded() {
  const input = document.querySelector(".input");
  const btnSend = document.querySelector(".btn-send");
  const btnLocation = document.querySelector(".btn-location");
  const chatMessageArea = document.querySelector(".chat-message-area");

  let socket = new WebSocket(wssUrl);

  socket.onopen = () => {
    chatMessageArea.innerHTML = `<div class="info-message">Соединение установлено</div>`;
  };
  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  };

  socket.onerror = () => {
    chatMessageArea.innerHTML = `<div class="info-message">При передаче данных произошла ошибка</div>`;
  };

  btnSend.addEventListener("click", (e) => {
    e.preventDefault();
    sendMessage();
  });

  function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
  }

  function writeToChat(message, isServer) {
    let messageHTML = `<div class="${
      isServer ? "server-message" : "user-message"
    }">${message}</div>`;
    chatMessageArea.innerHTML += messageHTML;
  }
}

document.addEventListener("DOMContentLoaded", pageLoaded);
