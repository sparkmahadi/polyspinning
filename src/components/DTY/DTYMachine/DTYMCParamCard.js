import React from 'react';
import runningGears from "../../../images/gear_rotation.gif";
import gearStopped from "../../../images/gear stopped.png";
import dtyBobbin from "../../../images/dty bobbin.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { setParamModalData } from '../../../redux/features/dtyProcessParameters/dtyParametersSlice';
import DTYMCParamModal from './DTYMCParamModal';
import { shadowRound } from '../../../customClasses/CustomClasses';

const DTYMCParamCard = ({ mcDetails }) => {
    const dispatch = useDispatch();
    const { paramModalData } = useSelector(state => state.dtyProcessParameters)
    const {
        _id, POYType, POYLine, DTYMCNo, DTYType, DTYColor, LotNo, ChipsName, MCSpeed, DR, SOF, TOF, DY, Shaft2B, CPM, DEV, PH, SH, EDraw, AirPressure, IntJetType, OilerRpm, OilType, Axial, Stroke, DTYTubeColor, CustomerName, StartDate, StopDate, Quantity, Remarks, uploadedAt, message } = mcDetails;
    return (
        <div className={`card xl:w-96 bg-base-100 ${shadowRound}`}>
            <figure><img src={mcDetails.message ? gearStopped : runningGears} alt="status" /></figure>

            {
                mcDetails.message ?
                    <div className="card-body">
                        <h2 className="card-title">
                            Sorry!
                            <div className="badge badge-secondary">Stopped</div>
                        </h2>
                        <p>{message}</p>
                    </div>

                    :

                    <div className="card-body">
                        <h2 className="card-title">
                            Machine: {DTYMCNo}
                            <div className="badge badge-accent badge-lg">Line : {POYLine}</div>
                            <div className="badge badge-accent badge-lg">{DTYColor}</div>
                        </h2>
                        <p>
                            POY: <span className='font-bold text-primary'>{POYType} </span>
                            to DTY: <span className='font-bold text-primary'>{DTYType}</span>,
                            Lot: <span className='font-bold text-primary'>{LotNo}</span>
                            <div className="badge badge-primary badge-md ms-5">{DTYTubeColor === "-" ? 'Unknown Tube' : DTYTubeColor}</div>
                        </p>
                        <p className='text-sm '>
                            Speed : {MCSpeed} MPM,
                            D/R : {DR},
                            D/Y : {DY},
                            OilerRPM : {OilerRpm},
                            INT : {IntJetType === "-" ? "None" : IntJetType},
                            Air Pressure: {AirPressure === "-" ? 0 : AirPressure} kg/cm3
                        </p>
                        <div className="card-actions justify-end">

                            <div className="badge badge-neutral">Updated: {uploadedAt}</div>
                        </div>
                    </div>
            }

            {
                _id &&
                <>
                    <label onClick={() => dispatch(setParamModalData(mcDetails))} htmlFor="dtyParamDetailsModal" className='btn rounded-t-none'>Show Details</label>
                    <DTYMCParamModal mcDetails={paramModalData}></DTYMCParamModal>
                </>
            }

        </div>
    );
};

export default DTYMCParamCard;