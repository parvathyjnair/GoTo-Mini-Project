import React, {useState} from 'react';
import { useQuery } from 'react-query';

// import './App.css';

import {googleLogout, CredentialResponse} from '@react-oauth/google';
import addUser from './utils/addUser';
import AdminDashboard from './components/AdminDashboard';

import Navbar from './components/Navbar';
import DestinationSelect from './Pages/DestinationSelect';
import LoginPage from './Pages/LoginPage';
import ShowCompanions from './Pages/ShowCompanions';
import HomePage from './Pages/HomePage';
import InfoCard from './components/InfoCard';
import PrivateRoutes from './utils/PrivateRoutes';
import Cookies from 'universal-cookie';

import profile_interface from './types/profile_interface';
import {Route, Routes, useNavigate, Navigate} from 'react-router-dom';
import { useToast } from './utils/ToastContext';
import Footer from './components/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RecommendingUsers  from './Pages/RecommendingUsers';
import ChatPage from './Pages/ChatPage';
import { log } from 'console';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});


// const dummyProfile: profile_interface = {
//   sub: "1234567890",
//   name: "John Doe",
//   given_name: "John",
//   family_name: "Doe",
//   email: "21cs02008@gmail.com",
//   picture: "https://lh3.googleusercontent.com/a/ACg8ocILCoSKIjk_01JAqfNFoliZkCmaNBgNC8LE-J-4QDUQRGEc=s96-c"
// }

const App: React.FC = () => {

  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [profile, setProfile] = useState<profile_interface | undefined>(undefined);
  const {showToast} = useToast();
  const [serverDown, setServerDown] = useState<boolean>(false);

  const fetchServerStatus = async () => {
    try{
      const response = await fetch(process.env.REACT_APP_SERVER_URL || '', {credentials: 'include'});
      if (!response.ok) {
        // console.log("Server is offline");
        // if 401, logout
        if(response.status === 401) {
          handleLogout();
        }
        else  setServerDown(true);
      } else {
      //console.log("Server is online");
        setServerDown(false);
      }
    } catch (error) {
      // console.log("Server is offline");
      setServerDown(true);
    }
  };

  useQuery('serverStatus', fetchServerStatus);

  // for testing

  // const [isLogged, setIsLogged] = useState<boolean>(true);
  // const [profile, setProfile] = useState<profile_interface | undefined>(dummyProfile);

  //

  const profileCache = localStorage.getItem('profile');
  console.log(profileCache);
  
  const cookies = new Cookies();

  if(!!profileCache && !isLogged && cookies.get('dummy_jwt_auth_token')) {
    setIsLogged(true);
    setProfile(JSON.parse(profileCache));
  }
console.log(profile?.name);

  const handleLoginSuccess = async (credentialResponse: CredentialResponse)=>{
    if(credentialResponse.credential){
      // let temp = decodeJwtResponse(credentialResponse.credential);
      // setProfile(temp);
      // localStorage.setItem('profile', JSON.stringify(temp));
      
      // setIsLogged(true);
      
      const res = await addUser(credentialResponse.credential, setProfile);
      //console.log(cookies.get('dummy_jwt_auth_token'));
      if(res){
        setIsLogged(true);
        setServerDown(false);
        showToast("Login successful!");
        navigate("/selectDestination");
      } else {
        showToast("Unable to login. Please try again or contact the admin.");
      }
    }
  }

  const handleLogout = () => {
    setIsLogged(false);
    setProfile(undefined);
    googleLogout();
    localStorage.removeItem('profile');
    cookies.remove('dummy_jwt_auth_token');
    navigate("/loginPage");
  };

  return (
    <>
    <div className="content">
      <Navbar isLogged={isLogged} profile={profile} siteName="GoTogether" onLogout={handleLogout}/>
      {serverDown && isLogged && <InfoCard content="Server down or invalid session." />}

      <Routes>
      {!isLogged && <Route path="/loginPage" element={<LoginPage handleLoginSuccess={handleLoginSuccess}/>}/>}
      {!serverDown &&
        <Route element={<PrivateRoutes isLogged={isLogged}/>}>
          <Route path="/home" element={<HomePage name={profile?.name || ""}/>}/>
          <Route path="/selectDestination" element={<DestinationSelect profile={profile}/>}/>
          <Route path="/showCompanions/:destination/:date/:time/:dir" element={<ShowCompanions email={profile?.email || ""} name={profile?.name || ""} />}/>
          <Route path="/chat" element={<ChatPage />}/>
          {/* <Route path="/serverOffline" element={<InfoCard content="Unable to connect to the server :_(" />}/> */}
        </Route>
      }
        <Route path="/" element={isLogged ? <Navigate to="/home" /> : <Navigate to="/loginPage" />} />
        <Route path="/admin" element={<AdminDashboard />}></Route>
        <Route path="/recommedation" element={<RecommendingUsers />}></Route>
      </Routes>
    </div>
      <Footer/> 
    </>
  );
}

export default App;
