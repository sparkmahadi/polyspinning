import React, { useEffect } from 'react';
import { getDtyParams, getDtyParamsForComparison } from '../../../redux/features/dtyProcessParameters/dtyParametersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../../components/Spinner/Spinner';
import LoadingCustom from '../../../components/Spinner/LoadingCustom';
import DataLoading from '../../../components/Spinner/DataLoading';

const DtyProcessParams = () => {
  const { dtyProcessParameters, isLoading } = useSelector(state => state.dtyProcessParameters);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDtyParams());
  }, [dispatch]);


  const properties = [
    "POYType", "POYLine", "DTYMCNo", "DTYType", "DTYColor", "LotNo", "ChipsName", "MCSpeed", "DR", "SOF", "TOF", "DY", "Shaft2B", "CPM", "DEV", "PH", "SH", "EDraw", "AirPressure", "IntJetType", "OilerRpm", "OilType", "Axial", "Stroke", "DTYTubeColor", "CustomerName", "StartDate", "StopDate", "Quantity", "Remarks", "uploadedAt"
  ];

  console.log(dtyProcessParameters);

  if (isLoading) {
    return <Spinner></Spinner>
  }

  if (!Array.isArray(dtyProcessParameters)) {
    return <LoadingCustom message={"No Data Found in server"} />
  }

  if (!dtyProcessParameters.length) {
    return <DataLoading></DataLoading>
  }

  return (
    <div className="overflow-x-auto pt-10">
      {
        dtyProcessParameters.length &&
        <>
          <div className='flex justify-center'><Link to={'add-new-parameter'}><button className='btn btn-primary mb-5'>Add New Parameter</button></Link></div>

          <table className="table w-full hidden lg:block">
            <thead>
              <tr>
                {properties?.map((spec, i) =>
                  <td key={i}>{spec}</td>
                )}
              </tr>
            </thead>
            <tbody>
              {
                dtyProcessParameters?.map((paramDetail, i) =>
                  <tr key={i}>
                    {
                      properties?.map((param, i) =>
                        <td key={i}>{paramDetail[param]}</td>
                      )
                    }
                  </tr>
                )
              }
            </tbody>
          </table>

          {/* for mobiles */}

          <div className="grid lg:grid-cols-3 lg:hidden gap-5">
            {dtyProcessParameters?.map((item, i) => (
              <div key={i} className="card w-96 bg-base-100 shadow-xl p-3">
                <div className="card-body">
                  <div>
                    <h3>SL: {i + 1}</h3>
                    {Object.entries(item).map(([key, value]) => (
                      <p key={key}>
                        {key}: {value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </>
      }

    </div>
  );
};

export default DtyProcessParams;