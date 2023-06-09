import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import runningGears from "../../../images/gear_rotation.gif";
import dtyBobbin from "../../../images/dty bobbin.jpg";
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner/Spinner';
import { getMcMergedDataFromLot } from '../../../redux/features/dtyMachinesFromPresentLot/dtyMCsFromPLotSlice';

const DtyMachinesFromPresentLot = () => {
    const dispatch = useDispatch();
    const { machineMergedDataFromLot: machines, isLoading } = useSelector(state => state.dtyMachinesFromLot);
    console.log(machines);
    useEffect(() => {
        dispatch(getMcMergedDataFromLot());
    }, [dispatch]);

    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-10">
            <div className="relative">
                <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
                    <h2 className="text-lg font-semibold text-cyan-600">Observe and Monitor</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">DTY Floor</p>

                </div>

                <div className="mx-auto mt-12 grid max-w-md gap-8 px-6 sm:max-w-lg lg:max-w-7xl md:grid-cols-2 lg:grid-cols-3 lg:px-8">
                    {machines.map(({ DTYMCNo, ProductType, POYLine, DTYBobbinColor, PresentLotNo, AirPress, INTJet, InspectionArea, Side }, i) => (
                        //   card component
                        <div key={i} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                            <div className="flex-shrink-0">
                                <img className="h-52 md:h-32 lg:h-64 xl:h-84 w-full object-cover" src={runningGears} alt="" />
                            </div>
                            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                                <div className="flex-1 text-sm lg:text-base">
                                    <p className="font-medium text-cyan-600">
                                        POY to DTY: {ProductType}
                                    </p>
                                    <div className="mt-2 block ">
                                        <p className="text-xl font-semibold text-gray-900">Machine #
                                            {DTYMCNo}/
                                            {Side.length === 2 ? Side[0] + "+" + Side[1]
                                                : Side}
                                        </p>

                                        <p className="mt-3 text-gray-500">
                                            Present Lot: {PresentLotNo}
                                        </p>
                                        <p>POY Line: {POYLine}, Air Pressure: {AirPress}, Int Jet Model: {INTJet}, Inspection Area: {InspectionArea}, DTY Bobbin: {DTYBobbinColor}</p>
                                    </div>
                                </div>
                                <div className="lg:mt-6 flex items-center gap-3 justify-around">

                                    <div className="flex gap-3">
                                        <img className="h-10 w-10 rounded-full" src={dtyBobbin} alt={DTYBobbinColor} title={DTYBobbinColor} />
                                    </div>

                                    <Link to={`${DTYMCNo}`}>
                                        <button className='btn btn-primary btn-sm'>Show Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>


                    ))}
                </div>

                <Link to={'dty-machines/new-machine'}><button className='btn btn-primary block mx-auto mt-10'>Add New Machine</button></Link>
            </div>
        </div>
    );
};

export default DtyMachinesFromPresentLot;