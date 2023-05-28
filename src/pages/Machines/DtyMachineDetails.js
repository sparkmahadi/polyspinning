import React from 'react';
import { Link } from 'react-router-dom';

const DtyMachineDetails = () => {
    const machine = {
        machineNo: 2,
        params: {
            processSpeed: 700,
            sof: 6.80,
            takup: 4.60,
            dyA: 1.580,
            dyB: 1.580,
            shaft2B: "off",
            cpm: 315,
            addDeviCpm: 25,
            T1: 43,
            T2: 72,
            T3: 50,
            drawRatioA: 1.705,
            drawRatioB: 1.705,
            oilerRpm: 4.3,
            airPressure: 0,
            intJetBrand: "None",
            intJetModel: "None",
            intType: "NIM",
            intJetOrifice: 0
        },
        mcInfo: {
            brand: "Bhagat",
            status: "Running",
            totalSpindles: 288
        },
        dtyInfo: {
            dtyType: "150/96/NIM",
            dtyDenier: 150,
            filaments: 96,
            dtyBobbin: "Old Dot Print",
            spandex: "None",
            lotNo: 10800234,
            poyShortPositions: 20,
            doubling: "No"
        },
        poyInfo: {
            poyType: "246/96",
            poyDenier: 246,
            filaments: 96,
            chips: "RECRON SD",
            color: "Raw",
            stdDrawForce: 80,
            totalWinder: 4,
            endsPerWinder: 10,
            poyProcessSpeed: 300,
            poyLine: 2,
            poyBobbin: "Old Stripe"
        }
    };

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
    }

    return (
        <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-32">
            <div className="overflow-x-auto">
                <table className="table w-full max-w-sm mx-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Specs</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* parameters */}
                        {
                            Object.entries(machine.params).map(m =>
                                <tr>
                                    <td>{m[0]}</td>
                                    <td>{m[1]}</td>
                                </tr>
                            )
                        }
                        {/* mcinfo */}
                        {
                            Object.entries(machine.mcInfo).map(m =>
                                <tr>
                                    <td>{m[0]}</td>
                                    <td>{m[1]}</td>
                                </tr>
                            )
                        }
                        {/* dtyinfo */}
                        {
                            Object.entries(machine.dtyInfo).map(m =>
                                <tr>
                                    <td>{m[0]}</td>
                                    <td>{m[1]}</td>
                                </tr>
                            )
                        }
                        {/* poyinfo */}
                        {
                            Object.entries(machine.poyInfo).map(m =>
                                <tr>
                                    <td>{m[0]}</td>
                                    <td>{m[1]}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <label htmlFor="dtyMachineModal" className='btn btn-success'>Update Details</label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="dtyMachineModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="dtyMachineModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>

                    <form onSubmit={handleSubmit}>
                        {
                            Object.entries(machine).map(m =>

                                <div className='flex justify-between items-center mb-3'>
                                    <label>{m[0]} :</label>
                                    <input name={m[0]} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" defaultValue={m[1]} />
                                </div>

                            )
                        }

                        <button type='submit' className='btn btn-secondary'>Submit</button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default DtyMachineDetails;