import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPoyWinderData } from '../../redux/features/poyMachinesFromPresentLot/poyMCsFromPLotSlice';

const PoyWinder = () => {
    const { WinderNo } = useParams();
    const dispatch = useDispatch();
    const { poyWinderData } = useSelector(state => state.poyMachinesFromLot);

    useEffect(() => {
        dispatch(getPoyWinderData(WinderNo));
    }, [dispatch, WinderNo])
    return (
        <div className="overflow-x-auto">
            <span className="loading loading-spinner loading-lg z-50"></span>
            <h5 className='lg:text-xl font-semibold text-center py-5'>Update the info of Winder # {WinderNo}</h5>
            <div className="w-full max-w-sm mx-auto ">
                {/* head */}
                <div className='grid grid-cols-2 items-center gap-5'>
                    {Object.entries(poyWinderData)?.map((spec, i) =>
                        <>
                            <p key={i}>{spec[0]}</p>
                            <input key={i} defaultValue={spec[1]} type="text" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PoyWinder;