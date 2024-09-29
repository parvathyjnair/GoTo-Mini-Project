import loggedInPageProps from "../types/loggedInPageProps";
import React, { useState } from "react";
import "../styles/destinationSelectPageStyle.css";
import InfoCard from "../components/InfoCard";
// import PopupMessage from '../components/Toast';
import { useToast } from "../utils/ToastContext";

import { useNavigate } from "react-router-dom";

import getDateTime from "../utils/getDateTime";
// import checkEntry from "../utils/checkEntry";
import addTravelDetail from "../utils/addTravelDetail";
import updateContact from "../utils/updateContact";
import getContact from "../utils/getContact";

import dateTimeInterface from "../types/dateTimeInterface";
// import findCompanions from "../utils/findCompanions";
import Toggle from "../components/Toggle";
import ComboBox from "../components/Combobox";

import getDestinations from "../utils/getDestinations";
import addDestination from "../utils/addDestination";

import { useQuery } from "react-query";

import { SVGDate, SVGTime, SVGPhone, SVGWhatsapp } from "../components/SVGIcons";

const regex = /^(?:\+91|0)?[6789]\d{9}$/;

export default function DestinationSelect({ profile }: loggedInPageProps) {
  const navigate = useNavigate();

  const [dir, setDir] = useState<boolean>(false);
  const [destination, setDestination] = useState<string>(
    "Select your Destination"
  );
  const [date, setDate] = useState<string>("");
  const [serverDate, setServerDate] = useState<dateTimeInterface | boolean>(
    true
  );
  const [time, setTime] = useState<string>("");
  const [ph_no, setPh_no] = useState<string>(
    localStorage.getItem("ph_no") || ""
  );
  const [wa_no, setWa_no] = useState<string>(
    localStorage.getItem("wa_no") || ""
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [isServerDown, setIsServerDown] = useState<boolean>(true);
  const [ischecked, setIsChecked] = useState<boolean>(false);

  const [placeList, setPlaceList] = useState<string[]>(localStorage.getItem("placeList")?.split(",") || []);

  useQuery('setup page', async () => {

  if (profile) {

    getDateTime().then((val) => {
      // console.log(val);
      if (typeof val !== "boolean") {
        setServerDate(val);
        setDate(val.date);
        setTime(val.time);
      } else{ 
        setLoading(false);
        console.log("Couldn't get date and time from server");
        return;
      };
    });

    setIsServerDown(false);
    setLoading(false);

    getContact(profile.email).then((val) => {
      if (val === false){ setIsServerDown(true);}
      else if (typeof val !== "boolean") {
        setPh_no(val.ph_no);
        setWa_no(val.wa_no);
        localStorage.setItem("ph_no", val.ph_no);
        localStorage.setItem("wa_no", val.wa_no);
      }
    });

    getDestinations().then((val) => {
      if (val.length !== 0) {
        // console.log(val);
        setPlaceList(val);
        localStorage.setItem("placeList", val.join(","));
      } else setIsServerDown(true);
    });
  }
  else{
    setLoading(false);
  }
  });

  const { showToast } = useToast();

  const onSearch = (destination: string, date: string) => {
    if (destination === "Select your Destination") {
      // window.alert("Please select a destination");
      showToast("Please select a destination");
      return;
    }
    if (profile) {
      //add a regex to check if the phone number and whatsapp number are valid

      if (!regex.test(ph_no) || !regex.test(wa_no)) {
        showToast("Please enter a valid phone number and whatsapp number");
        return;
      }

      setLoading(true);

      if (
        ph_no !== localStorage.getItem("ph_no") ||
        wa_no !== localStorage.getItem("wa_no")
      ) {
        updateContact(profile.email, ph_no, wa_no).then((val) => {
          if (!val) {
            setLoading(false);
            setIsServerDown(true);
            return;
          } else {
            localStorage.setItem("ph_no", ph_no);
            localStorage.setItem("wa_no", wa_no);
          }
        });
      }

      if(!placeList.includes(destination)){
        addDestination(destination).then((val) => {
          if (!val) {
            setLoading(false);
            setIsServerDown(true);
            return;
          }
          showToast("New destination added!");
        });
      }

      const travelDetail = {
        email: profile.email,
        destination: destination,
        date: date,
        time: time,
        dir: dir,
        name: profile.name,
      };

      addTravelDetail(travelDetail).then((val) => {
        setLoading(false);
        if (val) {
          navigate(
            `/showCompanions/${destination}/${date}/${time}/${
              dir ? "true" : "false"
            }`
          );
        } else setIsServerDown(true);
      });
    } else window.alert("Please login to continue");
  };

  return (
    <>
      {loading && <InfoCard content="Loading..." />}

      {!loading && isServerDown && (
        <InfoCard content="Something went wrong. Please login again." />
      )}

      {!loading && !isServerDown && typeof serverDate !== "boolean" && (
        <>
          <InfoCard
            content={`So ${profile?.given_name}, where would you like to go today ?`}
          />
          {/* <div className="selection-list"> */}
          <div className="dest-sel-card">
            <div className="date-time">
              <div className="date-time-wrapper">
                <input
                  className="date-time-ip"
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  min={serverDate.date}
                  required
                />
                {/* <svg
                  className="date-time-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 448 512"
                >
                  <path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" />
                </svg> */}
                <SVGDate height="20" width="20" fill="var(--bg)" cssClass="date-time-icon" />
              </div>
              <div className="date-time-wrapper">
                <input
                  className="date-time-ip"
                  type="time"
                  step="900"
                  onChange={(e) => setTime(e.target.value)}
                  value={time.slice(0, 5)}
                  required
                />
                {/* <svg
                  className="date-time-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                </svg> */}
                <SVGTime height="20" width="20" fill="var(--bg)" cssClass="date-time-icon" />
              </div>
            </div>
            <div className="drop-wrap">
              <div className="icon-ip">
                {/* <img src="/icons/telephone-call.png" alt="phone number" /> */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="var(--primary)"
                  viewBox="0 0 448 512"
                >
                  <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z" />
                </svg> */}

                <SVGPhone height="35" width="35" fill="var(--primary)" />

                <input
                  className="contact-ip"
                  type="tel"
                  placeholder="Phone Number"
                  onChange={(e) => setPh_no(e.target.value)}
                  value={ph_no}
                  required
                />
              </div>
              <div className="icon-ip">
                {/* <img src="/icons/whatsapp.png" alt="whatsapp number" /> */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="var(--primary)"
                  viewBox="0 0 448 512"
                >
                  <path d="M92.1 254.6c0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6L152 365.2l4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8c0-35.2-15.2-68.3-40.1-93.2c-25-25-58-38.7-93.2-38.7c-72.7 0-131.8 59.1-131.9 131.8zM274.8 330c-12.6 1.9-22.4 .9-47.5-9.9c-36.8-15.9-61.8-51.5-66.9-58.7c-.4-.6-.7-.9-.8-1.1c-2-2.6-16.2-21.5-16.2-41c0-18.4 9-27.9 13.2-32.3c.3-.3 .5-.5 .7-.8c3.6-4 7.9-5 10.6-5c2.6 0 5.3 0 7.6 .1c.3 0 .5 0 .8 0c2.3 0 5.2 0 8.1 6.8c1.2 2.9 3 7.3 4.9 11.8c3.3 8 6.7 16.3 7.3 17.6c1 2 1.7 4.3 .3 6.9c-3.4 6.8-6.9 10.4-9.3 13c-3.1 3.2-4.5 4.7-2.3 8.6c15.3 26.3 30.6 35.4 53.9 47.1c4 2 6.3 1.7 8.6-1c2.3-2.6 9.9-11.6 12.5-15.5c2.6-4 5.3-3.3 8.9-2s23.1 10.9 27.1 12.9c.8 .4 1.5 .7 2.1 1c2.8 1.4 4.7 2.3 5.5 3.6c.9 1.9 .9 9.9-2.4 19.1c-3.3 9.3-19.1 17.7-26.7 18.8zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM148.1 393.9L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5c29.9 30 47.9 69.8 47.9 112.2c0 87.4-72.7 158.5-160.1 158.5c-26.6 0-52.7-6.7-75.8-19.3z" />
                </svg> */}

                <SVGWhatsapp height="35" width="35" fill="var(--primary)" />

                <input
                  className="contact-ip"
                  type="tel"
                  placeholder="WhatsApp Number"
                  onChange={(e) => setWa_no(e.target.value)}
                  value={wa_no}
                  required
                />
              </div>
              <div className="icon-ip">
                <div
                  className="checkbox-frame"
                  onClick={(e) => {
                    if (!ischecked) setWa_no(ph_no);
                    setIsChecked(!ischecked);
                  }}
                >
                  {/* <input type="checkbox" id="myCheckbox" onChange={(e)=> {
                  setIsChecked(!ischecked);
                  if(e.target.checked) setWa_no(ph_no);
                }} /> */}
                  {ischecked && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                  )}
                </div>
                Same as phone number
              </div>

              {/* <div className="dir-select">
              <div>
                <input type="radio" id="to" value="to" className="custom-radio" 
                onChange={()=>{setDir(false); if(!placeList.includes(destination)) setDestination("Select your Destination")}} 
                checked={!dir}/>
                <label htmlFor="to">To</label>
              </div>
              <div>
                <input type="radio" id="from" value="from" className="custom-radio" 
                onChange={()=>{setDir(true);  if(!placeList.includes(destination)) setDestination("Select your current location")}} 
                checked={dir}/>
                <label htmlFor="from">From</label>
              </div>
            </div> */}
              <div onClick={() => setDir(!dir)}>
                <Toggle leftLabel="To" rightLabel="From" dir={dir} />
              </div>

              {/* <div className="dropdown" data-dropdown>
              <button className="destination-selector-button" onClick={handleDropdownVisibility}>
                {destination}</button>
              <div className="dropdown-menu">
                <div className="dropdown-cities">
                  {placeList.map((place, index)=>{
                    return(
                      <button className="dropdown-item" key={index} onClick={handleDestinationSelection}>{place}</button>
                    )
                  })}
                </div>
              </div>
            </div> */}

              <ComboBox options={placeList} onSelect={setDestination} email={profile?.email || ""} />

              <button
                className="search-btn"
                onClick={() => onSearch(destination, date)}
              >
                Find Companions
              </button>
            </div>
          </div>

          <InfoCard content="Tip: You can report a destination by long pressing on it." />
          
        </>
      )}
    </>
  );
}
