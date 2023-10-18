(function () {
  const socket = io();
  let messages = [];
  const formMessage = document.getElementById("form-message");
  const inputMessage = document.getElementById("input-message");
  const showMessage = document.getElementById("show-message");
  formMessage.addEventListener("submit", (event) => {
    event.preventDefault();
    messages.push({
      socketId: socket.id,
      message: inputMessage.value,
    });
    socket.emit("new-message", inputMessage.value);
    inputMessage.value = "";
    inputMessage.focus();
  });
  function updateMessages(messages) {
    showMessage.innerText = "";
    messages.forEach((message) => {
      const item = document.createElement("li");
      item.innerText = `(${message.socketId}) ${message.body}`;
      showMessage.appendChild(item);
    });
  }
  socket.on("start", (data) => {
    messages = data;
    updateMessages(messages);
  });
  socket.on("notification", (message) => {
    messages.push(message);
    updateMessages(messages);
  });
})();
