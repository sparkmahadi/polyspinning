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
import { getDtyMachineDetails, switchEnableEditing, updateDtyMachine, updateOtherMC } from '../../../redux/features/dtyMachines/dtyMachinesSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/UserContext';
import useCheckAccType from '../../../hooks/useCheckAccType';
import UpdatingOtherMachineModal from '../../../components/DTY/UpdatingOtherMachineModal/UpdatingOtherMachineModal';
import { addDtyMachineUpdates } from './../../../redux/features/dtyMachineUpdates/dtyMachineUpdatesSlice';
import { compareNestedObjsForChangedProps, getMCUpdatedProps } from '../../../logics/findingFunctions';
import { format } from 'date-fns';

const DTYMCDetails = () => {
    const timeAndDate = format(new Date(), "Pp");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { detailedMachine, isLoading, isError, enableEditing } = useSelector(state => state.dtyMachines);
    const { user, loading } = useContext(AuthContext);
    const [accType, isAccLoading] = useCheckAccType(user?.email);
    // console.log(accType);
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
        // console.log("data", data);
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
        const updatedMCDetail = compareObjects(oldObj, updatedObj);
        console.log(updatedMCDetail);
        if (Object.entries(updatedMCDetail).length) {
            const updateInfo = { DTYMCNo: detailedMachine.mcInfo.DTYMCNo, Side: detailedMachine.mcInfo.Side, updatedMCDetail };
            dispatch(updateDtyMachine(updateInfo));

            const propertiesToCompare = ["mcInfo", "DTYInfo", "POYInfo", "params"];
            const changedProps = compareNestedObjsForChangedProps(updatedObj, oldObj, propertiesToCompare);
            const updatedPropertyRemarks = getMCUpdatedProps(updatedObj, oldObj, changedProps);
            dispatch(addDtyMachineUpdates({machineData: updatedObj, updatedProperties: updatedPropertyRemarks, updatedFrom: "Manually Machine Updated", updatedAt: timeAndDate}));
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

    if (isLoading || loading) {
        return <Spinner></Spinner>
    }

    if (!Object.entries(detailedMachine).length) {
        return <DataLoading></DataLoading>
    }

    const handleSetProps = (mcDetails, propTypesToSet) => {
        let otherSide;
        const currentSide = mcDetails.mcInfo.Side;
        if (currentSide === "A") {
            otherSide = "B"
        }
        if (currentSide === "B") {
            otherSide = "A"
        }
        let updateInfo = {
            DTYMCNo: mcDetails.mcInfo.DTYMCNo,
            Side: otherSide,
            UpdatesFrom: `${mcDetails.mcInfo.DTYMCNo}/${currentSide}`,
            Props: {}
        };


        if (typeof propTypesToSet === "string") {
            const prop = mcDetails[propTypesToSet];
            updateInfo.Props = { [propTypesToSet]: prop }
        }
        else if (Array.isArray(propTypesToSet) && propTypesToSet?.length) {
            for (let elem of propTypesToSet) {
                const prop = mcDetails[elem];
                updateInfo.Props[elem] = prop;
            }
        } else {
            return toast.error("No props found to set to other side of machine")
        }
        dispatch(updateOtherMC(updateInfo));
    }

    const handleUpdateOtherMachines = (e) => {
        e.preventDefault();
        let updateInfo = {};
        const form = e.target;
        const machinesToUpdate = form.machinesToUpdate.value;
        const propTypeToSet = form.selectPropType.value;
        const machines = machinesToUpdate.split(",").map((item) => item.trim());
        if (machines?.length) {
            for (let machine of machines) {
                if (machine.includes("/")) {

                    const [DTYMCNo, Side] = machine.split("/");
                    updateInfo = {
                        DTYMCNo, Side,
                        UpdatesFrom: `${detailedMachine.mcInfo.DTYMCNo}/${detailedMachine.mcInfo.Side}`,
                        Props: {}
                    };
                    if (propTypeToSet === "AllThreeProps") {
                        const props = ["DTYInfo", "params", "POYInfo"];
                        for (let elem of props) {
                            const prop = detailedMachine[elem];
                            updateInfo.Props[elem] = prop;
                        }
                    } else {
                        const prop = detailedMachine[propTypeToSet];
                        updateInfo.Props = { [propTypeToSet]: prop };
                    }

                    dispatch(updateOtherMC(updateInfo));

                } else {
                    const DTYMCNo = machine;
                    const updateInfo = {
                        DTYMCNo,
                        UpdatesFrom: `${detailedMachine.mcInfo.DTYMCNo}/${detailedMachine.mcInfo.Side}`,
                        Props: {}
                    };

                    const Sides = ["A", "B"];
                    Sides.forEach((Side) => {
                        const updateInfoWithSide = { ...updateInfo };
                        updateInfoWithSide.Side = Side;
                        if (propTypeToSet === "AllThreeProps") {
                            const props = ["DTYInfo", "params", "POYInfo"];
                            for (let elem of props) {
                                const prop = detailedMachine[elem];
                                updateInfoWithSide.Props[elem] = prop;
                            }
                        } else {
                            const prop = detailedMachine[propTypeToSet];
                            updateInfoWithSide.Props = { [propTypeToSet]: prop };
                        }
                        dispatch(updateOtherMC(updateInfoWithSide));
                    });

                }
            }
        }
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
                                    <div className='hidden lg:flex flex-col gap-5'>
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
                        <div className='lg:flex justify-center gap-5 flex-wrap'>
                            <label onClick={() => handleSetProps(detailedMachine, "params")} className='btn btn-outline btn-sm'>Set This Parameter to Other Side</label>
                            <label onClick={() => handleSetProps(detailedMachine, "DTYInfo")} className='btn btn-outline btn-sm'>Set This DTY Info to Other Side</label>
                            <label onClick={() => handleSetProps(detailedMachine, "POYInfo")} className='btn btn-outline btn-sm'>Set This POY Info to Other Side</label>
                            <label onClick={() => handleSetProps(detailedMachine, ["DTYInfo", "params", "POYInfo"])} className='btn btn-outline btn-sm'>Set Same Param, DTY & POY Info to Other Side</label>

                            <label htmlFor="dtySetPropsFromOtherMC" className='btn btn-outline btn-sm'>Set Same Param, DTY & POY Info to Other Machines</label>

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

            {
                <UpdatingOtherMachineModal handleUpdateOtherMachines={handleUpdateOtherMachines}/>
            }

        </div>
    );
};

export default DTYMCDetails;