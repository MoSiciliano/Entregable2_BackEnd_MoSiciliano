(function () {
  const socket = io();
  let username;
  const formMessage = document.getElementById("form-message");
  const inputMessage = document.getElementById("input-message");
  const logMessage = document.getElementById("log-message");

  formMessage.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = inputMessage.value;
    socket.emit("new-message", { username, text });
    inputMessage.value = "";
    inputMessage.focus();
  });
  function updatedLogMessage(messages) {
    logMessage.innerText = "";
    messages.forEach((msg) => {
      const p = document.createElement("p");
      p.innerText = `${msg.username}: ${msg.text}`;
    });
  }
  socket.on("notification", (messages) => {
    updatedLogMessage(messages);
  });
  socket.on("new-client", () => {
    Swal.fire({
      text: "Nuevo usuario conectado 🥳",
      toast: true,
      position: "top-right",
    });
  });
  Swal.fire({
    title: "Identificación",
    input: "text",
    inputLabel: "Ingrese su username",
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "Ingrese su username para continuar";
      }
    },
  }).then((result) => {
    username = result.value.trim();
    console.log(`Bienvenido: ${username}`);
  });
})();
