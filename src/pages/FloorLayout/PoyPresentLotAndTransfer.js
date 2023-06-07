import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import { findPoyWinder, getPoyMcDataFromLot } from '../../redux/features/poyMachinesFromPresentLot/poyMCsFromPLotSlice';
import { Link } from 'react-router-dom';

const PoyPresentLotAndTransfer = () => {

    const dispatch = useDispatch();
    const { machineDataFromLot: data, isLoading, isError, error } = useSelector(state => state.poyMachinesFromLot);

    const properties = [
        "SL",
        "Line No.",
        "Model",
        "Origin",
        "Winder No",
        "Ends",
        "Denier",
        "Filaments",
        "POY Bobbin",
        "POY Color",
        "Status",
        "Updated On",
        "Actions"
    ]

    useEffect(() => {
        dispatch(getPoyMcDataFromLot());
    }, [dispatch]);

    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div className="overflow-x-auto">
            <span className="loading loading-spinner loading-lg z-50"></span>
            <h5 className='lg:text-xl font-semibold text-center py-5'>Present POY Floor Status</h5>
            <table className="table w-full max-w-sm mx-auto">
                {/* head */}
                <thead>
                    <tr>
                        {properties?.map((spec, i) =>
                            <td key={i}>{spec}</td>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((machine, i) =>
                            <tr key={i}>
                                {
                                    Object.values(machine)?.map((sp, i) =>
                                        <td key={i}>{sp}</td>
                                    )
                                }
                                <td><Link onClick={() => dispatch(findPoyWinder(machine.WinderNo))} to={`/poy-winders/${machine.WinderNo}`}><button className='btn btn-primary btn-sm'>Edit</button></Link></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default PoyPresentLotAndTransfer;