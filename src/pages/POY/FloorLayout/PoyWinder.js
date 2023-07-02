import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addWinderUpdate, getPoyWinderData, updateWinder } from '../../../redux/features/poyMachinesFromPresentLot/poyMCsFromPLotSlice';
import { toast } from 'react-hot-toast';
import Spinner from '../../../components/Spinner/Spinner';

const PoyWinder = () => {
    const { WinderNo } = useParams();
    const dispatch = useDispatch();
    const { poyWinderData, isLoading } = useSelector(state => state.poyMachinesFromLot);
    console.log('poy', poyWinderData);
    const { _id, ...poyWinderWithoutId } = poyWinderData;
    const properties = Object.keys(poyWinderWithoutId);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;

        let newMachineData = {
        };

        for (let i = 0; i < properties.length; i++) {
            const propertyName = properties[i];
            const propertyValue = form[propertyName].value;
            newMachineData[propertyName] = propertyValue;
        }

        const changedProps = compareObjects(poyWinderWithoutId, newMachineData);
        const updateInfo = { WinderData: newMachineData, changedProps };
        console.log(updateInfo);
        if (changedProps.length) {
            console.log(newMachineData);
            dispatch(updateWinder(updateInfo));
            dispatch(addWinderUpdate(updateInfo));
        }
        else {
            toast.error("Nothing is changed");
        }
    };

    function compareObjects(object1, object2) {

        console.log(object1, object2);
        const changedProperties = [];

        for (const elem of properties) {
            if (object1[elem].toString() !== object2[elem]) {
                changedProperties.push(elem);
            }
        }
        return changedProperties;
    }

    useEffect(() => {
        dispatch(getPoyWinderData(WinderNo))
    }, [dispatch, WinderNo])

    if(isLoading){
        return <Spinner></Spinner>
    }
    return (
        <div className="overflow-x-auto">
            <h5 className='lg:text-xl font-semibold text-center py-5'>Update the info of Winder # {WinderNo}</h5>
            <form onSubmit={handleSubmit} className='w-full max-w-lg mx-auto'>
                {
                    Object.entries(poyWinderWithoutId)?.map((specs, i) =>
                        <div key={i} className='flex justify-between gap-5 items-center mb-3'>
                            <label>{specs[0]} :</label>
                            <input name={specs[0]} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" defaultValue={specs[1]} />
                        </div>

                    )
                }
                <button type='submit' className='btn btn-secondary'>Submit</button>
            </form>
        </div>
    );
};

export default PoyWinder;