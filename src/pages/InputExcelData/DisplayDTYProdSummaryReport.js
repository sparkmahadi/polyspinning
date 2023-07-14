import React from 'react';
import { useSelector } from 'react-redux';
import { excelDateToJSDate } from '../../logics/findingFunctions';
import { format } from 'date-fns';

const DisplayDTYProdSummaryReport = () => {

    const { productionReportData } = useSelector(state => state.inputExcelFiles);
    const [reportTitle, dateNameAndChips, dates] = productionReportData.topTitles;
    const detailsTitles = productionReportData.detailsTitles[0];
    const machineDetails = productionReportData.machineDetails;
    const mc30 = productionReportData.mc30;
    const chipsNames = dateNameAndChips[2];
    const prodDate = dates[0];
    const reportDate = dates[8];
    return (
        <div>
            <h3>{reportTitle}</h3>
            <p>{chipsNames}</p>
            <p>Production Date: {
                format(excelDateToJSDate(prodDate), "Pp")
            }</p>
            <p>Reporting Date: {
                format(excelDateToJSDate(reportDate), "Pp")
            }</p>

            <div className="overflow-x-auto pt-10">
                {
                    Object.entries(productionReportData).length &&
                    <>
                        <table className="table mx-auto border">
                            {/* head */}
                            <thead>
                                <tr>
                                    {detailsTitles?.map((spec, i) =>
                                        <td key={i}>{spec}</td>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    machineDetails?.map((details, i) =>
                                        <tr key={i}>
                                            {
                                                details?.map((sp, i) => <td key={i}>{sp}</td>)
                                            }
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                        <table className='table mx-auto border border-1'>
                            <tbody>
                                {
                                    mc30?.map((details, i) =>
                                        <tr key={i}>
                                            {
                                                details?.map((sp, i) => <td key={i}>{sp}</td>)
                                            }
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                        {/* <button className='btn btn-primary block mx-auto btn-sm my-5' onClick={() => handleUpload(excelData)}>Upload Data</button> */}
                    </>
                }

            </div>
        </div>
    );
};

export default DisplayDTYProdSummaryReport;