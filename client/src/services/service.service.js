import appFetch from "../utilities/appFetch"

const getServices = () => appFetch("service/all-services")

const getServiceCategories = () => appFetch("service/categories")

const getServiceTypes = () => appFetch("service/types")

const getServiceTypesByCategoryId = (categoryId) =>
    appFetch("service/types/" + categoryId)

const getServiceDevices = () => appFetch("service/devices")

const getServiceDevicesByTypeId = (typeId) =>
    appFetch("service/devices/" + typeId)

const getServiceRepairs = () => appFetch("service/repair_types")

const getServiceRepairsByDeviceId = (deviceId) =>
    appFetch("service/repair_types/" + deviceId)

const getMasterRepairs = () => appFetch("service/master-repairs")

const getMasterRepairsByUsername = (username) =>
    appFetch("service/master-repairs?master_username=" + username)

const getMasterServices = (id) =>
    appFetch("service/master-services/" + id)

const updateMasterRepair = (repairId, payload) =>
    appFetch("service/master-repair/" + repairId, {
        method: "PATCH",
        body: JSON.stringify(payload)
    })

const updateMasterCustomRepair = (repairId, payload) =>
    appFetch("service/repair_type/" + repairId, {
        method: "PATCH",
        body: JSON.stringify(payload)
    })

const removeMasterRepair = (repairId) =>
    appFetch("service/master-repair/" + repairId, {
        method: "DELETE"
    })

export {
    getServices,
    getServiceCategories,
    getServiceTypes,
    getServiceTypesByCategoryId,
    getServiceDevices,
    getServiceDevicesByTypeId,
    getServiceRepairs,
    getServiceRepairsByDeviceId,
    getMasterRepairs,
    getMasterRepairsByUsername,
    getMasterServices,
    updateMasterRepair,
    updateMasterCustomRepair,
    removeMasterRepair
}
