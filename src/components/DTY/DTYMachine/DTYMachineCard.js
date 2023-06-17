import React from 'react';
import runningGears from "../../../images/gear_rotation.gif";
import gearStopped from "../../../images/gear stopped.png";
import dtyBobbin from "../../../images/dty bobbin.jpg";
import poyBobbin from "../../../images/poy bobbin.jpg";
import { Link } from 'react-router-dom';

const DTYMachineCard = ({ mcInfo, DTYInfo, POYInfo, params }) => {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                <img className="h-12 md:h-44 lg:h-72 xl:h-full w-full object-cover" src={mcInfo.Status === "Running" ? runningGears : gearStopped} alt="" />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-cyan-600">
                    POY {POYInfo.POYDenier}/{POYInfo.Filaments} to DTY {DTYInfo.DTYDenier}/{DTYInfo.Filaments}/{params.IntType}, ({DTYInfo.LotNo})
                  </p>
                  <a href='' className="mt-2 block text-sm lg:text-base">
                    <p className="text-base lg:text-xl font-semibold text-gray-900">Machine #{mcInfo.DTYMCNo}/{mcInfo.Side} | {mcInfo.Brand} | {parseInt((POYInfo.POYDenier * mcInfo.TotalSpindles * params.MCSpeed * 0.00016) / params.DR)} kgs/day</p>
                    <p className="mt-3 text-gray-500">
                      Speed : {params.MCSpeed} MPM,
                      T1 : {params.T1},
                      T2 : {params.T2},
                      INT : {params.IntJetType},
                      Air Pressure: {params.AirPressure} kg/cm3
                    </p>
                    <p>POY Line: {POYInfo.POYLine}, Winder: {POYInfo.TotalWinder}, Ends: {POYInfo.EndsPerWinder}</p>
                  </a>
                </div>
                <div className="mt-5 flex items-center gap-3 justify-around">

                  <div className="flex gap-3 w-1/4 md:w-full">
                    <img className="h-7 md:h-10 lg:h-12 w-7 md:w-10 lg:w-12 rounded-full" src={poyBobbin} alt={POYInfo.POYBobbin} title={POYInfo.POYBobbin} />
                    <img className="h-7 md:h-10 lg:h-12 w-7 md:w-10 lg:w-12 rounded-full" src={dtyBobbin} alt={DTYInfo.DTYBobbin} title={DTYInfo.dtyBobbin} />
                  </div>

                  <div className="ml-3 w-1/2 md:w-full">
                    <p className="text-sm font-medium text-gray-900">
                      D/R: {params.DR}
                    </p>
                    <div className="text-sm text-gray-500">
                      <span>D/Y: {params.DY}</span>
                    </div>
                  </div>

                  <Link to={`machine-details?machine=${mcInfo.DTYMCNo}/${mcInfo.Side}`} className='w-1/4 md:w-full'>
                    <button className='btn btn-sm lg:p-2 btn-primary normal-case'>Show Details</button>
                  </Link>
                </div>
              </div>
            </div>
    );
};

export default DTYMachineCard;