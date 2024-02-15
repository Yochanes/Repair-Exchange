import {
    useState,
    useEffect,
    useCallback,
} from 'react'
import { useSelector } from 'react-redux';
import '../../scss/service.css'
import '../../scss/register-master.scss'
import { Link } from "react-router-dom";
import Sidebar from "../sidebar";
import { selectUser } from '../../slices/user.slice';
import ServicesList from './Services/ServicesList';
import ServicesForm from './Services/ServicesForm';
import { getMasterRepairsByUsername } from '../../services/service.service';
import styles from './Services/Services.module.css'

const FormMode = {
    Hidden: 0,
    Default: 1,
    Custom: 2
}

function Services() {
    const user = useSelector(selectUser)

    const [formMode, setFormMode] = useState(FormMode.Hidden)
    const [repairs, setRepairs] = useState([])
    const username = user.master?.[0].username

    useEffect(() => {
        if (!username) return

        getMasterRepairsByUsername(username).then(setRepairs)
    }, [user])

    const onDelete = useCallback((e, id) => {
        getMasterRepairsByUsername(username).then(setRepairs)
    }, [])

    const onSubmit = (e) =>
        getMasterRepairsByUsername(username).then(setRepairs)

    return (
        <div className="main nal df">
            <Sidebar />
            <div className="block-info-8"> 
                <div className="setting df">
                    <div>
                        <h1>Настройки</h1>
                    </div>
                    <div>
                        <Link to="/master/settings/profile">
                            <img src="/img/left-active.png" alt="" />
                        </Link>
                        <Link to="/master/settings/pictures">
                            <img src="/img/img-right.png" alt="" />
                        </Link>
                    </div>
                </div>

                <div className="mini-wrap mini-wrap_links df">
                    <Link className="just" to="/master/settings"><h3 >Общие</h3></Link>
                    <Link className="just" to="/master/settings/profile"><h3>Профиль</h3></Link>
                    <Link className="just  active2" to='/master/settings/services'><h3 >Услуги</h3></Link>
                    <Link className="just" to='/master/settings/pictures'><h3>Фото</h3></Link>
                </div>

                <div className="main-optifdsaons">
                    {!user.master?.[0]?.is_active ? (
                        <div style={{ marginBottom: "20px" }}>
                            Для того, чтобы редактировать услуги необходимо изменить поле "Получать заказы" в общих настройках ЛК
                        </div>
                    ) : (
                        <>
                            <ServicesList
                                repairs={repairs}
                                onDelete={onDelete}
                            />
                            {formMode !== FormMode.Hidden && (
                                <ServicesForm
                                    isCustom={formMode === FormMode.Custom}
                                    onSubmit={onSubmit}
                                />
                            )}
                            <div className="action-buttons">
                                <button className={styles.button} onClick={(e) => setFormMode(FormMode.Default)}>
                                    Создать обычную услугу
                                </button>
                                <button className={styles.button} onClick={(e) => setFormMode(FormMode.Custom)}>
                                    Создать свою услугу
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}


export default Services;
