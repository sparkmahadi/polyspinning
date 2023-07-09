import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner/Spinner';
import DTYMachineCard from '../../../components/DTY/DTYMachine/DTYMachineCard';
import { getDtyMachines} from '../../../redux/features/dtyMachines/dtyMachinesSlice';
import LoadingCustom from '../../../components/Spinner/LoadingCustom';
import DTYMachineFilter from '../../../components/DTY/DTYMachine/DTYMachineFilter';

const DTYMachines = () => {
    const dispatch = useDispatch();
    const { dtyMachines, selectedFilters, isLoading } = useSelector(state => state.dtyMachines);
    console.log("dtyMachines", dtyMachines);

    useEffect(() => {
        dispatch(getDtyMachines());
    }, [dispatch]);

    if (isLoading) {
        return <Spinner></Spinner>
    }

    if (!Array.isArray(dtyMachines)) {
        return <LoadingCustom message={"No Data Found in server"} />
    }

    if (!dtyMachines.length) {
        return <p className='text-center text-lg font-semibold py-5'>No machines are found!!!</p>
    }

    const himsonGFMachines = ["1/A", "1/B", "2/A", "2/B", "3/A", "3/B", "4/A", "4/B"];
    const himsonFFMachines = ["5/A", "5/B", "6/A", "6/B", "7/A", "7/B", "8/A", "8/B"];
    const alidhraGFMachines = ["11/A", "11/B", "12/A", "12/B", "13/A", "13/B", "14/A", "14/B", "15/A", "15/B", "16/A", "16/B", "17/A", "17/B",
    ];
    const alidhraFFMachines = ["18/A", "18/B", "19/A", "19/B", "20/A", "20/B", "21/A", "21/B", "22/A", "22/B", "23/A", "23/B", "24/A", "24/B",
    ];
    const alidhraSFMachines = ["25/A", "25/B", "26/A", "26/B", "27/A", "27/B", "28/A", "28/B", "29/A", "29/B", "9/A", "9/B", "10/A", "10/B",
    ]


    let content;

    if (selectedFilters.floor === "All") {
        content = dtyMachines
            .filter((machine) => {
                if (
                    (selectedFilters.productType === 'All' ||
                        machine.DTYInfo.DTYType === selectedFilters.productType) &&
                    (selectedFilters.poyLine === 'All' ||
                        machine.POYInfo.POYLine === selectedFilters.poyLine) &&
                    (selectedFilters.checkArea === 'All' ||
                        machine.DTYInfo.InspectionArea === selectedFilters.checkArea) &&
                    (selectedFilters.bobbinColor === 'All' ||
                        machine.DTYInfo.DTYTubeColor === selectedFilters.bobbinColor) &&
                    (selectedFilters.lotNo === 'All' ||
                        machine.DTYInfo.LotNo === selectedFilters.lotNo) &&
                    (selectedFilters.intType === 'All' ||
                        machine.params.IntType === selectedFilters.intType) &&
                    (selectedFilters.intJetType === 'All' ||
                        machine.params.IntJetType === selectedFilters.intJetType)
                ) {
                    return true;
                }
                return false;
            });
    }

    const filterMCsFloorwise = (floorName) => {
        content = dtyMachines
            .filter((mc) => {
                const machine = `${mc.mcInfo.DTYMCNo}/${mc.mcInfo.Side}`;
                console.log(machine);
                if (floorName === "HIMSON-GF") {
                    if (himsonGFMachines.includes(machine)) {
                        return true;
                    }
                }
                else if (floorName === "HIMSON-FF") {
                    if (himsonFFMachines.includes(machine)) {
                        return true;
                    }
                }
                else if (floorName === "ALIDHRA-GF") {
                    if (alidhraGFMachines.includes(machine)) {
                        return true;
                    }
                }
                else if (floorName === "ALIDHRA-FF") {
                    if (alidhraFFMachines.includes(machine)) {
                        return true;
                    }
                }
                else if (floorName === "ALIDHRA-SF") {
                    if (alidhraSFMachines.includes(machine)) {
                        return true;
                    }
                }
                return false;
            }).filter((machine) => {
                if (
                    (selectedFilters.productType === 'All' ||
                        machine.DTYInfo.DTYType === selectedFilters.productType) &&
                    (selectedFilters.poyLine === 'All' ||
                        machine.POYInfo.POYLine === selectedFilters.poyLine) &&
                    (selectedFilters.checkArea === 'All' ||
                        machine.DTYInfo.InspectionArea === selectedFilters.checkArea) &&
                    (selectedFilters.bobbinColor === 'All' ||
                        machine.DTYInfo.DTYTubeColor === selectedFilters.bobbinColor) &&
                    (selectedFilters.lotNo === 'All' ||
                        machine.DTYInfo.LotNo === selectedFilters.lotNo) &&
                    (selectedFilters.intType === 'All' ||
                        machine.params.IntType === selectedFilters.intType) &&
                    (selectedFilters.intJetType === 'All' ||
                        machine.params.IntJetType === selectedFilters.intJetType)
                ) {
                    return true;
                }
                return false;
            });
    }

    if (selectedFilters.floor === "HIMSON-GF") {
        filterMCsFloorwise("HIMSON-GF")
    } else if (selectedFilters.floor === "HIMSON-FF") {
        filterMCsFloorwise("HIMSON-FF")
    }
    else if (selectedFilters.floor === "ALIDHRA-GF") {
        filterMCsFloorwise("ALIDHRA-GF")
    }
    else if (selectedFilters.floor === "ALIDHRA-FF") {
        filterMCsFloorwise("ALIDHRA-FF")
    }
    else if (selectedFilters.floor === "ALIDHRA-SF") {
        filterMCsFloorwise("ALIDHRA-SF")
    }

    return (
        <>
            <div className='mx-auto max-w-md gap-8 px-6 sm:max-w-lg lg:max-w-7xl lg:px-8'>
                <h3 className='text-center font-semibold text-lg lg:text-xl xl:text-2xl py-3'>DTY Machines</h3>

                <DTYMachineFilter />
            </div>

            {
                content?.length > 0 &&
                <div className="mx-auto mt-12 grid max-w-md gap-8 px-6 sm:max-w-lg lg:max-w-7xl lg:grid-cols-3 lg:px-8 justify-center">
                    {
                        content?.map
                            (({ mcInfo, DTYInfo, POYInfo, params }, i) => (
                                <DTYMachineCard key={i}
                                    mcInfo={mcInfo}
                                    DTYInfo={DTYInfo}
                                    POYInfo={POYInfo}
                                    params={params}
                                ></DTYMachineCard>
                            ))
                    }
                </div>
            }


            {
                !content?.length &&
                <div><p className='text-center font-semibold py-5 lg:py-16'>Sorry! No Machines Found With Such Property!!!</p></div>
            }
        </>
    );
};

export default DTYMachines;