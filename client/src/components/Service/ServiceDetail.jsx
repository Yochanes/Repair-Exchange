import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigation } from "swiper";
import { useNavigate, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import { selectUser } from "../../slices/user.slice";
import { selectServices } from "../../slices/services.slice";
import { getMasterByUsername } from "../../services/user.service";
import { createOrder } from "../../services/order.service";
import { useService } from "../../hooks/useService";
import { getServiceRepairsByDeviceId } from "../../services/service.service";
import Map from '../Map'
import ServiceDetailContext from "./ServiceDetailContext"
import ServiceDetailCard from "./ServiceDetailCard"
import ServiceDetailPrice from "./ServiceDetailPrice"
import '../../scss/media.css'
import '../../scss/detail.scss'
import { getMasterRepairs } from "../../services/service.service";
import SERVER_PATH from "../../constants/SERVER_PATH";

function ServiceDetail() {
    const navigate = useNavigate()
    const { id } = useParams()

    const user = useSelector(selectUser)
    const services = useSelector(selectServices)
    const repairMasters = useService(getMasterRepairs, [])
    const device = useMemo(() =>
        services.devices.find((v) => v.id === +id) || { }, [services.devices, id])

    const [show, setShow] = useState(false)

    const [formError, setFormError] = useState("")
    const [selected, setSelected] = useState([])
    const selectedValue = useMemo(() => ({ selected, setSelected }), [selected])

    const [selectedMaster, setSelectedMaster] = useState({ })

    const onSelectMaster = (e, data) => {
        return getMasterByUsername(data)
            .then(setSelectedMaster)
    }

    const [invoice, setInvoice] = useState({
        final: 0,
        list: []
    })
    const [description, setDescription] = useState("")

    const masters = useMemo(() =>
        repairMasters.data.reduce((arr, {
            master_id,
            repair_id,
            address_latitude,
            address_longitude
        }) => {
            if (arr.find((v) => v.id === master_id)) {
                return arr
            }
            const repairService = services.repair_types.find(({ id: repid, device_id }) =>
                device_id === +id && repair_id === repid)
            if (!repairService) {
                return arr
            }
            if (master_id === user.master?.[0]?.username) {
                return arr
            }

            return [...arr, {
                id: master_id,
                latitude: address_latitude,
                longitude: address_longitude
            }]
        }, []),
        [repairMasters.data, user.master, services]
    )
    const repairFiltered = useMemo(() =>
        repairMasters.data.reduce((arr, { master_id, repair_id, price, time }) => {
            if (master_id !== selectedMaster.username) {
                return arr
            }

            const repairService = services.repair_types.find(({ id: repid, device_id }) =>
                device_id === +id && repair_id === repid)
            if (!repairService) {
                return arr
            }

            arr.push({ ...repairService, price, time })
            return arr
        }, []), [selectedMaster.username]
    )

    useEffect(() => {
        const invoiceDefault = {
            final: 0,
            list: []
        }
        const invoice = selected.reduce((state, value) => {
            const { name, price } = repairFiltered.find((v) => v.id === value)
            return {
                final: state.final + price,
                list: [...state.list, {
                    name,
                    price
                }]
            }
        }, invoiceDefault)
        setInvoice(invoice)
    }, [selected])

    const [search, setSearch] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        const payload = {
            client_message: description,
            client_price: invoice.final,
            repairs_id: selected,
            device_id: +id,
            master_username: selectedMaster.username
        }

        return createOrder(payload)
            .then(() => navigate("/client/chat"))
            .catch((err) => setFormError(err.message))
    }

    useEffect(() => {
        document.title = device.name;
    }, [device]);

    const [goToR, isgoToR] = useState(false)

    return (
        <ServiceDetailContext.Provider value={selectedValue}>
            <div>
                <section className="main__info container detail-container">
                    <div className="main__info__content">
                        <h1>Стоимость услуг по ремонту <strong>{device.name}</strong></h1>
                        <div className="df align-center">
                            <img src="/img/search.png" className="paugfheotw" alt="" />
                            <input
                                type="text"
                                placeholder="Поиск..."
                                className="searchaproblemEnter"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="order__cards__to__scrolls" style={{ width: "765px" }}>
                            {repairFiltered?.length ? (
                                search.length > 0 ? (repairFiltered.map((v) => v.description.toLowerCase().includes(search.toLowerCase()) && (
                                    <ServiceDetailCard {...v} key={v.id} />
                                ))) : (repairFiltered?.map((v) => (
                                    <ServiceDetailCard {...v} key={v.id} />
                                )))
                            ) : (
                                <h1>Для отображения услуг выберите мастера на карте ниже.</h1>
                            )}
                            
                        </div>
                        <button id="myBtn" onClick={() => { setShow(true) }}> Оформить заказ</button>

                        <div className="popupdetailfwpruhwe" style={show ? null : {display: 'none'}}>
                            <div className="modfdfsdafasal-content">
                                <div className={goToR ? "modal-content model-content-fooo oformitzayavka gomodaldetailfgg werwertttt" : "modal-content oformitzayavka model-content-fooo werwertttt"}>
                                    <span onClick={() => {
                                        setShow(false)
                                    }}
                                    ><img className="close" src="/img/img-delete.png" alt="" /></span>
                                    <h1 className="detailpopuptitle">Оформить заказ</h1>
                                    <p>Официальные цены можете дальше не заходить</p>
                                    <form onSubmit={onSubmit}>
                                        {formError && (
                                            <div className="auth-err">
                                                {formError}
                                            </div>
                                        )}
                                        <div className="df">
                                            <input type="text" placeholder="Ваше имя" defaultValue={user.name} disabled />
                                            <input className="ismrf" type="text" placeholder="Номер телефона" defaultValue={user.phone} disabled />
                                        </div>
                                        <textarea
                                            className="descdetail"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Описание проблемы"
                                            cols="30"
                                            rows="10"
                                        />
                                        <div className="service-detail-modal__price">
                                            <ul className="service-detail-modal-price__list">
                                                {invoice.list.map((v, i) => (
                                                    <li className="service-detail-modal-price__item" key={i}>
                                                        <span className="service-detail-modal-price__name">{v.name} — </span>
                                                        <span className="service-detail-modal-price__price">{v.price}₽</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="service-detail-modal-price__final">Итого: {invoice.final}₽</div>
                                        </div>
                                        <button
                                            className="done"
                                            type='submit'
                                        >
                                            Отправить
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="main__info__image">
                        <img
                            src={SERVER_PATH + device.picture}
                            alt=""
                            style={{
                                width: "540px",
                                height: "570px",
                                objectFit: "contain"
                            }}
                        />
                        <p>
                            Запчасти для ремонта уже включены в стоимость работы.
                            Это окончательная цена
                        </p>
                    </div>
                </section>
                <section className="detail__price">
                    <div className="container detail-price-container">
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={30}
                            navigation={true}
                            modules={[Navigation]}
                            className="mySwiper"
                            breakpoints={{
                                0: {
                                    slidesPerView: 2
                                },
                                800: {
                                    slidesPerView: 3
                                },
                                1124: {
                                    slidesPerView: 4
                                },
                            }}
                        >
                            {repairFiltered?.map((v) => (
                                <SwiperSlide className="sliderr" key={v.id}>
                                    <ServiceDetailPrice
                                        {...v}
                                        price={v.price}
                                        repair_id={v.repair_id}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>
                <section className="map">
                    <Map
                        masters={masters}
                        selectedMaster={selectedMaster}
                        selectMaster={onSelectMaster}
                    />
                </section>
            </div>
        </ServiceDetailContext.Provider>
    )
}

export default ServiceDetail
