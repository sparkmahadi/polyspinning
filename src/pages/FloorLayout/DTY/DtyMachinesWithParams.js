import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDtyParamByMC, getDtyParamByMachines } from '../../../redux/features/dtyProcessParameters/dtyParametersSlice';
import Spinner from '../../../components/Spinner/Spinner';
import DTYMCParamCard from '../../../components/DTY/DTYMachine/DTYMCParamCard';

const DtyMachinesWithParams = () => {
    const dispatch = useDispatch();
    const { dtyMachinesWithParams, isLoading } = useSelector(state => state.dtyProcessParameters);

    const LoadAllParameters = () => {
        const machines = [
            "1/A",
            "1/B",
            "2/A",
            "2/B",
        ];
        dispatch(getDtyParamByMachines(machines));
    }


    useEffect(() => {
        // const sortedMachines = dtyMachinesWithParams?.sort((a, b) => a - b);
        // console.log(sortedMachines);
    }, [dtyMachinesWithParams]);

    console.log(dtyMachinesWithParams);

    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-10">
            <div className="relative">
                <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
                    <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">DTY Machines With Parameters</h3>
                    <p className="text-lg font-semibold text-cyan-600 pt-3">If there is no parameter for one side of machine, The app will show the parameter available for full machine.</p>
                </div>

                <div className="mx-auto mt-12 grid max-w-md gap-8 px-6 sm:max-w-lg lg:max-w-7xl md:grid-cols-2 lg:grid-cols-3 lg:px-8">
                    {dtyMachinesWithParams.map((mc, i) => (
                        // mc?.message ?
                        // <DTYMCParamCard key={i} message={mc?.message}></DTYMCParamCard>
                        // :
                        <DTYMCParamCard key={i} mcDetails={mc}></DTYMCParamCard>
                    ))}
                </div>

                {
                    !dtyMachinesWithParams.length &&
                    <div className='flex justify-center mt-10'>
                        <button onClick={LoadAllParameters} className='btn btn-primary btn-sm'>Load Machines With Latest Parameters</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default DtyMachinesWithParams;