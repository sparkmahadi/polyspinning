import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner/Spinner';
import DTYMachineCard from '../../../components/DTY/DTYMachine/DTYMachineCard';
import { getDtyMachines } from '../../../redux/features/dtyMachines/dtyMachinesSlice';
import DataLoading from '../../../components/Spinner/DataLoading';
import LoadingCustom from '../../../components/Spinner/LoadingCustom';

const DTYMachines = () => {
    const dispatch = useDispatch();
    const { dtyMachines, isLoading } = useSelector(state => state.dtyMachines);
    // console.log("dtyMachines", dtyMachines);
  
    useEffect(() => {
      dispatch(getDtyMachines());
    }, [dispatch]);
  
    if(isLoading){
      return <Spinner></Spinner>
    }

    if(!Array.isArray(dtyMachines)){
        return <LoadingCustom message={"No Data Found in server"}/>
    }

    if(!dtyMachines.length){
        return <DataLoading></DataLoading>
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