import React from 'react';
import TrialMachine from './TrialMachine';

const Line34 = () => {
    const line3 = [1, 2, 3, 4];
    const line4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    return (
        <div className='flex gap-10'>
            {/* line 3 */}
            <div className='grid16cols w-1/6'>
            {line3.map(wind => <TrialMachine key={wind} value={wind}/>)}
            </div>
            {/* line 4 */}
            <div className='grid16cols w-5/6'>
            {line4.map(wind => <TrialMachine key={wind} value={wind}/>)}
            </div>
        </div>
    );
};

export default Line34;