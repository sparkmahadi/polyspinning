import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDtyMachineUpdates } from '../../../redux/features/dtyMachineUpdates/dtyMachineUpdatesSlice';
import Spinner from '../../../components/Spinner/Spinner';

const DTYMachineUpdates = () => {
    const dispatch = useDispatch();
    const { dtyMachineUpdates, isLoding, isError, error } = useSelector(state => state.dtyMachineUpdates);

    useEffect(() => {
        dispatch(getDtyMachineUpdates());
    }, [dispatch]);

    console.log(dtyMachineUpdates);

    const properties = [
        "_id",
        "DTYMCNo",
        "ProductType",
        "POYLine",
        "DTYBobbinColor",
        "PresentLotNo",
        "AirPress",
        "INTJet",
        "InspectionArea",
        "Side",
        "uploadedAt",
    ]

    if (isLoding) {
        return <Spinner></Spinner>
    }

    return (
        <div>
                <h3 className='text-lg font-semibold text-center my-3'>DTY Machines Updates Record</h3>
                <p className='text-center'>N.B: Currently Updates are being recorded from lot changes occuring in present lot and transfer area only.</p>
            <div>
                <div className="shadow-lg rounded-lg p-6">
                    <div className="overflow-x-auto">
                        <table className="table table-xs table-pin-rows table-pin-cols mx-auto">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    {
                                        properties.map(prop => <td key={prop}>{prop}</td>)
                                    }
                                    <td>Changed Props</td>
                                </tr>
                            </thead>
                            <tbody>

                                {dtyMachineUpdates?.map((update, i) =>
                                    <tr>
                                        <th>{i + 1}</th>
                                        {
                                            Object.values(update).map(value => 
                                                <td>{value}</td>
                                                )
                                        }
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DTYMachineUpdates;