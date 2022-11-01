import socketIO from 'socket.io-client';
import './Chat.css';
import { useEffect, useState } from 'react';
import { user } from '../Join/Join';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message/Message';
import sendLogo from '../../images/send.png';
import closeIcon from '../../images/closeIcon.png';

let socket;
const ENDPOINT = "http://localhost:4500/";


const Chat = () => {

  const [id, setid] = useState('');
  const [messages, setmessages] = useState([]);

  const send = () => {
    const message = document.getElementById('chatInput').value;
    console.log(`${id} : ${message}`);
    socket.emit('message', { message, id });
    document.getElementById('chatInput').value = "";
  }

    useEffect(() => {
        socket = socketIO(ENDPOINT, {transports : ['websocket']});
        socket.on('connect', () =>{
          console.log("Connection successful");
          setid(socket.id);
        })

        socket.emit('joined', { user });

        socket.on('welcome', (data) => {
          alert(data.message);
          console.log(`${data.user} ${data.message}`);
        })

        socket.on('userJoined', (data) => {
          alert(data.message);
          console.log(`${data.user} ${data.message}`);
        })

        socket.on('leave', (data) => {
          alert(data.message);
          console.log(`${data.user} ${data.message}`);
        })
      
        return () => {
          socket.emit('disconnect');
          socket.off();
        }
      }, [])

      useEffect(() => {

        socket.on('sendMessage', (data) => {
          setmessages([...messages, data]);
          console.log(`${data.user} ${data.message}`);
        })
      
        return () => {
        }
      }, [messages])
      
      

  return (
    <div className= 'chatPage'>
      <div className= 'chatContainer'>
        <div className= 'header'>
          <h2>C Chat</h2>
          <a href= "/"><img src= {closeIcon} alt= 'closeIcon'/></a>
        </div>
        <ReactScrollToBottom className= 'chatBox'>
          {messages.map((item, i) => {
            return <Message user= {item.id === id ? '' : item.user} message= {item.message} classs= {item.id === id ? 'right' : 'left'} />
          })}
        </ReactScrollToBottom>
        <div className= 'inputBox'>
          <input type= 'text' id= 'chatInput' />
          <button onClick= { send } className= 'sendBtn'><img src= { sendLogo } alt= 'Send' /></button>
        </div>
      </div>
    </div>
  )
}

export default Chat