import React from 'react';
import DTYLotNoExpModal from '../../../components/DTY/LotNoExplModal/DTYLotNoExpModal';
import { useDispatch, useSelector } from 'react-redux';
import { explainTheLot, setExplainedLot } from '../../../redux/features/dtyLotNoExplanation/dtyLotNoExplSlice';

const DTYLotNoExplanation = () => {
    const dispatch = useDispatch();
    const { explainedLot } = useSelector(state => state.dtyLotNoExplanation);



    const handleSubmitLot = e => {
        e.preventDefault();
        const form = e.target;
        const lotNo = form.lotNo.value;

        dispatch(explainTheLot(lotNo));
    }

    return (
        <div>
            <form onSubmit={handleSubmitLot}>
                <input type="number" className='input-bordered input' name='lotNo' />


                <button className='' type='submit'>
                    <label htmlFor="dtyLotNoExplanation" className='btn btn-outline btn-sm'>
                        Submit
                    </label>
                </button>

            </form>

            {
                explainedLot &&
                <DTYLotNoExpModal />
            }
        </div>
    );
};

export default DTYLotNoExplanation;
