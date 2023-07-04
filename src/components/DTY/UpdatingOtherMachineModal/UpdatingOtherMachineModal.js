import React from 'react';

const UpdatingOtherMachineModal = ({handleUpdateOtherMachines}) => {
    return (
        <>
            <input type="checkbox" id="dtySetPropsFromOtherMC" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="dtySetPropsFromOtherMC" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-5">Please put the number of machines you want to update the property.</h3>

                    <form onSubmit={handleUpdateOtherMachines}>
                        <p className='pb-3'>Note: Please put the machines with seperating by comma (,) and you can write the machine with side. Example- 2, 3/A, 5/B, 10 etc. Please do not give the machine no. which does not exist.</p>

                        <select name="selectPropType" id="selectPropType">
                            <option value="AllThreeProps">All Three Props</option>
                            <option value="params">params</option>
                            <option value="DTYInfo">DTYInfo</option>
                            <option value="POYInfo">POYInfo</option>
                        </select>

                        <input name='machinesToUpdate' type="text" placeholder="Write the machine numbers here" className="input input-bordered input-info w-full max-w-xs" />

                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdatingOtherMachineModal;