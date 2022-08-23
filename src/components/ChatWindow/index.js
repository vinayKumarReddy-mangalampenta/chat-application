import { Component } from "react";
import MsgBox from "../MsgBox";
import Header from "../Navbar";

import "./index.css"

import { v4 as uuidv4 } from 'uuid';

import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// // var ref = firebase.database().ref('players');

// import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved, set, get, child, onValue } from "firebase/database";

import { getDatabase, ref, set, onValue } from "firebase/database";
// const  Timestamp = firebase.firestore.Timestamp;
import { Timestamp } from "firebase/firestore";
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
export const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

// const database = getDatabase();
// console.log(database);
// export { auth, db, storage };

// const dbRef = ref(getDatabase());



// const db = getDatabase();
// const commentsRef = ref(db, 'messages/' + "vinay");
// onChildAdded(commentsRef, (data) => {
//   addCommentElement(postElement, data.key, data.val().text, data.val().author);
// });

// onChildChanged(commentsRef, (data) => {
//   setCommentValues(postElement, data.key, data.val().text, data.val().author);
// });

// onChildRemoved(commentsRef, (data) => {
//   deleteComment(postElement, data.key);
// });

class ChatWindow extends Component {
    state = {
        msgInput: "",
        array: [],
        senderName: ""
    }

    componentDidMount() {
        const name = localStorage.getItem("name");
        // this.fetchMessages()
        this.setState({ senderName: name })
        // const starCountRef = ;
        // onValue(ref(dbRef, 'messages/'), (snapshot) => {
        //     const data = snapshot.val();
        //     console.log(data)
        // });
        this.getMessages()
    }


    getMessages = () => {
        // onValue(child(dbRef, "messages")).then((snapshot) => {
        //     if (snapshot.exists()) {

        //         const dataObject = snapshot.val()
        //         var dataArray = Object.keys(dataObject).map(function (k) { return dataObject[k] });
        //         this.setState({ array: dataArray })
        //     } else {
        //         console.log("No data available");
        //     }
        // }).catch((error) => {
        //     console.error(error);
        // });
        const db = getDatabase();
        const starCountRef = ref(db, 'messages/');
        onValue(starCountRef, (snapshot) => {
            if (snapshot.exists()) {
                const dataObject = snapshot.val();
                console.log(dataObject)
                var dataArray = Object.keys(dataObject).map(function (k) { return dataObject[k] });
                const sortByDate = arr => {
                    const sorter = (a, b) => {
                        return new Date(a.time).getTime() - new Date(b.time).getTime();
                    }
                    arr.sort(sorter);
                };
                sortByDate(dataArray)
                this.setState({ array: dataArray })
                document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight + 20

            }
        });
    }

    addNewMessage = (userMsg, userName) => {
        const db = getDatabase();
        const newId = uuidv4()
        let event = new Date()

        const data = {
            name: userName,
            msgText: userMsg,
            id: newId,
            time: `${event}`,
        }
        console.log(Timestamp.now())
        set(ref(db, `messages/${Timestamp.now()}`), data);
        // this.getMessages()
    }



    OnSendMsg = (event) => {
        event.preventDefault()
        if (this.state.msgInput !== "") {
            this.addNewMessage(this.state.msgInput, this.state.senderName)
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
        // const starCountRef = ref(dbRef, 'messages/');
        // this.fetchMessages()

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