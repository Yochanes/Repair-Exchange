import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectUser } from "../../slices/user.slice"
import Sidebar from "../sidebar"
import { updateMasterPictures } from "../../services/user.service"
import SERVER_PATH from "../../constants/SERVER_PATH"

const Pictures = (props) => {
    const user = useSelector(selectUser)
    const userPictures = user.master?.[0]?.pictures
        .filter((v) => v !== "")
    const [pics, setPics] = useState([])

    useEffect(() => {
        if (user.master) {
            setPics(userPictures)
        }
    }, [user])

    const pictureInputRef = useRef(null)

    const onSubmit = (e) => {
        e.preventDefault()
        const files = [
            ...pictureInputRef.current.files,
            ...pics
        ]
        return updateMasterPictures(user.id, files).then((v) => {
            const filename = pictureInputRef.current.files[0]?.name

            console.log(v)

            if (filename) {
                setPics((prev) => [...prev, "files/" + filename])
                pictureInputRef.current.value = null
            }
        })
    }

    const getDeleteHandle = (name) => (e) => {
        e.preventDefault()
        return updateMasterPictures(
            user.id,
            pics.filter((v) => v !== name),
        ).then(() => {
            setPics((prev) => prev.filter((v => v !== name)))
        })
    }

    return (
        <div className='main nal df'>
            <Sidebar />
            <div className="block-info-6">
                <div className="setting df">
                    <div>
                        <h1>Настройки</h1>
                    </div>
                    <div>
                        <Link to="/master/settings/services">
                            <img src="/img/left-active.png" alt=""/>
                        </Link>
                        <img src="/img/right-disable.png" alt=""/>
                    </div>
                </div>

                <div className="mini-wrap mini-wrap_links df">
                    <Link className="just" to="/master/settings"><h3>Общие</h3></Link>
                    <Link className="just" to="/master/settings/profile"><h3>Профиль</h3></Link>
                    <Link className="just" to='/master/settings/services'><h3 >Услуги</h3></Link>
                    <Link className="just active2" to='/master/settings/pictures'><h3>Фото</h3></Link>
                </div>

                <div className="master-settings-pics">
                    <div className="master-settings-pics__list">
                        {pics.map((v) => (
                            <div className="master-settings-pics__item" key={v}>
                                <img className="master-settings-pics__img" src={SERVER_PATH + v} />
                                <button
                                    className="master-settings-pics__delete"
                                    onClick={getDeleteHandle(v)}
                                >
                                    Удалить
                                </button>
                            </div>
                        ))}
                    </div>
                    <form className="master-settings-pics__form" onSubmit={onSubmit}>
                        <input
                            className="master-settings-pics__input"
                            ref={pictureInputRef}
                            type="file"
                            accept="image/png, image/jpeg"
                        />
                        <button className="master-settings-pics__button">Сохранить</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Pictures
