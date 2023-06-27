import React from 'react';

const PresentLotInstruction = () => {
    return (
        <div className='p-2 border rounded-lg sm:max-w-lg lg:max-w-7xl lg:px-8 mx-auto'>
            <h3 className='text-center text-lg font-semibold pb-5'>Instructions for Uploading New Present Lot and Transfer Area</h3>
            <ul className='list-disc'>
                <li className='list-item'>Make sure there is no zero before any machine number</li>
                <li>Make sure there is no duplicate lot for same machine</li>
                <li>If there is any new lot for a machine, please remove the old lot. No machine numbers can be duplicated at all</li>
            </ul>
        </div>
    );
};

export default PresentLotInstruction;