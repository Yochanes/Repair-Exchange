import {
    useEffect,
    useState
} from 'react'
import { useParams, Link } from 'react-router-dom'
import {
    getArticle,
    getArticles
} from '../../services/article.service'
import {
    Swiper,
    SwiperSlide,
} from 'swiper/react'
import { Navigation } from 'swiper'
import backgroundImg from '../../img/article.png'
import groupIcon from '../../img/group.png'
import calendarIcon from '../../img/calendar.png'
import styles from './Article.module.css'
import ArticleComments from './ArticleComments'
import SERVER_PATH from '../../constants/SERVER_PATH'
import { selectUI } from '../../slices/ui.slice'
import { useSelector } from 'react-redux'

const Article = (props) => {
    const { id } = useParams()
    const [articles, setArticles] = useState([])
    const [data, setData] = useState({ })
    const [headerStyle, setHeaderStyle] = useState({ background: `url("${backgroundImg}")` })
    const ui = useSelector(selectUI)

    useEffect(() => {
        getArticle(id).then((data) => {
            if (data.cover_image) {
                const path = SERVER_PATH + data.cover_image
                setHeaderStyle({ background: `center / cover no-repeat url("${path}")` })
                setData(data)
                return
            }
            setData(data)
            setHeaderStyle({ background: `url("${backgroundImg}")` })
        })
        getArticles().then(setArticles)
    }, [id])

    const filterText = (v) => v.replace(/<[^>]*>/g, '');

    const getImage = (path) =>
        path ? SERVER_PATH + path : backgroundImg

    const formatDate = (date) => {
        const _date = new Date(date)
        return `${_date.getDate()}.${_date.getMonth()+1}.${_date.getFullYear()}`
    }

    return (
        <div className={styles.container}>
            <div className={styles.header} style={headerStyle}>
                <div className={styles.headerContainer}>
                    <h2 className={styles.headerTitle}>{data.title}</h2>
                    <div className={styles.headerInfo}>
                        <span className={styles.headerViews}>
                            <img className={styles.headerIcon} src={groupIcon} />
                            {data.views}
                        </span>
                        <span className={styles.headerDate}>
                            <img className={styles.headerIcon} src={calendarIcon} />
                            {formatDate(data.created_at)}
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <div
                    className={styles.bodyContent}
                    dangerouslySetInnerHTML={{ __html: data.text }}
                />
                <div className={styles.bodyActions}>
                    <Link to={ui.isAuthorized ? "/client/requests/create/title" : "/register/client"} className={styles.bodyButton}>Оформить ремонт</Link>
                </div>
            </div>
            <ArticleComments
                articleId={id}
                likes={data.likes}
            />
            <div className={styles.articles}>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    breakpoints={{
                        0: {
                            slidesPerView: 2
                        },
                        775: {
                            slidesPerView: 2
                        },
                        1099: {
                            slidesPerView: 3
                        },
                        1585: {
                            slidesPerView: 4
                        },
                    }}
                >
                    {articles.map((v) => (
                        <SwiperSlide className="swiper-slier" key={v.id}>
                            <Link
                                to={"/articles/" + v.id}
                                className={styles.articlesLink}
                                onClick={() => document.documentElement.scrollTop = 0}
                            >
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
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Article
