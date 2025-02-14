//creating our own websocketserver
import { WebSocketServer , WebSocket} from "ws";


const wss=new WebSocketServer({port:8080});


interface User{
    socket:WebSocket,
    room:string;
}


//global object to store all sockets 
let allSockets:User[]=[];


wss.on("connection",(socket)=>{
    


    //This line will run for every user when connect
    //this message is string type not json object
    socket.on("message",(message)=>{

        //convert the string into object
        //@ts-ignore
        const parsedMessage=JSON.parse(message);
        if(parsedMessage.type=="join"){


            console.log("user joined room"+ parsedMessage.payload.roomId)

            
            allSockets.push({
                socket,
                room:parsedMessage.payload.roomId
            })
        }

        // iterate over all sockets and find the socket that is in the same room
        if(parsedMessage.type=="chat"){
            console.log("user wants to chat")


            // const currentUserRoom=allSockets.find((x)=>x.socket==socket);

            //same
            let currentUserRoom=null;
            for(let i=0;i<allSockets.length;i++){
                if(allSockets[i].socket==socket){
                    currentUserRoom=allSockets[i].room
                }
            }

            
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].room == currentUserRoom) {
                    allSockets[i].socket.send(parsedMessage.payload.message)
                }
            }
        }

        
    });


    // when the client is disconnected it will remove the socket from the array
    // socket.on("disconnet",()=>{
    //     allSockets=allSockets.filter(x=>x!=socket);
    // })


})