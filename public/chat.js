////Make connection

var socket = io.connect("https://chat-created-by-luis.herokuapp.com/");

///handle message send output

////Query DOM

let message = document.getElementById("message");
let handle = document.getElementById("handle");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let feedback = document.getElementById("feedback");
console.log(feedback);

////Emit events
btn.addEventListener("click", function () {
  console.log("You clicked me");
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
});

message.addEventListener("keypress", function () {
  socket.emit("typing", handle.value);
});
////Listen for events

socket.on("chat", function (data) {
  output.innerHTML +=
    `<p><strong>` + data.handle + `: </strong>` + data.message + "</p>";
  feedback.innerHTML = "";
});

socket.on("typing", function (data) {
  feedback.innerHTML =
    "<p><em>" + data + " is typing a message..." + "</em></p>";
});
