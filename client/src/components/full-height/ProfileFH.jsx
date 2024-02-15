import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/user.slice";
import { updateUser } from "../../services/user.service";
import VerificationInput from "../VerificationInput";
import { Link } from "react-router-dom";


function ProfileFH() {
    const user = useSelector(selectUser)

    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        name: "",
        lastname: "",
        phone: "",
        email: "",
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
            .then(() => { setSucceeded(true); setError("") })
            .catch((err) => { setSucceeded(false); setError(err.message) })
    }

    useEffect(() => {
        if (user.name) {
            const obj = { }
            
            for (const key of Object.keys(form)) obj[key] = user[key]

            setForm(obj)
        }
    }, [user])
    useEffect(() => {
        document.title = 'Настройки';
    }, []);

    return (
        <div className="main nal df">
            <div className="block-info-7">
                <div className="setting settingasfds df">
                    <div>
                        <h1>Настройки</h1>
                    </div>
                    <div>
                        <img src="/img/img-left.png" alt=""/>
                        <Link to="/client/settings/picture">
                            <img src="/img/img-right.png" alt=""/>
                        </Link>
                    </div>
                </div>

                <div className="mini-wrap fasdfqwtwqtrttt mini-wrap_links df">
                    <Link  className="just active2" to="/client/settings"><h3>Профиль</h3></Link>
                    <Link  className="just" to='/client/settings/picture'><h3>Фотография </h3></Link>
                </div>

                {succeeded && (
                    <div className="succeed-v" style={{ marginTop: "20px", marginBottom: "-30px" }}>
                        Данные были успешно изменены
                    </div>
                )}
                {error && (
                    <div className="auth-err" style={{ marginTop: "20px", marginBottom: "-30px" }}>
                        {error}
                    </div>
                )}
                <div className="mini-main-2 df">
                    <form onSubmit={onSubmit} className="input-wrap-2">
                        <input type="text" placeholder="Имя" {...getFormAttrs('name')}/>
                        <input type="text" placeholder="Фамилия" {...getFormAttrs('lastname')}/>
                        <VerificationInput isConfirmed={user.is_phone_verified} {...getFormAttrs('phone')} />
                        <VerificationInput isEmail isConfirmed={user.is_email_verified} {...getFormAttrs('email')} />
                        <input type="password" placeholder="Новый пароль"/>
                        <input type="password" placeholder="Подтверждение пароля"/>
                        <button type="submit">Сохранить</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ProfileFH;
