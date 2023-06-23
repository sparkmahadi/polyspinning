import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dtyMachine from "../../../images/dty-machine.jpg"

const DtyFloorLayout = () => {

  return (
    <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-10">
      <div className="relative">
        <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">

        <div className="hero bg-base-200 text-left">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={dtyMachine} className="lg:w-1/2 rounded-lg shadow-2xl" alt='' />
                    <div>
                        <h1 className="text-3xl font-bold">Drawn Textured Yarn</h1>
                        <p className="py-3 lg:text-lg">Drawn Textured Yarn (DTY) is a type of synthetic yarn that undergoes multiple processing steps to enhance its texture and physical properties. Initially, the yarn is drawn to align and orient its fibers, followed by a texturing process that imparts crimp and bulkiness. This crimped structure gives DTY a unique appearance and enables it to mimic the properties of natural fibers like cotton or wool. DTY offers excellent elasticity, softness, and moisture-wicking capabilities, making it ideal for various applications in the textile industry. It is commonly used in the production of fabrics for sportswear, activewear, lingerie, and home textiles. DTY's versatility, combined with its aesthetic appeal and performance attributes, has made it a popular choice among designers and manufacturers worldwide.</p>
                        <div className='md:flex gap-5'>
                            <Link to={'present-lot-and-transfer-area'}>
                                <button className="btn btn-primary">View Present Lot</button>
                            </Link>
                            <Link to={'denierwise-poy-lines'}>
                                <button className='btn btn-outline'>Show Denierwise Data</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


          <h3 className="mt-2 text-xl lg:text-3xl font-bold tracking-tight text-gray-900">Observing and Monitoring DTY Floor Machines</h3>

        </div>


      </div>

      <div className='flex flex-wrap justify-center gap-5 mt-5 lg:mt-10'>
        <Link to={'dty-machines/new-machine'}><button className='btn btn-primary normal-case btn-sm'>Add New Machine</button></Link>
        <Link to={'dty-machines'}><button className='btn btn-primary normal-case btn-sm'>All DTY Machines</button></Link>
        <Link to={'dty-machines-from-present-lot'}><button className='btn btn-primary normal-case btn-sm'>All Machines With Present Lot</button></Link>
        <Link to={'dty-machines-with-parameters'}><button className='btn btn-primary normal-case btn-sm'>All Machines With Latest Parameters</button></Link>
        <Link to={'dty-machine-updates'}><button className='btn btn-primary normal-case btn-sm'>DTY Machine Updates</button></Link>
      </div>
    </div>
  );
};

export default DtyFloorLayout;