import React from 'react';
import { read, utils } from 'xlsx';

const InputExcelData = () => {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
      
        reader.onload = (event) => {
          const workbook = read(event.target.result, { type: 'binary' });
          const worksheetName = workbook.SheetNames[0]; // Assuming the first sheet
          const worksheet = workbook.Sheets[worksheetName];
          const data = utils.sheet_to_json(worksheet, { header: 1 });
      
          console.log(data); // Output the extracted data
        };
      
        reader.readAsBinaryString(file);
      };
      
    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
        </div>
    );
};

export default InputExcelData;