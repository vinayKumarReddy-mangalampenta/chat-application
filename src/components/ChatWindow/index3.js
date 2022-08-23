import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved, set, push, onValue, orderByKey } from "firebase/database";
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    Timestamp,
    orderBy,
    setDoc,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { Component } from "react";
import MsgBox from "../MsgBox";
import Header from "../Navbar";

import "./index.css"

import { v4 as uuidv4 } from 'uuid';
// import { useLocation } from "react-router";
// import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";



// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// // var ref = firebase.database().ref('players');

const firebaseConfig = {
    apiKey: "AIzaSyDTMztl8Ufioln7XC4RswTSlxleNsXo0wI",
    authDomain: "awesome-chat-app-799fc.firebaseapp.com",
    projectId: "awesome-chat-app-799fc",
    storageBucket: "awesome-chat-app-799fc.appspot.com",
    messagingSenderId: "142449435568",
    appId: "1:142449435568:web:b6fcd6c161b786fd6a2c75",
    measurementId: "G-VZFHBTF84R"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

// const database = getDatabase();
// console.log(database);
// export { auth, db, storage };



class ChatWindow extends Component {
    state = {
        msgInput: "",
        array: [],
        senderName: ""
    }

    componentDidMount() {
        const name = localStorage.getItem("name");
        // this.fetchMessages()
        const db = getDatabase()
        const dbRef = ref(db, 'messages/');
        // const db = getDatabase();
        const commentsRef = ref(db, "messages/");
        let arr = []
        onChildAdded(commentsRef, (data) => {
            // this.setState((prevState) => ({
            arr.push(data.val())
            // }))

        });
        this.setState({ array: arr })

        // onValue(dbRef, (snapshot) => {
        //     let msgArr = []
        //     snapshot.forEach((childSnapshot) => {
        //         // const childKey = childSnapshot.key;
        //         const childData = childSnapshot.val();
        //         // console.log(childSnapshot)
        //         msgArr.push(childData)
        //         // console.log(childData)
        //     });

        const topUserPostsRef = query(ref(db, 'messages/') ) 
        console.log(topUserPostsRef)

        // this.fetchMessages()
        this.setState({ senderName: name })

    } 
    // componentDidMount() {
    //     const name = localStorage.getItem("name");
    //     //     // this.fetchMessages()
    //     const db = ref(getDatabase())
    //     const msgsRef = collection(db, "messages");
    //     const q = query(msgsRef, orderBy("createdAt", "asc"));

    //     onSnapshot(q, (querySnapshot) => {
    //         let msgs = [];
    //         querySnapshot.forEach((doc) => {
    //             msgs.push(doc.data());
    //         });
    //         console.log(msgs)
    //     });
    // }

    fetchMessages = () => {
        const db = getDatabase();
        const commentsRef = ref(db, "messages/");
        let arr = []
        onChildAdded(commentsRef, (data) => {
            // this.setState((prevState) => ({
            arr.push(data.val())
            // }))

        });
        this.setState({ array: arr })
        // console.log(arr)
        // const topUserPostsRef = query(ref(db, 'messages/'), orderByKey())
        // console.log(topUserPostsRef)
    }


    addNewMessage = (userMsg, userName) => {
        const db = getDatabase();
        const newMsg = ref(db, 'messages');
        const newPostRef = push(newMsg);
        const newId = uuidv4()
        const obj = {
            name: `${userName}`,
            msgText: `${userMsg}`,
            id: newId
        }
        set(newPostRef, obj);
        //    this.fetchMessages()
        // set(ref(db, `messages/${newId}`), {

        // });

    }
ssss

             
    OnSendMsg = async (event) => {
        event.preventDefault()
        if (this.state.msgInput !== "") {
            await this.addNewMessage(this.state.msgInput, this.state.senderName)
            this.setState((prevState) => ({
                // array: [...prevState.array, {
                //     id: prevState.array.length,
                //     name: "vinay",
                //     msgText: prevState.msgInput
                // }],
                msgInput: ""
            }))
            document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight + 20
        }

    }

    render() {
        // const { senderName, array, msgInput } = this.state

        // this.addNewMessage()
        const { array, msgInput, senderName } = this.state

        return (
            <div className="chat-con">  
                <Header />
                <ul className="msg-con" id="messages">
                    {

                        array.map((eachMsg) => (
                            <MsgBox key={eachMsg.id} message={eachMsg} isSender={eachMsg.name === senderName} />
                        ))
                    }
                </ul>
                <div className="msg-input m-2">
                    <form onSubmit={this.OnSendMsg} className="my-form">
                        <input value={msgInput} onChange={(e) => {
                            this.setState({ msgInput: e.target.value })
                        }} type="text" className="user-msg-input " placeholder="Enter Your Message Here " />
                        <button type="submit" className="send-btn btn btn-primary">send</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ChatWindow