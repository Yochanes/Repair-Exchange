import appFetch from "../utilities/appFetch"

const getDialogs = () =>
    appFetch("chat/dialogs")

const getMessages = (dialogId) =>
    appFetch("chat/messages/" + dialogId)

export {
    getDialogs,
    getMessages
}
