import appFetch from "../utilities/appFetch"

const getCounters = () => appFetch("index/counters")

const getCovers = () => appFetch("index/cover-pictures")

export {
    getCounters,
    getCovers
}
