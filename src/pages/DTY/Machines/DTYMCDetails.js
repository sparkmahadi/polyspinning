import React, { useContext, useEffect, useState } from 'react';
import runningGears from "../../../images/gear_rotation.gif"
import gearStopped from "../../../images/gear stopped.png";
import dtyMachineImg from "../../../images/dty-machine.png"
import mcParamImg from "../../../images/mcparams.jpg"
import mcParamSpeedImg from "../../../images/paramspeed.jpg"
import mcParamAxialImg from "../../../images/paramaxial.jpg"
import poyPackage from "../../../images/poy-package-removebg-preview.png"
import dtyPackage from "../../../images/dty-package-removebg-preview.png"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Spinner from '../../../components/Spinner/Spinner';
import DataLoading from '../../../components/Spinner/DataLoading';
import { getDtyMachineDetails, switchEnableEditing, updateDtyMachine } from '../../../redux/features/dtyMachines/dtyMachinesSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/UserContext';
import useCheckAccType from '../../../hooks/useCheckAccType';

const DTYMCDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { detailedMachine, isLoading, isError, enableEditing } = useSelector(state => state.dtyMachines);
    const { user, loading } = useContext(AuthContext);
    const [accType, isAccLoading] = useCheckAccType(user?.email);
    console.log(accType);
    const { register, handleSubmit, reset } = useForm();
    const [searchParams, setSearchParams] = useSearchParams();
    const machine = searchParams.get("machine");

    useEffect(() => {
        dispatch(getDtyMachineDetails(machine));
    }, [dispatch, machine])

    const DTYInfoProps = [
        "DTYType",
        "DTYDenier",
        "DTYColor",
        "Filaments",
        "DTYTubeColor",
        "Spandex",
        "LotNo",
        "POYShortPositions",
        "doubling",
        "CustomerName",
        "InspectionArea"
    ]

    const POYInfoProps = [
        "POYType",
        "POYDenier",
        "Filaments",
        "ChipsName",
        "POYColor",
        "StdDrawForce",
        "TotalWinder",
        "EndsPerWinder",
        "POYProcessSpeed",
        "POYLine",
        "POYBobbin"
    ]

    const mcInfoProps = [
        "DTYMCNo",
        "Brand",
        "Status",
        "Side",
        "TotalSpindles"
    ]

    const paramsProps = ["MCSpeed", "SOF", "TOF", "DY", "Shaft2B", "CPM", "DEV", "PH", "SH", "EDraw", "T1", "T2", "T3", "DR", "OilerRpm", "OilType", "Axial", "Stroke", "AirPressure", "IntJetType", "IntType",
        "IntJetOrifice"
    ]
    // console.log(detailedMachine);
    const propNames = ["mcInfo", "DTYInfo", "POYInfo", "params"];
    const propArrays = [mcInfoProps, DTYInfoProps, POYInfoProps, paramsProps];

    const onSubmit = (data) => {
        console.log("data", data);
        const updatedObj = {};

        for (let i = 0; i < propNames.length; i++) {
            const propName = propNames[i];
            const propArray = propArrays[i];
            const tempObj = {};

            for (let key of propArray) {
                tempObj[key] = data[key];
            }
            updatedObj[propName] = tempObj;
        }

        console.log("updatedObj", updatedObj);

        const { _id, updatedAt, ...oldObj } = detailedMachine;
        console.log("changed data", data);
        const changedProperties = compareObjects(oldObj, updatedObj);
        console.log(changedProperties);
        if (Object.entries(changedProperties).length) {
            const updateInfo = { DTYMCNo: detailedMachine.mcInfo.DTYMCNo, Side: detailedMachine.mcInfo.Side, changedProperties };
            console.log("updateInfo", updateInfo);
            dispatch(updateDtyMachine(updateInfo));
        }
        else {
            toast.success("Nothing to update", { id: "updated Machine" });
        }
        dispatch(switchEnableEditing());
        navigate("/dty-floor-status/dty-machines");
    }

    function compareObjects(oldObj, newObj) {
        const changedProps = {};

        for (let prop in oldObj) {
            if (oldObj.hasOwnProperty(prop)) {
                if (JSON.stringify(oldObj[prop]) !== JSON.stringify(newObj[prop])) {
                    changedProps[prop] = newObj[prop];
                }
            }
        }

        return changedProps;
    }

    if (isLoading) {
        return <Spinner></Spinner>
    }

    if (!Object.entries(detailedMachine).length) {
        return <DataLoading></DataLoading>
    }

    const { _id, ...editingInfo } = detailedMachine;
    return (
        <div className="p-8 max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Machine Number: {detailedMachine.mcInfo?.DTYMCNo}/{detailedMachine.mcInfo?.Side} Side</h2>

            {
                !enableEditing &&
                <>
                    <div className="lg:flex justify-center xl:gap-32">

                        <div>

                            <div className='mb-5'>
                                <h3 className="text-xl font-bold mb-2">MC Info:</h3>
                                <div className='lg:flex flex-row-reverse justify-center items-center'>
                                    <img className='lg:w-52 mx-auto' src={detailedMachine.mcInfo?.Status === "Running" ? runningGears : gearStopped} alt="" />
                                    <table className="table-auto w-full">
                                        <tbody>
                                            {Object?.entries(detailedMachine.mcInfo).map(([key, value]) => (
                                                <tr key={key}>
                                                    <td className="border px-4 py-2 font-semibold">{key}</td>
                                                    <td className="border px-4 py-2">{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className='mb-5'>
                                <h3 className="text-xl font-bold mb-2">Parameters:</h3>
                                <div className='lg:flex flex-row-reverse justify-center items-center gap-5'>
                                    <div className='lg:flex flex-col gap-5'>
                                        <img className='lg:w-80 mx-auto rounded-lg' src={mcParamSpeedImg} alt="" />
                                        <img className='lg:w-80 mx-auto rounded-lg' src={mcParamImg} alt="" />
                                        <img className='lg:w-80 mx-auto rounded-lg' src={mcParamAxialImg} alt="" />
                                        <img className='lg:w-80 mx-auto rounded-lg' src={dtyMachineImg} alt="" />
                                    </div>
                                    <table className="table-auto w-full">
                                        <tbody>
                                            {Object?.entries(detailedMachine.params).map(([key, value]) => (
                                                <tr key={key}>
                                                    <td className="border px-4 py-2 font-semibold">{key}</td>
                                                    <td className="border px-4 py-2">{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                        <div>

                            <div className='mb-5'>
                                <h3 className="text-xl font-bold mb-2">DTY Info:</h3>
                                <div className='lg:flex flex-row-reverse justify-center items-center'>
                                    <img className='lg:w-52 mx-auto' src={dtyPackage} alt="" />
                                    <table className="table-auto w-full">
                                        <tbody>
                                            {Object?.entries(detailedMachine.DTYInfo).map(([key, value]) => (
                                                <tr key={key}>
                                                    <td className="border px-4 py-2 font-semibold">{key}</td>
                                                    <td className="border px-4 py-2">{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className='mb-5'>
                                <h3 className="text-xl font-bold mb-2">POY Info:</h3>
                                <div className='lg:flex flex-row-reverse justify-center items-center'>
                                    <img className='lg:w-52 mx-auto' src={poyPackage} alt="" />
                                    <table className="table-auto w-full">
                                        <tbody>
                                            {Object?.entries(detailedMachine.POYInfo).map(([key, value]) => (
                                                <tr key={key}>
                                                    <td className="border px-4 py-2 font-semibold">{key}</td>
                                                    <td className="border px-4 py-2">{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {
                                detailedMachine.updatedAt &&
                                <div className='mb-5'>
                                    <h3 className="text-xl font-bold mb-2">Update Info:</h3>
                                    <div className='lg:flex flex-row-reverse justify-center items-center'>
                                        {/* <img className='lg:w-52 mx-auto' src={poyPackage} alt="" /> */}
                                        <table className="table-auto w-full">
                                            <tbody>
                                                {Object?.entries(detailedMachine?.updatedAt).map(([key, value]) => (
                                                    <tr key={key}>
                                                        <td className="border px-4 py-2 font-semibold">{key}</td>
                                                        <td className="border px-4 py-2">{value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    {
                        accType === "Admin" &&
                        <div className='flex justify-center'>
                            <label onClick={() => dispatch(switchEnableEditing())} htmlFor="dtyMachineModal" className='btn btn-outline btn-sm'>Update Details</label>
                        </div>
                    }
                </>
            }

            {
                enableEditing &&
                <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl mx-auto'>

                    <label className='text-lg text-center font-semibold text-white bg-sky-500 block mb-3 rounded-lg'>Machine Info</label>
                    {
                        mcInfoProps?.map((prop, i) =>
                            <div key={i} className='lg:flex justify-between items-center mb-3'>
                                <label>{prop} :</label>
                                <input name={prop} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" defaultValue={editingInfo.mcInfo[prop]} {...register(prop)} />
                            </div>
                        )
                    }
                    <label className='text-lg text-center font-semibold text-white bg-sky-500 block mb-3 rounded-lg'>DTY Info</label>
                    {
                        DTYInfoProps?.map((prop, i) =>
                            <div key={i} className='lg:flex justify-between items-center mb-3'>
                                <label>{prop} :</label>
                                <input name={prop} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" defaultValue={editingInfo.DTYInfo[prop]} {...register(prop)} />
                            </div>
                        )
                    }
                    <label className='text-lg text-center font-semibold text-white bg-sky-500 block mb-3 rounded-lg'>POY Info</label>
                    {
                        POYInfoProps?.map((prop, i) =>
                            <div key={i} className='lg:flex justify-between items-center mb-3'>
                                <label>{prop} :</label>
                                <input name={prop} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" defaultValue={editingInfo.POYInfo[prop]} {...register(prop)} />
                            </div>
                        )
                    }
                    <label className='text-lg text-center font-semibold text-white bg-sky-500 block mb-3 rounded-lg'>Parameters</label>
                    {
                        paramsProps?.map((prop, i) =>
                            <div key={i} className='lg:flex justify-between items-center mb-3'>
                                <label>{prop} :</label>
                                <input name={prop} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" defaultValue={editingInfo.params[prop]} {...register(prop)} />
                            </div>
                        )
                    }
                    <button type='submit' className='btn btn-primary mr-3'>Submit</button>
                    <button onClick={() => dispatch(switchEnableEditing())} className='btn btn-secondary'>Cancel</button>
                </form>
            }

        </div>
    );
};

export default DTYMCDetails;