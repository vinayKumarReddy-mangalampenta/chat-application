import Cookies from "js-cookie";
import "../Login/index.css"
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate()
    const logout = () => {
        Cookies.remove('ACCESS_TOKEN')
        Cookies.remove('ACCESS_TOKEN2')
        navigate("/login", { replace: true })
    }
    return (
        <>
            <div className="Header">
                <div className="logo-con">
                    <img alt="let's chat" src="https://app.phenix.finance/static/media/phenix_logo.4a71bb46.svg" className="logo" />
                    <span className="logo-text">Phenix</span>
                </div>
                <h2 > Chat </h2>
                <button className="btn" onClick={logout}>Logout</button>
            </div>
        </>
    );
}

export default Header;