import React, { useEffect, useState } from 'react';
import runningGears from "../../../images/gear_rotation.gif"
import gearStopped from "../../../images/gear stopped.png";
import dtyMachineImg from "../../../images/dty-machine.png"
import poyPackage from "../../../images/poy-package-removebg-preview.png"
import dtyPackage from "../../../images/dty-package-removebg-preview.png"
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../../../components/Spinner/Spinner';
import DataLoading from '../../../components/Spinner/DataLoading';
import { getDtyMachineDetails, switchEnableEditing, updateDtyMachine } from '../../../redux/features/dtyMachines/dtyMachinesSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const DTYMCDetails = () => {
    const dispatch = useDispatch();
    const { detailedMachine, isLoading, isError, enableEditing } = useSelector(state => state.dtyMachines);
    const { register, handleSubmit } = useForm();
    const [searchParams, setSearchParams] = useSearchParams();
    const machine = searchParams.get("machine");

    useEffect(() => {
        dispatch(getDtyMachineDetails
            (machine));
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

    const onSubmit = (data) => {
        // console.log(compareObjects(data, detailedMachine));
        const propNames = ["mcInfo", "DTYInfo", "POYInfo", "params"];
        const propArrays = [mcInfoProps, DTYInfoProps, POYInfoProps, paramsProps];
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

        const { _id, updatedAt, ...oldObj } = detailedMachine;
        const changedProperties = compareObjects(oldObj, updatedObj);
        // console.log("oldObj.params", oldObj.params, "updatedObj.params", updatedObj.params);
        console.log(changedProperties);
        if (Object.entries(changedProperties).length) {
            const updateInfo = { DTYMCNo: detailedMachine.mcInfo.DTYMCNo, Side: detailedMachine.mcInfo.Side, changedProperties };
            dispatch(updateDtyMachine(updateInfo));
        }
        else {
            toast.success("Nothing to update", {id:"updated Machine"});
        }
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
                    <div className="flex justify-center xl:gap-32">

                        <div>

                            <div className='mb-5'>
                                <h3 className="text-xl font-bold mb-2">MC Info:</h3>
                                <div className='flex flex-row-reverse justify-center items-center'>
                                    <img className='w-52' src={detailedMachine.mcInfo?.Status === "Running" ? runningGears : gearStopped} alt="" />
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
                                <div className='flex flex-row-reverse justify-center items-center'>
                                    <img className='w-52' src={dtyMachineImg} alt="" />
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
                                <div className='flex flex-row-reverse justify-center items-center'>
                                    <img className='w-52' src={dtyPackage} alt="" />
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
                                <div className='flex flex-row-reverse justify-center items-center'>
                                    <img className='w-52' src={poyPackage} alt="" />
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
                                    <div className='flex flex-row-reverse justify-center items-center'>
                                        {/* <img className='w-52' src={poyPackage} alt="" /> */}
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
                    <label onClick={() => dispatch(switchEnableEditing())} htmlFor="dtyMachineModal" className='btn btn-success btn-sm'>Update Details</label>
                </>
            }

            {
                enableEditing &&
                <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl mx-auto'>
                    {
                        Object.entries(editingInfo)?.map((categories, i) =>
                            <div key={i}>
                                {
                                    Object.entries(categories[1]).map((specs, i) =>
                                        <div key={i} className='flex justify-between items-center mb-3'>
                                            <label>{specs[0]} :</label>
                                            <input name={specs[0]} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" defaultValue={specs[1]} {...register(specs[0])} />
                                        </div>

                                    )
                                }
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