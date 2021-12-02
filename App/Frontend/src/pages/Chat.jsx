// crear un chat
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:9001/');




function Chat(props) {
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        socket.on('message', (data) => {
            console.log(data);
        });
    }, []);




    return (
        <div>
            <h1>Chat</h1>
            <p>{mensaje}</p>
        </div>)

}


export default Chat;