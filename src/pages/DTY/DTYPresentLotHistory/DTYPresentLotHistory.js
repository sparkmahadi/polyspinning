import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPresentLotHistory } from '../../../redux/features/dtyPresentLotAndTransfer/dtyPresentLotSlice';

const DTYPresentLotHistory = () => {
    const dispatch = useDispatch();
    const { presentLotHistory, isLodaing, isError, error } = useSelector(state => state.dtyPresentLotAndTransfer);

    useEffect(() => {
        dispatch(getPresentLotHistory());
    }, [dispatch]);

    console.log(presentLotHistory);

    return (
        <div>
            <h3 className='text-center text-lg font-semibold py-3 lg:text-xl'>DTY Lot Changes and History</h3>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-xs table-pin-rows table-pin-cols mx-auto my-5">
                        <thead>
                            <tr>
                                <th></th>
                                <td>Number of Lots</td>
                                <td>Uploaded At</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                presentLotHistory?.map((history, i) =>
                                    <tr key={i}>
                                        <th>{i+1}</th>
                                        <td>{history.specsDetails.length}</td>
                                        <td>{history.uploadedAt}</td>
                                        <td>
                                            <Link to={history._id}><button className='btn btn-primary btn-sm'>View Lot</button></Link>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DTYPresentLotHistory;