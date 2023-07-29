import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDtyParamByMC, getDtyParamByMachines } from '../../../redux/features/dtyProcessParameters/dtyParametersSlice';
import DTYMCParamCard from '../../../components/DTY/DTYMachine/DTYMCParamCard';
import DataLoading from '../../../components/Spinner/DataLoading';
import { defaultContainer, pageHeadings } from '../../../customClasses/CustomClasses';

const DtyMachinesWithParams = () => {
    const dispatch = useDispatch();
    const { dtyMachinesWithParams, isLoading } = useSelector(state => state.dtyProcessParameters);

    const LoadAllParameters = () => {
        const machines = [
            "1/A",
            "1/B",
            "2/A",
            "2/B",
            "3/A",
            "3/B",
            "4/A",
            "4/B",
            "5/A",
            "5/B",
            "6/A",
            "6/B",
            "7/A",
            "7/B",
            "8/A",
            "8/B",
            "9/A",
            "9/B",
            "10/A",
            "10/B",
            "11/A",
            "11/B",
            "12/A",
            "12/B",
            "13/A",
            "13/B",
            "14/A",
            "14/B",
            "15/A",
            "15/B",
            "16/A",
            "16/B",
            "17/A",
            "17/B",
            "18/A",
            "18/B",
            "19/A",
            "19/B",
            "20/A",
            "20/B",
            "21/A",
            "21/B",
            "22/A",
            "22/B",
            "23/A",
            "23/B",
            "24/A",
            "24/B",
            "25/A",
            "25/B",
            "26/A",
            "26/B",
            "27/A",
            "27/B",
            "28/A",
            "28/B",
            "29/A",
            "29/B",
            "30/A",
            "30/B",
        ];
        dispatch(getDtyParamByMachines(machines));
    }


    useEffect(() => {
        // const sortedMachines = dtyMachinesWithParams?.sort((a, b) => a - b);
        // console.log(sortedMachines);
    }, [dtyMachinesWithParams]);

    console.log(dtyMachinesWithParams);

    if (isLoading) {
        return <DataLoading></DataLoading>
    }

    return (
        <div className={defaultContainer}>
            <div className="relative">
                <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
                    <h3 className={`mt-2 ${pageHeadings}`}>DTY Machines With Parameters</h3>
                    <p className="text-lg font-semibold text-cyan-600 pt-3">If there is no parameter for one side of machine, The app will show the parameter available for full machine.</p>
                </div>

                <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10">
                    {dtyMachinesWithParams.map((mc, i) => (
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