
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLotData } from '../../redux/features/dtyPresentLotAndTransfer/dtyPresentLotSlice';
import { toast } from 'react-hot-toast';
import { addMachine, updateDtyMachineLot, updateMachine } from '../../redux/features/dtyMachinesFromPresentLot/dtyMCsFromPLotSlice';
import { setExcelData } from '../../redux/features/inputExcelFiles/inputExcelSlice';
import { useNavigate } from 'react-router-dom';
import { compareObjsForChangedProps, getCurrentTimeAndDate } from '../../logics/findingFunctions';
import { getDTYPresentLotProps } from '../../logics/getProperties';

const DisplayDTYPresentLot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { excelData, fileTypeInfo } = useSelector(state => state.inputExcelFiles);
    const { machineDataFromLot: existingArr, isLoading, isPosting, isError, error, postMachineSuccess, updateMachineSuccess } = useSelector(state => state.dtyMachinesFromLot);

    const specsTitles = excelData[0];
    const specsDetails = excelData.slice(1);

    const timeAndDate = getCurrentTimeAndDate();
    const properties = getDTYPresentLotProps();

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
            }
            if (element2) {
                const changedProps = compareObjsForChangedProps(element1WithoutId, element2, properties);
                if (changedProps.length === 1 && changedProps[0] === "_id") {
                    console.log('only id changed');
                }
                else {
                    if (Object.entries(changedProps).length > 0) {
                        console.log("changed Props of machine No:", element2.DTYMCNo, `(${changedProps})`);
                        toast.success(`Changed (${changedProps}) of Machine No: ${element2.DTYMCNo}`, { id: element2.DTYMCNo })

                        const updateInfo = { machineData: element1, changedProps };
                        // console.log("element1", element1, "element2", element2, changedProps);
                        dispatch(updateMachine(updateInfo));
                        dispatch(updateDtyMachineLot(element1));
                    }
                }
            }
            toast.success("Everything is up to date", { id: "Warning" });
        }
    };

    const handleUpload = () => {
        const lotData = { specsTitles, specsDetails, uploadedAt: timeAndDate };
        dispatch(addLotData(lotData));

        extractMcDetails(specsDetails, existingArr);
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