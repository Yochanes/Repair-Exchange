import { useEffect, useState, useMemo } from "react";
import '../../scss/profileNumber.css'
import Sidebar from "../sidebar";
import '../../scss/swiper.css'
import { useSelector } from "react-redux";
import cx from "classnames"
import { Rating } from "react-simple-star-rating";
import { selectUser } from "../../slices/user.slice";
import { getFeedback, replyToFeedback } from "../../services/feedback.service";
import Popup from "reactjs-popup";
import SERVER_PATH from "../../constants/SERVER_PATH";

function App() {
    const [reply, setReply] = useState("")
    const [isReplyOpen, setReplyOpen] = useState(false)

    const user = useSelector(selectUser)
    const [feedback, setFeedback] = useState([])

    const onSubmit = (id) => () => {
        return replyToFeedback({
            id,
            master_response: reply
        }).then(() => {
            getFeedback(user.master[0].username).then(setFeedback)
        })
    }

    const formatDate = (date) => {
        const _date = new Date(date)
        return `${_date.getDate()}.${_date.getMonth() + 1}.${_date.getFullYear()}`
    }
    
    const feedbackByValue = useMemo(() => feedback
        .reduce((state, value) => (
            (state[value.rating - 1]++, state)
        ), [0, 0, 0, 0, 0]), [feedback])

    useEffect(() => {
        if (user.master) {
            getFeedback(user.master[0].username).then(setFeedback)
        }
    }, [user.master])

    useEffect(() => {
        document.title = 'Чат';
    }, []);

    return (
        <div className='main nal df'>
            <Sidebar />
            <div className="block-info-5">
                <div className="block-info-content-5 df">
                    <h1 className="roboto">Номер профиля {user.id}</h1>
                </div>

                <div className="content-box">
                    <div className="main-line">
                        <div className="line-content df">
                            <div className="img-line">
                                <img src="/img/img-small-star.png" alt="Star" />
                                <img src="/img/img-small-star.png" alt="Star" />
                                <img src="/img/img-small-star.png" alt="Star" />
                                <img src="/img/img-small-star.png" alt="Star" />
                                <img src="/img/img-small-star.png" alt="Star" />
                            </div>

                            <div className="big-line">
                            </div>

                            <div>
                                <p className="inter">{feedbackByValue[4]}</p>
                            </div>
                        </div>

                        <div className="line-content df">
                            <div className="img-line">
                                <img src="/img/img-small-star.png" alt="Star" />
                                <img src="/img/img-small-star.png" alt="Star" />
                                <img src="/img/img-small-star.png" alt="Star" />
                                <img src="/img/img-small-star.png" alt="Star" />
                                <img src="/img/img-small-star-white.png" alt="Star" />
                            </div>

                            <div className="big-line">
                            </div>

                            <div>
                                <p className="inter">{feedbackByValue[3]}</p>
                            </div>
                        </div>

                        <div className="line-content df">
                            <div className="img-line">
                                <img src="/img/img-small-star.png" alt="Star" />
                                <img src="/img/img-small-star.png" alt="Star" />
                                <img src="/img/img-small-star.png" alt="Star" />
                                <img src="/img/img-small-star-white.png" alt="Star" />
                                <img src="/img/img-small-star-white.png" alt="Star" />
                            </div>

                            <div className="big-line">
                            </div>

                            <div>
                                <p className="inter">{feedbackByValue[2]}</p>
                            </div>
                        </div>

                        <div className="line-content df">
                            <div className="img-line">
                                <img src="/img/img-small-star.png" alt="Star" />
                                <img src="/img/img-small-star.png" alt="Star" />
                                <img src="/img/img-small-star-white.png" alt="Star" />
                                <img src="/img/img-small-star-white.png" alt="Star" />
                                <img src="/img/img-small-star-white.png" alt="Star" />
                            </div>

                            <div className="big-line">
                            </div>

                            <div>
                                <p className="inter">{feedbackByValue[1]}</p>
                            </div>
                        </div>

                        <div className="line-content df">
                            <div className="img-line">
                                <img src="/img/img-small-star.png" alt="Star" />
                                <img src="/img/img-small-star-white.png" alt="Star" />
                                <img src="/img/img-small-star-white.png" alt="Star" />
                                <img src="/img/img-small-star-white.png" alt="Star" />
                                <img src="/img/img-small-star-white.png" alt="Star" />
                            </div>

                            <div className="big-line">
                            </div>

                            <div>
                                <p className="inter">{feedbackByValue[0]}</p>
                            </div>
                        </div>
                    </div>

                    {feedback.map((v) => (
                        <div className="portifoly-photo" key={v.id}>
                            <div className="portifoly-img df">
                                <img
                                    src={SERVER_PATH + v.client_avatar}
                                    width="66px"
                                    height="66px"
                                    style={{ borderRadius: "33px", objectFit: "cover" }}
                                    alt="Kiril"
                                />
                                <div>
                                    <h2 className="inter">{v.client_name} {v.client_lastname}</h2>
                                    <p className="inter">{formatDate(v.created_at)}</p>
                                </div>
                            </div>

                            <div className="star-portifoly df">
                                <Rating
                                    initialValue={user.master[0].rating}
                                    size="20"
                                    readonly
                                />
                            </div>

                            <div className="slider-main-content df">
                                <div className="content-portifoly">
                                    <h3 className="inter">Комментарий</h3>
                                    <p className="inter">{v.description}</p>
                                    <button
                                        className={cx({ "active-comment-button": !v.master_response })}
                                        onClick={() => !v.master_response && setReplyOpen(true)}
                                    >
                                        Оставить отзыв
                                    </button>
                                    <Popup
                                        open={isReplyOpen}
                                        onClose={() => setReplyOpen(false)}
                                        className="feedback-reply-modal"
                                    >
                                        <h2 className="feedback-reply-modal__title">
                                            Ответ на отзыв
                                        </h2>
                                        <textarea
                                            className="feedback-reply-modal__textarea"
                                            value={reply}
                                            onChange={(e) => setReply(e.target.value)}
                                            placeholder="Оставьте ответ на отзыв"
                                        />
                                        <button
                                            className="feedback-reply-modal__button"
                                            onClick={onSubmit(v.id)}
                                        >
                                            Отправить
                                        </button>
                                    </Popup>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default App;
