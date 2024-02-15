import React, { useEffect, useState, useMemo } from "react";
import { getOffers } from "../services/offer.service";
import '../scss/mysuggest.css'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/user.slice";
import Suggest from "./suggest";
import { useService } from "../hooks/useService";
import { getClientRequests } from "../services/request.service";
import SERVER_PATH from "../constants/SERVER_PATH";


function MySuggest() {
    const { id } = useParams()
    const requests = useService(getClientRequests, [])
    const offers = useService(getOffers.bind(null, id), [])
    const user = useSelector(selectUser)
    const req = useMemo(() =>
        requests.data.find((v) => v.id === Number(id)), [requests.data, id])

    const getDate = (exp) => {
        const d = new Date(Date.parse(exp) - Date.now())
        return `${d.getUTCHours()} ч., ${d.getUTCMinutes()} мин.`
    }

    useEffect(() => {
        document.title = 'Мое предложение';
    }, [id]);

    return (
        <section className="page_6">
            <div className="sentence font_inter mobile-sentence">
                <div className="sentence_text align">
                    <div className="sentence_text-1 mobile-sentence_text-1">
                        <h2>Мои предложения</h2>
                    </div>
                    <div className="sentence_but mobile-sentence_but">
                        <Link to="/client/requests"><button>Назад</button></Link>
                    </div>
                </div>
                <div className="big_id-block align mobile-big_id-block">
                    <div className="id_block df align">
                        <div className="bloc-1 df">
                            <div className="bloc_img">
                                <img
                                    src={SERVER_PATH + user.avatar}
                                    width="120px"
                                    height="120px"
                                    style={{ borderRadius: "60px", objectFit: "cover" }}
                                    alt=""
                                />
                            </div>
                            <div className="bloc_text">
                                <h2>{user.name} {user.lastname}</h2>
                                <h3>{user.phone}</h3>
                            </div>
                        </div>
                        <div className="bloc-2 df align mobile-bloc-2">
                            <Swiper pagination={true} navigation={{
                                nextEl: ".image-swiper-button-next",
                                prevEl: ".image-swiper-button-prev",
                            }} modules={[Navigation, Pagination]} slidesPerView="auto" className="mySwipetr mobile-mySwipetr">
                                <div className="swiper-button image-swiper-button-next">
                                    <img className="image-swiper-button-next" src="/img/sliderright.png" alt="asdfdsa" />
                                </div>
                                <div className="swiper-button image-swiper-button-prev">
                                    <img src="/img/sliderleft.png" alt="sdfdsa" />
                                </div>
                                {req?.pictures.map((v, i) => (
                                    <SwiperSlide className="swiper-slidetr sliderr pew97rtewug" key={i}>
                                        <img src={SERVER_PATH + v} alt="" className="vpupi" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className="tit df align mobile-tit">
                        <div className="title font_robo df">
                            <div className="title_text">
                                <h2>{req?.title}</h2>
                                <h3>{req?.description}</h3>
                            </div>
                            <div className="title_text-2">
                                <h2>
                                    {req?.client_price}₽
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="day font_robo df align">
                        <div className="day_text-1 mobile-day_text-1">
                            <h2>Осталось {getDate(req?.expires_at)}</h2>
                        </div>

                        <div className="day_text-2 df align-center">
                            <p style={{marginLeft: '10px'}}>Предложений: {req?.number_of_offers}</p>
                        </div>
                    </div>
                </div>
                <div className="sentence-2 font_abel">
                    <div className="sentaince_text mobile-sentaince_text">
                        {offers.data.length > 0 && (
                            <h2>Предложения мастеров</h2>
                        )}
                    </div>
                </div>
                {offers.data.map((v) => (
                    <Suggest key={v.id} {...v} />
                ))}
            </div>
            
        </section>
    )
}


export default MySuggest;