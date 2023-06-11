import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DtyFloorLayout = () => {

  return (
    <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-10">
      <div className="relative">
        <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Observing and Monitoring DTY Floor Machines</h3>
          <p className="text-lg font-semibold text-cyan-600 pt-2">DTY floor machines play a vital role in the melt spinning process, where continuous filaments are produced for textiles. By closely observing and monitoring these machines, manufacturers can ensure precision and efficiency. From temperature control to tension management, the careful scrutiny of DTY floor machines guarantees optimal production and high-quality filament output.</p>

        </div>
        

      </div>

      <div className='flex justify-center gap-5 lg:mt-10'>
        <Link to={'dty-machines/new-machine'}><button className='btn btn-primary normal-case btn-sm'>Add New Machine</button></Link>
        <Link to={'dty-machines'}><button className='btn btn-primary normal-case btn-sm'>All Machines With Present Lot</button></Link>
        <Link to={'dty-machines-with-parameters'}><button className='btn btn-primary normal-case btn-sm'>All Machines With Latest Parameters</button></Link>
      </div>
    </div>
  );
};

export default DtyFloorLayout;