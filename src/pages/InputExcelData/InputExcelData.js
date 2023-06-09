import { format } from 'date-fns';
import React, { useEffect, useRef } from 'react';
import { read, utils } from 'xlsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectFileType, setExcelData } from '../../redux/features/inputExcelFiles/inputExcelSlice';
import DisplayPresentLot from './DisplayPresentLot';
import DisplayPOYPresentLot from './DisplayPOYPresentLot';
import { addLotData, togglePostSuccess } from '../../redux/features/dtyPresentLotAndTransfer/dtyPresentLotSlice';
import Uploading from '../../components/Spinner/Uploading';
import { toast } from 'react-hot-toast';
import { addMachine, getMcDataFromLot, updateMachine } from '../../redux/features/dtyMachinesFromPresentLot/dtyMCsFromPLotSlice';
import DisplayDtyParameters from './DisplayDtyParameters';

const InputExcelData = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { excelData, fileTypeInfo } = useSelector(state => state.inputExcelFiles);
  const { machineDataFromLot: existingArr, isLoading, isPosting, isError, error, postMachineSuccess, updateMachineSuccess } = useSelector(state => state.dtyMachinesFromLot);

  const handleFileUpload = (e) => {
    e.preventDefault();
    const form = e.target;
    const file = form.fileInputElement.files[0];
    // console.log(file);
    const reader = new FileReader();

    if(file){
      reader.onload = (event) => {
        const workbook = read(event.target.result, { type: 'binary' });
        const worksheetName = workbook.SheetNames[0]; // Assuming the first sheet
        const worksheet = workbook.Sheets[worksheetName];
        const data = utils.sheet_to_json(worksheet, { header: 1, });
  
        console.log(data); // Output the extracted data
        dispatch(setExcelData(data));
        // e.target.value = '';
      };
      reader.readAsBinaryString(file);
    } else{
      console.log('No file is selected');
    }
  };

  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the input value
    }
  };

  const specsTitles = excelData[0];
  const specsDetails = excelData.slice(1);


  const handleSelection = (e) => {
    const fileType = e.target.value;
    if (fileType) {
      dispatch(selectFileType(fileType));
    }
  }



  useEffect(() => {

    if (!isPosting && postMachineSuccess) {
      toast.success("Lot data is uploaded successfully", { id: "addLotData" });
      dispatch(togglePostSuccess());
    };

    if (!isPosting && updateMachineSuccess) {
      toast.success("Lot data is updated successfully", { id: "addLotData" });
      // dispatch(togglePostSuccess());
    };
  }, [isPosting, postMachineSuccess, updateMachineSuccess])

  useEffect(() => {
    dispatch(getMcDataFromLot());
  }, [dispatch])

  if (isPosting) {
    return <Uploading></Uploading>
  };

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
            <option value={"POYPresentLot"}>POY Present Lot Data</option>
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

      </div>

      <div>

        {
          fileTypeInfo === "DTYPresentLotAndTransferArea" &&
          <DisplayPresentLot specsTitles={specsTitles} specsDetails={specsDetails} />
        }
        {
          fileTypeInfo === "POYPresentLot" &&
          <DisplayPOYPresentLot />
        }
        {
          fileTypeInfo === "DTYProcessParametres" &&
          <DisplayDtyParameters />
        }

      </div>
    </div>
  );
};

export default InputExcelData;