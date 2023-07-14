export function findUniqueNestedValues(data, nestedObj, nestedProp) {
    const uniqueNestedValues = new Set();
    data.forEach((obj) => {
        const dtyType = obj[nestedObj][nestedProp];
        uniqueNestedValues.add(dtyType);
    });
    return Array.from(uniqueNestedValues);
}

export const floorWiseMachines = (floorMachines) => {
    let updatedMachines = [];

    floorMachines.forEach(mc => {
        const [DTYMCNo, Side] = mc.split('/');
        const machineData = { DTYMCNo, Side };
        updatedMachines.push(machineData);
    })
    return updatedMachines;
}

export function excelDateToJSDate(serial) {
    var utc_days  = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000);
 
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
 
    var total_seconds = Math.floor(86400 * fractional_day);
 
    var seconds = total_seconds % 60;
 
    total_seconds -= seconds;
 
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
 
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
 }