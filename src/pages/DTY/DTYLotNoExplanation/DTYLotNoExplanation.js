import React from 'react';
import DTYLotNoExpModal from '../../../components/DTY/LotNoExplModal/DTYLotNoExpModal';
import { useDispatch, useSelector } from 'react-redux';
import { explainTheLot, setCurrentLot } from '../../../redux/features/dtyLotNoExplanation/dtyLotNoExplSlice';
import { toast } from 'react-hot-toast';

const DTYLotNoExplanation = () => {
    const dispatch = useDispatch();
    const { explainedLot } = useSelector(state => state.dtyLotNoExplanation);
    const handleSubmitLot = e => {
        e.preventDefault();
        const form = e.target;
        const lotNo = form.lotNo.value;
        console.log(lotNo.length);
        if(lotNo.length < 8 || lotNo.length > 8){
            return toast.error("Lot Number Must Be 8 digit Number!!!")
        }
        dispatch(setCurrentLot(lotNo));
        dispatch(explainTheLot(lotNo));
    }

    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <form onSubmit={handleSubmitLot}>
                <h3 className='lg:text-lg'>Enter the DTY Lot Number to get the explanation...</h3>

                <div className='flex flex-col lg:flex-row justify-center my-3'>
                    <input type="number" className='input-bordered input rounded-e-none' name='lotNo' placeholder='Enter lot number...' />
                    <button className='' type='submit'>
                        <label htmlFor="dtyLotNoExplanation" className='btn btn-accent rounded-s-none'>
                            Submit
                        </label>
                    </button>
                </div>

            </form>

            {
                explainedLot &&
                <DTYLotNoExpModal />
            }
        </div>
    );
};

export default DTYLotNoExplanation;
