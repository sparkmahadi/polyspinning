import { format } from 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLotData } from '../../redux/features/dtyPresentLotAndTransfer/dtyPresentLotSlice';
import { toast } from 'react-hot-toast';
import { addMachine, updateDtyMachineLot, updateMachine } from '../../redux/features/dtyMachinesFromPresentLot/dtyMCsFromPLotSlice';
import { addMachineUpdates } from '../../redux/features/dtyMachineUpdates/dtyMachineUpdatesSlice';
import { setExcelData } from '../../redux/features/inputExcelFiles/inputExcelSlice';
import { useNavigate } from 'react-router-dom';

const DisplayDTYPresentLot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { excelData, fileTypeInfo } = useSelector(state => state.inputExcelFiles);
    const { machineDataFromLot: existingArr, isLoading, isPosting, isError, error, postMachineSuccess, updateMachineSuccess } = useSelector(state => state.dtyMachinesFromLot);

    const specsTitles = excelData[0];
    const specsDetails = excelData.slice(1);
    console.log(specsDetails);

    const properties = [
        "DTYMCNo",
        "ProductType",
        "POYLine",
        "DTYBobbinColor",
        "PresentLotNo",
        "AirPress",
        "INTJet",
        "InspectionArea"
    ];

    const extractMcDetails = (dataArray, existingArr) => {
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
        // console.log(dynamicObjects);
        const convertedDataToString = dynamicObjects.map(obj => {
            const convertedObj = {};
            for (let key in obj) {
                convertedObj[key] = String(obj[key]);
            }
            return convertedObj;
        });

        const newArr = convertedDataToString;
        const result = compareArrays(newArr, existingArr);
        dispatch(setExcelData([]));
        setTimeout(
            navigate("/dty-floor-status/dty-machines-from-present-lot"),
            1000
        );
        return result;
    };

    const compareArrays = (newArr, existingArr) => {
        for (let i = 0; i < newArr.length; i++) {
            const element1 = newArr[i];
            const { _id, ...element1WithoutId } = element1;
            const element2 = existingArr.find(item => item.DTYMCNo === element1.DTYMCNo && item.Side === element1.Side);

            if (!element2) {
                console.log(`inserting new machine. Machine no: ${element1.DTYMCNo}`);
                toast.loading(`inserting new machine. Machine no: # ${element1.DTYMCNo}`, { id: element1.DTYMCNo })
                
                dispatch(addMachine(element1));
                dispatch(updateDtyMachineLot(element1));
                // return { message: "Post the new machine", machineData: element1, toastId: element1.DTYMCNo };
            }
            if (element2) {
                const changedProps = compareObjects(element1WithoutId, element2);
                if (changedProps.length === 1 && changedProps[0] === "_id") {
                    console.log('only id changed');
                    // return { message: "Only Object ID is changed" };
                }
                else {
                    if (Object.entries(changedProps).length > 0) {
                        console.log("changed Props of machine No:", element2.DTYMCNo, `(${changedProps})`);
                        toast.success(`Changed (${changedProps}) of Machine No: ${element2.DTYMCNo}`, { id: element2.DTYMCNo })

                        const updateInfo = { machineData: element1, changedProps };
                        dispatch(updateMachine(updateInfo));
                        dispatch(addMachineUpdates(updateInfo));
                        dispatch(updateDtyMachineLot(element1));
                        // return { message: "Update the Machine Details", machineData: element1, changedProps, toastId: element2.DTYMCNo }

                    }
                }
            }
            toast.success("Everything is up to date", { id: "Warning" });
        }

        // return { message: "All properties of all machines are same" }; // All elements are equal
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

    const handleUpload = () => {

        const dateTime = format(new Date(), "Pp");
        const lotData = { specsTitles, specsDetails, uploadedAt: dateTime };
        dispatch(addLotData(lotData));

        const result = extractMcDetails(specsDetails, existingArr);

    }

    return (
        <div className="overflow-x-auto pt-10">
            {
                excelData.length &&
                <>
                    <table className="table w-full max-w-sm mx-auto">
                        {/* head */}
                        <thead>
                            <tr>
                                {specsTitles?.map((spec, i) =>
                                    <td key={i}>{spec}</td>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                specsDetails?.map((specsDetail, i) =>
                                    <tr key={i}>
                                        {
                                            specsDetail?.map((sp, i) => <td key={i}>{sp}</td>)
                                        }
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                    <button className='btn btn-primary block mx-auto btn-sm my-5' onClick={() => handleUpload(excelData)}>Upload Data</button>
                </>
            }

        </div>
    );
};

export default DisplayDTYPresentLot;