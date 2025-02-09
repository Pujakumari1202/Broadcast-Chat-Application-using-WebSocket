//creating our own websocketserver
import { WebSocketServer , WebSocket} from "ws";


const wss=new WebSocketServer({port:8080});

//global object
let allSockets:WebSocket[] =[];

wss.on("connection",(socket)=>{
    allSockets.push(socket);


    //This line will run for every user when connect
    socket.on("message",(message)=>{
        console.log("message received from client #" + message.toString());

        //sending message to all other clients(broadcasting)
        for(let i=0;i<allSockets.length;i++){
            const s=allSockets[i];
            s.send(message.toString()+ ": sent from the server");
        }
        
    });


    // when the client is disconnected it will remove the socket from the array
    socket.on("disconnet",()=>{
        allSockets=allSockets.filter(x=>x!=socket);
    })


})