
import axios from 'axios';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { read, utils } from 'xlsx';

const InputExcelData = () => {

  const [excelData, setExcelData] = useState([]);
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = read(event.target.result, { type: 'binary' });
      const worksheetName = workbook.SheetNames[0]; // Assuming the first sheet
      const worksheet = workbook.Sheets[worksheetName];
      const data = utils.sheet_to_json(worksheet, { header: 1, });

      // console.log(data); // Output the extracted data
      setExcelData(data)
    };

    reader.readAsBinaryString(file);
  };

  const specsTitles = excelData[0];
  const specsDetails = excelData.slice(1);
  console.log(specsDetails);

  const machinesDetails = [];
  const extractMcDetails = async (arr) => {

    arr.forEach((item) => {
      const machineNo = item[0];
      const productType = item[1];
      const POYLine = item[2];
      const DTYBobbinColor = item[3];
      const PresentLotNo = item[4];
      const AirPress = item[5];
      const INTJet = item[6];
      const InspectionArea = item[7];

      if (typeof machineNo === 'number') {
        machinesDetails.push({
          machineNo,
          productType,
          POYLine,
          DTYBobbinColor,
          PresentLotNo,
          AirPress,
          INTJet,
          InspectionArea
        });
      } else if (typeof machineNo === 'string') {
        const machineNumbers = machineNo.split(',').map(number => number.trim());
        machineNumbers.forEach((number) => {
          machinesDetails.push({
            machineNo: parseInt(number),
            productType,
            POYLine,
            DTYBobbinColor,
            PresentLotNo,
            AirPress,
            INTJet,
            InspectionArea
          });
        });
      }
    });

    const existingArr = await axios.get("http://localhost:5000/dty-machine-details-from-present-lot/").then(data => data.data);
    console.log("received data", existingArr);
    const newArr = machinesDetails;

    compareArrays(existingArr, newArr);
  }

  const updateMachineDetails = async(oneMCDetails) => {
    const data = await axios.put("http://localhost:5000/dty-machine-details-from-present-lot/", oneMCDetails);
    console.log(data);
  }

  const compareArrays = (array1, array2) => {

    for (let i = 0; i < array1.length; i++) {
      const element1 = array1[i];
      const element2 = array2.find(item => item.machineNo === element1.machineNo);
      // console.log(element2);
      if (!element2) {

        console.log('false 2');
        //    insert this element1 i.e object in the db; new mc introduced
      }
      if (element2) {
        const changedProps = compareObjects(element1, element2);
        console.log("changed Props of machine No:", element2.machineNo, `(${changedProps})`);
        // update the props by finding the object with mc no. and using the prop value from newArr or, arr2
        updateMachineDetails(element2);

      }

    }

    return true; // All elements are equal
  };

  function compareObjects(object1, object2) {
    const changedProperties = [];

    for (const key in object1) {
      if (object1.hasOwnProperty(key)) {
        if (!object2.hasOwnProperty(key) || object1[key] !== object2[key]) {
          changedProperties.push(key);
        }
      }
    }

    return changedProperties;
  }

  const handleUpload = async (specsTitles, specsDetails) => {
    const dateTime = format(new Date(), "Pp");
    // console.log(dateTime);
    // const res = await axios.post("http://localhost:5000/present-lot-and-transfer-area", { specsTitles, specsDetails, uploadedAt: dateTime });

    // console.log(res.data);

    extractMcDetails(specsDetails);
  }



  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <div>

        <div className="overflow-x-auto">
          <table className="table w-full max-w-sm mx-auto">
            {/* head */}
            <thead>
              <tr>
                {specsTitles?.map((spec, i) =>
                  <td>{spec}</td>
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

      </div>
      <button onClick={() => handleUpload(specsTitles, specsDetails)}>Upload Data</button>
    </div>
  );
};

export default InputExcelData;