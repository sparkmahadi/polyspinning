import { format } from "date-fns";

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
    var utc_days = Math.floor(serial - 25569);
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

export function compareObjsForChangedProps(object1, object2, properties) {
    const changedProperties = [];

    for (const elem of properties) {
        if (object1[elem] !== object2[elem]) {
            changedProperties.push(elem);
        }
    }
    return changedProperties;
}

export function compareNestedObjsForChangedProps(object1, object2, properties) {
    const changedProperties = [];

    function compareNestedObjects(obj1, obj2, path) {
        for (const elem of Object.keys(obj1)) {
            const nestedPath = path ? `${path}.${elem}` : elem;

            if (typeof obj1[elem] === 'object' && typeof obj2[elem] === 'object') {
                compareNestedObjects(obj1[elem], obj2[elem], nestedPath);
            } else if (obj1[elem] !== obj2[elem]) {
                changedProperties.push(nestedPath);
            }
        }
    }

    for (const elem of properties) {
        if (typeof object1[elem] === 'object' && typeof object2[elem] === 'object') {
            compareNestedObjects(object1[elem], object2[elem], elem);
        } else if (object1[elem] !== object2[elem]) {
            changedProperties.push(elem);
        }
    }

    return changedProperties;
}

export function getLotUpdateProps(element1, element2, changedProps) {
    let updatedProperties = [];
    changedProps?.forEach(prop => {
        const obj = { [prop]: `${element2[prop]} to ${element1[prop]}` };
        updatedProperties.push(obj);
    })
    return updatedProperties;
}

export function getMCUpdatedProps(element1, element2, changedProps) {
    let updatedProperties = [];

    function traverseObjects(obj1, obj2, path) {
        for (const prop of Object.keys(obj1)) {
            const nestedPath = path ? `${path}.${prop}` : prop;

            if (typeof obj1[prop] === 'object' && typeof obj2[prop] === 'object') {
                traverseObjects(obj1[prop], obj2[prop], nestedPath);
            } else if (changedProps.includes(nestedPath) && obj1[prop] !== obj2[prop]) {
                const updateRemark = `${obj2[prop]} to ${obj1[prop]}`;
                updatedProperties.push({ [nestedPath]: updateRemark });
            }
        }
    }

    traverseObjects(element1, element2, '');

    return updatedProperties;
}


export function getCurrentTimeAndDate() {
    const timeAndDate = format(new Date(), "Pp");
    return timeAndDate;
}
