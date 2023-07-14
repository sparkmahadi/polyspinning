import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectFileType, setExcelData, setProdReportData } from '../../redux/features/inputExcelFiles/inputExcelSlice';
import { read, utils } from 'xlsx';
import { format } from 'date-fns';
import DisplayDTYProdSummaryReport from './DisplayDTYProdSummaryReport';

const InputDTYProductionReport = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const { productionReportData, fileTypeInfo } = useSelector(state => state.inputExcelFiles);

    const handleClearFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // const specsTitles = excelData[0];
    // const specsDetails = excelData.slice(1);


    const handleSelection = (e) => {
        const fileType = e.target.value;
        if (fileType) {
            dispatch(selectFileType(fileType));
        }
    }

    const handleFileUpload = (e) => {
        e.preventDefault();
        const form = e.target;
        const file = form.fileInputElement.files[0];
        // console.log(file);
        const reader = new FileReader();

        if (file) {
            reader.onload = (event) => {
                const workbook = read(event.target.result, { type: 'binary' });
                const worksheetName = workbook.SheetNames[0]; // Assuming the first sheet
                const worksheet = workbook.Sheets[worksheetName];
                const data = utils.sheet_to_json(worksheet, { header: 1, range: "C1:L64", blankrows: false});
                const topTitles = utils.sheet_to_json(worksheet, { header: 1, range: "C1:L3", blankrows: false});
                const detailsTitles = utils.sheet_to_json(worksheet, { header: 1, range: "D6:L6", blankrows: false});
                const machineDetails = utils.sheet_to_json(worksheet, { header: 1, range: "D7:L37", blankrows: false});
                const totalRawProd = utils.sheet_to_json(worksheet, { header: 1, range: "C38:L38", blankrows: false});
                const mc30 = utils.sheet_to_json(worksheet, { header: 1, range: "D40:L41", blankrows: false});
                const totalMC30 = utils.sheet_to_json(worksheet, { header: 1, range: "C42:L42", blankrows: false});
                const grandTotalProd = utils.sheet_to_json(worksheet, { header: 1, range: "C43:L43", blankrows: false});
                const remarks = utils.sheet_to_json(worksheet, { header: 1, range: "I45:I61", blankrows: false});
                const wastageDetails = utils.sheet_to_json(worksheet, { header: 1, range: "C45:H48", blankrows: false});
                const conningOilDetails = utils.sheet_to_json(worksheet, { header: 1, range: "C50:H51", blankrows: false});
                const paperTubeDetails = utils.sheet_to_json(worksheet, { header: 1, range: "C53:H56", blankrows: false});
                const otherNotes = utils.sheet_to_json(worksheet, { header: 1, range: "C58:H61", blankrows: false});

                const extractedData = {
                    topTitles,
                    detailsTitles,
                    machineDetails,
                    totalRawProd,
                    mc30,
                    totalMC30,
                    grandTotalProd,
                    remarks,
                    wastageDetails,
                    conningOilDetails,
                    paperTubeDetails,
                    otherNotes
                };
                // console.log(extractedData);
                // console.log(data); // Output the extracted data
                dispatch(setProdReportData(extractedData));
                // e.target.value = '';
            };
            reader.readAsBinaryString(file);
        } else {
            console.log('No file is selected');
        }
    };

    console.log("excelData", productionReportData);

    return (
        <div className='min-h-screen'>
            <h5 className='text-center text-lg pt-5'>Upload Your data from excel file by selecting the category of data.</h5>
            <p className='text-center pt-3'>Make sure your excel file doesn't have any empty cells within data range. If have any empty cells, then please replace those cells with any value you want e.g "-"</p>
            <div className=''>

                <div className='flex justify-center my-5'>
                    <select onChange={(e) => handleSelection(e)} className="select select-bordered w-full max-w-xs" required>
                        <option disabled selected>Select File Type</option>
                        <option value={"SummaryReport"}>Summary Report</option>
                    </select>
                </div>

                {
                    fileTypeInfo &&
                    <form onSubmit={handleFileUpload} className='flex justify-center'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Pick a file</span>
                            </label>
                            <input ref={fileInputRef} name='fileInputElement' type="file" className="file-input file-input-bordered w-full max-w-xs" />
                            <label className="label">
                                <span className="label-text-alt">You must select an excel file</span>
                            </label>
                            <button onClick={handleClearFile} name='clearBtn' className='btn btn-primary btn-sm my-2'>Clear Input</button>
                            <button type='submit' className='btn btn-success btn-sm my-2'>Submit</button>
                        </div>
                    </form>
                }

                {
                    fileTypeInfo === "SummaryReport" && Object.entries(productionReportData).length &&
                    <DisplayDTYProdSummaryReport />
                }

            </div>

            {/* <div>

                {
                    fileTypeInfo === "DTYPresentLotAndTransferArea" &&
                    <DisplayDTYPresentLot specsTitles={specsTitles} specsDetails={specsDetails} />
                }
                {
                    fileTypeInfo === "POYPresentLot" &&
                    <DisplayPOYPresentLot />
                }
                {
                    fileTypeInfo === "DTYProcessParametres" &&
                    <DisplayDtyParameters />
                }

            </div> */}
        </div>
    );
};

export default InputDTYProductionReport;