import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addDtyParameter, getDtyParamsForComparison, updateDtyMachine } from '../../redux/features/dtyProcessParameters/dtyParametersSlice';
import { toast } from 'react-hot-toast';

const AddNewParameter = () => {
    const dispatch = useDispatch();
    const { dtyParamsForComparison: existingArr } = useSelector(state => state.dtyProcessParameters);

    const properties = ["POYType", "POYLine", "DTYMCNo", "DTYType", "DTYColor", "LotNo", "ChipsName", "MCSpeed", "DR", "SOF", "TOF", "DY", "Shaft2B", "CPM", "DEV", "PH", "SH", "EDraw", "AirPressure", "IntJetType", "OilerRpm", "OilType", "Axial", "Stroke", "DTYTubeColor", "CustomerName", "StartDate", "StopDate", "Quantity", "Remarks"];

    const { register, handleSubmit, formState: { errors } } = useForm();
    const submitHandler = data => {
        for (let key in data) {
            // to match with data uploaded via excel
            if (data[key] === "") {
                data[key] = "-";
            }
        }
        console.log(data);

        compareArrayWithObject(data, existingArr);
    };

    const compareArrayWithObject = (newObj, existingArr) => {
        // console.log("newArr", newArr, "existingArr", existingArr);

        const element1 = newObj;
        // used filter cause many params can be available for same machine and lot
        const element2 = existingArr.filter(item => item.DTYMCNo === element1.DTYMCNo && item.LotNo === element1.LotNo);

        // console.log("element2", element2);

        if (!element2.length) {
            console.log(`inserting new parameter for machine no: ${element1.DTYMCNo}`);
            toast.loading(`inserting new parameter for machine no: # ${element1.DTYMCNo}`, { id: element1.DTYMCNo })
            dispatch(updateDtyMachine(element1));
            dispatch(addDtyParameter(element1));
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
                        return 'new parameter';
                    }
                }
                return 'exists in DB'
            })
            console.log(isNewParameter);
            if (!isNewParameter.includes("exists in DB")) {
                console.log(`Inserted New Parameter of Machine No: ${element1.DTYMCNo}`);
                toast.success(`Inserted New Parameter of Machine No: ${element1.DTYMCNo}`, { id: element1.DTYMCNo });
                dispatch(updateDtyMachine(element1));
                dispatch(addDtyParameter(element1));
            } else {
                const confirm = window.confirm(`Same parameters exists for Machine No. ${element1.DTYMCNo}. Do you still want to add your parameter for keeping latest update record?`)
                if(confirm){
                    dispatch(updateDtyMachine(element1));
                    dispatch(addDtyParameter(element1));
                }
            }
        }


        toast.success("Ok! Everything is up to date", { id: "Warning" });
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
        <div className="overflow-x-auto">
            <h5 className='lg:text-xl font-semibold text-center py-5'>Insert a new parameter</h5>
            <p className='lg:text-md font-semibold text-center pb-5'>You can put parameters for one side of machine. In that case, Write the side of machine by oblique "/". As for example, Write "2/A" for expressing "A" side of machine number #2.</p>
            <form onSubmit={handleSubmit(submitHandler)} className='w-full max-w-lg mx-auto'>
                {
                    properties?.map((prop, i) =>
                        <div key={i} className='flex justify-between gap-5 items-center mb-3'>
                            <label>{prop} :</label>
                            <input name={prop} type="text" placeholder="Type here" {...register(prop)} className="input input-bordered w-full max-w-xs" />
                        </div>
                    )
                }
                <button type='submit' className='btn btn-secondary'>Submit</button>
            </form>
        </div>
    );
};

export default AddNewParameter;