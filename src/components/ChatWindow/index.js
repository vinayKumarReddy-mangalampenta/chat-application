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
import Cookies from "js-cookie";
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
        userNum: "",
        senderName: ""
    }

    componentDidMount() {
        const name = Cookies.get('ACCESS_TOKEN');
        const userNum = Cookies.get('ACCESS_TOKEN2');
        this.setState({ senderName: name, userNum })
        if (document.getElementById('messages').scrollHeight < 1000) {
            document.getElementById("scroller").style.display = "none"
        }
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
                // console.log(daa)

                var dataArray = Object.keys(dataObject).map(function (k) { return dataObject[k] });
                const sortByDate = arr => {
                    const sorter = (a, b) => {
                        return new Date(a.time).getTime() - new Date(b.time).getTime();
                    }
                    arr.sort(sorter);
                };

                sortByDate(dataArray)
                this.setState({ array: dataArray })
                document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight + 200
                // document.getElementById("messages").scrollIntoView()
            }
        });
    }

    addNewMessage = (userMsg, userName) => {
        const db = getDatabase();
        const newId = uuidv4()
        let event = new Date()
        const timeStamp = Timestamp.now()
        const data = {
            name: userName,
            msgText: userMsg,
            id: newId,
            msgID: timeStamp,
            time: `${event}`,
            number: this.state.userNum,
            color: `${"#" + Math.floor(Math.random() * 0x1000000).toString(16)}`
        }

        set(ref(db, `messages/${timeStamp}`), data);
        // this.getMessages()
    }


    onDeleteMsg = (id) => {
        const db = getDatabase();
        alert("We Are having some trouble on delete option we will bring that back ASAP")
        // set(ref(db, `messages/Timestamp(seconds=${id.seconds}, nanoseconds=${id.nanoseconds})`), null)
        //     .catch((error) => {
        //         alert("Unable Delete MSg Please check your Internet Connection")
        //     });
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

    scrollToBottom = () => {
        document.getElementById('messages').animate({ scrollTop: document.getElementById('messages').scrollHeight }, {
            duration: 2000,
            iterations: 1,
        });
        document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight + 20

    }
    onScroll = () => {
        if (document.getElementById('messages').scrollHeight - document.getElementById('messages').scrollTop > 900) {
            document.getElementById("scroller").style.display = "flex"
        } else {
            document.getElementById("scroller").style.display = "none"
        }

    }

    render() {
        // const { senderName, array, msgInput } = this.state
        // const starCountRef = ref(dbRef, 'messages/');
        // this.fetchMessages()
        // window.onscroll(() => {
        //     console.log("scrolling")
        // })
        const { array, msgInput, userNum } = this.state
        // const array1 = [...array,{}]
        return (

            <div className="chat-con">
                <Header />
                <div className="msg-con" onScroll={this.onScroll} id="messages">
                    <h1 className="welcome-msg">Welcome To Phenix Chat App</h1>
                    {

                        array.map((eachMsg) => (
                            <MsgBox key={eachMsg.id} onDeleteMsg={this.onDeleteMsg} message={eachMsg} isSender={eachMsg.number === userNum} />
                        ))
                    }
                    <div className="emptyElement" > hello dude</div>
                </div>
                {/* {this.scrollmsgs()} */}
                <div className="msg-input m-2">
                    <form onSubmit={this.OnSendMsg} className="my-form">
                        <input value={msgInput} onChange={(e) => {
                            this.setState({ msgInput: e.target.value })
                        }} type="text" className="user-msg-input" placeholder="Enter Your Message Here " />
                        <button type="submit" className="btn btn-primary send-btn ">send</button>
                    </form>
                </div>
                <button onClick={this.scrollToBottom} id="scroller"><div ><span>|</span><span className="arrow">{`>`}</span></div></button>
            </div>
        )
    }
}

export default ChatWindow