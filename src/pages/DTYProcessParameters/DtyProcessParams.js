import React, { useEffect } from 'react';
import { getDtyParams, getDtyParamsForComparison } from '../../redux/features/dtyProcessParameters/dtyParametersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import LoadingCustom from '../../components/Spinner/LoadingCustom';
import DataLoading from '../../components/Spinner/DataLoading';

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

    if(isLoading){
        return <Spinner></Spinner>
      }
  
      if(!Array.isArray(dtyProcessParameters)){
          return <LoadingCustom message={"No Data Found in server"}/>
      }
  
      if(!dtyProcessParameters.length){
          return <DataLoading></DataLoading>
      }

    return (
        <div className="overflow-x-auto pt-10">
            {
                dtyProcessParameters.length &&
                <>
                    <Link to={'add-new-parameter'}><button className='btn btn-primary mb-5'>Add New Parameter</button></Link>

                    <table className="table w-full max-w-sm mx-auto">
                        {/* head */}
                        <thead>
                            <tr>
                                {properties?.map((spec, i) =>
                                    <td key={i}>{spec}</td>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                dtyProcessParameters?.map((paramDetail, i) =>
                                    <tr key={i}>
                                        {
                                            Object.entries(paramDetail)?.map((sp, i) => <td key={i}>{sp[1]}</td>)
                                        }
                                    </tr>
                                )
                            } */}
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

                </>
            }

        </div>
    );
};

export default DtyProcessParams;