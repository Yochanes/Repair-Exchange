import React, { useEffect } from "react";
import '../../scss/applications.css'
import { Link, useLocation } from "react-router-dom";



function App() {
    const location = useLocation()

    useEffect(() => {
        document.title = 'Заявки';
    }, []);

    return (
        <div className="mini-wrap mini-wrapff mini-wrap_links history__links df">
            <Link  className={location.pathname === "/master/orders" ? "just just__flexing active2" : "just just__flexing"}  to='/master/orders'>
                <h3>Мои заявки</h3>
            </Link>
            <Link  className={location.pathname.includes("/master/orders/completed") ? "just just__flexing active2" : "just just__flexing"}   to='/master/orders/completed'>
                <h3>Выполнено</h3>
            </Link>
            <Link className={location.pathname.includes("/master/orders/canceled") ? "just just__flexing active2" : "just just__flexing"}   to='/master/orders/canceled'>
                <h3>Отменено</h3>
            </Link>
            <Link  className={location.pathname.includes("/master/orders/all") ? "just just__flexing active2" : "just just__flexing"}  to='/master/orders/all'>
                <h3>Все</h3>
            </Link>
        </div>
    )
}


export default App;
