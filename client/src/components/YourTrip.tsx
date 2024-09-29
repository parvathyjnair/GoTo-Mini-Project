import {useState, useRef} from 'react'
import '../styles/yourTripStyle.css'
import updateTrip from '../utils/updateTrip';
import deleteTrip from '../utils/deleteTrip';
import getDateTime from '../utils/getDateTime';
// import PopupMessage from './Toast';
import { useToast } from '../utils/ToastContext';
import { useNavigate } from 'react-router-dom';
import Toggle from './Toggle';

import { SVGDate, SVGTime, SVGEdit } from './SVGIcons';

interface YourTripProps {
    destination: string;
    date: string;
    time: string;
    id: string;
    name: string;
    dir: boolean;
    closeDialog: ()=>void;
}

export default function YourTrip({destination, date, time, id, name, dir, closeDialog}:YourTripProps) {
    const navigate = useNavigate();

    const [deleted, setDeleted] = useState(false);
    const [warningText, setWarningText] = useState("Are you sure you want to delete this trip?");
    const[updateText, setUpdateText] = useState("");
    const [newDate, setNewDate] = useState(date);
    const [newTime, setNewTime] = useState(time);
    const [newDir,  setNewDir] = useState(dir);

    const tripBG = {
        // true: faint green, false: faint blue
        // backgroundColor: dir ? "rgba(0, 0, 255, 0.1)" : "rgba(0, 255, 0, 0.1)"
        backgroundColor: newDir ? "var(--accent)" : "var(--secondary)",
        color: newDir ? "var(--bg)" : "var(--text)"
    }

    const deleteRef = useRef<HTMLDialogElement>(null);
    const updateRef = useRef<HTMLDialogElement>(null);

    const openDeleteModal = () => {
        if (deleteRef.current) {
          deleteRef.current.showModal();
        }};
    const closeDeleteModal = () => {
    if (deleteRef.current) {
        deleteRef.current.close();
        }};
    const openUpdateModal = () => {
        setUpdateText("Update Your Trip");
        getDateTime().then((val)=>{
            if(typeof(val)!=='boolean'){
                setNewDate(val.date);
                setNewTime(val.time);
            }
        });
        if (updateRef.current) {
            updateRef.current.showModal();
        }};
    const closeUpdateModal = () => {
        if (updateRef.current) {
            updateRef.current.close();
        }};
    // const [displayPopup, setDisplayPopup] = useState<boolean>(false);
    // const showPopUp = () => {
    //     setDisplayPopup(true);
    //     setTimeout(() => {
    //     setDisplayPopup(false);
    //     }, 2000);
    // };
    const {showToast} = useToast();
    return (
        <>
            {!deleted ?
                <>
                <dialog ref={deleteRef}>
                    <div className="modal-content">
                    <div>{warningText}</div>
                    <div className="buttons">
                        <button className='close-btn' onClick={(e)=>closeDeleteModal()}>No</button>
                        <button className='navbar__logout' onClick={async () => {
                            setWarningText("Deleting...");
                            deleteTrip(id).then((res) => {
                                if(res){
                                    setWarningText("Deleted");
                                    setDeleted(true);
                                    showToast("Trip Deleted");
                                }else{
                                    setWarningText("Error deleting trip");
                                    showToast("Error deleting trip");
                                }
                                closeDeleteModal();
                                closeDialog();
                            })}
                        }>Yes</button>
                    </div>
                    </div>
                </dialog>
                <dialog ref={updateRef}>
                    <div className="modal-content">
                    <div className='modal-head'>{updateText}</div>

                    <button className="del-btn" onClick={openDeleteModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                    </button>

                    {/* <input className='date-time-ip' type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} min={newDate} required></input>
                    <input className='date-time-ip' type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} required></input> */}


                    <div className="date-time-wrapper">
                        <input className="date-time-ip" type="date" onChange={(e)=>setNewDate(e.target.value)} value={newDate} min={newDate} required/>
                        {/* <svg className="date-time-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"/></svg> */}
                        <SVGDate width="20" height="20" fill="var(--bg)" cssClass="date-time-icon"/>
                    </div>
                    <div className="date-time-wrapper">
                        <input className="date-time-ip" type="time" onChange={(e)=>setNewTime(e.target.value)} value={newTime} required/>
                        {/* <svg className="date-time-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg> */}
                        <SVGTime width="20" height="20" fill="var(--bg)" cssClass="date-time-icon"/>
                    </div>

                    {/* <div className="dir-select">
                    <div>
                        <input type="radio" id="to" value="to" className="custom-radio" onChange={()=>setNewDir(false)} checked={!newDir}/>
                        <label htmlFor="to">To</label>
                    </div>
                    <div>
                        <input type="radio" id="from" value="from" className="custom-radio" onChange={()=>setNewDir(true)} checked={newDir}/>
                        <label htmlFor="from">From</label>
                    </div>
                    </div> */}
                    <div onClick={()=>setNewDir(!newDir)}>
                        <Toggle leftLabel="To" rightLabel="From" dir={dir}/>
                    </div>
                    <div className="buttons upd-buttons">
                        <button className='close-btn' onClick={()=>{closeUpdateModal(); setNewDate(date); setNewTime(time);}}>Cancel</button>
                        <button className='navbar__logout' 
                            disabled = {date === newDate && time === newTime && dir === newDir}
                            onClick={async () => {
                            setUpdateText("Updating...");
                            // updateTrip(id, newDate, newTime, destination, name, newDir).then(() => {closeUpdateModal(); closeDialog();  showToast("Trip Updated");})
                            let res = await updateTrip(id, newDate, newTime, destination, name, newDir);
                            if(res){
                                setUpdateText("Updated");
                                showToast("Trip Updated");
                            } else {
                                setUpdateText("Error updating trip");
                                showToast("Error updating trip");
                            }
                        }
                        }>Update</button>
                    </div>
                    </div>
                </dialog>

                <div style = {tripBG} className="trip">
                    <div className="view">
                        <div className="dest">{destination}</div>
                        <div className="tripDate">{newDate}</div>
                        <div className="tripTime">{newTime}</div>
                    </div>
                    <div className="modify">
                        <button style={{color: "inherit"}} onClick={()=>navigate(`/showCompanions/${destination}/${newDate}/${newTime}/${newDir}`)}>
                            {/* <img src="/icons/magnifier.png" alt='search' className='icon-btn'/> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                        </button>
                        <button style={{color: "inherit"}} onClick={openUpdateModal}>
                            {/* <img src="/icons/edit-button.png" alt='modify' className='icon-btn'/> */}
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg> */}
                            <SVGEdit width="22" height="20" fill="currentColor"/>

                        </button>
                        {/* <button className="" onClick={openDeleteModal}> */}
                            {/* <img src="/icons/delete.png" alt='delete' className='icon-btn'/> */}
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                        </button> */}
                    </div>
                </div>
                </>
            : <></>}
        </>
    )
}