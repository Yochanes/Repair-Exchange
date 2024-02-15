import { useEffect } from "react";
import { useService } from "../../hooks/useService";
import { getMasterOrders } from "../../services/order.service";
import Sidebar from "../sidebar";
import '../../scss/applications.css'
import NavApplication from './NavApplication'
import Application from "./Application";

function MyApplications() {
    const orders = useService(getMasterOrders, [])
    const filteredOrders = orders.data.filter((v) => v.status === "Активно")

    useEffect(() => {
        document.title = 'Заявки';
    }, [])

    return (
        <div className='main nal df'>
            <Sidebar />
            <div className="block-info-4 block-info-4fff">
                <div className="mini-text">
                    <h1>Заявки</h1>
                </div>

                <NavApplication />

                <div className="so_3">
                    {filteredOrders?.map((v) => (
                        <Application
                            {...v}
                            order_id={v.id}
                            key={v.id}
                            status={v.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}


export default MyApplications;
