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