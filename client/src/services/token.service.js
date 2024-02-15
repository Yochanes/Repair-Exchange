const setToken = (data) =>
    localStorage.setItem("userdata", JSON.stringify(data))

const getToken = () =>
    JSON.parse(localStorage.getItem("userdata"))

const updateToken = (data) =>
    localStorage.setItem("userdata", JSON.stringify(data))

const removeToken = () => localStorage.removeItem("userdata")

export {
    setToken,
    getToken,
    updateToken,
    removeToken
}