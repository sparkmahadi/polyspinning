import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLotDetailsById } from '../../redux/features/dtyPresentLotAndTransfer/dtyPresentLotSlice';
import { useParams } from 'react-router-dom';
import PresentLotTable from '../../components/DTY/PresentLot/PresentLotTable';

const DTYLotDetails = () => {
    const dispatch = useDispatch();
    const {lotDetails} = useSelector(state => state.dtyPresentLotAndTransfer);

    const {id} = useParams();
    useEffect(()=>{
        dispatch(getLotDetailsById(id));
    },[dispatch, id]);

    console.log(lotDetails);
    return (
        <>
          <PresentLotTable data={lotDetails}/>  
        </>
    );
};

export default DTYLotDetails;