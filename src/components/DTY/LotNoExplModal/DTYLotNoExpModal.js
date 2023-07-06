import React from 'react';
import { useSelector } from 'react-redux';

const DTYLotNoExpModal = () => {

    const { explainedLot } = useSelector(state => state.dtyLotNoExplanation);
    console.log("explainedLot", explainedLot);
    return (
        <>
            <input type="checkbox" id="dtyLotNoExplanation" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="dtyLotNoExplanation" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <div className='mb-5'>
                        <h3 className="text-xl font-bold mb-2">Lot Info:</h3>
                        <div className='lg:flex flex-row-reverse justify-center items-center'>
                            {/* <img className='lg:w-52 mx-auto' src={poyPackage} alt="" /> */}
                            <table className="table-auto w-full">
                                <tbody>
                                    {Object?.entries(explainedLot).map(([key, value]) => (
                                        <tr key={key}>
                                            <td className="border px-4 py-2 font-semibold">{key}</td>
                                            <td className="border px-4 py-2">{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DTYLotNoExpModal;