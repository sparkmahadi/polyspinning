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
        <div>

            {
                machines.map((mc, i) =>
                    <div key={i} className="card w-96 bg-primary text-primary-content">
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
    );
};

export default MachinesList;