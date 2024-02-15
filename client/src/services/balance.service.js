import appFetch from "../utilities/appFetch"

const getBalanceHistory = () => appFetch("user/deposit-history")

const replenishBalance = (amount) =>
    appFetch("user/replenish-balance/" + amount, {
        method: "POST"
    })

const updateBalance = (id) => appFetch("user/confirm-payment/" + id)

export {
    getBalanceHistory,
    replenishBalance,
    updateBalance,
}
