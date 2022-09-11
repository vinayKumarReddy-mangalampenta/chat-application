
import { useEffect, useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import { FiArrowLeft } from "react-icons/fi"
import { FaSearch } from "react-icons/fa"
import Popup from 'reactjs-popup';
import { getDatabase, ref, set, get, child } from "firebase/database";

import "./index.css"
import UsersCards from "../UsersCard";
let db = getDatabase()


const HomePage = () => {
    const [activeBtn, setActiveBtn] = useState("chats")

    return (
        <div className="tw-m-0 tw-p-0 h-full">
            <div className="bg-vinni-400 max-h-max">
                <div className=" flex flex-row items-center justify-between pl-2 pr-3" >
                    <h1 className="text-white">Phenix</h1>
                    <AiOutlineMenu className="text-white " style={{
                        height: "40px",
                        width: "40px"
                    }} />
                </div>
                <div className="flex w-full items-center">
                    <button onClick={() => {
                        setActiveBtn("chats")
                    }} className={`w-1/2 outline-none bg-transparent border-0 text-white text-2xl border-b-4 cursor-pointer ${activeBtn === "chats" ? "border-solid border-white " : "border-transparent"} `}>Chats</button>
                    <button onClick={() => {
                        setActiveBtn("status")
                    }} className={`w-1/2 outline-none bg-transparent border-0 text-white text-2xl border-b-4 cursor-pointer ${activeBtn === "status" ? " border-solid border-white " : "border-transparent"} `}>Status</button>

                </div>
            </div>
            <UsersCards />
            <ChatWithNewUser />
        </div>
    )
}



export default HomePage


const ChatWithNewUser = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [isSearchOpen, setSearchOpen] = useState(false)
    const [avlUsers, setAvlUsers] = useState([])
    // const [filteredUsers, setFilteredUsers] = useState(avlUsers)
    const [searchVal, setSearchVal] = useState("")

    const onChangeSearchInput = (e) => {
        setSearchVal(e.target.value)
        // const newArr = avlUsers.filter(each =>
        //     each.name.includes(searchVal)
        // )
        // setFilteredUsers(newArr)
    }

    useEffect(() => {
        get(child(ref(db), `users/`)).then((snapchat) => {
            if (snapchat.exists()) {
                let users = snapchat.val()
                let valuesArray = Object.values(users);
                setAvlUsers(valuesArray)
                // setFilteredUsers(valuesArray)
            }
        })
    })
    const searchResults = avlUsers.filter(eachUser =>
        eachUser.name.includes(searchVal)
    )

    const onSelectUser = (event) => {
        console.log(event.currentTarget.id);

    }

    return (
        <>
            <div className="absolute bottom-0 right-0">
                <button onClick={() => { setModalOpen(true) }} className="relative mr-2 mb-2 rounded-full flex items-center justify-center outline-none border-0 bg-green-800 h-16 w-16">
                    <span className="text-white text-7xl">+</span>
                </button>
            </div>
            <Popup open={modalOpen} closeOnDocumentClick={false} onClose={() => { setModalOpen(false) }} contentStyle={{ width: '100vw', height: "100vh", padding: "0", margin: "0" }}>
                <div className="modal" style={{ width: "" }}>

                    {/* header  */}
                    <div style={{ height: "80px" }} className="bg-vinni-400 flex flex-row items-center justify-between pl-2 pr-3" >
                        <button onClick={() => { setModalOpen(false) }} className="bg-transparent border-0 outline-0 w-1/6 flex items-center justify-center">
                            <FiArrowLeft className="text-white " style={{
                                height: "40px",
                                width: "40px"
                            }} />
                        </button>
                        <h1 className="w-4/6 self-center text-white text-left">Select User </h1>
                        {/* search bar  */}
                        <div className={`search-bar ${isSearchOpen ? "" : "hide-search-bar"}`}>
                            <button onClick={() => {
                                setSearchOpen(false)
                                setSearchVal("")
                            }} className="bg-transparent border-0 outline-0">
                                <FiArrowLeft className="text-white " style={{
                                    height: "40px",
                                    width: "40px",
                                    color: "black"
                                }} />
                            </button>
                            <input type="search" value={searchVal} onChange={onChangeSearchInput} placeholder="search" className="" />
                        </div>
                        <button onClick={() => { setSearchOpen(true) }} className="bg-transparent border-0 outline-0 w-1/6 flex items-center justify-center">
                            <FaSearch className="text-white " style={{
                                height: "40px",
                                width: "40px"
                            }} />
                        </button>

                    </div>

                    <ul className="list-none m-0 p-2 users-list-con" style={{ height: "90vh ", overflow: "auto" }}>
                        {

                            searchResults.length === 0 ? <li className="font-semibold text-center text-xl">
                                No Users Available
                            </li>
                                :
                                searchResults.map((each) => (
                                    <li key={each.id} className="mb-2" >
                                        <button id={each.id} onClick={onSelectUser} className="w-full bg-transparent outline-none border-none flex items ">
                                            <img src="https://www.citypng.com/public/uploads/preview/download-black-male-user-profile-icon-png-116371332534k5baafcll.png" alt={each.name} className="chat-new-user-profile" />
                                            <div className="self-start ml-2 text-left">
                                                <span className="block font-semibold text-xl">{each.name}</span>
                                                <span className="font-normal text-lg">Hey I am using Phenix.</span>
                                            </div>
                                        </button>
                                        <hr />
                                    </li>
                                ))
                        }
                    </ul>
                    <button onClick={() => { setModalOpen(false) }} className="btn btn-primary">close</button>
                </div>
            </Popup>
        </>
    )

}