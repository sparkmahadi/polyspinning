import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DTYMachineCard from '../../../components/DTY/DTYMachine/DTYMachineCard';
import { useDispatch, useSelector } from 'react-redux';
import { getDtyMachines } from '../../../redux/features/dtyFloorStatus/dtyFloorStatusSlice';
import Spinner from '../../../components/Spinner/Spinner';

const DtyFloorLayout = () => {
  const dispatch = useDispatch();
  const { dtyMachines, isLoading } = useSelector(state => state.dtyFloorStatus);

  useEffect(() => {
    dispatch(getDtyMachines());
  }, [dispatch]);

  if(isLoading){
    return <Spinner></Spinner>
  }

  return (
    <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-10">
      <div className="relative">
        <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Observing and Monitoring DTY Floor Machines</h3>
          <p className="text-lg font-semibold text-cyan-600 pt-2">DTY floor machines play a vital role in the melt spinning process, where continuous filaments are produced for textiles. By closely observing and monitoring these machines, manufacturers can ensure precision and efficiency. From temperature control to tension management, the careful scrutiny of DTY floor machines guarantees optimal production and high-quality filament output.</p>

        </div>

        <div className="mx-auto mt-12 grid max-w-md gap-8 px-6 sm:max-w-lg lg:max-w-7xl lg:grid-cols-3 lg:px-8">
          {dtyMachines?.map(({ mcInfo, DTYInfo, POYInfo, params }, i) => (
            <DTYMachineCard key={i}
              mcInfo={mcInfo}
              DTYInfo={DTYInfo}
              POYInfo={POYInfo}
              params={params}
            ></DTYMachineCard>
          ))}
        </div>

      </div>

      <div className='flex justify-center gap-5 lg:mt-10'>
        <Link to={'dty-machines/new-machine'}><button className='btn btn-primary normal-case btn-sm'>Add New Machine</button></Link>
        <Link to={'dty-machines'}><button className='btn btn-primary normal-case btn-sm'>All Machines With Present Lot</button></Link>
        <Link to={'dty-machines-with-parameters'}><button className='btn btn-primary normal-case btn-sm'>All Machines With Latest Parameters</button></Link>
      </div>
    </div>
  );
};

export default DtyFloorLayout;