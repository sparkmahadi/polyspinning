import React, { useEffect } from 'react';
import runningGears from "../../../images/gear_rotation.gif"
import gearStopped from "../../../images/gear stopped.png";
import dtyMachineImg from "../../../images/dty-machine.png"
import poyPackage from "../../../images/poy-package-removebg-preview.png"
import dtyPackage from "../../../images/dty-package-removebg-preview.png"
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getDtyMachineDetails } from '../../../redux/features/dtyFloorStatus/dtyFloorStatusSlice';
import Spinner from '../../../components/Spinner/Spinner';
import DataLoading from '../../../components/Spinner/DataLoading';

const DTYMCDetails = () => {
    const dispatch = useDispatch();
    const {detailedMachine, isLoading, isError } = useSelector(state => state.dtyFloorStatus);
    const [searchParams, setSearchParams]= useSearchParams();
    const machine = searchParams.get("machine");
    
    useEffect(() => {
        dispatch(getDtyMachineDetails(machine));
    }, [dispatch, machine])
    // console.log(data);

    if(isLoading){
        return <Spinner></Spinner>
    }

    if(!Object.entries(detailedMachine).length){
        return <DataLoading></DataLoading>
    }
    return (
        <div className="p-8 max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Machine Number: {detailedMachine.mcInfo?.DTYMCNo}/{detailedMachine.mcInfo?.Side} Side</h2>
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
        </div>
    );
};

export default DTYMCDetails;