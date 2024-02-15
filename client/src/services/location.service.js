import appFetch from "../utilities/appFetch"

const setLocation = (data) =>
    localStorage.setItem("location", JSON.stringify(data))

const getLocation = () =>
    JSON.parse(localStorage.getItem("location"))

const getCities = () => appFetch("index/cities")

export {
    getCities,
    getLocation,
    setLocation
}
