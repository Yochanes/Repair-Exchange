import appFetch from "../utilities/appFetch"
import { setToken } from "./token.service"

const login = (username, password) =>
    appFetch("user/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ username, password }).toString()
    }).then(setToken)


const registerAsClient = (payload) =>
    appFetch("user/register-client", {
        method: "POST",
        body: JSON.stringify(payload)
    })

const registerAsMaster = (payload) =>
    appFetch("user/register-master", {
        method: "POST",
        body: JSON.stringify(payload)
    })

const addMaster = async (payload) =>
    appFetch("user/add-master", {
        method: "POST",
        body: JSON.stringify(payload)
    })

export {
    login,
    registerAsClient,
    registerAsMaster,
    addMaster,
}
