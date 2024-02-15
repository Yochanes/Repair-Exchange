import appFetch from "../utilities/appFetch"

const getArticle = (id) => appFetch("index/article/" + id)

const getArticles = () => appFetch("index/articles")

const getArticleComments = (articleId) =>
    appFetch(`index/article/${articleId}/comments`)

const createArticleComment = (articleId, payload) =>
    appFetch(`index/article/${articleId}/comment`, {
        method: "POST",
        body: JSON.stringify(payload)
    })

const likeArticle = (articleId) =>
    appFetch(`index/like-article/${articleId}`, {
        method: "PATCH"
    })
    
const dislikeArticle = (articleId) =>
    appFetch(`index/dislike-article/${articleId}`, {
        method: "PATCH"
    })
    
const likeArticleComment = (commentId) =>
    appFetch(`index/article/comment/${commentId}/like`, {
        method: "POST"
    })
    
const dislikeArticleComment = (commentId) =>
    appFetch(`index/article/comment/${commentId}/dislike`, {
        method: "DELETE"
    })

export {
    getArticle,
    getArticles,
    getArticleComments,
    createArticleComment,
    likeArticle,
    dislikeArticle,
    likeArticleComment,
    dislikeArticleComment
}
