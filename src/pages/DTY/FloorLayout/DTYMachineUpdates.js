import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDtyMachineUpdates } from '../../../redux/features/dtyMachineUpdates/dtyMachineUpdatesSlice';
import Spinner from '../../../components/Spinner/Spinner';
import { defaultContainer, pageHeadings, shadowRound, tdPadding } from '../../../customClasses/CustomClasses';

const DTYMachineUpdates = () => {
    const dispatch = useDispatch();
    const { dtyMachineUpdates, isLoading, isError, error } = useSelector(state => state.dtyMachineUpdates);

    useEffect(() => {
        dispatch(getDtyMachineUpdates());
    }, [dispatch]);

    console.log(dtyMachineUpdates);

    const properties = [
        "DTYMCNo",
        "Side",
        "ProductType",
        "POYLine",
        "PresentLotNo",
        "DTYBobbinColor",
        "AirPress",
        "INTJet",
        "InspectionArea",
    ]

    if (isLoading) {
        return <Spinner></Spinner>
    }

    console.log(dtyMachineUpdates);

    return (
        <div className={defaultContainer}>
            <h3 className={`${pageHeadings} py-2`}>DTY Machines Updates Record</h3>
            <p className='text-center'>N.B: Currently Updates are being recorded from changes occuring by manually machine update only.</p>
            <div className={`overflow-x-auto py-5`}>
                <table className={`table mx-auto ${shadowRound} rounded-lg`}>
                    <thead>
                        <tr>
                            <th>SL</th>
                            {
                                properties?.map(prop =>
                                    <td className={tdPadding} key={prop}>{prop}</td>
                                )
                            }
                            <td>Updated Properties</td>
                            <td>Updated From</td>
                            <td>Updated At</td>
                        </tr>
                    </thead>
                    <tbody>
                        {dtyMachineUpdates?.map((update, i) => (
                            <tr className="text-sm" key={i}>
                                <th>{i + 1}</th>
                                {properties?.map(prop => (
                                    <td key={prop}>{update.machineData[prop]}</td>
                                ))}
                                <td>
                                    {update.updatedProperties.length > 0 ? (
                                        <ul>
                                            {update.updatedProperties.map((propertyObj, index) => (
                                                <li key={index}>
                                                    {Object.entries(propertyObj).map(([property, value]) => (
                                                        <p key={property}>{`${property}: ${value}`}</p>
                                                    ))}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No updates</p>
                                    )}
                                </td>
                                <td><p>{update.updatedFrom}</p></td>
                                <td><p>{update.updatedAt}</p></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DTYMachineUpdates;