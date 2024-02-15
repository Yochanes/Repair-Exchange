import { getToken } from "./token.service"

import { BASE_URL } from "../utilities/appFetch"

const sendEmailCode = () => fetch(BASE_URL + "user/send-email-code", {
    method: "POST",
    headers: {
        "Authorization": "Bearer " + getToken()?.access_token
    }
}).then((res) => res.json())

const sendEmailVerificationCode = (code) => fetch(BASE_URL + "user/verify-email/" + code, {
    headers: {
        "Authorization": "Bearer " + getToken()?.access_token
    }
}).then((res) => res.json())

const sendPhoneCode = () => fetch(BASE_URL + "user/send-phone-code", {
    method: "POST",
    headers: {
        "Authorization": "Bearer " + getToken()?.access_token
    }
}).then((res) => res.json())

const sendPhoneVerificationCode = (code) => fetch(BASE_URL + "user/verify-phone/" + code, {
    method: "POST",
    headers: {
        "Authorization": "Bearer " + getToken()?.access_token
    }
}).then((res) => res.json())

export {
    sendEmailCode,
    sendEmailVerificationCode,
    sendPhoneCode,
    sendPhoneVerificationCode
}
