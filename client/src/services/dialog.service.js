import appFetch from "../utilities/appFetch"

const createDialog = (payload) =>
    appFetch("chat/dialog", {
        method: "POST",
        body: JSON.stringify(payload)
    })

export { createDialog }
