//creating our own websocketserver
import { WebSocketServer } from "ws";


const wss=new WebSocketServer({port:8080});

//global object
let userCount=0;

wss.on("connection",(socket)=>{
    // whenever a new user connects to the server it increated by 1
    userCount=userCount + 1;
    console.log("user connected #" + userCount);



    //when ever a new msg comes on the server call this event (call back)
    //This line will run for every user when connect
    socket.on("message",(message)=>{
        console.log("message received from client #" + message.toString());
        

        //respond back after 1 sec
        setTimeout(()=>{
            socket.send(message.toString()+ ": sent from the server");
         },1000);
    })

})