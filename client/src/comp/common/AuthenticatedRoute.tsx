import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
// import { useAppSelector } from '../../context/hooks';
import { useAuth } from "../../context/hooks/auth";


interface AuthenticatedRouteProps {
  element: ReactElement;
  required?: boolean;
}

function AuthenticatedRoute({ element, required = false }: AuthenticatedRouteProps) {
    const { isAuthenticated , loading} = useAuth();
  //console.log("user detail according to useAuth ",user);

  if(loading){
    return <div>Loading ...</div>
  }

  if (!isAuthenticated && required) {
    console.log("you are here ");
    return <Navigate to="/login" />;
  }


  return element;
}

export default AuthenticatedRoute;
