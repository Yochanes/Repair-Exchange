import appFetch from "../utilities/appFetch"

const getMasterOrders = () => appFetch("submission/master-orders")

const createOrder = (payload) =>
    appFetch("submission/order", {
        method: "POST",
        body: JSON.stringify(payload)
    })

const updateOrderStatus = (id, payload) =>
    appFetch("submission/order/" + id, {
        method: "PATCH",
        body: JSON.stringify({ status: payload })
    })

const updateOrderStatusFromClient = (id, payload) =>
    appFetch(`submission/finish-order/${id}?status=${payload}`, {
        method: "PATCH"
    })

export {
    getMasterOrders,
    createOrder,
    updateOrderStatus,
    updateOrderStatusFromClient,
}
