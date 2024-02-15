import React, { useEffect, useRef, useState } from "react";
import { updateUserPhoto } from "../../services/user.service";
import Sidebar from "../sidebar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/user.slice";
import './startff.css'
import SERVER_PATH from "../../constants/SERVER_PATH";


function App() {
    const user = useSelector(selectUser)

    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState("")
    const inputRef = useRef(null)

    useEffect(() => {
        document.title = 'Настройки';
    }, []);
    
    const onProfilePicUpdate = async (e) => {
        e.preventDefault()
        const file = inputRef.current?.files[0]

        if (file) {
            updateUserPhoto(file, user.id)
                .then(() => { setSucceeded(true); setError("") })
                .catch((err) => { setSucceeded(false); setError(err.message) })
        }
    }

    return (
        <div className="main nal df">
            <div className="block-info-7">

                <div className="setting settingasfds df">
                    <div>
                        <h1>Настройки</h1>
                    </div>
                    <div>
                        <Link to="/client/settings">
                            <img src="/img/left-active.png" alt="" />
                        </Link>
                        <img src="/img/right-disable.png" alt="" />
                    </div>
                </div>

                <div className="mini-wrap fasdfqwtwqtrttt mini-wrap_links df">
                    <Link className="just" to="/client/settings"><h3>Профиль</h3></Link>
                    <Link className="just active2" to='/client/settings/picture'><h3 >Фотография </h3></Link>
                </div>

                <div className="block-info-12">
                    {error && (
                        <div className="auth-err" style={{ marginTop: "10px" }}>
                            {error}
                        </div>
                    )}
                    {succeeded && (
                        <div className="succeed-v" style={{ marginTop: "10px" }}>
                            Данные были успешно изменены
                        </div>
                    )}
                    <div className="photo-taking">
                        <form onSubmit={onProfilePicUpdate} style={{ marginTop: "20px" }}>
                            <label htmlFor="upfile">
                                <img
                                    src={user.avatar ? SERVER_PATH + user.avatar : "/img/img-camera.png"}
                                    alt=""
                                    className="settings-picture"
                                />
                            </label>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                id="upfile"
                                style={{ display: "none" }}
                                ref={inputRef}
                            />
                            <div className="block-btn bgpuherpte df">
                                <button className="btn-9 goooSaveButton">Изменить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default App;
