import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import { getArticles } from "../../services/article.service"
import backgroundImg from '../../img/article.png'
import styles from './Article.module.css'
import SERVER_PATH from "../../constants/SERVER_PATH"

const Articles = () => {
    const [articles, setArticles] = useState([])

    const filterText = (v) => v.replace(/<[^>]*>/g, '');

    const getImage = (path) =>
        path ? SERVER_PATH + path : backgroundImg

    const formatDate = (date) => {
        const _date = new Date(date)
        return `${_date.getDate()}.${_date.getMonth()+1}.${_date.getFullYear()}`
    }

    useEffect(() => {
        getArticles().then(setArticles)
    }, [])

    return (
        <div className={styles.articlesPage}>
            {articles.map((v) => (
                <Link to={"/articles/" + v.id} className={styles.articlesLink} key={v.id}>
                    <div className="blog__card">
                        <img
                            className="blog-card__picture"
                            src={getImage(v.cover_image)}
                            alt=""
                        />
                        <div className="blog__card__content">
                            <h4 className={styles.articlesTitle}>{v.title}</h4>
                            <p className={styles.articlesContent}>{filterText(v.text)}</p>
                            <span className={styles.articlesDate}>{formatDate(v.created_at)}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Articles
