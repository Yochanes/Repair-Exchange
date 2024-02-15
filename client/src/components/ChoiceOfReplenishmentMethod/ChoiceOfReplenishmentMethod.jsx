import {
    useState,
    useEffect
} from 'react';
import '../../scss/ChoiceOfReplenishmentMethod.css'
import Sidebar from "../sidebar";
import ChoiceOfReplenishmentMethodHistory from "./ChoiceOfReplenishmentMethodHistory";
import { replenishBalance } from '../../services/balance.service';

function ChoiceOfReplenishmentMethod() {
    const [error, setError] = useState("")
    const [amount, setAmount] = useState("")
    const updateAmount = (e) => {
        const value = e.target.value
        if (isNaN(value)) {
            return
        }
        setAmount(value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        return replenishBalance(amount).then((res) => {
            window.location.replace(res.confirmation_url)
        }).catch((err) => setError(err.message))
    }

    useEffect(() => {
        document.title = 'Кошелек';
    }, []);

    return (
        <div className="main nal df">
            <Sidebar />

            <div className="block-info peo">
                <div className="main-block df">

                    <div className="middle-block-1">
                        <h1>Кошелек</h1>

                        <h3>Пополнение счета</h3>

                        {error && (
                            <div className="auth-err">
                                {error}
                            </div>
                        )}

                        <p>Сумма:</p>

                        <input
                            type="text"
                            value={amount}
                            onChange={updateAmount}
                            placeholder="Введите сумму в рублях"
                        />
                        <h6>Оплата будет выполнена посредством ЮKassa</h6>

                        <div className="btn">
                            <button onClick={onSubmit}>Далее</button>
                        </div>
                    </div>

                    <ChoiceOfReplenishmentMethodHistory />

                </div>
            </div>
        </div>
    )
}

export default ChoiceOfReplenishmentMethod;