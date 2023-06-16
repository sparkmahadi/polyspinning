import React from 'react';
import { Link } from 'react-router-dom';

const PresentLotTable = ({data}) => {
    return (
        <div className="overflow-x-auto">
            <span className="loading loading-spinner loading-lg z-50"></span>
            <h5 className='lg:text-xl font-semibold text-center py-5'>Uploaded On: {data.uploadedAt}</h5>
            <table className="table w-full max-w-sm mx-auto">
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
            <div className='flex justify-center items-center mt-5'>
                <Link to={'/dty-floor-status/present-lot-and-transfer-area/history'}><button className='btn btn-primary btn-sm'>View Lot History</button></Link>
            </div>
        </div>
    );
};

export default PresentLotTable;