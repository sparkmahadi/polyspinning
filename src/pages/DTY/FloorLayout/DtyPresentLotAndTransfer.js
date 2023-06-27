import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLotData } from '../../../redux/features/dtyPresentLotAndTransfer/dtyPresentLotSlice';
import Spinner from '../../../components/Spinner/Spinner';
import PresentLotTable from '../../../components/DTY/PresentLot/PresentLotTable';

const DtyPresentLotAndTransfer = () => {

    const dispatch = useDispatch();
    const { presentLotData: data, isLoading, isError, error } = useSelector(state => state.dtyPresentLotAndTransfer);
    useEffect(() => {
        dispatch(getLotData());
    }, [dispatch]);

    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <>
            <PresentLotTable data={data} />
        </>
    );
};

export default DtyPresentLotAndTransfer;