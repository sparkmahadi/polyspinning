import React from 'react';
import poyExtruderBottom from "../../../images/poy extruder bottom view.gif"
import { Link } from 'react-router-dom';

const PoyFloorLayout = () => {
    return (
        <div className="">
            <div className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={poyExtruderBottom} className=" rounded-lg shadow-2xl" alt='' />
                    <div>
                        <h1 className="text-3xl font-bold">Partially Oriented Yarn</h1>
                        <p className="py-3 lg:text-lg">Partially Oriented Yarn (POY) is a type of synthetic yarn that undergoes a stretching process to align its polymer molecules partially. This intermediate stage gives POY improved strength and stability while retaining some elasticity. POY is commonly used in the textile industry for manufacturing various fabrics and textiles. It is known for its excellent dyeability, softness, and dimensional stability. POY can be further processed into textured yarn or used directly in weaving, knitting, and other fabric production processes. Its versatility and desirable properties make POY a popular choice for creating a wide range of products, including apparel, home furnishings, and industrial textiles.</p>
                        <div className='md:flex gap-5'>
                            <Link to={'present-lot-and-transfer-area'}>
                                <button className="btn btn-primary">View Present Lot</button>
                            </Link>
                            <Link to={'denierwise-poy-lines'}>
                                <button className='btn btn-outline'>Show Denierwise Data</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PoyFloorLayout;