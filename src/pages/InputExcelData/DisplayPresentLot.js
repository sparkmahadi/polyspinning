import React from 'react';

const DisplayPresentLot = ({ specsTitles, specsDetails }) => {
    return (
        <div className="overflow-x-auto pt-10">
            <table className="table w-full max-w-sm mx-auto">
                {/* head */}
                <thead>
                    <tr>
                        {specsTitles?.map((spec, i) =>
                            <td key={i}>{spec}</td>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        specsDetails?.map((specsDetail, i) =>
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

export default DisplayPresentLot;