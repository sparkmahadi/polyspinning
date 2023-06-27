import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPoyMcDataFromLot, updatePoyInfoInDty } from '../../../redux/features/poyMachinesFromPresentLot/poyMCsFromPLotSlice';
import Spinner from '../../../components/Spinner/Spinner';

const DenierwisePOYLines = () => {
  const dispatch = useDispatch();
  const { machineDataFromLot: data, selectedFilters, isLoading, isError, error } = useSelector(state => state.poyMachinesFromLot);

  useEffect(() => {
    dispatch(getPoyMcDataFromLot());
  }, [dispatch]);

  console.log(data);


  function getUniqueValue(property) {
    const uniqueData = [...new Set(data.map(item => item[property]))];
    return uniqueData;
  }

  const uniqueLines = getUniqueValue("LineNo.");
  // const uniqueDeniers = getUniqueValue("Denier");
  // const uniqueFilaments = getUniqueValue("Filaments");
  // const uniqueBobbin = getUniqueValue("POYBobbin");

  const findDenFilCount = (line) => {
    const denierFilamentCount = {};

    data.forEach((item) => {
      const lineNo = item['LineNo.'];
      const denier = item['Denier'];
      const filaments = item['Filaments'];
      const bobbinColor = item['POYBobbin'];
      const poyColor = item['POYColor'];
      const status = item['Status'];
      const chipsName = item['ChipsName'];
      const ends = item['Ends'];

      if (lineNo === line && status === 'Running') {
        const combination = `${denier}-${filaments}-${bobbinColor}-${poyColor}-${chipsName}-${ends}`;
        if (!denierFilamentCount.hasOwnProperty(combination)) {
          denierFilamentCount[combination] = 1;
        } else {
          denierFilamentCount[combination]++;
        }
      } else {
        return;
      }
    });

    return denierFilamentCount;
  };

  const findDenierWisePOY = (Lines) => {
    const denierWiseData = [];
    Lines.forEach((item) => {
      const denFilCount = findDenFilCount(item);
      const newData = { LineNo: item, Summary: denFilCount };
      denierWiseData.push(newData);
    });
    return denierWiseData;
  };

  console.log('find', findDenierWisePOY(uniqueLines));
  const retrievedData = findDenierWisePOY(uniqueLines);



  if (isLoading) {
    return <Spinner></Spinner>
  }

  return (
    <div className='max-w-7xl mx-auto'>
      {retrievedData?.map((item) => (

        <div className='lg:flex items-center gap-10 border mb-5 p-5 bg-blue-100' key={item.LineNo}>
          <h3 className='font-semibold text-center lg:w-1/6 text-lg md:text-xl'>Line No: {item.LineNo}</h3>
          <ul className='w-full'>
            {Object.entries(item.Summary).map(([combination, count]) => {
              const [denier, filaments, bobbinColor, poyColor, chipsName,  ends] = combination.split('-');
              return (
                <li className='grid grid-cols-2 md:grid-cols-5 xl:grid-cols-7 text-center lg:gap-5 p-2 mb-5 border border-violet-300' key={combination}>
                  <p className='border border-emerald-400 p-1 rounded hover:bg-sky-500 hover:text-white hover:font-semibold cursor-pointer'>D/F: {denier}/{filaments}</p>
                  <p className='border border-emerald-400 p-1 rounded hover:bg-sky-500 hover:text-white hover:font-semibold cursor-pointer'>Bobbin: {bobbinColor}</p>
                  <p className='border border-emerald-400 p-1 rounded hover:bg-sky-500 hover:text-white hover:font-semibold cursor-pointer'>Color: {poyColor}</p>
                  <p className='border border-emerald-400 p-1 rounded hover:bg-sky-500 hover:text-white hover:font-semibold cursor-pointer'>Total Winders: {count}</p>
                  <p className='border border-emerald-400 p-1 rounded hover:bg-sky-500 hover:text-white hover:font-semibold cursor-pointer'>Chips: {chipsName}</p>
                  <p className='border border-emerald-400 p-1 rounded hover:bg-sky-500 hover:text-white hover:font-semibold cursor-pointer'>Ends/Winder: {parseInt(ends)}</p>
                  <p className='border border-emerald-400 p-1 rounded hover:bg-sky-500 hover:text-white hover:font-semibold cursor-pointer'>Total Ends: {parseInt(ends) * count}</p>
                </li>
              );
            })}
          </ul>
        </div>

      ))}

      <div className='flex justify-center'>
        <button onClick={()=>dispatch(updatePoyInfoInDty(retrievedData))} className='btn btn-primary'>Update Info In DTY</button>
      </div>
    </div>
  );
};

export default DenierwisePOYLines;