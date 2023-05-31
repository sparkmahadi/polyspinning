import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

const DtyPresentLotAndTransfer = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get("http://localhost:5000/present-lot-and-transfer-area").then(data => setData(data.data));
    }, []);
    console.log(data);

    return (
        <div className="overflow-x-auto">
            <h5 className='lg:text-xl font-semibold text-center py-5'>Uploaded: {data.uploadedAt}</h5>    
            <table className="table w-full max-w-sm mx-auto">
                {/* head */}
                <thead>
                    <tr>
                        {data.specsTitles?.map((spec, i) =>
                            <td key={i}>{spec}</td>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.specsDetails?.map((specsDetail, i) =>
                            <tr key={i}>
                                {
                                    specsDetail?.map((sp, i) => <td key={i}>{sp}</td>)
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default DtyPresentLotAndTransfer;