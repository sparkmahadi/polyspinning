import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { findPoyWinder, getPoyMcDataFromLot, setSelectedFiltersPOY } from '../../../redux/features/poyMachinesFromPresentLot/poyMCsFromPLotSlice';
import Spinner from '../../../components/Spinner/Spinner';
import { pageHeadings, shadowRound, tdPadding } from '../../../customClasses/CustomClasses';

const PoyPresentLotAndTransfer = () => {

  const dispatch = useDispatch();
  const { machineDataFromLot: data, selectedFilters, isLoading, isError, error } = useSelector(state => state.poyMachinesFromLot);
  // console.log("data", data);
  const properties = [
    "SL",
    "Line No.",
    "Model",
    "Origin",
    "Winder No",
    "Ends",
    "Denier",
    "Filaments",
    "POY Bobbin",
    "POY Color",
    "Status",
    "Updated On",
    "ChipsName",
    "Actions"
  ]

  function getUniqueValue(property) {
    const uniqueData = [...new Set(data.map(item => item[property]))];
    return uniqueData;
  }

  const uniqueLines = getUniqueValue("LineNo.");
  const uniqueDeniers = getUniqueValue("Denier");
  const uniqueFilaments = getUniqueValue("Filaments");
  const uniqueBobbin = getUniqueValue("POYBobbin");

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
    dispatch(setSelectedFiltersPOY(updatedFilters));
  };


  useEffect(() => {
    dispatch(getPoyMcDataFromLot());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner></Spinner>
  }
  let existingArrWithoutId = [];
  for (let elem of data) {
    const { _id, uploadedAt, ...rest } = elem;
    existingArrWithoutId.push(rest);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <span className="loading loading-spinner loading-lg z-50"></span>
      <h5 className={`${pageHeadings} pt-5`}>Present POY Floor Status</h5>

      <div className={`flex justify-center mx-2 my-5 ${shadowRound}`}>
        <div className={`w-full p-5 rounded-lg bg-white`}>
          <div className="flex items-center justify-between">
            <p className="font-medium">Filters</p>
            <button
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
              onClick={() => dispatch(setSelectedFiltersPOY({ lineNo: 'All', denier: 'All', filaments: 'All', poyBobbin: 'All' }))}
            >
              Reset Filter
            </button>
          </div>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              <select
                value={selectedFilters.lineNo}
                onChange={(e) => handleFilterChange('lineNo', e.target.value)}
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              >
                <option value="all">Line No.</option>
                {uniqueLines?.map((line, index) => (
                  <option key={index} value={line}>
                    {line}
                  </option>
                ))}
              </select>

              <select
                value={selectedFilters.denier}
                onChange={(e) => handleFilterChange('denier', e.target.value)}
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              >
                <option value="all">Denier</option>
                {uniqueDeniers?.map((den, index) => (
                  <option key={index} value={den}>
                    {den}
                  </option>
                ))}
              </select>

              <select
                value={selectedFilters.filaments}
                onChange={(e) => handleFilterChange('filaments', e.target.value)}
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              >
                <option value="all">Filaments</option>
                {uniqueFilaments?.map((fil, index) => (
                  <option key={index} value={fil}>
                    {fil}
                  </option>
                ))}
              </select>

              <select
                value={selectedFilters.poyBobbin}
                onChange={(e) => handleFilterChange('poyBobbin', e.target.value)}
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              >
                <option value="all">POY Bobbin Color</option>
                {uniqueBobbin?.map((bobbin, index) => (
                  <option key={index} value={bobbin}>
                    {bobbin}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className='overflow-auto mx-1'>
        <table className="table w-full mx-auto text-sm">
          <thead>
            <tr>
              {properties?.map((spec, index) => (
                <td className={tdPadding} key={index}>{spec}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {existingArrWithoutId
              ?.filter((machine) => {
                if (
                  (selectedFilters.lineNo === 'All' ||
                    machine['LineNo.'] === selectedFilters.lineNo) &&
                  (selectedFilters.denier === 'All' ||
                    machine.Denier === selectedFilters.denier) &&
                  (selectedFilters.filaments === 'All' ||
                    machine.Filaments === selectedFilters.filaments) &&
                  (selectedFilters.poyBobbin === 'All' ||
                    machine['POYBobbin'] === selectedFilters.poyBobbin)
                ) {
                  return true;
                }
                return false;
              })
              .map((machine, index) => (
                <tr key={index}>
                  {Object.values(machine)?.map((sp, i) => (
                    <td className={tdPadding} key={i}>{sp}</td>
                  ))}
                  <td>
                    <Link
                      onClick={() => dispatch(findPoyWinder(machine['WinderNo']))}
                      to={`/poy-winders/${machine['WinderNo']}`}
                    >
                      <button className="btn btn-primary btn-xs">Edit</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-center mt-2 lg:mt-5'>
        <Link to={'/poy-floor-status/denierwise-poy-lines'}><button className='btn btn-primary btn-sm'>Show Denierwise Data</button></Link>
      </div>
    </div>
  );
};

export default PoyPresentLotAndTransfer;