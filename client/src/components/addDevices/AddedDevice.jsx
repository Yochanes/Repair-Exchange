import { useState } from 'react'
import cn from 'classnames'
import { Link } from "react-router-dom"
import Popup from "reactjs-popup";
import formatDate from '../../utilities/formatDate';
import { deleteRequest, updateRequest } from '../../services/request.service';

const StatusEnum = {
    ACTIVE: "Активно",
    PAUSED: "Приостановлено",
    WORKING: "В процессе",
    COMPLETED: "Выполнено",
    CANCELED: "Отменено"
}

const AddedDevice = (props) => {
    const {
        id,
        title: titleProps,
        client_price,
        description,
        number_of_offers,
        status: statusProps,
        onUpdate: onDeviceUpdate,
        created_at
    } = props

    const [price, setPrice] = useState(client_price)
    const [title, setTitle] = useState(titleProps)
    const [message, setMessage] = useState(description)
    const [status, setStatus] = useState(statusProps)

    const isEditable = status === StatusEnum.ACTIVE
        || status === StatusEnum.PAUSED

    const onSubmit = (e) => {
        e.preventDefault()

        return updateRequest({
            id,
            title,
            client_price: price,
            description: message,
            status
        }).then(() => onDeviceUpdate())
    }

    const onDelete = (e) => {
        e.preventDefault()
        return deleteRequest(id)
            .then(() => onDeviceUpdate())
    }

    const buttonClassName = cn('dubl-btn-free', {
        "dubl-btn": status === StatusEnum.ACTIVE,
        "dubl-but": status === StatusEnum.PAUSED
    })

    return (
        <div className="archive-hee">
            <div className="nav_applications-3 df align mobile-nav_applications-3">
                <div className="nav_applications-text mobile-nav_applications-text">
                    <h2>{titleProps}</h2>
                </div>
                <div className="nav_applications-2 df mobile-nav_applications-2">
                    <div className="applications_text-2 df align mobile-applications_text-2">
                        <h4>{client_price}₽</h4>

                        {status === StatusEnum.ACTIVE ? (
                            <Link to={"/client/offers/" + id}>
                                <h3>{number_of_offers}</h3>
                            </Link>
                        ) : (
                            <h3 className='number-of-offers'>{number_of_offers}</h3>
                        )}

                        <div className="double_buttons">
                            <span className={buttonClassName}>{status}</span>
                        </div>
                        <div className="nav_applications-3">
                            <div className="nav_applications-img">
                                {isEditable && (
                                    <form onSubmit={onSubmit}>
                                        {status === StatusEnum.ACTIVE ? (
                                            <button className='btn-rand'>
                                                <img src="/img/added_img/pause.svg" onClick={() => setStatus(StatusEnum.PAUSED)} alt="no photo" />
                                            </button>
                                        ) : (
                                            <button className='btn-rand'>
                                                <img src="/img/added_img/pause.png" onClick={() => setStatus(StatusEnum.ACTIVE)} alt="no photo" />
                                            </button>
                                        )}
                                    </form>
                                )}
                                <Popup
                                    trigger={isEditable && <img src="/img/added_img/pencil.svg" alt="no photo" />}
                                    modal
                                    nested
                                >
                                    {close => (
                                        <div className="modal-content order_edit-modal" style={{ textAlign: "center" }}>
                                            <span onClick={close}><img className="close" src="/img/img-delete.png" alt="" /></span>
                                            <h1>Изменить заказ</h1>
                                            <p>Поменяйте цену, виды ремонта, если они Вас не устраивают.</p>
                                            <form onSubmitCapture={onSubmit} onSubmit={close}>
                                                <input type="text" placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                <input type="text" placeholder="Цена" value={price} onChange={(e) => setPrice(e.target.value)} />
                                                <textarea className="descdetail" placeholder='Сообщение клиенту' style={{ resize: 'none' }} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                                <button className="done" type='submit'>Отправить</button>
                                            </form>
                                        </div>
                                    )}
                                </Popup>
                                <Popup
                                    trigger={isEditable && <img src="/img/added_img/fluent.svg" alt="no photo" />}
                                    modal
                                    nested
                                >
                                    {close => (
                                        <div className="modal-content" style={{ textAlign: "center" }}>
                                            <span onClick={close}><img className="close" src="/img/img-delete.png" alt="" /></span>
                                            <h1>Подтверждение удаления</h1>
                                            <p>Вы подтверждаете остановку проекта? Продавцы не смогут больше добавлять в него свои предложения.</p>
                                            <div className="df" style={{ justifyContent: "center" }}>
                                                <form onSubmitCapture={onDelete} onSubmit={close}>
                                                    <button className="done btn_6PopUp" type='submit' onClick={() => setStatus(StatusEnum.CANCELED)}>Удалить</button>
                                                    <button className="done btn_6PopUpBack" type='button' style={{ marginLeft: '10px' }} onClick={close}>Отмена</button>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </Popup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nav_list-1_info df align mobile_nav_list-1_info" style={{ paddingLeft: '40px', paddingTop: '10px' }}>
                <div className="inf_text-1">
                    <h2>Опубликованно {formatDate(created_at)}</h2>
                </div>
            </div>
        </div>
    )
}

export default AddedDevice
