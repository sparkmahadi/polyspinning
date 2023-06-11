import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getDtyMachineDetails } from '../../../redux/features/dtyFloorStatus/dtyFloorStatusSlice';
import DTYMCDetails from './DTYMCDetails';
import Spinner from '../../../components/Spinner/Spinner';

const DtyMachineDetails = () => {
    const dispatch = useDispatch();
    const {detailedMachine, isLoading } = useSelector(state => state.dtyFloorStatus);
    const [searchParams, setSearchParams]= useSearchParams();
    const machine = searchParams.get("machine");
    console.log("detailedMachine", detailedMachine);
    useEffect(() => {
        dispatch(getDtyMachineDetails(machine));
    }, [dispatch])

    // const machineInfoCategories = Object.entries(detailedMachine);

    const handleSubmit = e => {
        e.preventDefault();
        const machineDetails = Object.keys(machine);
        // console.log(machineDetails);
        const form = e.target;

        let newMachineData = {
        };

        for (let i = 0; i < machineDetails.length; i++) {
            const propertyName = machineDetails[i];
            const propertyValue = form[propertyName].value;
            newMachineData[propertyName] = propertyValue;
            // console.log(propertyValue);
        }

        // console.log(form.machineNo.value);
        console.log(newMachineData);
    };

    if(isLoading){
        return <Spinner></Spinner>
    }

    return (
        <>
        {
            detailedMachine && !isLoading &&
            <DTYMCDetails data={detailedMachine}/>
        }
        </>
        // <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-10 lg:grid grid-cols-4">
        //     {
        //         machineInfoCategories.map((categories, i) =>
        //             typeof categories[1] === 'object' ?
        //                 <div key={i} className="overflow-x-auto">
        //                     <h3 className='text-center text-gray-700 lg:text-lg uppercase'>{categories[0]}</h3>
        //                     <table className="table w-full max-w-sm mx-auto">
        //                         {/* head */}
        //                         <thead>
        //                             <tr>
        //                                 <th>Specs</th>
        //                                 <th>Details</th>
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                             {
        //                                 Object.entries(categories[1]).map((specs, i) =>
        //                                     <tr key={i}>
        //                                         <td>{specs[0]}</td>
        //                                         <td>{specs[1] === "" ? "Unknown" : specs[1]}</td>
        //                                     </tr>
        //                                 )
        //                             }
        //                         </tbody>
        //                     </table>
        //                 </div>
        //                 :
        //                 undefined
        //         )
        //     }

        //     <label htmlFor="dtyMachineModal" className='btn btn-success'>Update Details</label>

        //     {/* Put this part before </body> tag */}
        //     <input type="checkbox" id="dtyMachineModal" className="modal-toggle" />
        //     <div className="modal">
        //         <div className="modal-box relative">
        //             <label htmlFor="dtyMachineModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        //             <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>

        //             <form onSubmit={handleSubmit}>
        //                 {
        //                     machineInfoCategories.map((categories, i) =>
        //                         <div key={i}>
        //                             {
        //                                 Object.entries(categories[1]).map((specs, i) =>
        //                                     <div key={i} className='flex justify-between items-center mb-3'>
        //                                         <label>{specs[0]} :</label>
        //                                         <input name={specs[0]} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" defaultValue={specs[1]} />
        //                                     </div>

        //                                 )
        //                             }
        //                         </div>
        //                     )
        //                 }
        //                 <button type='submit' className='btn btn-secondary'>Submit</button>
        //             </form>
        //         </div>
        //     </div>

        // </div>
    );
};

export default DtyMachineDetails;