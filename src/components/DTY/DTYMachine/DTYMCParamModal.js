import React from 'react';
import { useDispatch } from 'react-redux';
import { clearParamModalData } from '../../../redux/features/dtyProcessParameters/dtyParametersSlice';

const DTYMCParamModal = ({mcDetails}) => {
    const dispatch = useDispatch();
    // console.log(mcDetails);
    return (
        <>
         <input type="checkbox" id="dtyParamDetailsModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={()=>dispatch(clearParamModalData())} htmlFor="dtyParamDetailsModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-5">Parameters of Machine No: {mcDetails.DTYMCNo}</h3>

                    <form>
                        {
                            Object.entries(mcDetails).map((categories, i) =>
                                    <div className='flex justify-between items-center mb-3'>
                                        <label>{categories[0]} :</label>
                                        <input name={categories[0]} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" defaultValue={categories[1]} />
                                    </div>
                                
                            )
                        }
                    </form>
                </div>
            </div>   
        </>
    );
};

export default DTYMCParamModal;