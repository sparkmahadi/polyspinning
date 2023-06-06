import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { read, utils } from 'xlsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectFileType, setExcelData } from '../../redux/features/inputExcelFiles/inputExcelSlice';
import DisplayPresentLot from './DisplayPresentLot';
import DisplayPOYPresentLot from './DisplayPOYPresentLot';
import { addLotData, togglePostSuccess } from '../../redux/features/dtyPresentLotAndTransfer/dtyPresentLotSlice';
import Uploading from '../../components/Spinner/Uploading';
import { toast } from 'react-hot-toast';
import { addMachine, getMcDataFromLot, updateMachine } from '../../redux/features/dtyMachinesFromPresentLot/dtyMCsFromPLotSlice';

const InputExcelData = () => {
  // const [excelData, setExcelData] = useState([]);
  const dispatch = useDispatch();
  const { excelData, fileTypeInfo } = useSelector(state => state.inputExcelFiles);
  const { machineDataFromLot: existingArr, isLoading, isPosting, isError, error, postMachineSuccess, updateMachineSuccess } = useSelector(state => state.dtyMachinesFromLot);
  // const { isPosting, postSuccess, updateSuccess } = useSelector(state => state.dtyPresentLotAndTransfer);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = read(event.target.result, { type: 'binary' });
      const worksheetName = workbook.SheetNames[0]; // Assuming the first sheet
      const worksheet = workbook.Sheets[worksheetName];
      const data = utils.sheet_to_json(worksheet, { header: 1, });

      console.log(data); // Output the extracted data
      dispatch(setExcelData(data));
      e.target.value = '';
    };
    reader.readAsBinaryString(file);
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
        {
          fileTypeInfo === "POYPresentLot" &&
          <DisplayPOYPresentLot />
        }

      </div>
    </div>
  );
};

export default InputExcelData;