import { useState } from "react"

import { useNavigate } from 'react-router-dom';

import { Container, LoginCon, NameInput } from "./styleComponents"
const NewUser = (props) => {
    const [name, setName] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const history = useNavigate()

    const onSubmitForm = (event) => {
        event.preventDefault()
        if (name.length < 5) {
            setErrMsg("*Name must be greater than 5 letters")
        } else {

            localStorage.setItem("name", JSON.stringify(name));
            history("/chat", { state: { name: name } }/*, { replace: true }*/)
        }
    }

    return (

        <Container >
            <LoginCon className="shadow-lg p-3" >
                <form onSubmit={onSubmitForm}>
                    <h2 className="text-center text-primary" >My Awesome Chat</h2>
                    <h2 >Hello {name},</h2>
                    <NameInput type="text" placeholder="Enter Your Name" value={name} onChange={(event) => {
                        setName(event.target.value)
                    }} className="form-group d-block w-100"
                    />
                    <button type="submit" className="btn btn-primary" >Let's Chat</button>
                    <p className="text-danger">{errMsg}</p>
                </form>


            </LoginCon>

        </Container>
    )
}

export default NewUser