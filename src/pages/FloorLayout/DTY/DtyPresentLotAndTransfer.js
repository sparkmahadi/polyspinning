import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLotData } from '../../../redux/features/dtyPresentLotAndTransfer/dtyPresentLotSlice';
import Spinner from '../../../components/Spinner/Spinner';

const DtyPresentLotAndTransfer = () => {

    const dispatch = useDispatch();
    const { presentLotData: data, isLoading, isError, error } = useSelector(state => state.dtyPresentLotAndTransfer);
    useEffect(() => {
        dispatch(getLotData());
    }, [dispatch]);

    console.log(data);

    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div className="overflow-x-auto">
            <span className="loading loading-spinner loading-lg z-50"></span>
            <h5 className='lg:text-xl font-semibold text-center py-5'>Uploaded On: {data.uploadedAt}</h5>
            <table className="table w-full max-w-sm mx-auto">
                {/* head */}
                <thead>
                    <tr>
                        {data.specsTitles?.map((spec, i) =>
                            <td key={i}>{spec}</td>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.specsDetails?.map((specsDetail, i) =>
                            <tr key={i}>
                                {
                                    specsDetail?.map((sp, i) => <td key={i}>{sp}</td>)
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default DtyPresentLotAndTransfer;