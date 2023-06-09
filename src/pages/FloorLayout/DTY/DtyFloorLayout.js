import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DTYMachineCard from '../../../components/DTY/DTYMachine/DTYMachineCard';

const DtyFloorLayout = () => {
  const [machines, setMachines] = useState([]);
  console.log(machines);
  useEffect(() => {
    axios.get("http://localhost:5000/dtyMachines").then(res => setMachines(res.data));
  }, []);

  return (
    <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-32">
      <div className="relative">
        <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
          <h2 className="text-lg font-semibold text-cyan-600">Learn</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">DTY Floor</p>

        </div>

        <div className="mx-auto mt-12 grid max-w-md gap-8 px-6 sm:max-w-lg lg:max-w-7xl lg:grid-cols-3 lg:px-8">
          {machines.map(({ mcInfo, DTYInfo, POYInfo, params }, i) => (
            <DTYMachineCard key={i}
              mcInfo={mcInfo}
              DTYInfo={DTYInfo}
              POYInfo={POYInfo}
              params={params}
            ></DTYMachineCard>
          ))}
        </div>

        <Link to={'dty-machines/new-machine'}><button className='btn btn-primary block mx-auto mt-10'>Add New Machine</button></Link>
      </div>

      <Link to={'dty-machines'}><button className='btn btn-primary block mx-auto mt-10'>All Machines With Present Lot</button></Link>
      <Link to={'dty-machines-with-parameters'}><button className='btn btn-primary block mx-auto mt-10'>All Machines With Latest Parameters</button></Link>
    </div>
  );
};

export default DtyFloorLayout;