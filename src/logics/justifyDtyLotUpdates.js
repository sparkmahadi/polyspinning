import axios from "axios";

export const properties = [
    "DTYMCNo",
    "ProductType",
    "POYLine",
    "DTYBobbinColor",
    "PresentLotNo",
    "AirPress",
    "INTJet",
    "InspectionArea"
];

export const extractMcDetails = async (dataArray) => {
    const dynamicObjects = [];

    for (let i = 0; i < dataArray.length; i++) {
        const machineData = dataArray[i];
        const machineNumberProp = machineData[0];
        const machineNumbers = String(machineNumberProp).split(",");

        for (let j = 0; j < machineNumbers.length; j++) {
            const machineObjA = {};
            const machineObjB = {};

            const currentMachine = machineNumbers[j].trim();
            const isSideA = currentMachine.endsWith("/A");
            const isSideB = currentMachine.endsWith("/B");

            for (let k = 0; k < properties.length; k++) {
                const propertyValue = machineData[k];
                const propertyName = properties[k];
                machineObjA[propertyName] = propertyValue;
                machineObjB[propertyName] = propertyValue;
            }

            if (isSideA) {
                machineObjA["Side"] = "A";
                machineObjA["DTYMCNo"] = currentMachine.replace("/A", "");
                dynamicObjects.push(machineObjA);
            } else if (isSideB) {
                machineObjB["Side"] = "B";
                machineObjB["DTYMCNo"] = currentMachine.replace("/B", "");
                dynamicObjects.push(machineObjB);
            } else {
                machineObjA["Side"] = "A";
                machineObjA["DTYMCNo"] = currentMachine;
                machineObjB["Side"] = "B";
                machineObjB["DTYMCNo"] = currentMachine;
                dynamicObjects.push(machineObjA, machineObjB);
            }
        }
    }

    console.log(dynamicObjects);

    const existingArr = await axios.get("http://localhost:5000/dty-machine-details-from-present-lot/").then(data => data.data);
    console.log("received data", existingArr);
    const newArr = dynamicObjects;
    compareArrays(newArr, existingArr);
};

const compareArrays = (array1, array2) => {

    for (let i = 0; i < array1.length; i++) {
        const element1 = array1[i];
        const { _id, ...element1WithoutId } = element1;
        const element2 = array2.find(item => item.DTYMCNo === element1.DTYMCNo && item.Side === element1.Side);
        // console.log(element2);
        if (!element2) {
            console.log(`inserting new machine. Machine no: ${element1.DTYMCNo}`);
            //    insert this element1 i.e object in the db; new mc introduced
            postNewMachine(element1);
        }
        if (element2) {
            const changedProps = compareObjects(element1WithoutId, element2);
            // console.log(changedProps);
            if (changedProps.length === 1 && changedProps[0] === "_id") {
                console.log('only id changed');
            }
            else {
                if (Object.entries(changedProps).length > 0) {
                    // if there is any true changedprops then do this
                    console.log("changed Props of machine No:", element2.DTYMCNo, `(${changedProps})`);
                    updateMachineDetails(element1, changedProps);
                    // update the props by finding the object with mc no. and using the prop value from newArr or, arr2
                }
            }

        }

    }

    return true; // All elements are equal
};

function compareObjects(object1, object2) {
    const changedProperties = [];

    for (const elem of properties) {
        if (object1[elem] !== object2[elem]) {
            changedProperties.push(elem);
        }
    }

    return changedProperties;
}



const updateMachineDetails = async (oneMCDetails, changedProps) => {
    console.log('updates', oneMCDetails);
    const data = await axios.put("http://localhost:5000/dty-machine-details-from-present-lot/", { oneMCDetails, changedProps });
    console.log(data.data);
}

const postNewMachine = async (newMCDetails) => {
    const data = await axios.post("http://localhost:5000/dty-machine-details-from-present-lot/", newMCDetails);
    console.log(data.data);
}