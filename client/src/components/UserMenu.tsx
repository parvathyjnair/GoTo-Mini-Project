import '../styles/userMenuStyle.css'
import { useState, useRef } from 'react'
import getSubscriptionObject from '../utils/getSubscriptionObject'
import { useToast } from '../utils/ToastContext'
import updateContact from '../utils/updateContact'

import { SVGPhone, SVGWhatsapp, SVGEmail, SVGEdit} from './SVGIcons'

const regex = /^(?:\+91|0)?[6789]\d{9}$/;

export default function UserMenu({email, ph_no, wa_no}:{email:string, ph_no:string, wa_no:string}) {

    const [curr_ph_no, setCurr_ph_no] = useState<string>(ph_no);
    const [curr_wa_no, setCurr_wa_no] = useState<string>(wa_no);

    // const [popupContent, setPopupContent] = useState<string>("");
    // const [popupShown, setPopupShown] = useState<boolean>(false);
    // const showPopup = () => {
    //     setPopupShown(true);
    //     setTimeout(() => setPopupShown(false), 3000);
    // }

    const {showToast} = useToast();

    const updateRef = useRef<HTMLDialogElement>(null);
    const openUpdateModal = () => {
        if (updateRef.current) {
            updateRef.current.showModal();
    }};
    const closeUpdateModal = () => {
        if (updateRef.current) {
            updateRef.current.close();
    }};

        
    const [notified, setNotified] = useState<boolean>(false);


    return(
        <>
        <dialog ref={updateRef}>
            <div className="modal-content">
            <div className="user-menu-title">Update Your Contact Details</div>
            <div className="update-contact">
                {/* <img src="/icons/telephone-call.png" alt="phone-icon" /> */}
                <div>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--primary)" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z"/></svg> */}
                    <SVGPhone fill='var(--primary)'/>
                </div>
                <div>
                    <input className='contact-ip' type="tel" value={curr_ph_no} placeholder='Phone Number' onChange={(e) => setCurr_ph_no(e.target.value)} required></input>
                </div>
            </div>
            <div className="update-contact">
                {/* <img src="/icons/whatsapp.png" alt="phone-icon" /> */}
                <div>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--primary)" viewBox="0 0 448 512"><path d="M92.1 254.6c0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6L152 365.2l4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8c0-35.2-15.2-68.3-40.1-93.2c-25-25-58-38.7-93.2-38.7c-72.7 0-131.8 59.1-131.9 131.8zM274.8 330c-12.6 1.9-22.4 .9-47.5-9.9c-36.8-15.9-61.8-51.5-66.9-58.7c-.4-.6-.7-.9-.8-1.1c-2-2.6-16.2-21.5-16.2-41c0-18.4 9-27.9 13.2-32.3c.3-.3 .5-.5 .7-.8c3.6-4 7.9-5 10.6-5c2.6 0 5.3 0 7.6 .1c.3 0 .5 0 .8 0c2.3 0 5.2 0 8.1 6.8c1.2 2.9 3 7.3 4.9 11.8c3.3 8 6.7 16.3 7.3 17.6c1 2 1.7 4.3 .3 6.9c-3.4 6.8-6.9 10.4-9.3 13c-3.1 3.2-4.5 4.7-2.3 8.6c15.3 26.3 30.6 35.4 53.9 47.1c4 2 6.3 1.7 8.6-1c2.3-2.6 9.9-11.6 12.5-15.5c2.6-4 5.3-3.3 8.9-2s23.1 10.9 27.1 12.9c.8 .4 1.5 .7 2.1 1c2.8 1.4 4.7 2.3 5.5 3.6c.9 1.9 .9 9.9-2.4 19.1c-3.3 9.3-19.1 17.7-26.7 18.8zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM148.1 393.9L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5c29.9 30 47.9 69.8 47.9 112.2c0 87.4-72.7 158.5-160.1 158.5c-26.6 0-52.7-6.7-75.8-19.3z"/></svg> */}
                    <SVGWhatsapp fill='var(--primary)'/>
                </div>
                <div>
                    <input className='contact-ip' type="tel" value={curr_wa_no} placeholder='WhatsApp Number' onChange={(e) => setCurr_wa_no(e.target.value)} required></input>
                </div>
            </div>
            
            <div className="inline-buttons up-modal-btn">
                <button className='close-btn' onClick={()=>{closeUpdateModal(); setCurr_ph_no(ph_no); setCurr_wa_no(wa_no);}}>Cancel</button>
                <button className='' disabled={!regex.test(curr_ph_no) || !regex.test(curr_wa_no) || (curr_ph_no === ph_no && curr_wa_no === wa_no)} onClick={async () => {
                    updateContact(email, curr_ph_no, curr_wa_no).then((res) => {
                        if(res) showToast("Contact details updated successfully");
                        else showToast("Error updating contact details");
                        closeUpdateModal();
                    })}
                }>Update</button>
            </div>
            </div>
        </dialog>

        <div className="user-menu">
            <div className="user-menu-title">Your Contact Details</div>
            <div className="user-menu-content_item">
                {/* <img src="/icons/gmail.png" alt="email-icon" /> */}
                <div>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="var(--primary)" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM218 271.7L64.2 172.4C66 156.4 79.5 144 96 144H352c16.5 0 30 12.4 31.8 28.4L230 271.7c-1.8 1.2-3.9 1.8-6 1.8s-4.2-.6-6-1.8zm29.4 26.9L384 210.4V336c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V210.4l136.6 88.2c7 4.5 15.1 6.9 23.4 6.9s16.4-2.4 23.4-6.9z"/></svg> */}
                <SVGEmail width='20' height='20' fill='var(--primary)'/>
                </div>
                <div>{email}</div>
            </div>
            <div className="user-menu-content_item">
                {/* <img src="/icons/telephone-call.png" alt="phone-icon" /> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="var(--primary)" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z"/></svg> */}
                <SVGPhone width='20' height='20' fill='var(--primary)'/>
                {curr_ph_no===""?"Not Provided":curr_ph_no}
            </div>
            <div className="user-menu-content_item">
                {/* <img src="/icons/whatsapp.png" alt="whatsapp-icon" /> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="var(--primary)" viewBox="0 0 448 512"><path d="M92.1 254.6c0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6L152 365.2l4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8c0-35.2-15.2-68.3-40.1-93.2c-25-25-58-38.7-93.2-38.7c-72.7 0-131.8 59.1-131.9 131.8zM274.8 330c-12.6 1.9-22.4 .9-47.5-9.9c-36.8-15.9-61.8-51.5-66.9-58.7c-.4-.6-.7-.9-.8-1.1c-2-2.6-16.2-21.5-16.2-41c0-18.4 9-27.9 13.2-32.3c.3-.3 .5-.5 .7-.8c3.6-4 7.9-5 10.6-5c2.6 0 5.3 0 7.6 .1c.3 0 .5 0 .8 0c2.3 0 5.2 0 8.1 6.8c1.2 2.9 3 7.3 4.9 11.8c3.3 8 6.7 16.3 7.3 17.6c1 2 1.7 4.3 .3 6.9c-3.4 6.8-6.9 10.4-9.3 13c-3.1 3.2-4.5 4.7-2.3 8.6c15.3 26.3 30.6 35.4 53.9 47.1c4 2 6.3 1.7 8.6-1c2.3-2.6 9.9-11.6 12.5-15.5c2.6-4 5.3-3.3 8.9-2s23.1 10.9 27.1 12.9c.8 .4 1.5 .7 2.1 1c2.8 1.4 4.7 2.3 5.5 3.6c.9 1.9 .9 9.9-2.4 19.1c-3.3 9.3-19.1 17.7-26.7 18.8zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM148.1 393.9L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5c29.9 30 47.9 69.8 47.9 112.2c0 87.4-72.7 158.5-160.1 158.5c-26.6 0-52.7-6.7-75.8-19.3z"/></svg> */}
                <SVGWhatsapp width='20' height='20' fill='var(--primary)'/>
                {curr_wa_no===""?"Not Provided":curr_wa_no}
            </div>
            <div className="inline-buttons">
                <button onClick={openUpdateModal}>
                    {/* <img src="/icons/edit-button.png" alt="edit-icon" /> */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg> */}
                    <SVGEdit width='22' height='20'/>
                </button>
                <button onClick={async ()=>{ 
                    let res = await getSubscriptionObject(email);
                    if(res){
                        showToast("You will be notified!") ; setNotified(true);
                    } else {
                        showToast("Error in subscribing for notifications");
                    }
                }}>
                    {notified?
                        // <img src="/icons/notification.png" alt="notification-icon" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>
                        :
                        // <img src="/icons/bell-icon.png" alt="notification-icon" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg>
                    }
                </button>
            </div>
        </div>
        </>
    )

}