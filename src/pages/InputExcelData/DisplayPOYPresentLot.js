import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExcelData } from '../../redux/features/inputExcelFiles/inputExcelSlice';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { addWinder, getPoyMcDataFromLot, updateWinder } from '../../redux/features/poyMachinesFromPresentLot/poyMCsFromPLotSlice';

const DisplayPOYPresentLot = () => {
    const dispatch = useDispatch();
    const { excelData, fileTypeInfo } = useSelector(state => state.inputExcelFiles);
    const { machineDataFromLot: existingArr, isLoading } = useSelector(state => state.poyMachinesFromLot);

    const specsTitles = excelData[0];
    const specsDetails = excelData.slice(1);
    // console.log(specsDetails);
    // let existingArr = [];

    const properties = [
        "SL",
        "LineNo.",
        "Model",
        "Origin",
        "WinderNo",
        "Ends",
        "Denier",
        "Filaments",
        "POYBobbin",
        "POYColor",
        "Status"
    ];

    const extractMcDetails = (dataArray, existingArr) => {
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
        // console.log("Extracted POY Data", dynamicObjects);
        // toast.custom("Please copy the object from console and post it manually to database");
        compareArrays(dynamicObjects, existingArr)
        dispatch(setExcelData([]));
    };

    const compareArrays = (newArr, existingArr) => {
        for (let i = 0; i < newArr.length; i++) {
            const element1 = newArr[i];
            const { _id, ...element1WithoutId } = element1;
            const element2 = existingArr.find(item => item.WinderNo === element1.WinderNo);

            console.log(element2);

            if (!element2) {
                console.log(`inserting new Winder no: ${element1.WinderNo}`);
                toast.loading(`inserting new Winder. Winder no: # ${element1.WinderNo}`, { id: element1.WinderNo })

                dispatch(addWinder(element1));
                // return { message: "Post the new Winder", WinderData: element1, toastId: element1.WinderNo };
            }

            if (element2) {
                const changedProps = compareObjects(element1WithoutId, element2);
                if (changedProps.length === 1 && changedProps[0] === "_id") {
                    console.log('only id changed');
                    // return { message: "Only Object ID is changed" };
                }
                else {
                    if (Object.entries(changedProps).length > 0) {
                        console.log("changed Props of Winder No:", element2.WinderNo, `(${changedProps})`);
                        toast.success(`Changed (${changedProps}) of Winder No: ${element2.WinderNo}`, { id: element2.WinderNo })

                        const updateInfo = { WinderData: element1, changedProps };
                        dispatch(updateWinder(updateInfo));
                        // return { message: "Update the Winder Details", machineData: element1, changedProps, toastId: element2.WinderNo }

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
        console.log(lotData);
        // dispatch(addLotData(lotData));
        extractMcDetails(specsDetails, existingArr)

    }

    useEffect(() => {
        dispatch(getPoyMcDataFromLot());
    }, [dispatch])

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

export default DisplayPOYPresentLot;