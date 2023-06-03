
import axios from 'axios';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { read, utils } from 'xlsx';
import { extractMcDetails } from '../../logics/justifyDtyLotUpdates';
import { useDispatch, useSelector } from 'react-redux';
import { selectFileType, setExcelData } from '../../redux/features/inputExcelFiles/inputExcelSlice';
import DisplayPresentLot from './DisplayPresentLot';

const InputExcelData = () => {
  // const [excelData, setExcelData] = useState([]);
  const dispatch = useDispatch();
  const { excelData, fileTypeInfo } = useSelector(state => state.inputExcelFiles)

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = read(event.target.result, { type: 'binary' });
      const worksheetName = workbook.SheetNames[0]; // Assuming the first sheet
      const worksheet = workbook.Sheets[worksheetName];
      const data = utils.sheet_to_json(worksheet, { header: 1, });

      // console.log(data); // Output the extracted data
      // setExcelData(data)
      dispatch(setExcelData(data));
    };
    reader.readAsBinaryString(file);
  };

  const specsTitles = excelData[0];
  console.log(specsTitles);
  const specsDetails = excelData.slice(1);
  console.log(specsDetails);


  const handleUpload = async (specsTitles, specsDetails) => {
    const dateTime = format(new Date(), "Pp");
    const res = await axios.post("http://localhost:5000/present-lot-and-transfer-area", { specsTitles, specsDetails, uploadedAt: dateTime });
    console.log(res.data);

    extractMcDetails(specsDetails);
  }

  const handleSelection = (e) => {
    const fileType = e.target.value;
    if (fileType) {
      dispatch(selectFileType(fileType));
    }
  }

  return (
    <div className='min-h-screen'>
      <h5 className='text-center pt-5'>Upload Your data from excel file by selecting the category of data.</h5>
      <div className=''>

        <div className='flex justify-center my-5'>
          <select onChange={(e) => handleSelection(e)} className="select select-bordered w-full max-w-xs" required>
            <option disabled selected>Select File Type</option>
            <option value={"DTYPresentLotAndTransferArea"}>DTY Present Lot and Transfer Area</option>
            <option value={"DTYProcessParametres"}>DTY Process Parametres</option>
            <option value={"DTYProductionReport"}>DTY Production Report</option>
            <option value={"DTYYarnBreakageReport"}>DTY Yarn Breakage Report</option>
            <option value={"DTYAbnormalDrawForceReport"}>DTY Abnormal Draw Force Report</option>
            <option value={"DTYBottomPOYReport"}>DTY Bottom POY Report</option>
            <option value={"DTYDowngradePOYReport"}>DTY Downgrade POY Report</option>
          </select>
        </div>

        {
          fileTypeInfo &&
          <div className='flex justify-center'>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Pick a file</span>
              </label>
              <input onChange={handleFileUpload} type="file" className="file-input file-input-bordered w-full max-w-xs" />
              <label className="label">
                <span className="label-text-alt">You must select an excel file</span>
              </label>
            </div>
          </div>
        }

      </div>

      <div>

        {
          fileTypeInfo === "DTYPresentLotAndTransferArea" &&
          <DisplayPresentLot specsTitles={specsTitles} specsDetails={specsDetails} />
        }

      </div>
      <button className='btn btn-primary block mx-auto btn-sm my-5' onClick={() => handleUpload(specsTitles, specsDetails)}>Upload Data</button>
    </div>
  );
};

export default InputExcelData;