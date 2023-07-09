import React from 'react';
import { findUniqueNestedValues } from '../../../logics/findingFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { getDtyMachinesBySearch, setMachineDisplayMode, setSearchedValue, setSelectedFiltersDTY } from '../../../redux/features/dtyMachines/dtyMachinesSlice';
import { toast } from 'react-hot-toast';

const DTYMachineFilter = () => {
    const dispatch = useDispatch();
    const { dtyMachines, selectedFilters, machineDisplayMode, searchedCategory, propsForSearch, searchedProp, isLoading } = useSelector(state => state.dtyMachines);

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

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const searchText = form.searchField.value;
        const searchData = { searchedCategory, searchedProp, searchText };

        if (searchText === "") {
            toast.error("Please enter some valid text for searching!!!")
        } else {
            dispatch(getDtyMachinesBySearch(searchData))
        }
    }

    const handleCategorySelection = (e) => {
        const selectedCategory = e.target.value;
        dispatch(setSearchedValue({ name: "searchedCategory", value: selectedCategory }));
        if (selectedCategory === "notSelected") {
            toast.error("Please select a valid category!!!");
            dispatch(setSearchedValue({ name: "propsForSearch", value: [] }))
        } else {
            const uniqueProps = Object.keys(dtyMachines[0][selectedCategory]);
            if (uniqueProps?.length) {
                dispatch(setSearchedValue({ name: "propsForSearch", value: uniqueProps }))
            }
        }
    }

    return (
        <div className=" shadow p-2 lg:p-5 rounded-lg bg-white mx-auto">

            <div className="">
                <h4 className="font-medium lg:text-lg pb-2">
                    Search
                </h4>
                <p className='pb-2 text-sm lg:text-base'>Search any machine by info category and property name. As for example, Category: DTYInfo, Property: DTYColor, Search: Black</p>
            </div>

            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4">

                <select
                    name='searchedCategory'
                    value={searchedCategory}
                    onChange={handleCategorySelection}
                    className="px-3 py-2 w-full lg:w-1/4 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="notSelected">Info Category</option>
                    <option value="mcInfo">Machine Info</option>
                    <option value="DTYInfo">DTY Info</option>
                    <option value="POYInfo">POY Info</option>
                    <option value="params">Parameters</option>
                    <option value="updatedAt">Updated Date</option>
                </select>

                <select
                    name='searchedProp'
                    value={searchedProp}
                    onChange={(e) => dispatch(setSearchedValue({ name: "searchedProp", value: e.target.value }))}
                    className="px-3 py-2 w-full lg:w-1/4 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="notSelected">Property</option>
                    {
                        propsForSearch?.map((prop, i) =>
                            <option key={i} value={prop}>{prop}</option>
                        )
                    }

                </select>

                <div className='flex items-center w-full lg:w-2/3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm pl-3'>

                    <svg className="w-4 lg:w-5 h-4 lg:h-5 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                    </svg>

                    <input name='searchField' type="text" placeholder="Search any machine by info category and property name e.g. Category: DTYInfo, Property: DTYColor, Search: Black" className="pr-3 py-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" />
                </div>

                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" type='submit'>Search</button>
            </form>

            <div className="flex items-center justify-between mt-5 py-2 lg:pt-0">
                <p className="font-medium lg:text-lg">
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
            <p className='pb-2 text-sm lg:text-base'>Filter DTY machines by different properties. For deselecting any property, Select the property name on the list.</p>

            <div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    <select
                        value={selectedFilters.floor}
                        onChange={(e) => handleFilterChange('floor', e.target.value)}
                        className="px-3 py-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
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
                        className="px-3 py-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                        <option value="All">Product Type</option>
                        {
                            uniqueDTYTypes?.map((pd, i) =>
                                <option key={i} value={pd}>{pd}</option>
                            )
                        }
                    </select>

                    <select
                        value={selectedFilters.poyLines}
                        onChange={(e) => handleFilterChange('poyLine', e.target.value)}
                        className="px-3 py-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                        <option value="All">POY Lines</option>
                        {
                            uniquePOYLines?.map((poyLine, i) =>
                                <option key={i} value={poyLine}>{poyLine}</option>
                            )
                        }
                    </select>

                    <select
                        value={selectedFilters.checkArea}
                        onChange={(e) => handleFilterChange('checkArea', e.target.value)}
                        className="px-3 py-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                        <option value="All">Check Area</option>
                        {
                            uniqueCheckArea?.map((area, i) =>
                                <option key={i} value={area}>{area}</option>
                            )
                        }
                    </select>

                    <select
                        value={selectedFilters.bobbinColor}
                        onChange={(e) => handleFilterChange('bobbinColor', e.target.value)}
                        className="px-3 py-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                        <option value="All">Bobbin Color</option>
                        {
                            uniqueBobbins?.map((bobbin, i) =>
                                <option key={i} value={bobbin}>{bobbin}</option>
                            )
                        }
                    </select>

                    <select
                        value={selectedFilters.lotNo}
                        onChange={(e) => handleFilterChange('lotNo', e.target.value)}
                        className="px-3 py-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                        <option value="All">Lot Number</option>
                        {
                            uniqueLots?.map((lot, i) =>
                                <option key={i} value={lot}>{lot}</option>
                            )
                        }
                    </select>

                    <select
                        value={selectedFilters.intType}
                        onChange={(e) => handleFilterChange('intType', e.target.value)}
                        className="px-3 py-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                        <option value="All">Intermingle Type</option>
                        {
                            uniqueIntermingling?.map((intermingle, i) =>
                                <option key={i} value={intermingle}>{intermingle}</option>
                            )
                        }
                    </select>

                    <select
                        value={selectedFilters.intJetType}
                        onChange={(e) => handleFilterChange('intJetType', e.target.value)}
                        className="px-3 py-2 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                        <option value="All">Int Jet Type</option>
                        {
                            uniqueIntJets?.map((jet, i) =>
                                <option key={i} value={jet}>{jet}</option>
                            )
                        }
                    </select>
                </div>
            </div>

            <div className='flex justify-center items-center gap-4 mt-5'>
                <p>Display Mode: </p>
                <select
                    value={machineDisplayMode}
                    onChange={(e) => dispatch(setMachineDisplayMode(e.target.value))}
                    className="px-3 py-2 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="BigCard">Big Card</option>
                    <option value="MediumCard">Medium Card</option>
                    <option value="SmallCard">Small Card</option>
                    <option value="TinyCard">Tiny Card</option>
                    <option value="OnlyMachineNo">Only Machine No</option>
                </select>
            </div>
        </div>
    );
};

export default DTYMachineFilter;