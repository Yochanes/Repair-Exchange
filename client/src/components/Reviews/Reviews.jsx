import { useService } from '../../hooks/useService'
import ReviewsForm from './ReviewsForm'
import ReviewsReview from './ReviewsReview'
import { getReviews } from '../../services/reviews.service'
import styles from './Reviews.module.css'

const Reviews = (props) => {
    const reviews = useService(getReviews, [])

    return (
        <div className={styles.container}>
            <ReviewsForm />
            <div className={styles.reviews}>
                {reviews.data.map((v) => (
                    <ReviewsReview {...v} key={v.id} />
                ))}
            </div>
        </div>
    )
}

export default Reviews
