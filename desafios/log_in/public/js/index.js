const socket = io();

const sendButton = document.getElementById("send");
const userId = document.getElementById("userId");
const message = document.getElementById("message");

const messageForm = document.getElementById("message-form");
const messagesCenterTitle = document.getElementById("messages-center-title");

const userEntity = new normalizr.schema.Entity(
  "user",
  {},
  { idAttribute: "_id" }
);
const messageEntity = new normalizr.schema.Entity("message", {
  user: userEntity,
});
const messageListEntity = new normalizr.schema.Entity("messageList", {
  messages: [messageEntity],
});

const sendMessage = (event) => {
  event.preventDefault();
  const messageObj = {
    user: userId.value,
    timestamp: new Date().getTime(),
    text: message.value,
  };
  socket.emit("sendMessage", messageObj);
  message.value = "";
};

const createMessage = (messages) => {
  const sizeOriginalMessages =
    encodeURI(JSON.stringify(messages)).split(/%..|./).length - 1;
  document.getElementById("messages").innerHTML = "";
  const denormalizedMessages = normalizr.denormalize(
    messages.result,
    messageListEntity,
    messages.entities
  ).messages;
  const sizeDenormalizedMessages =
    encodeURI(JSON.stringify(denormalizedMessages)).split(/%..|./).length - 1;

  const percentageDifference = Math.abs(
    Math.round(
      ((sizeOriginalMessages - sizeDenormalizedMessages) /
        sizeOriginalMessages) *
        100
    )
  );
  messagesCenterTitle.innerHTML = `Centro de mensajes (Compresión: ${percentageDifference}%)`;
  console.log(messages);
  console.log(denormalizedMessages);
  denormalizedMessages.forEach((message) => {
    const div = document.createElement("div");
    const finalMessage = cleanString(message.text);
    const finalUser = cleanString(message.user.email);
    const date = new Date(message.createdAt);
    const dateString = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    div.innerHTML = `<p>
                        <img src="${message.user.avatar}" width="30">
                        <span class="text-primary fw-bold">${finalUser}</span> 
                        <span class="text-brown">[${dateString}]</span>: 
                        <span class="text-success fst-italic">${finalMessage}</span>
                    </p>`;
    document.getElementById("messages").appendChild(div);
  });
};

const cleanString = (string) => {
  const tmpDiv = document.createElement("div");
  tmpDiv.innerHTML = string;
  const cleanedString = tmpDiv.textContent || tmpDiv.innerText;
  tmpDiv.remove();
  return cleanedString;
};

message.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && messageForm.checkValidity()) {
    event.preventDefault();
    sendMessage(event);
  }
});

sendButton.addEventListener("click", (event) => {
  if (messageForm.checkValidity()) {
    event.preventDefault();
    sendMessage(event);
  }
});

socket.on("messages", (messages) => {
  createMessage(messages);
});

fetch("/api/productos-test").then((response) => {
  response.json().then((data) => {
    fetch("templates/productsTable.handlebars")
      .then((response) => response.text())
      .then((template) => {
        const templateFn = Handlebars.compile(template);
        const html = templateFn({ products: data });
        const productsDiv = document.getElementById("productos");
        productsDiv.innerHTML = html;
      });
  });
});
