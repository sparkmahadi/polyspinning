import React from 'react';
import TrialMachine from './TrialMachine';

const Line12 = () => {
    const line1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const line2 = [1, 2, 3, 4];
    return (
        <div className='flex gap-10'>
              {/* line 1 */}
              <div className='grid16cols w-5/6'>
                {line1.map(wind => <TrialMachine key={wind} value={wind}/>)}
              </div>
              {/* line 2 */}
              <div className='grid16cols w-1/6'>
              {line2.map(wind => <TrialMachine key={wind} value={wind}/>)}
              </div>
            </div>
    );
};

export default Line12;