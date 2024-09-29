import navbarProps from "../types/navbarProps"
import "../styles/navbarStyle.css"
import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import YourTrip from "./YourTrip"
import UserMenu from "./UserMenu"
import getUserTrips from "../utils/getUserTrips"
import getContact from "../utils/getContact"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useToast } from "../utils/ToastContext"

// import logo from "../logo.png"
// import svgLogo from "../logo.svg"

import { SVGLogo } from "./SVGIcons"

const Navbar: React.FC<navbarProps> = ({isLogged, profile, siteName, onLogout}) => {
  const navigate = useNavigate();
  // const openTripsDialogButton = useRef<HTMLButtonElement>(null);
  // const [tripsShown, setTripsShown] = useState<boolean>(false);
  // const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
  let storedTrips = localStorage.getItem('myTrips');
  const [myTrips, setMyTrips] = useState<{_id:string, destination:string, date:string, time:string, dir: boolean}[]>((!!storedTrips)?JSON.parse(storedTrips) : []);
  const [tripState, setTripState] = useState<string>("Loading...");

  const openUserMenuBtn = useRef<HTMLButtonElement>(null);
  const [userMenuShown, setUserMenuShown] = useState<boolean>(false);
  const [userMenuDialogPosition, setUserMenuDialogPosition] = useState({ top: 0, left: 0 });

  const logoutConfirmationDialog = useRef<HTMLDialogElement>(null);
  const userTripsDialog = useRef<HTMLDialogElement>(null);
  const userMenuRef = useRef<HTMLDialogElement>(null);

  const {showToast} = useToast();

  const [ph_no, setPh_no] = useState<string>(localStorage.getItem('ph_no') || "Loading...");
  const [wa_no, setWa_no] = useState<string>(localStorage.getItem('wa_no') || "Loading...");

  const [orientation, setOrientation] = useState<boolean>(window.innerWidth>550);

  const openTripsDialog = () => {
    setUserMenuShown(false);
    userTripsDialog.current?.showModal()
    if(profile)  getUserTrips(profile.email).then((trips) => {
      if(trips===false){
        setTripState("Error fetching trips.");
        showToast("Error fetching your trips. Please try again later.");
        return;
      }
      else if(trips.length===0){
        setTripState("You haven't added any trips.");
      }
      setMyTrips(trips);
    });
  }

  const openUserMenu = () => {
    // setTripsShown(false);
    if(profile){
    getContact(profile.email).then((contact) => {
      if(typeof(contact)!=='boolean'){
        setPh_no(contact.ph_no);
        setWa_no(contact.wa_no);
      }
    });}
    
    if(openUserMenuBtn.current){
      const buttonRect = openUserMenuBtn.current.getBoundingClientRect();
      setUserMenuDialogPosition({
        top: buttonRect.bottom + 15,
        left: buttonRect.right - 230,
      });
    }
    setUserMenuShown(true);
  }

  const closeLogoutModal = () => {
    if (logoutConfirmationDialog.current) {
        logoutConfirmationDialog.current.close();
        }};

  const openLogoutModal = () => {
    if (logoutConfirmationDialog.current) {
        logoutConfirmationDialog.current.showModal();
        }};
  
  const location = useLocation();

  const closeUserTripsDialog = () => {
    userTripsDialog.current?.close();
  }

  useEffect(()=>{
    userTripsDialog.current?.close();
    setUserMenuShown(false);
  }
  ,[location.pathname]);

  useEffect(()=>{
    const handleClickOutside = (e : MouseEvent | TouchEvent) => {
      if(userMenuRef.current && !userMenuRef.current.contains(e.target as Node)){
        setUserMenuShown(false);
      }
    }

    const updateOrientation = () => {
      // console.log(window.innerWidth);
      setOrientation(window.innerWidth>550);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("orientationchange", updateOrientation);
    window.addEventListener("resize", updateOrientation);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("orientationchange", updateOrientation);
      window.removeEventListener("resize", updateOrientation);
    };
  }
  ,[]);
  
    return(
      <>
      <dialog className="user-trips-dialog" ref={userTripsDialog}>
        <div className="user-trips-title">Your Trips</div>
        <div className="dialog-content">
          {myTrips.length === 0 && <div className="no-trips">{tripState}</div>}
          <div className="trips">
            {myTrips.map((trip) => (
              <YourTrip key={trip._id+trip.date+trip.time} closeDialog={closeUserTripsDialog} destination={trip.destination} date={trip.date} time={trip.time} id={trip._id} name={profile?.name || ""} dir={trip.dir}/>
            ))}
          </div>
          <button className="close-btn" onClick={closeUserTripsDialog}>Close</button>
        </div>
      </dialog>

      <dialog className="user-menu-dialog" style={userMenuDialogPosition} open={userMenuShown} ref={userMenuRef}>
        <UserMenu key={ph_no+wa_no} email={profile?.email || ""} ph_no={ph_no} wa_no={wa_no} />
        <div className="usr-menu-inline-buttons">
          <button className="close-btn" onClick={()=> setUserMenuShown(false)}>Close</button>
          <button className="navbar__logout" onClick={openLogoutModal}>Logout</button>
        </div>
      </dialog>

      <dialog ref={logoutConfirmationDialog}>
          <div className="modal-content">
          <div>Are you sure that you want to logout?</div>
          <div className="buttons">
              <button className='close-btn' onClick={closeLogoutModal}>No</button>
              <button className='navbar__logout' onClick={()=>{onLogout(); closeLogoutModal()}}>Yes</button>
          </div>
          </div>
      </dialog>

      <nav className="navbar">

        <div className="navbar__left" onClick={()=> navigate("/home")}>

          {/* <img src={logo} alt="GoTogether" className="navbar__logo"/> */}
          {/* <img src={svgLogo} alt="GoTogether" className="navbar__logo"/> */}

          <SVGLogo width="28" height="48" fill="var(--accent)"/>
          
          <div className="navbar__site-name">
            {orientation || !isLogged?"TravelMates":"GoTo"}
            {/* GoTogether */}
          </div>

        </div>

        {isLogged &&
        <div className="navbar__user">

          <button className="user-trips" onClick={openTripsDialog}>
            {orientation?
              "Your Trips":
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 576 512"><path d="M346.3 271.8l-60.1-21.9L214 448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H282.1l64.1-176.2zm121.1-.2l-3.3 9.1 67.7 24.6c18.1 6.6 38-4.2 39.6-23.4c6.5-78.5-23.9-155.5-80.8-208.5c2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4zM462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4c-.9-.4-1.9-.7-2.8-1.1c-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5l-.2-6zM107.2 112.9c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8 3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2c-79.6 2.5-154.7 42.2-201.2 108z"/></svg>
            
            }
          </button>
          

          <button ref={openUserMenuBtn} onClick={openUserMenu} className="navbar__avatar-frame">
            <img src={profile?.picture} alt="User Avatar" className="navbar__avatar" />
          </button>

          

          {/* {window.screen.width>window.screen.height?
            <button className="navbar__logout" onClick={openLogoutModal}>Logout</button>
            :<img src="/icons/logout.png" alt="Logout" className="navbar__logout_icon" onClick={openLogoutModal}/>
          } */}

        </div>
        }
      </nav>
      </>
    )
}

export default Navbar;