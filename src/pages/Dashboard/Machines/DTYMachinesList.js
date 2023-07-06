import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDtyMachines, removeDtyMachine } from '../../../redux/features/dtyMachines/dtyMachinesSlice';
import { Link } from 'react-router-dom';
import Spinner from '../../../components/Spinner/Spinner';

const DTYMachinesList = () => {
    const dispatch = useDispatch();
    const { dtyMachines, isLoading, error, isError } = useSelector(state => state.dtyMachines);
    console.log(dtyMachines);

    const handleDeleteMachine = (id) => {
        const confirm = window.confirm("Are you sure to delete this machine?");
        if (confirm) {
            dispatch(removeDtyMachine(id));
        }
    }

    useEffect(() => {
        dispatch(getDtyMachines());
    }, [dispatch])

    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Machine</th>
                            <th>DTY Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dtyMachines?.map((mc, i) =>
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{mc.mcInfo.DTYMCNo}/{mc.mcInfo.Side}</td>
                                    <td>{mc.DTYInfo.DTYType}</td>
                                    <td className='flex flex-col md:flex-row gap-4'>
                                        <Link to={`/dty-floor-status/dty-machines/machine-details?machine=${mc.mcInfo.DTYMCNo}/${mc.mcInfo.Side}`}><button className='btn btn-primary btn-sm'>View Details</button></Link>
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

export default DTYMachinesList;