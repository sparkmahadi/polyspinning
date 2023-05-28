import React, { useEffect, useState } from 'react';
import HomeCards from '../../components/HomeCards/HomeCards';
import runningGears from "../../images/gear_rotation.gif";
import gearStopped from "../../images/gear stopped.png";
import dtyBobbin from "../../images/dty bobbin.jpg";
import poyBobbin from "../../images/poy bobbin.jpg";
import { Link } from 'react-router-dom';

const DtyFloorLayout = () => {
  const [machines, setMachines] = useState([]);
  console.log(machines);
  useEffect(() => {
    fetch("dty.json").then(res => res.json().then(data => setMachines(data)));
  }, [])

  return (
    <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-32">
      <div className="relative">
        <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
          <h2 className="text-lg font-semibold text-cyan-600">Learn</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">DTY Floor</p>

        </div>
        <div className="mx-auto mt-12 grid max-w-md gap-8 px-6 sm:max-w-lg lg:max-w-7xl lg:grid-cols-3 lg:px-8">
          {machines.map((mc) => (
            //   carddddd
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                <img className="h-84 w-full object-cover" src={mc.status === "Running" ? runningGears : gearStopped} alt="" />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-cyan-600">
                    POY {mc.poyDenier}/{mc.filaments} to DTY {mc.dtyDenier}/{mc.filaments}/{mc.intType}, ({mc.lotNo})
                  </p>
                  <a href='' className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">Machine #{mc.machineNo} | {mc.brand} | {parseInt((mc.poyDenier*mc.totalSpindles*mc.processSpeed*0.00016)/mc.drawRatioA)} kg/day</p>
                    <p className="mt-3 text-base text-gray-500">
                      Speed : {mc.processSpeed} MPM,
                      T1 : {mc.T1},
                      T2 : {mc.T2},
                      INT : {mc.intJetBrand + " " + mc.intJetModel},
                      Air Pressure: {mc.airPressure} kg/cm3
                    </p>
                    <p>POY Line: {mc.poyLine}, Winder: {mc.totalWinder}, Ends: {mc.endsPerWinder}</p>
                  </a>
                </div>
                <div className="mt-6 flex items-center gap-3 justify-around">

                  <div className="flex gap-3">
                    <img className="h-10 w-10 rounded-full" src={poyBobbin} alt={mc.poyBobbin} title={mc.poyBobbin} />
                    <img className="h-10 w-10 rounded-full" src={dtyBobbin} alt={mc.dtyBobbin} title={mc.dtyBobbin} />
                  </div>

                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      D/R: {mc.drawRatioA}
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <span>D/Y: {mc.dyA}</span>
                    </div>
                  </div>

                  <Link to={`dtyMachine/${mc.machineNo}`}>
                    <button className='rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 py-1 px-2 font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900'>Show Details</button>
                  </Link>
                </div>
              </div>
            </div>


          ))}
        </div>
      </div>
    </div>
  );
};

export default DtyFloorLayout;