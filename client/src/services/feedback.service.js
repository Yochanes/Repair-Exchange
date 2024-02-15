import appFetch from "../utilities/appFetch"

const getFeedback = (username) =>
    appFetch("submission/feedbacks/" + username)

const createFeedback = (payload) => {
    const formData = new FormData()
    formData.append("data", JSON.stringify(payload.data))

    Array.from(payload.files).forEach((f) => {
        formData.append("pictures", f)
    })

    return appFetch("submission/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData
    })
}

const replyToFeedback = (payload) =>
    appFetch("submission/feedback/" + payload.id, {
        method: "PATCH",
        body: JSON.stringify(payload)
    })

// Удаление отзыва
const deleteFeedback = async (feedbackId) => {
    try {
        const response = await appFetch("submission/feedback/" + feedbackId, {
            method: "DELETE"
        })
        // Если ответ успешный
        if (response === 'Success!') {
            return {
                message: 'Success',
                status: 200
            }
        }
        // Возвращаем ошибку, если ответ не является 'Success!'
        return Promise.reject({
            message: "Невозможно удалить отзыв",
            status: 500
        })
    } catch (error) {
        // Возвращаем ошибку, если произошла ошибка во время запроса
        return Promise.reject({
            message: "Невозможно выполнить запрос",
            status: 500
        })
    }
}

// Изменение отзыва
const updateFeedback = (feedbackId, payload) => {
    // Добавляем обязательное поле master_response
    payload.master_response = "редактор работает"; // Замените "Ваш текст здесь" на нужное вам значение

    return appFetch("submission/feedback/" + feedbackId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
}

export {
    getFeedback,
    createFeedback,
    replyToFeedback,
    deleteFeedback,
    updateFeedback
}
