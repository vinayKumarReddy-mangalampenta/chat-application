import "./index.css"

const MsgBox = (props) => {
    const { message, isSender } = props
    const { msgText, name } = message

    const itemClass = isSender ? "right" : "left"
    return (
        <li className={`msg ${itemClass}`}>
            {
                itemClass === "left" && <span >
                    <sup ><b >{name} </b></sup>
                </span>
            }

            <span >
                {msgText}
            </span>
        </li>
    )
}

export default MsgBox