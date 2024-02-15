import appFetch from "../utilities/appFetch"

const getReviews = () => appFetch("index/reviews")

const createReview = (payload) => appFetch("index/review", {
    method: "POST",
    body: JSON.stringify(payload)
})

export {
    getReviews,
    createReview
}
