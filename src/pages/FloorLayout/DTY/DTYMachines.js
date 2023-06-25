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
    console.log("dtyMachines", dtyMachines.slice(0,10));

    useEffect(() => {
        dispatch(getDtyMachines());
    }, [dispatch]);

    function findUniqueNestedValues(data, nestedObj, nestedProp) {
        const uniqueNestedValues = new Set();
        data.forEach((obj) => {
            const dtyType = obj[nestedObj][nestedProp];
            uniqueNestedValues.add(dtyType);
        });
        return Array.from(uniqueNestedValues);
    }

    const uniqueDTYTypes = findUniqueNestedValues(dtyMachines, "DTYInfo", "DTYType");
    const uniqueBobbins = findUniqueNestedValues(dtyMachines, "DTYInfo", "DTYTubeColor");
    console.log("uniqueDTYTypes", uniqueBobbins);

    if (isLoading) {
        return <Spinner></Spinner>
    }

    if (!Array.isArray(dtyMachines)) {
        return <LoadingCustom message={"No Data Found in server"} />
    }

    if (!dtyMachines.length) {
        return <DataLoading></DataLoading>
    }
    return (
        <>
            <div className=''>
                <div className="w-full md:w-2/3 shadow p-5 rounded-lg bg-white mx-auto">
                    <div className="relative">
                        <div className="absolute flex items-center ml-2 h-full">
                            <svg className="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                            </svg>
                        </div>

                        <input type="text" placeholder="Search by listing, location, bedroom number..." className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <p className="font-medium">
                            Filters
                        </p>

                        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                            Reset Filter
                        </button>
                    </div>

                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                            <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                                <option value="">Floor</option>
                                <option value="HIMSON-GROUND">HIMSON-GROUND</option>
                                <option value="HIMSON-FIRST">HIMSON-FIRST</option>
                                <option value="ALIDHRA-FIRST">ALIDHRA-FIRST</option>
                                <option value="ALIDHRA-SECOND">ALIDHRA-SECOND</option>
                                <option value="ALIDHRA-THIRD">ALIDHRA-THIRD</option>
                            </select>

                            <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                                <option value="">Product Type</option>
                                <option value="fully-furnished">Fully Furnished</option>
                            </select>

                            <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                                <option value="">POY Lines</option>
                                <option value="1000">RM 1000</option>
                                <option value="2000">RM 2000</option>
                                <option value="3000">RM 3000</option>
                                <option value="4000">RM 4000</option>
                            </select>

                            <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                                <option value="">Check Area</option>
                                <option value="200">200 sq.ft</option>
                                <option value="400">400 sq.ft</option>
                                <option value="600">600 sq.ft</option>
                                <option value="800 sq.ft">800</option>
                                <option value="1000 sq.ft">1000</option>
                                <option value="1200 sq.ft">1200</option>
                            </select>

                            <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                                <option value="">Bobbin Color</option>
                                <option value="200">200 sq.ft</option>
                            </select>

                            <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                                <option value="">Lot Number</option>
                                <option value="200">200 sq.ft</option>
                            </select>

                            <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                                <option value="">Intermingle Type</option>
                                <option value="200">200 sq.ft</option>
                            </select>

                            <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                                <option value="">Int Jet Type</option>
                                <option value="200">200 sq.ft</option>
                            </select>
                        </div>
                    </div>
                </div>
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
        </>
    );
};

export default DTYMachines;