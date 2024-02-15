import appFetch from "../utilities/appFetch"

const getOffers = (id) => appFetch("submission/offers?request_id=" + id)

const createOffer = (payload) =>
    appFetch("submission/offer", {
        method: "POST",
        body: JSON.stringify(payload)
    })

const acceptOffer = (id) =>
    appFetch("submission/accept-offer/" + id, {
        method: "PATCH"
    })

export {
    acceptOffer,
    getOffers,
    createOffer
}
