import {
    useEffect,
    useState
} from "react";
import YooKassaLogo from '../../img/YooKassaLogo.svg'
import { getBalanceHistory } from "../../services/balance.service";
import {
    Link,
} from "react-router-dom";

function ChoiceOfReplenishmentMethodHistory(){
    const [history, setHistory] = useState([])

    useEffect(() => {
        getBalanceHistory()
            .then(setHistory)
    }, [])

    return (
        <div className="middle-block-2 middle-block-2ffsdfas">

            <Link to="/history/all">
                <h1>История операций </h1>
            </Link>

            <div className="blocks">
                {history.map((v, i) => (
                    <div className="block df" key={i}>
                        <div className="df poplocho">
                            <img src={YooKassaLogo} alt=""/>
                            <h2 style={{ marginLeft: "10px" }}>
                                {v.status === "pending" ? "Пополнение в процессе" : (
                                    "Успешное пополнение через ЮKassa"
                                )}
                            </h2>
                        </div>
                        <p>
                            <span className="abel">+{v.amount}</span>₽
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default ChoiceOfReplenishmentMethodHistory;