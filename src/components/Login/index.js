import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, Navigate } from "react-router-dom";
import { getDatabase, ref, set, get, child } from "firebase/database";
import Cookies from "js-cookie"
import { TailSpin } from 'react-loader-spinner'
import "./index.css"

const Login = () => {
    const [number, setNumber] = useState("")
    const [name, setName] = useState("")
    const [otp, setOtp] = useState("")
    const [otpsent, setOtpSent] = useState(false) // need to change to false to show only when otp had sent
    const [register, setRegister] = useState(true)
    const [open, setOpen] = useState(true);
    const [errMsg, setErrMsg] = useState("")
    const [apiStatus, setApiStatus] = useState(false)
    const db = getDatabase();
    const navigate = useNavigate()

    const onSignInSubmit = () => {
        const auth = getAuth();

        if (!register) {
            get(child(ref(db), `users/${number}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let data = snapshot.val()
                    setName(data.name)
                    setApiStatus(true)
                    const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);

                    signInWithPhoneNumber(auth, `+91${number}`, appVerifier)
                        .then((confirmationResult) => {
                            window.confirmationResult = confirmationResult;
                            console.log(confirmationResult)
                            console.log("otp sent ")
                            setOtpSent(true)
                            setApiStatus(false)
                        }).catch((error) => {
                            setErrMsg("Something went Wrong")
                        });
                } else {
                    setErrMsg("User Doesn't exists Please Sign Up")
                }
            }).catch((error) => {
                setErrMsg("Something went Wrong")
            });
        } else {
            setApiStatus(true)
            const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);

            signInWithPhoneNumber(auth, `+91${number}`, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    console.log(confirmationResult)
                    console.log("otp sent ")
                    setOtpSent(true)
                }).catch((error) => {
                    setErrMsg("Something went Wrong")
                });
            setApiStatus(false)
        }
    }

    const onVerifyOtp = () => {
        const confirmationResult = window.confirmationResult
        confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.

            let event = new Date()
            const newUserId = uuidv4()
            const data = {
                name: name,
                id: newUserId,
                time: `${event}`,
                number: number,
            }
            set(ref(db, `users/${number}`), data);
            Cookies.set('ACCESS_TOKEN', name, { expires: 10 });
            Cookies.set('ACCESS_TOKEN2', number, { expires: 10 });
            navigate("/", { replace: true });
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            setErrMsg("wrong otp")
            console.log("wrong otp ")
        });
    }
    const ControlledPopup = () => {
        const closeModal = () => setOpen(false);
        return (
            <div>
                <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                    <div className="modal" style={{ width: "" }}>
                        <button className="close" onClick={() => {
                            setOtp("")
                            closeModal()
                            // setOtpSent(false)
                        }}>
                            &times;
                        </button>
                        <div className="verification"> Verify OTP  </div>
                        <div className="content">
                            <p className="verify-otp-text">Please enter the OTP received on your mobile <b>{number}</b></p>
                            <label htmfor="otp" className="label ">Otp:</label>
                            <input type="text" htmfor="otp" placeholder="Enter your otp" className="form-input" value={otp} onChange={(e) => {
                                setOtp(e.target.value)
                            }} />
                            <button className="btn" disabled={!(otp.length === 6)} onClick={onVerifyOtp}>Verify  </button>
                        </div>
                    </div>
                </Popup>
            </div>
        );
    };
    const SignUpDisabledCon = number.length === 10 && name.length >= 5
    const SignInDisabledCon = number.length === 10

    const LoggedName = Cookies.get('ACCESS_TOKEN');
    const LoggedUserNum = Cookies.get('ACCESS_TOKEN2');
    if (LoggedName !== undefined && LoggedUserNum !== undefined) {
        return <Navigate to="/" />
    }
    return (
        <div className="main">
            <div className="logo-con mobile">
                <img alt="let's chat" src="https://app.phenix.finance/static/media/phenix_logo.4a71bb46.svg" className="logo" />
                <span className="logo-text">Phenix </span>
            </div>
            <div className="desktop-image">
                <img src="https://freepikpsd.com/file/2019/11/flaming-phenix-png-Transparent-Images.png" alt="login" className="desktop-filler" />
            </div>
            <div className="login-container">
                <div className="logo-con desktop">
                    <img alt="let's chat" src="https://app.phenix.finance/static/media/phenix_logo.4a71bb46.svg" className="logo" />
                    <span className="logo-text">Phenix</span>
                </div>
                <div className="choose" >
                    <button onClick={() => {
                        setRegister(false)
                    }} className={`auth-btn ${register ? "" : "active-btn"}`} >
                        Sign In
                    </button>
                    <button onClick={() => {
                        setRegister(true)
                    }} className={`auth-btn ${register ? "active-btn" : ""}`}>
                        Sign Up
                    </button>
                </div>
                {
                    register && <><label htmfor="name" className="label">Name:</label><input placeholder="Enter your Name" className="form-input" id="name" type="text" value={name} onChange={(e) => {
                        setName(e.target.value);
                    }} /></>
                }

                <label htmfor="mobileNumber" className="label">Mobile Number:</label>
                <div className="form-input">
                    <span >+91</span><input placeholder="Enter your Mobile Number" className="number-input" id="mobileNumber" type="text" value={number} onChange={(e) => {
                        setNumber(e.target.value)
                    }} />
                </div>

                <div id="recaptcha-container"></div>
                <div className="btn-con">
                    <button className="btn" disabled={register ? !(SignUpDisabledCon) : !(SignInDisabledCon)} onClick={onSignInSubmit}>
                        {apiStatus ?
                            <TailSpin
                                height="30"
                                width="30"
                                color="#4fa94d"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                style={{ margin: "auto" }}
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            /> : "Submit"} </button>
                </div>
                {errMsg !== "" && <p className="errMsg">*{errMsg}</p>}
                {otpsent && ControlledPopup()}
            </div>
            <div >

            </div>

        </div >
    )
}

export default Login

