import './App.css';
import {useEffect} from 'react';
import {useState} from 'react';
import {useRef} from 'react';


function App() {
  const [messages,setMessages]=useState(["hii there","hello"]);
  const wsRef=useRef();
  const inputRef=useRef();

  //on mounts it will connect to the backend server
  useEffect(()=>{

    const ws=new WebSocket("http://localhost:8080");

    //when message came
    ws.onmessage=(event)=>{
      //new message(event) as well as old message(m) will be added to the messages array
      setMessages(m=>[...m,event.data]);
    }
    wsRef.current=ws;
 
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }

  return ()=>{
    wsRef.close()
  }
},[]);


  return <div className='h-screen bg-black'>
    <br /><br /><br />
    <div className='h-[85vh]'>
      {messages.map(message =><div className='m-8'>
      <span className='bg-white text-black rounded p-4 '>
        {message}
      </span>
      </div>)}
    </div>
    <div className='w-full bg-white flex '>
      <input ref={inputRef} id="message" className="flex-1 p-4" ></input>
      <button onClick={()=>{
        const message=inputRef.current?.value;
        wsRef.current.send(JSON.stringify({
          type:"chat",
          payload:{
            message:message
          }
      
        }))
        console.log(message)

      }} className='bg-purple-600 text-white p-4'>
        Send message
      </button>

    </div>
  
  
  </div>
}

export default App

