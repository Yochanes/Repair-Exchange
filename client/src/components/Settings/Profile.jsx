import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withYMaps } from "react-yandex-maps";
import { selectUser } from "../../slices/user.slice";
import { updateUser } from "../../services/user.service";
import '../../scss/profile.css'
import Sidebar from "../sidebar";
import "swiper/css";
import "swiper/css/navigation";
import {Link} from "react-router-dom";
import { selectUI } from "../../slices/ui.slice";


function Profile({ ymaps }) {
    const ui = useSelector(selectUI)
    const user = useSelector(selectUser)

    const [suceeded, setSuceeded] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        name: "",
        lastname: "",
        organization_name: "",
        address: "",
        specialty: "",
        main_business: "",
        bio: ""
    })
    const [gender, setGender] = useState("Мужской")
    const [business_model, setBusiness] = useState("Частный мастер")

    const getFormAttrs = (field) => {
        const attrs = { }

        attrs.value = form[field]
        attrs.onChange = (e) =>
            setForm((prev) => ({ ...prev, [field]: e.target.value }))

        return attrs
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        
        const geo = await ymaps.geocode(form.address, { results: 1 })
        const [address_latitude, address_longitude] =
            geo.geoObjects.get(0).geometry.getCoordinates()

        const payload = {
            ...form,
            address_latitude,
            address_longitude,
            gender,
            business_model
        }

        try {
            await updateUser(payload, user.id)
            setError("")
            setSuceeded(true)
        } catch (err) {
            setError(err.message)
            setSuceeded(false)
        }
    }

    useEffect(() => {
        if (ui.isAuthorized) {
            const master = user.master[0]
            const obj = {
                name: user.name,
                lastname: user.lastname,
                organization_name: master.organization_name || "",
                address: master.address || "",
                specialty: master.specialty || "",
                main_business: master.main_business || "",
                bio: master.bio || "",
            }
            setGender(master.gender)
            setBusiness(master.business_model)
            setForm(obj)
        }
    }, [ui.isAuthorized])
    useEffect(() => {
        document.title = 'Настройки';
    }, []);
    
    useEffect(() => {
        ymaps.ready(() => {
            const suggestView = new ymaps.SuggestView('suggest-input')
            suggestView.events.add("select", (e) => {
                setForm((prev) => ({
                    ...prev,
                    address: e.get('item').value
                }))
            })
        })
    }, [ymaps])

    return (
        <div className="main nal df">
            
            <Sidebar />
            <div className="block-info-7">

                <div className="setting df">
                    <div>
                        <h1>Настройки</h1>
                    </div>
                    <div>
                        <Link to="/master/settings">
                            <img src="/img/left-active.png" alt=""/>
                        </Link>
                        <Link to="/master/settings/services">
                            <img src="/img/img-right.png" alt=""/>
                        </Link>
                    </div>
                </div>

                <div className="mini-wrap mini-wrap_links df">
                    <Link  className="just" to="/master/settings"><h3 >Общие</h3></Link>
                    <Link  className="just active2" to="/master/settings/profile"><h3>Профиль</h3></Link>
                    <Link  className="just" to='/master/settings/services'><h3 >Услуги</h3></Link>
                    <Link className="just" to='/master/settings/pictures'><h3>Фото</h3></Link>
                </div>

                <div className="mini-main-2 df">
                    <form className="input-wrap-2" onSubmit={onSubmit}>
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
                        <input type="text" placeholder="Имя" {...getFormAttrs('name')} />
                        <input type="text" placeholder="Фамилия" {...getFormAttrs('lastname')}/>
                        <input
                            type="text"
                            placeholder="Адрес"
                            id="suggest-input"
                            {...getFormAttrs('address')}
                        />
                        <input type="text" placeholder="Название организации" {...getFormAttrs('organization_name')}/>
                        <input type="text" placeholder="Основной бизнес" {...getFormAttrs('main_business')}/>
                        <input type="text" placeholder="Вид деятельности" {...getFormAttrs('specialty')}/>
                        <textarea placeholder="О себе" {...getFormAttrs('bio')} />
                        <div>
                            <button type="submit" className="goooSaveButton">Сохранить</button>
                        </div>
                    </form>

                    <div className="check-input-content">
                        <div className="first-check">
                            <h4>Пол:</h4>
                            <div className="first_check df">
                                <input
                                    type="radio"
                                    name="select__man__woman"
                                    id="inputmanradiobtn"
                                    onChange={() => setGender("Мужской")}
                                    checked={gender === "Мужской"}
                                />
                                <label htmlFor="inputmanradiobtn"><p>Мужской</p></label>
                            </div>

                            <div className="first_check df">
                                <input
                                    type="radio"
                                    name="select__man__woman"
                                    id="inputwomanradiobtn"
                                    onChange={() => setGender("Женский")}
                                    checked={gender === "Женский"}
                                />
                                <label htmlFor="inputwomanradiobtn"><p>Женский</p> </label>
                            </div>
                        </div>

                        <div className="second-check">
                            <h4>Бизнес модель:</h4>
                            <div className="first_check df">
                                <input
                                    type="radio"
                                    name="select__service"
                                    id="yesornow"
                                    onChange={() => setBusiness("Частный мастер")}
                                    checked={business_model === "Частный мастер"}
                                />
                                <label htmlFor="yesornow"><p>Частный мастер</p></label>
                            </div>

                            <div className="first_check df">
                                <input
                                    type="radio"
                                    name="select__service"
                                    id="inputradioservicebtn"
                                    onChange={() => setBusiness("Сервис")}
                                    checked={business_model === "Сервис"}
                                />
                                <label htmlFor="inputradioservicebtn"><p>Сервис</p></label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default withYMaps(Profile, true, ['SuggestView', 'geocode']);
