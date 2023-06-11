import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDtyMachines } from '../../../redux/features/dtyFloorStatus/dtyFloorStatusSlice';
import Spinner from '../../../components/Spinner/Spinner';
import DTYMachineCard from '../../../components/DTY/DTYMachine/DTYMachineCard';

const DTYMachines = () => {
    const dispatch = useDispatch();
    const { dtyMachines, isLoading } = useSelector(state => state.dtyFloorStatus);
  
    useEffect(() => {
      dispatch(getDtyMachines());
    }, [dispatch]);
  
    if(isLoading){
      return <Spinner></Spinner>
    }
    return (
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
    );
};

export default DTYMachines;