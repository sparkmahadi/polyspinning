import React from 'react';

const FileUpFormats = () => {
    const fileFormats = [
        {
            name: "DTY Present Lot and Transfer Area",
            details: "To upload the data of present lot and transfer of DTY department",
            fileLink: "https://docs.google.com/spreadsheets/d/19mr2gO2Q2CbA42Lj3LORZAigjE4pG-hq/edit?usp=drive_link&ouid=108684120378637973764&rtpof=true&sd=true"
        },
        {
            name: "DTY Process Parameters",
            details: "To upload the data of process parameters of DTY department",
            fileLink: "https://docs.google.com/spreadsheets/d/1QKTSd1o2h-eNB-lM_bboYl41PLyvcym3/edit?usp=drive_link&ouid=108684120378637973764&rtpof=true&sd=true"
        },
        {
            name: "POY Present Lot",
            details: "To upload the data of present lot of POY department",
            fileLink: "https://docs.google.com/spreadsheets/d/10bs5wWFULBLO0yJi_BxC2P4p5ygoecQx/edit?usp=drive_link&ouid=108684120378637973764&rtpof=true&sd=true"
        },
    ]
    return (
        <div>
            <h3 className='text-center py-3 text-lg lg:text-xl xl:text-2xl font-semibold'>View and Download Excel Formats for Updating Data to the Database</h3>
            <div className='grid lg:grid-cols-3 mx-auto max-w-md gap-8 px-6 sm:max-w-lg lg:max-w-7xl lg:px-8'>
                {
                    fileFormats?.map((fileFormat, i) =>
                        <div key={i} className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{fileFormat.name}</h2>
                                <p>{fileFormat.details}</p>
                                <div className="card-actions justify-end">
                                    <a href={fileFormat.fileLink} target='_blank' rel="noreferrer"><button className="btn btn-primary btn-sm">View</button></a>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FileUpFormats;