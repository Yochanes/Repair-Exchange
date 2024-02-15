import appFetch from "../utilities/appFetch"

const createRequest = (payload) => {
    const body = new FormData()
    body.append("data", JSON.stringify(payload.data))

    if (payload.files.length) {
        [...payload.files].forEach((f) => {
            body.append("files", f)
        })
    }

    return appFetch("submission/request", {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body
    })
}

const updateRequest = (payload) =>
    appFetch("submission/request/" + payload.id, {
        method: "PATCH",
        body: JSON.stringify(payload)
    })
    
const updateRequestStatus = (id, payload) =>
    appFetch("submission/request/" + id, {
        method: "PATCH",
        body: JSON.stringify({ status: payload })
    })

const updateRequestStatusFromMaster = (id, payload) =>
    appFetch(`submission/complete-request/${id}?status=${payload}`, {
        method: "PATCH"
    })

const deleteRequest = (requestId) =>
    appFetch("submission/request/" + requestId, {
        method: "DELETE"
    })

const getRequestById = (requestId) =>
    appFetch("submission/request/" + requestId)

const getClientRequests = () => appFetch("submission/client-requests")

const getMasterRequests = () => appFetch("submission/requests")

const getMasterPersonalRequests = () => appFetch("submission/master-requests")

export {
    createRequest,
    updateRequest,
    updateRequestStatus,
    updateRequestStatusFromMaster,
    deleteRequest,
    getClientRequests,
    getMasterRequests,
    getMasterPersonalRequests,
    getRequestById,
}

