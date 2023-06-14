import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addDtyParameter, getDtyParamsForComparison } from '../../redux/features/dtyProcessParameters/dtyParametersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateDtyMachine } from '../../redux/features/dtyMachines/dtyMachinesSlice';
import Spinner from '../../components/Spinner/Spinner';

const AddNewParamStatic = () => {
    const dispatch = useDispatch();

    const { dtyParamsForComparison: existingArr, isLoding } = useSelector(state => state.dtyProcessParameters);

    const properties = ["POYType", "POYLine", "DTYMCNo", "DTYType", "DTYColor", "LotNo", "ChipsName", "MCSpeed", "DR", "SOF", "TOF", "DY", "Shaft2B", "CPM", "DEV", "PH", "SH", "EDraw", "AirPressure", "IntJetType", "OilerRpm", "OilType", "Axial", "Stroke", "DTYTubeColor", "CustomerName", "StartDate", "StopDate", "Quantity", "Remarks"];

    const { register, handleSubmit, formState: { errors }, } = useForm();

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
                if (confirm) {
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

    if(isLoding){
        return <Spinner></Spinner>
    }

    return (
        <div >
            <h5 className='lg:text-xl font-semibold text-center py-5'>Insert a new parameter</h5>
            <p className='lg:text-md font-semibold text-center pb-5'>You can put parameters for one side of machine. In that case, Write the side of machine by oblique "/". As for example, Write "2/A" for expressing "A" side of machine number #2.</p>

            <form onSubmit={handleSubmit(submitHandler)} className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-5">

                <div className='form-control'>
                    <label className='label' htmlFor="DTYMCNo">DTY MC No:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="DTYMCNo"
                        name="DTYMCNo"
                        {...register('DTYMCNo', { required: 'DTY MC No is required' })}
                    />
                    {errors.DTYMCNo && <span className='error text-red-500 font-semibold'>{errors.DTYMCNo.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="POYType">POY Type:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="POYType"
                        name="POYType"
                        {...register('POYType', { required: 'POY Type is required' })}
                    />
                    {errors.POYType && <span className='error text-red-500 font-semibold'>{errors.POYType.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="POYLine">POY Line:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="POYLine"
                        name="POYLine"
                        {...register('POYLine', { required: 'POY Line is required' })}
                    />
                    {errors.POYLine && <span className='error text-red-500 font-semibold'>{errors.POYLine.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="DTYType">DTY Type:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="DTYType"
                        name="DTYType"
                        {...register('DTYType', { required: 'DTY Type is required' })}
                    />
                    {errors.DTYType && <span className='error text-red-500 font-semibold'>{errors.DTYType.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="DTYColor">DTY Color:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="DTYColor"
                        name="DTYColor"
                        {...register('DTYColor', { required: 'DTY Color is required' })}
                    />
                    {errors.DTYColor && <span className='error text-red-500 font-semibold'>{errors.DTYColor.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="LotNo">Lot No:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="LotNo"
                        name="LotNo"
                        {...register('LotNo', { required: 'Lot No is required' })}
                    />
                    {errors.LotNo && <span className='error text-red-500 font-semibold'>{errors.LotNo.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="ChipsName">Chips Name:</label>
                    <select name="ChipsName" id="ChipsName" className='input input-bordered' {...register('ChipsName', { required: 'Chips Name is required' })}>
                        <option value="INDORAMA">INDORAMA</option>
                        <option value="RECRON">RECRON</option>
                        <option value="XIAMEN XIANGLU">XIAMEN XIANGLU</option>
                        <option value="HENGYI">HENGYI</option>
                    </select>
                    
                    {errors.ChipsName && <span className='error text-red-500 font-semibold'>{errors.ChipsName.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="MCSpeed">MC Speed:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="MCSpeed"
                        name="MCSpeed"
                        {...register('MCSpeed', { required: 'MC Speed is required' })}
                    />
                    {errors.MCSpeed && <span className='error text-red-500 font-semibold'>{errors.MCSpeed.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="DR">DR:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="DR"
                        name="DR"
                        {...register('DR', { required: 'DR is required' })}
                    />
                    {errors.DR && <span className='error text-red-500 font-semibold'>{errors.DR.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="SOF">SOF:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="SOF"
                        name="SOF"
                        {...register('SOF', { required: 'SOF is required' })}
                    />
                    {errors.SOF && <span className='error text-red-500 font-semibold'>{errors.SOF.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="TOF">TOF:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="TOF"
                        name="TOF"
                        {...register('TOF', { required: 'TOF is required' })}
                    />
                    {errors.TOF && <span className='error text-red-500 font-semibold'>{errors.TOF.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="DY">DY:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="DY"
                        name="DY"
                        {...register('DY', { required: 'DY is required' })}
                    />
                    {errors.DY && <span className='error text-red-500 font-semibold'>{errors.DY.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="Shaft2B">Shaft2B:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="Shaft2B"
                        name="Shaft2B"
                        {...register('Shaft2B', { required: 'Shaft2B is required' })}
                    />
                    {errors.Shaft2B && <span className='error text-red-500 font-semibold'>{errors.Shaft2B.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="CPM">CPM:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="CPM"
                        name="CPM"
                        {...register('CPM', { required: 'CPM is required' })}
                    />
                    {errors.CPM && <span className='error text-red-500 font-semibold'>{errors.CPM.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="DEV">DEV:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="DEV"
                        name="DEV"
                        {...register('DEV', { required: 'DEV is required' })}
                    />
                    {errors.DEV && <span className='error text-red-500 font-semibold'>{errors.DEV.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="PH">PH:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="PH"
                        name="PH"
                        {...register('PH', { required: 'PH is required' })}
                    />
                    {errors.PH && <span className='error text-red-500 font-semibold'>{errors.PH.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="SH">SH:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="SH"
                        name="SH"
                        {...register('SH', { required: 'SH is required' })}
                    />
                    {errors.SH && <span className='error text-red-500 font-semibold'>{errors.SH.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="EDraw">EDraw:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="EDraw"
                        name="EDraw"
                        {...register('EDraw')}
                    />
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="AirPressure">Air Pressure:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="AirPressure"
                        name="AirPressure"
                        {...register('AirPressure')}
                    />
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="IntJetType">Int Jet Type:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="IntJetType"
                        name="IntJetType"
                        {...register('IntJetType')}
                    />
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="OilerRpm">Oiler RPM:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="OilerRpm"
                        name="OilerRpm"
                        {...register('OilerRpm', { required: 'Oiler RPM is required' })}
                    />
                    {errors.OilerRpm && <span className='error text-red-500 font-semibold'>{errors.OilerRpm.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="OilType">Oil Type:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="OilType"
                        name="OilType"
                        {...register('OilType', { required: 'Oil Type is required' })}
                    />
                    {errors.OilType && <span className='error text-red-500 font-semibold'>{errors.OilType.message}</span>}
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="Axial">Axial:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="Axial"
                        name="Axial"
                        {...register('Axial')}
                    />
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="Stroke">Stroke:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="Stroke"
                        name="Stroke"
                        {...register('Stroke')}
                    />
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="DTYTubeColor">DTY Tube Color:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="DTYTubeColor"
                        name="DTYTubeColor"
                        {...register('DTYTubeColor')}
                    />
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="CustomerName">Customer Name:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="CustomerName"
                        name="CustomerName"
                        {...register('CustomerName')}
                    />
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="StartDate">Start Date:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="StartDate"
                        name="StartDate"
                        {...register('StartDate')}
                    />
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="StopDate">Stop Date:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="StopDate"
                        name="StopDate"
                        {...register('StopDate')}
                    />
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="Quantity">Quantity:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="Quantity"
                        name="Quantity"
                        {...register('Quantity')}
                    />
                </div>

                <div className='form-control'>
                    <label className='label' htmlFor="Remarks">Remarks:</label>
                    <input
                        className='input input-bordered'
                        type="text"
                        id="Remarks"
                        name="Remarks"
                        {...register('Remarks')}
                    />
                </div>

                <div className="form-control">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddNewParamStatic;