import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner/Spinner';
import DTYMachineCard from '../../../components/DTY/DTYMachine/DTYMachineCard';
import { getDtyMachines, setMachineDisplayMode, setSelectedFiltersDTY } from '../../../redux/features/dtyMachines/dtyMachinesSlice';
import DataLoading from '../../../components/Spinner/DataLoading';
import LoadingCustom from '../../../components/Spinner/LoadingCustom';

const DTYMachines = () => {
    const dispatch = useDispatch();
    const { dtyMachines, selectedFilters, machineDisplayMode, isLoading } = useSelector(state => state.dtyMachines);
    console.log("dtyMachines", dtyMachines.slice(0, 10));
    console.log("selectedFilters", selectedFilters);

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

    const himsonGFMachines = ["1/A", "1/B", "2/A", "2/B", "3/A", "3/B", "4/A", "4/B"];
    const himsonFFMachines = ["5/A", "5/B", "6/A", "6/B", "7/A", "7/B", "8/A", "8/B"];
    const alidhraGFMachines = ["11/A", "11/B", "12/A", "12/B", "13/A", "13/B", "14/A", "14/B", "15/A", "15/B", "16/A", "16/B", "17/A", "17/B",
    ];
    const alidhraFFMachines = ["18/A", "18/B", "19/A", "19/B", "20/A", "20/B", "21/A", "21/B", "22/A", "22/B", "23/A", "23/B", "24/A", "24/B",
    ];
    const alidhraSFMachines = ["25/A", "25/B", "26/A", "26/B", "27/A", "27/B", "28/A", "28/B", "29/A", "29/B", "9/A", "9/B", "10/A", "10/B",
    ]

    // const floorWiseMachines = [himsonMachines, alidhraGFMachines, alidhraFFMachines, alidhraSFMachines];

    const floorWiseMachines = (floorMachines) => {
        let updatedMachines = [];

        floorMachines.forEach(mc => {
            const [DTYMCNo, Side] = mc.split('/');
            const machineData = { DTYMCNo, Side };
            updatedMachines.push(machineData);
            // console.log(machineData);
        })
        return updatedMachines;
    }

    const himsonGFMachineObjs = floorWiseMachines(himsonGFMachines);
    const himsonFFMachineObjs = floorWiseMachines(himsonFFMachines);
    const alidhraGFMachineObjs = floorWiseMachines(alidhraGFMachines);
    const alidhraFFMachineObjs = floorWiseMachines(alidhraFFMachines);
    const alidhraGSFMachineObjs = floorWiseMachines(alidhraSFMachines);

    const uniqueDTYTypes = findUniqueNestedValues(dtyMachines, "DTYInfo", "DTYType");
    const uniqueBobbins = findUniqueNestedValues(dtyMachines, "DTYInfo", "DTYTubeColor");
    const uniqueCheckArea = findUniqueNestedValues(dtyMachines, "DTYInfo", "InspectionArea");
    const uniqueLots = findUniqueNestedValues(dtyMachines, "DTYInfo", "LotNo");
    const uniqueIntermingling = findUniqueNestedValues(dtyMachines, "params", "IntType");
    const uniqueIntJets = findUniqueNestedValues(dtyMachines, "params", "IntJetType");
    const uniquePOYLines = findUniqueNestedValues(dtyMachines, "POYInfo", "POYLine");

    const handleFilterChange = (filterName, filterValue) => {
        let updatedFilters;
        if (filterValue === 'all') {
            updatedFilters = {
                ...selectedFilters,
                [filterName]: 'All',
            };
        } else {
            updatedFilters = {
                ...selectedFilters,
                [filterName]: filterValue,
            };
        }
        dispatch(setSelectedFiltersDTY(updatedFilters));
    };

    let content;

    if (selectedFilters.floor === "All") {
        content = dtyMachines
            .filter((machine) => {
                if (
                    // (selectedFilters.floor === 'All' ||
                    //     machine.floor === selectedFilters.floor) &&
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

    const filterFloorwiseMCs = (floorName) => {
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
            });
    }

    if (selectedFilters.floor === "HIMSON-GF") {
        filterFloorwiseMCs("HIMSON-GF")
    } else if (selectedFilters.floor === "HIMSON-FF") {
        filterFloorwiseMCs("HIMSON-FF")
    }
    else if (selectedFilters.floor === "ALIDHRA-GF") {
        filterFloorwiseMCs("ALIDHRA-GF")
    }
    else if (selectedFilters.floor === "ALIDHRA-FF") {
        filterFloorwiseMCs("ALIDHRA-FF")
    }
    else if (selectedFilters.floor === "ALIDHRA-SF") {
        filterFloorwiseMCs("ALIDHRA-SF")
    }



    // console.log("content", content);
    console.log("machineDisplayMode", machineDisplayMode);

    // const newData = oldData.map
    //     ((obj, i) => (console.log("obj", obj)))

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
            <div className='mx-auto max-w-md gap-8 px-6 sm:max-w-lg lg:max-w-7xl lg:px-8'>
                <div className=" shadow p-5 rounded-lg bg-white mx-auto">
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

                        <button
                            onClick={() => dispatch(setSelectedFiltersDTY({
                                floor: 'All', productType: 'All', poyLine: 'All', checkArea: 'All', bobbinColor: 'All', lotNo: 'All', intType: 'All', intJetType: 'All',
                            }))}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                            Reset Filter
                        </button>
                    </div>

                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                            <select
                                value={selectedFilters.floor}
                                onChange={(e) => handleFilterChange('floor', e.target.value)}
                                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                                <option value="All">Floor</option>
                                <option value="HIMSON-GF">HIMSON-GROUND</option>
                                <option value="HIMSON-FF">HIMSON-FIRST</option>
                                <option value="ALIDHRA-GF">ALIDHRA-GROUND</option>
                                <option value="ALIDHRA-FF">ALIDHRA-FIRST</option>
                                <option value="ALIDHRA-SF">ALIDHRA-SECOND</option>
                            </select>

                            <select
                                value={selectedFilters.productType}
                                onChange={(e) => handleFilterChange('productType', e.target.value)}
                                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                                <option value="All">Product Type</option>
                                {
                                    uniqueDTYTypes?.map(pd =>
                                        <option value={pd}>{pd}</option>
                                    )
                                }
                            </select>

                            <select
                                value={selectedFilters.poyLines}
                                onChange={(e) => handleFilterChange('poyLine', e.target.value)}
                                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                                <option value="All">POY Lines</option>
                                {
                                    uniquePOYLines?.map(poyLine =>
                                        <option value={poyLine}>{poyLine}</option>
                                    )
                                }
                            </select>

                            <select
                                value={selectedFilters.checkArea}
                                onChange={(e) => handleFilterChange('checkArea', e.target.value)}
                                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                                <option value="All">Check Area</option>
                                {
                                    uniqueCheckArea?.map(area =>
                                        <option value={area}>{area}</option>
                                    )
                                }
                            </select>

                            <select
                                value={selectedFilters.bobbinColor}
                                onChange={(e) => handleFilterChange('bobbinColor', e.target.value)}
                                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                                <option value="All">Bobbin Color</option>
                                {
                                    uniqueBobbins?.map(bobbin =>
                                        <option value={bobbin}>{bobbin}</option>
                                    )
                                }
                            </select>

                            <select
                                value={selectedFilters.lotNo}
                                onChange={(e) => handleFilterChange('lotNo', e.target.value)}
                                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                                <option value="All">Lot Number</option>
                                {
                                    uniqueLots?.map(lot =>
                                        <option value={lot}>{lot}</option>
                                    )
                                }
                            </select>

                            <select
                                value={selectedFilters.intType}
                                onChange={(e) => handleFilterChange('intType', e.target.value)}
                                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                                <option value="All">Intermingle Type</option>
                                {
                                    uniqueIntermingling?.map(intermingle =>
                                        <option value={intermingle}>{intermingle}</option>
                                    )
                                }
                            </select>

                            <select
                                value={selectedFilters.intJetType}
                                onChange={(e) => handleFilterChange('intJetType', e.target.value)}
                                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                                <option value="All">Int Jet Type</option>
                                {
                                    uniqueIntJets?.map(jet =>
                                        <option value={jet}>{jet}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>

                    <div className='flex justify-center items-center gap-5 mt-5'>
                        <p>Display Mode: </p>
                        <select
                            value={machineDisplayMode}
                            onChange={(e) => dispatch(setMachineDisplayMode(e.target.value))}
                            className="px-4 py-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                            <option value="BigCard">Big Card</option>
                            <option value="MediumCard">Medium Card</option>
                            <option value="SmallCard">Small Card</option>
                            <option value="TinyCard">Tiny Card</option>
                            <option value="OnlyMachineNo">Only Machine No</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-12 grid max-w-md gap-8 px-6 sm:max-w-lg lg:max-w-7xl lg:grid-cols-3 lg:px-8 justify-center">
                {content
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
                    })
                    .map
                    (({ mcInfo, DTYInfo, POYInfo, params }, i) => (
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