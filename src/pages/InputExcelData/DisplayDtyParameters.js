import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addDtyParameter, getDtyParamsForComparison, updateDtyMachineParam } from '../../redux/features/dtyProcessParameters/dtyParametersSlice';
import { setExcelData } from '../../redux/features/inputExcelFiles/inputExcelSlice';

const DisplayDtyParameters = () => {
    const dispatch = useDispatch();
    const { excelData, fileTypeInfo } = useSelector(state => state.inputExcelFiles);
    const { dtyParamsForComparison: existingArr } = useSelector(state => state.dtyProcessParameters);
    const properties = [
        "POYType", "POYLine", "DTYMCNo", "DTYType", "DTYColor", "LotNo", "ChipsName", "MCSpeed", "DR", "SOF", "TOF", "DY", "Shaft2B", "CPM", "DEV", "PH", "SH", "EDraw", "AirPressure", "IntJetType", "OilerRpm", "OilType", "Axial", "Stroke", "DTYTubeColor", "CustomerName", "StartDate", "StopDate", "Quantity", "Remarks"
    ];

    const specsTitles = excelData[0];
    const specsDetails = excelData.slice(1);

    const handleUpload = () => {

        const dateTime = format(new Date(), "Pp");
        const lotData = { specsTitles, specsDetails, uploadedAt: dateTime };
        // console.log(lotData);
        // dispatch(addLotData(lotData));
        extractParameters(specsDetails, existingArr)

    }

    const extractParameters = (dataArray, existingArr) => {
        const dynamicObjects = [];

        for (let i = 0; i < dataArray.length; i++) {
            const machineObj = {};
            const machineData = dataArray[i];

            for (let k = 0; k < properties.length; k++) {
                const propertyValue = machineData[k];
                const propertyName = properties[k];
                machineObj[propertyName] = propertyValue;
            }
            dynamicObjects.push(machineObj);
        }
        // console.log("Extracted Dty Param Data", dynamicObjects);

        const convertedDataToString = dynamicObjects.map(obj => {
            const convertedObj = {};
            for (let key in obj) {
                convertedObj[key] = String(obj[key]);
            }
            return convertedObj;
        });

        // console.log(convertedDataToString);
        // toast.custom("Please copy the object from console and post it manually to database");
        compareArrays(convertedDataToString, existingArr)
        // dispatch(setExcelData([]));
    };


    const compareArrays = (newArr, existingArr) => {
        // console.log("newArr", newArr, "existingArr", existingArr);

        for (let i = 0; i < newArr.length; i++) {
            const element1 = newArr[i];
            // used filter cause many params can be available for same machine and lot
            const element2 = existingArr.filter(item => item.DTYMCNo === element1.DTYMCNo && item.LotNo === element1.LotNo);

            // console.log("element2", element2);

            if (!element2.length) {
                console.log(`inserting new parameter for machine no: ${element1.DTYMCNo}`);
                toast.loading(`inserting new parameter for machine no: # ${element1.DTYMCNo}`, { id: element1.DTYMCNo })

                dispatch(updateDtyMachineParam(element1));
                dispatch(addDtyParameter(element1));
                
                // return { message: "Post the new parameter for machine", WinderData: element1, toastId: element1.WinderNo };
            } else {
                const isNewParameter = element2?.map(obj => {
                    const changedProps = compareObjects(element1, obj);
                    // console.log("isNewParam", element1, obj);
                    if (changedProps.length === 1 && changedProps.includes("uploadedAt")) {
                        console.log('only id and uploaded time is new prop');
                        return 'exists in DB';
                    }
                    else {
                        if (Object.entries(changedProps).length > 0) {
                            // console.log("updated Props of Machine No:", obj.DTYMCNo, `(${changedProps})`);
                            // return { message: "Update the Winder Details", machineData: element1, changedProps, toastId: element2.WinderNo }
                            return 'new parameter';
                        }
                    }
                    return 'exists in DB'
                })
                console.log(isNewParameter);
                if (!isNewParameter.includes("exists in DB")) {
                    console.log(`Inserted New Parameter of Machine No: ${element1.DTYMCNo}`);
                    toast.success(`Inserted New Parameter of Machine No: ${element1.DTYMCNo}`, { id: element1.DTYMCNo })

                    dispatch(updateDtyMachineParam(element1));
                    dispatch(addDtyParameter(element1));
                } else {
                    // console.log(`Same parameters exists for Machine No. ${element1.DTYMCNo}`)
                }
            }
        }


        toast.success("Everything is up to date", { id: "Warning" });
        // return { message: "All properties of all machines are same" }; // All elements are equal
    };

    function compareObjects(object1, object2) {
        // console.log("object1", object1, "object2", object2);
        const changedProperties = [];

        for (const elem of properties) {
            if (object1[elem] !== object2[elem]) {
                changedProperties.push(elem);
            }
        }
        return changedProperties;
    }

    useEffect(() => {
        dispatch(getDtyParamsForComparison());
    }, [dispatch]);

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

export default DisplayDtyParameters;