import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { Rating } from "react-simple-star-rating";
import { getMasterByUsername } from "../../services/user.service";
import { getMasterRepairs } from "../../services/service.service";
import { selectUser } from "../../slices/user.slice";
import { useService } from "../../hooks/useService";
import { getCovers, getCounters } from "../../services/index.service";
import { Link } from "react-router-dom";
import Map from '../Map'
import './master.css'
import { useSearchParams } from "react-router-dom";
import Popup from "reactjs-popup";
import SERVER_PATH from "../../constants/SERVER_PATH";


function App() {
    const [params] = useSearchParams()
    const [master, setMaster] = useState({ })
    const user = useSelector(selectUser)
    const repairs = useService(getMasterRepairs, [])
    const counters = useService(getCounters, { })
    const covers = useService(getCovers, [])
    const [picture, setPicture] = useState("")

    const masterId = params.get('id')
    const pics = params.get('pics')

    const masters = useMemo(() => repairs.data.reduce((state, repair) => {
        if (state.find((v) => v.id === repair.master_id)) {
            return state
        }

        return [...state, {
            id: repair.master_id,
            latitude: repair.address_latitude,
            longitude: repair.address_longitude
        }]
    }, []), [repairs.data, user.master])

    const onMasterSelect = (e, data) => {
        getMasterByUsername(data).then(setMaster)
    }

    useEffect(() => {
        if (pics) {
            setTimeout(() => {
                document.documentElement.scrollTop =
                    document.documentElement.scrollHeight - document.documentElement.clientHeight
            }, 1000);
        }
    }, [])

    useEffect(() => {
        if (masterId) {
            getMasterByUsername(masterId).then(setMaster)
        }

        document.title = 'Контакты';
    }, [masterId])

    return (
        <main>
            <section className="slider">
                <div className="container">
                    <div className="slider__content">
                        <h2>
                            Для любой поломки есть мастер техники
                            Apple
                        </h2>
                        <h4>Оригинальные запчасти</h4>
                        <h4>Разумные цены</h4>
                        <h4>Выезд</h4>
                        <div className="home-counters">
                            <div className="home-counters__top">
                                <div className="header-counters__dot"></div>
                                <div className="header-counters__item">
                                    Количество участников на сайте: {counters.data.masters}
                                </div>
                                <div className="header-counters__dot"></div>
                                <div className="header-counters__item">
                                    Выполнено заказов на сайте: {counters.data.submissions}
                                </div>
                            </div>
                            <Link
                                to="/register"
                                className="home-counters__button"
                            >
                                    Стать участником
                            </Link>
                        </div>
                    </div>
                    <Swiper
                        navigation={true}
                        modules={[Navigation, Pagination]}
                        pagination={true}
                        className="mySwiper"
                    >
                        {covers.data.map((v) => (
                            <SwiperSlide className='pqw9ueryewqir' key={v.id}>
                                <img
                                    className='swiper-slide-asfdfadsXg afewrweq'
                                    src={SERVER_PATH + v.image}
                                    alt=""
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
            <section className="master__map">
                <h1 className="master__map__title">Карта наших мастеров </h1>
                <Map
                    masters={masters}
                    selectedMaster={master}
                    selectMaster={onMasterSelect}
                />
            </section>
            <div className="section">
                {master.username && (
                    <React.Fragment>
                        <h1 className="info__service">Информация о мастере</h1>
                        <div className="content__info">
                            <div className="oeeqwhfpihaepPUihf">
                                <section className="page_qrwewq9DXP79fg1">
                                    <div>
                                        <div className="cardfdsfsda font">
                                            <div className="card_iphone df">
                                                <div className="card_iphone-img">
                                                    <img
                                                        src={SERVER_PATH + master.avatar}
                                                        alt=""
                                                        style={{
                                                            width: "100px",
                                                            height: "100px",
                                                            borderRadius: "50px",
                                                            objectFit: "cover"
                                                        }}
                                                    />
                                                </div>
                                                <div className="big_card-phon_text">
                                                    <div className="card_iphone-text">
                                                        <h2>
                                                            {master.name} {master.lastname}
                                                        </h2>

                                                        <h3>
                                                            {master.business_model}
                                                        </h3>
                                                    </div>
                                                    <div className="card_iphone-img_2">
                                                        <Rating
                                                            initialValue={master.rating}
                                                            allowFraction
                                                            readonly
                                                            size="28"
                                                        />
                                                    </div>
                                                    <div className="card_iphone-text_3">
                                                        <Link to={"/client/feedback/" + master.username}>
                                                            {master.number_of_feedbacks} отзывов
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="organization_names">
                                                <div className="organization_text">
                                                    <h2>
                                                        {master.address}
                                                    </h2>
                                                </div>
                                            </div>
                                            <div className="infrormation">
                                                <div className="big_infoo df">
                                                    <div className="information_text df">
                                                        <div className="infoo_text">
                                                            <h2>На сайте:</h2>
                                                            <h2>Статус:</h2>
                                                            <h2>Оценка:</h2>
                                                        </div>

                                                        <div className="infoo_text-2">
                                                            <h2>с 2023 года</h2>
                                                            <h3>Оффлайн</h3>
                                                            <h3>{master.rating}</h3>
                                                        </div>
                                                    </div>
                                                    <div className="infoo_button">
                                                        <div className="but">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="asfdsafdspouhfewo">
                                <div className="center__all__asfsiahg">
                                    <div className="swiper-button image-swiper-button-next">
                                        <img className="image-swiper-button-next" src="../img/sliderright.png" alt="asdfdsa" />
                                    </div>
                                    <div className="swiper-button image-swiper-button-prev">
                                        <img src="../img/sliderleft.png" alt="sdfdsa" />
                                    </div>
                                    <Swiper
                                        pagination={true}
                                        navigation={{
                                            nextEl: ".image-swiper-button-next",
                                            prevEl: ".image-swiper-button-prev",
                                        }}
                                        modules={[Pagination, Navigation]}
                                        className="mySwipetr qrpeqw9grfuilbdsjn"
                                        slidesPerView="auto"
                                    >
                                        {master.pictures.map((v) => (
                                            <SwiperSlide key={v} className="swiper-slidetr asfpwruwegiahbdfls sliderr">
                                                <img
                                                    className="contact-master__picture"
                                                    src={SERVER_PATH + v}
                                                    alt=""
                                                    onClick={() => setPicture(SERVER_PATH + v)}
                                                />
                                                <button
                                                    className="contact-master__open-button"
                                                    onClick={() => setPicture(SERVER_PATH + v)}
                                                >
                                                    Открыть картинку
                                                </button>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <Popup
                                        open={picture !== ""}
                                        onClose={() => setPicture("")}
                                        className="contact-master__modal"
                                    >
                                        <img src={picture} className="contact-master-modal__picture" />
                                    </Popup>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </div>
            
        </main>
    )
}


export default App;
