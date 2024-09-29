import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoutes({isLogged}:{isLogged:boolean}){
  // isLogged=true; //for testing
  return (
      isLogged ? <Outlet/> : <Navigate to='/loginPage'/>
    )
}