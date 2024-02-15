import { useEffect } from "react";
import { Link } from "react-router-dom";
import AddedDevice from "./AddedDevice";
import './added-devices.css'
import { useService } from "../../hooks/useService";
import { getClientRequests } from "../../services/request.service"

function AddedDevices() {
    const requests = useService(getClientRequests, [])
    const filteredRequests = requests.data.filter((v) =>
        v.status !== "Отменено" &&
        v.status !== "Выполнено" &&
        v.status !== "Подтверждено"
    )
    const onDeviceUpdate = (e) => requests.refetch()

    useEffect(() => {
        document.title = 'Добавленные устройства';
    }, []);

    return (
        <section className="page_7">
            <div className="container_added mobile-container_added">
                <div className="adding_devices font_abel">
                    <div className="device">
                        <div className="device_text-2">
                            <h2>Добавленные устройства</h2>
                            <h3>Заявки</h3>
                        </div>
                    </div>
                    <div className="nav_list-1 df align">
                        <div className="nav_device df mobile-nav_device">
                            <div className="nav_device-1 nav_device-1-active">
                                {/* <Link to="/added-device">
                                    <h2>Актуальное</h2>
                                </Link> */}
                                <Link className="just__flexingfaa" to='/client/requests'>
                                    <h2>Актуальное</h2>
                                </Link>
                            </div>
                            <div className="nav_device-2 mobile-nav_device-2">
                                <Link className="just__flexingfaa" to='/client/requests/archived'>
                                    <h2>Архив</h2>
                                </Link>
                            </div>
                        </div>
                        <div className="nav_device-but mobile-nav_device-but">
                            <Link to="/client/requests/create/title">
                                Добавить устройство
                            </Link>
                        </div>
                    </div>

                    <div className="h hbb mobile-h">
                        <div className="big_nav-devicefsadsad df align mobile-big_nav-device">
                            <div className="big_nav-text_1 mobile-big_nav-text_1">
                                <h2>Заказы</h2>
                            </div>
                            <div className="big_nav-text_2 df align mobile-big_nav-text_2">
                                <div className="tex-1 df mobile-tex-1">
                                    <h2 className="nav-text-left">Цена</h2>

                                    <h2 className="nav-text-center">Предложение</h2>

                                    <h2 className="nav-text-center">Статус</h2>
                                    <h2 className="nav-text-right">Управлять</h2>
                                </div>
                            </div>
                        </div>
                        {filteredRequests.map((v) => (
                            <AddedDevice
                                {...v}
                                key={v.id}
                                onUpdate={onDeviceUpdate}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}


export default AddedDevices;