import React from 'react';
import { Link } from 'react-router-dom';

const MachinesList = () => {
    const machines = [
        {
            category: "DTY Machines",
            link: "dty-machines-list"
        },
        {
            category: "POY Machines",
            link: "poy-machines-list"
        },
    ]
    return (
        <>
        <h3 className='text-lg xl:text-xl font-semibold my-2 text-center'>List of Machines</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                machines.map((mc, i) =>
                    <div key={i} className="card w-96 bg-teal-600 text-primary-content">
                        <div className="card-body">
                            <h2 className="card-title">{mc.category}</h2>
                            <p>View The List of Machines and Do Actions...</p>
                            <div className="card-actions justify-end">
                                <Link to={mc.link}><button className="btn">View</button></Link>
                            </div>
                        </div>
                    </div>
                )
            }


        </div>
        </>
    );
};

export default MachinesList;