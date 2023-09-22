var socket = io();
let username="";
const btn = document.getElementById("join-chat");
const usernameInput = document.getElementById("username-input");
const usernameForm = document.querySelector(".form-username");
const chatroomContainer = document.querySelector(".chatroom-container");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-button");
const messagesContainer = document.querySelector(".messages");

btn.addEventListener("click",(event)=>{
    event.preventDefault();
    username = usernameInput.value;

    if(username){
        usernameForm.style.display = "none";
        chatroomContainer.style.display = "block";
        
    }
});

sendBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    let data = {
        id: socket.id,
        username: username,
        message: messageInput.value,
    };
    socket.emit("msg",data);
    appendMessage(data,"sent");
});

socket.on("msg",(data)=>{
    if(data.id !== socket.id){
        appendMessage(data, "recieved");
    }
});

function appendMessage(data,type){
    var msgDiv = document.createElement("div");
    msgDiv.innerText= `${data.username} : ${data.message}`;
    if(type==="sent"){
        msgDiv.setAttribute("class","message sent");
    } else {
        msgDiv.setAttribute("class", "message");
    }
    messagesContainer.append(msgDiv);
    messageInput.value="";
}