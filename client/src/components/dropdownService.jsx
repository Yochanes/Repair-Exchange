import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectServices } from "../slices/services.slice"

function DropdownService() {
    const services = useSelector(selectServices)

    return (
        <div className="bldropdown-content">
            {services.categories.map((c) => (
                <div className="recent" key={c.id}>
                    <div className="repair__phone__content">
                        <span className="repair__phone">
                            <h4>{c.name}</h4>
                            <img src="/img/arrowleft.png" alt=""/>
                        </span>
                        <div className="repair-phone-content__wrap">
                            {services.service_types.map((t) => t.category_id === c.id && (
                                <div className="repair__phone__content__link" key={t.id}>
                                    <Link to={"/devices/" + t.id}>
                                        <h4>{t.name}</h4>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default DropdownService;