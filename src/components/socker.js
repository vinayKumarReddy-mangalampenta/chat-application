// import "../App.css"
// import io from 'socket.io-client';
// import { v4 as uuidv4 } from 'uuid';
// import { useState, useEffect } from "react";

// const Messenger = () => {

//     const [socket, setSocket] = useState(null)
//     const [msg, setMsg] = useState("")
//     const [messages, setMessages] = useState([])
//     const userId = uuidv4();

//     useEffect(() => {
//         const newSocket = io(`http://localhost:8000`);
//         setSocket(newSocket)
//     })
//     const submitForm = (e) => {
//         e.preventDefault();
//         const obj = { msg_text: msg, id: uuidv4(), sender_id: userId }
//         socket.emit('message', obj);
//         setMsg('')
//         setMessages((prev) => ([...prev, obj]))
//     };

//     const messageListener = (msg) => {
//         console.log(msg)
//     }

//     if (socket !== null) {
//         socket.on('message', messageListener);
//     }


//     return (
//         <>
//             <ul id="messages">
//                 {
//                     messages.map((each) => (
//                         <li >
//                             {each.msg_text}
//                         </li>
//                     ))
//                 }
//             </ul>
//             <form onSubmit={submitForm} id="form" action="">
//                 <input id="input" autoComplete="off" value={msg} onChange={(e) => { setMsg(e.target.value) }} /><button>Send</button>
//             </form>
//         </>
//     )

// }

// export default Messenger

import { useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"

const HomePage = () => {
    const [activeBtn, setActiveBtn] = useState("chats")

    return (
        <div className="tw-m-0 tw-p-0">
            <div className="bg-vinni-400 max-h-max">
                <div className=" flex flex-row items-center justify-between pl-2 pr-3" >
                    <h1 className="text-white">Phenix</h1>
                    <AiOutlineMenu className="text-white " style={{
                        height: "40px",
                        width: "40px"
                    }} /> 
                </div>
                <div className="flex w-full items-center">
                <button className={`w-1/2 outline-none bg-transparent border-0 text-white text-2xl ${activeBtn === "status" ? "border-b-4 border-solid border-white rounded" : ""} `}>Status</button>
                <button className={`w-1/2 outline-none bg-transparent border-0 text-white text-2xl ${activeBtn === "status" ? "border-b-4 border-solid border-white rounded" : ""} `}>Status</button>
             
                </div>
            </div>
        </div>
    )
}

export default HomePage