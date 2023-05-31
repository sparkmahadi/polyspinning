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

  const handleUpload = async (specsTitles, specsDetails) => {
    // const dateTime = format(new Date(), "Pp");
    // console.log(dateTime);
    const res = await axios.post("http://localhost:5000/present-lot-and-transfer-area", { specsTitles, specsDetails, uploadedAt: new Date() });

    console.log(res.data);
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