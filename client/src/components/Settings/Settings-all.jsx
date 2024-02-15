import { useEffect, useState, useRef } from "react";
import { updateUserPhoto, updateUser } from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../slices/user.slice";
import '../../scss/settings-all.css'
import Sidebar from "../sidebar";
import "swiper/css";
import "swiper/css/navigation";
import SettingNav from "./Setting-nav";
import VerificationInput from "../VerificationInput";
import { Link, useNavigate } from "react-router-dom";
import { selectUI, setAuthorization } from "../../slices/ui.slice";
import { deleteUser } from "../../services/user.service";
import Popup from "reactjs-popup";
import SERVER_PATH from "../../constants/SERVER_PATH";

function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const inputRef = useRef(null)

    const [deleteAccount, setDeleteAccount] = useState(false)
    const [suceeded, setSuceeded] = useState(false)
    const [error, setError] = useState("")
    const user = useSelector(selectUser)
    const ui = useSelector(selectUI)

    const [form, setForm] = useState({
        phone: "",
        email: "",
        availability_from: "00:00:00",
        availability_to: "00:00:00",
        status: "",
        mailing: false,
        is_active: false
    })

    const getFormAttrs = (field) => {
        const attrs = { }

        attrs.value = form[field]
        attrs.onChange = (e) =>
            setForm((prev) => ({ ...prev, [field]: e.target.value }))

        return attrs
    }

    const onSubmit = (e) => {
        e.preventDefault()
        updateUser(form, user.id)
            .then(() => { setSuceeded(true); setError("") })
            .catch((err) => { setError(err.message); setSuceeded(false) })
    }

    const onProfilePicUpdate = async (e) => {
        e.preventDefault()
        const file = inputRef.current.files[0]

        if (file) {
            return updateUserPhoto(file, user.id)
                .then(() => { setSuceeded(true); setError("") })
                .catch((err) => { setError(err.message); setSuceeded(false) })
        }
    }
    
    const onDelete = (e) => {
        e.preventDefault()
        return deleteUser().then(() => {
            dispatch(setAuthorization(false))
            navigate("/")
        })
    }

    useEffect(() => {
        if (ui.isAuthorized) {
            const master = user.master[0]
            const obj = {
                phone: user.phone,
                email: user.email,
                availability_from: master.availability_from || form.availability_from,
                availability_to: master.availability_to || form.availability_to,
                status: master.status || "",
                mailing: master.mailing,
                is_active: master.is_active
            }
            setForm(obj)
        }
    }, [ui])
    useEffect(() => {
        document.title = 'Настройки';
    }, []);

    return (
        <div className='main nal df'>
            <Sidebar/>
            <div className="block-info-6">
                <div className="setting  df">
                    <div>
                        <h1>Настройки</h1>
                    </div>
                    <div>
                        <img src="/img/img-left.png" alt=""/>
                        <Link to="/master/settings/profile">
                            <img src="/img/img-right.png" alt=""/>
                        </Link>
                    </div>
                </div>

                <div className="mini-wrap mini-wrap_links df">
                    <Link className="just active2" to="/master/settings"><h3>Общие</h3></Link>
                    <Link className="just" to="/master/settings/profile"><h3>Профиль</h3></Link>
                    <Link className="just" to='/master/settings/services'><h3 >Услуги</h3></Link>
                    <Link className="just" to='/master/settings/pictures'><h3>Фото</h3></Link>
                </div>

                    <div className="mini-main df">
                        <form onSubmit={onSubmit}>
                            <div className="input-wrap">
                                {suceeded && (
                                    <div className="succeed-v">
                                        Данные успешно обновлены
                                    </div>
                                )}
                                {error && (
                                    <div className="auth-err">
                                        {error}
                                    </div>
                                )}
                                <input defaultValue={user?.master?.[0]?.username} disabled placeholder="Логин" />
                                <div className="height">
                                    <VerificationInput isConfirmed={user.is_phone_verified} {...getFormAttrs('phone')} />
                                </div>
                                <VerificationInput isEmail isConfirmed={user.is_email_verified} {...getFormAttrs('email')} />
                                <div className="height">
                                    <input type="text" placeholder="Новый пароль"/>
                                    <img src="/img/img-eye.png" alt="" className="eye img"/>
                                </div>
                                <div className="height">
                                    <input type="text" placeholder="Подтверждение пароля"/>
                                    <img src="/img/img-almost-eye.png" alt="" className="almost-eye img" />
                                </div>
                                <input type="time" placeholder="Со скольки времени Вы на связи" {...getFormAttrs('availability_from')}/>
                                <input type="time" placeholder="До скольки времени Вы на связи" {...getFormAttrs('availability_to')} />
                                <input type="text" placeholder="Статус не более 40 символов" {...getFormAttrs('status')} />
                                <label className="checkbox">
                                    <input
                                        type="checkbox"
                                        checked={form.mailing}
                                        onChange={(e) => setForm((prev) => ({ ...prev, mailing: e.target.checked }))}
                                    />
                                    Email-рассылка
                                </label>
                                <label className="checkbox">
                                    <input
                                        type="checkbox"
                                        checked={form.is_active}
                                        onChange={(e) => setForm((prev) => ({ ...prev, is_active: e.target.checked }))}
                                    />
                                    Получать заказы
                                </label>
                                <div>
                                    <button type="submit" className="goooSaveButton">Сохранить</button>
                                    <button type="button" className="goooSaveButton" onClick={() => setDeleteAccount(true)}>Удалить аккаунт</button>
                                    <Popup
                                        open={deleteAccount}
                                        onClose={() => setDeleteAccount(false)}
                                        className="delete-modal"
                                    >
                                        <h3 className="delete-modal__title">Вы уверены?</h3>
                                        <p className="delete-modal__info">При удалении аккаунты все данные, связанные с вами будут удалены.</p>
                                        <div className="delete-modal__actions">
                                            <button className="delete-modal__button" onClick={onDelete}>Удалить аккаунт</button>
                                            <button className="delete-modal__button" onClick={() => setDeleteAccount(false)}>Отмена</button>
                                        </div>
                                    </Popup>
                                </div>
                            </div>
                        </form>

                        <div className="photo-wrap">
                            <label htmlFor="prifielLogoUpload">
                                <img
                                    src={user.avatar ? SERVER_PATH + user.avatar : "/img/img-camera.png"}
                                    alt=""
                                    className="settings-picture"
                                />
                            </label>
                            <form onSubmit={onProfilePicUpdate}>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    style={{display: "none"}}
                                    className='prifielUpload'
                                    id="prifielLogoUpload"
                                    ref={inputRef}
                                />
                                <div className="links">
                                    <button className="link-4">Изменить</button>
                                </div>
                            </form>
                            
                        </div>
                </div>
            </div>
        </div>
)
}


export default App;
