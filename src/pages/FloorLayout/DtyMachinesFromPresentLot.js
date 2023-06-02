import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import runningGears from "../../images/gear_rotation.gif";
import gearStopped from "../../images/gear stopped.png";
import dtyBobbin from "../../images/dty bobbin.jpg";
import poyBobbin from "../../images/poy bobbin.jpg";

const DtyMachinesFromPresentLot = () => {
    const [machines, setMachines] = useState([]);
    console.log(machines);
    useEffect(() => {
        axios.get("http://localhost:5000/dty-machine-details-from-present-lot").then(res => setMachines(res.data));
    }, []);

    const sortedMachines = machines.sort((a, b) => {
        // Sort by DTYMCNo numerically
        const dtymcNoA = parseInt(a.DTYMCNo);
        const dtymcNoB = parseInt(b.DTYMCNo);
        if (dtymcNoA < dtymcNoB) {
            return -1;
        }
        if (dtymcNoA > dtymcNoB) {
            return 1;
        }

        // Sort by Side alphabetically
        const sideA = a.Side.toUpperCase();
        const sideB = b.Side.toUpperCase();
        if (sideA < sideB) {
            return -1;
        }
        if (sideA > sideB) {
            return 1;
        }

        return 0; // if both DTYMCNo and Side are equal
    });

    const mergedData = [];

    // Create a helper function to compare two objects excluding the "Side" property
    function compareObjects(obj1, obj2) {
        const { Side: side1, ...rest1 } = obj1;
        const { Side: side2, ...rest2 } = obj2;
        return JSON.stringify(rest1) === JSON.stringify(rest2);
    }

    sortedMachines.forEach((obj) => {
        const { DTYMCNo, Side, ...rest } = obj;
        const existingObj = mergedData.find((item) => item.DTYMCNo === DTYMCNo);

        if (existingObj && compareObjects(existingObj, obj)) {
            // If an existing object with the same DTYMCNo is found and all other properties are the same, merge the Side property
            existingObj.Side = [...existingObj.Side, Side];
        } else {
            // Otherwise, create a new object
            mergedData.push({ DTYMCNo, Side: [Side], ...rest });
        }
    });

    console.log(mergedData);


    return (
        <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-32">
            <div className="relative">
                <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
                    <h2 className="text-lg font-semibold text-cyan-600">Learn</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">DTY Floor</p>

                </div>

                <div className="mx-auto mt-12 grid max-w-md gap-8 px-6 sm:max-w-lg lg:max-w-7xl md:grid-cols-2 lg:grid-cols-3 lg:px-8">
                    {mergedData.map(({ DTYMCNo, ProductType, POYLine, DTYBobbinColor, PresentLotNo, AirPress, INTJet, InspectionArea, Side }, i) => (
                        //   carddddd
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