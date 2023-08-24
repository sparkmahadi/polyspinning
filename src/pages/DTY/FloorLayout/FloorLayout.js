import React from 'react';
import Line12 from './Line12';
import Line34 from './Line34';
import TrialMachine from './TrialMachine';

const FloorLayout = () => {
  const himsonGF = [1, 2, 3, 4];
  const himsonFF = [1, 2, 3, 4];
  return (
    <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-32">
      <div className="relative">
        <div className="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Helpful Resources</p>
          <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
            Phasellus lorem quam molestie id quisque diam aenean nulla in. Accumsan in quis quis nunc, ullamcorper
            malesuada. Eleifend condimentum id viverra nulla.
          </p>
        </div>
        <div className="mx-auto mt-12 flex gap-20 justify-center max-w-7xl">
          {/* poy */}
          <div className=''>
            {/* line 1,2 */}
            <Line12 />
            <br />
            {/* line 3,4 */}
            <Line34 />
          </div>

          {/* dtyyyy */}
          <div>
            {/* himson */}
            <div>
              {/* himson gf */}
              <div className='grid16cols'>
              {himsonGF.map(wind => <TrialMachine key={wind} value={wind}/>)}
              </div>
              {/* himson ff */}
              <div className='grid16cols'>
              {himsonFF.map(wind => <TrialMachine key={wind} value={wind}/>)}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FloorLayout;