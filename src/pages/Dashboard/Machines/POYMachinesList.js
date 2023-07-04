import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPoyMcDataFromLot, removePoyMachine } from '../../../redux/features/poyMachinesFromPresentLot/poyMCsFromPLotSlice';

const POYMachinesList = () => {
    const dispatch = useDispatch();
  const { machineDataFromLot: data, selectedFilters, isLoading, isError, error } = useSelector(state => state.poyMachinesFromLot);

    const handleDeleteMachine = (id) => {
        const confirm = window.confirm("Are you sure to delete this machine?");
        if (confirm) {
            dispatch(removePoyMachine(id));
        }
    }

    useEffect(() => {
        dispatch(getPoyMcDataFromLot());
    }, [dispatch])

    console.log(data);
    return (
        <div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Machine</th>
                            <th>POY Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((mc, i) =>
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{mc.WinderNo}</td>
                                    <td>{mc.Denier}/{mc.Filaments} - {mc.POYColor}</td>
                                    <td className='flex flex-col md:flex-row gap-4'>
                                        <Link to={`/poy-winders/${mc.WinderNo}`}><button className='btn btn-primary btn-sm'>Edit</button></Link>
                                        <button onClick={() => handleDeleteMachine(mc._id)} className='btn btn-warning btn-sm'>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );

};

export default POYMachinesList;