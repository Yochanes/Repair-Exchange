import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import '../../scss/added.css'
import "swiper/css";
import "swiper/css/navigation";
import { selectServices } from "../../slices/services.slice";
import { createRequest } from "../../services/request.service";

function Profile() {
    const fileInputRef = useRef()
    const navigate = useNavigate()
    const [URLSearchParams] = useSearchParams()
    const title = URLSearchParams.get('title')
    const services = useSelector(selectServices)

    const [error, setError] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [selectedCat, setSelectedCat] = useState("")
    const [selectedType, setSelectedType] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        const data = {
            title,
            description,
            client_price: price,
            service_type_id: Number(selectedType)
        }
        const files = fileInputRef.current?.files

        return createRequest({
            data,
            files
        }).then(() => {
            navigate("/client/requests")
        }).catch((err) => {
            if (err.message) {
                return setError(err.message)
            }
            setError("Проверьте корректность введённых данных")
        })
    }

    useEffect(() => {
        document.title = 'Добавить устройства';
    }, []);

    return (
        <section className="page_8">
            <div className="accommodation mobile-accommodation">
                <form className="g add-device-center df mobile-g" style={{ flexWrap: "wrap" }} onSubmit={onSubmit} >
                    <div className="h h-mobile">
                        <div className="accommodation_text df align">
                            <div className="accom_1 mobile-accom_1">
                                <h2>
                                    Разместить устройство которого нет в списке
                                </h2>

                                <h3>
                                    Как сделать лучшее описание, чтобы получить отклики лучших специалистов
                                </h3>

                            </div>

                        </div>
                        <div className="service_category">
                            <div className="service_category-text">
                                <h2>
                                    Категория услуги
                                </h2>
                            </div>
                            <div className="servis df align servis-mobile">
                                <div className="servics_text-big mobile-servics_text-big">
                                    <div className="servic_text df align servic_text-mobile">
                                        <div className="servic_img">
                                            <img src="/img/accommodation_img/Vector 100.png" alt="no photo"/>
                                        </div>

                                        <h2>Уточните обьем работ</h2>
                                    </div>

                                    <div className="servic_text df align servic_text-mobile">
                                        <div className="servic_img">
                                            <img src="/img/accommodation_img/Vector 100.png" alt="no photo"/>
                                        </div>
                                        <h2>Как можно точно опишите результат</h2>
                                    </div>

                                    <div className="servic_text df align servic_text-mobile">
                                        <div className="servic_img">
                                            <img src="/img/accommodation_img/Vector 100.png" alt="no photo"/>
                                        </div>

                                        <h2>Опишите с каким мастером вы хотите работать</h2>
                                    </div>
                                    <div className="description">
                                        <div className="description_text mobile-description_text">
                                            <h2>
                                                Детальное описание задачи
                                            </h2>
                                        </div>
                                        <div className="descrip df mobile-descrip">
                                            <div className="description_img mobile-description_img">
                                                <img src="/img/accommodation_img/Group.svg" alt="no photo"/>
                                            </div>

                                            <textarea required name="" id="" value={description} onChange={(e) => setDescription(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="big_headings">
                            <div className="heading">
                                <div className="heading_text mobile-heading_text">
                                    <h2>
                                        Рубрика
                                    </h2>
                                </div>
                                <div className="big_heading df align">
                                    <div className="heading_text-img mobile-heading_text-img">
                                        <img src="/img/accommodation_img/category.svg" alt="no photo"/>
                                    </div>

                                    <div className="select-device__box">
                                        <select
                                            className="pick__price"
                                            value={selectedCat}
                                            onChange={(e) => setSelectedCat(e.target.value)}
                                        >
                                            <option value="" disabled>Выберите вид услуги</option>
                                            {services.categories.map((v) => (
                                                <option value={v.id} key={v.id}>{v.name}</option>
                                            ))}
                                        </select>
                                        <select
                                            className="pick__price"
                                            value={selectedType}
                                            style={{ marginLeft: "10px" }}
                                            onChange={(e) => setSelectedType(e.target.value)}
                                            disabled={!selectedCat}
                                        >
                                            <option value="" disabled>Выберите устройство</option>
                                            {services.service_types.map((v) => Number(selectedCat) === v.category_id && (
                                                <option value={v.id} key={v.id}>{v.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="heading">
                                <div className="heading_text mobile-heading_text">
                                    <h2>
                                        Назначь цену себе
                                    </h2>
                                </div>
                                <div className="big_heading df align">
                                    <div className="heading_text-img mobile-heading_text-img">
                                        <img src="/img/accommodation_img/money.svg" alt="no photo"/>
                                    </div>

                                    <div className="heading_input df align">
                                        <input required type="text" placeholder="Назначь цену" value={price} onChange={(e) => setPrice(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="j">
                        <div className="accom_2 mobile-accom_2">
                            <h2>
                                Файлы
                            </h2>

                            <h3>
                                Загрузите до 10 файлов
                            </h3>
                        </div>

                        <div className="photo_upload">
                            <div className="photo_upload-img mobile-photo_upload-img">
                                <label htmlFor="upimg">
                                    <img src="/img/accommodation_img/photo.png" alt="no photo"/>
                                </label>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    multiple
                                    id="upimg"
                                    style={{display: "none"}}
                                    ref={fileInputRef}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="heading_button mobile-heading_button" style={{ width: "100%" }}>
                        {error && (
                            <div className="auth-err" style={{ maxWidth: "420px", margin: "auto", marginBottom: "20px" }}>
                                {error}
                            </div>
                        )}
                        <button type="submit">
                            Разместить
                        </button>
                    </div>
                </form>
                
            </div>
        </section>
    )
}


export default Profile;
