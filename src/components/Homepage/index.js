
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
                <button onClick={() => { 
                    setActiveBtn("chats")
                }} className={`w-1/2 outline-none bg-transparent border-0 text-white text-2xl ${activeBtn === "chats" ? "border-b-4 border-solid border-white rounded" : ""} `}>Chats</button>
                <button onClick={() => {
                    setActiveBtn("status")
                }} className={`w-1/2 outline-none bg-transparent border-0 text-white text-2xl ${activeBtn === "status" ? "border-b-4 border-solid border-white rounded" : ""} `}>Status</button>
             
                </div>
            </div>
        </div>
    )
}



export default HomePage 