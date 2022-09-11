import React, { useEffect } from "react"

import { getDatabase, ref, set, onValue, get } from "firebase/database";

class UsersCards extends React.Component {
    componentDidMount() {
        this.getMessages()
    }

    getMessages = () => {
        console.log("called")
        const db = getDatabase();
        const starCountRef = ref(db, `privatemessages/a687fa98-2ea7-491f-85f6-1f03574a4746/`);
        onValue(starCountRef, (snapshot) => {
            if (snapshot.exists()) {
                const dataObject = snapshot.val();
                var dataArray = Object.keys(dataObject).map(function (k) { return dataObject[k] });
                const sortByDate = arr => {
                    const sorter = (a, b) => {
                        return new Date(a.time).getTime() - new Date(b.time).getTime();
                    }
                    arr.sort(sorter);
                };
                console.log(dataArray)
                document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight + 200
                // document.getElementById("messages").scrollIntoView()
            }
        });
        console.log("completed")
    }
    render() {
        return (
            <h1 className="text-black " > Hello World</h1>
        )
    }

}

export default UsersCards