import companionCardProps from "../types/companionCardProps"
import "../styles/companionCardStyle.css"
import {useRef} from "react"
// import PopupMessage from './Toast';
import { useToast } from "../utils/ToastContext"
import { useNavigate } from 'react-router-dom';
import { SVGPhone, SVGCopy, SVGWhatsapp, SVGEmail } from "./SVGIcons"





const CompanionCard : React.FC<companionCardProps> = ({avatar, name, time, ph, wa, email}) => {

  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const storedUser = localStorage.getItem("profile");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };
  const maskName = (name: string) => {
    if (name.length <= 3) return name;
    return `${name.substring(0, 3)}${'*'.repeat(name.length - 3)}`;
  };


  const {showToast} = useToast();
  
  // const [displayPopup, setDisplayPopup] = useState<boolean>(false);
  const handleCopyClick = (text: string) => {
    // setDisplayPopup(true);
    navigator.clipboard.writeText(text);
    // setTimeout(() => {
    //   setDisplayPopup(false);
    // }, 2000);
    dialogRef.current?.close();
    showToast("Copied to clipboard");
  };
  const handleChat = () => {
    navigate(`/chat?email=${email}`);
  };
  function sortString(str:String) {
    return str.split('').sort().join('');
  
  }
    console.log(avatar+"  "+name+"  "+time+" "+ph+wa+"  "+email);
  
  return(
      <>
          
          <dialog className="contact-details" ref={dialogRef} onClose={closeModal}>
              <div className="grid-container">
               
                
                <div className="grid-row">
                <div className="contact-info-left">
                  <div className="medium">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM218 271.7L64.2 172.4C66 156.4 79.5 144 96 144H352c16.5 0 30 12.4 31.8 28.4L230 271.7c-1.8 1.2-3.9 1.8-6 1.8s-4.2-.6-6-1.8zm29.4 26.9L384 210.4V336c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V210.4l136.6 88.2c7 4.5 15.1 6.9 23.4 6.9s16.4-2.4 23.4-6.9z"/></svg> */}
                  <SVGEmail/>
                  </div>
                  <div className="contact-data">
                    {email===""?"Not available":<a href={`mailto : ${email}`}>{email}</a>}
                  </div>
                  </div>
                  {email!=="" &&
                  <button onClick={()=>handleCopyClick(email)} className="blue-icon-btn">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 448 512"><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/></svg> */}
                    <SVGCopy width="28" height="28"/>
                  </button>
                  }
                </div>
                <div className="grid-row">
                <div className="contact-info-left">
                  <div className="medium">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM218 271.7L64.2 172.4C66 156.4 79.5 144 96 144H352c16.5 0 30 12.4 31.8 28.4L230 271.7c-1.8 1.2-3.9 1.8-6 1.8s-4.2-.6-6-1.8zm29.4 26.9L384 210.4V336c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V210.4l136.6 88.2c7 4.5 15.1 6.9 23.4 6.9s16.4-2.4 23.4-6.9z"/></svg> */}
                  <SVGEmail/>
                  </div>
                  <div className="contact-data">
                   <button>
                    <a href={`/chat?email=${sortString(user.email+email)}&user=${maskName(name)}`}>Chat</a>
'                  </button>
                  </div>
                  </div>
                  {email!=="" &&
                  <button onClick={()=>handleCopyClick(email)} className="blue-icon-btn">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 448 512"><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/></svg> */}
                    <SVGCopy width="28" height="28"/>
                  </button>
                  }
                </div>
                <div className="close-contact-btn">
                  <button className="red-text-btn" onClick={closeModal}>Close</button>
                </div>
              </div>
          </dialog>
              <div className="left">
                  <div className="avatar-frame">
                      <img src={avatar} alt="User Avatar" className="avatar" />
                  </div>
                  <div className="companion-card__name">{maskName(name)}</div>
              </div>
              <div className="right">
                  <div>{time}</div>
                  <button className="contact-frame" onClick={openModal}>
                      {/* <img src="/icons/contact.png" alt="contact-details" className="contact-icon" /> */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--text)" viewBox="0 0 512 512"><path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z"/></svg>
                  </button>
              </div>
      </>
  )
}

export default CompanionCard;