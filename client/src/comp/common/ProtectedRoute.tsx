import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
// import { useAppSelector } from '../../context/hooks';
import { useAuth } from "../../context/hooks/auth";


interface ProtectedRouteProps {
  element: ReactElement;
  adminOnly?: boolean;
  emp?:boolean;
}

function ProtectedRoute({ element, adminOnly = false , emp=false }: ProtectedRouteProps) {
  // const { isAuthenticated, loading, user } = useAppSelector(state => state.user);

  // if (loading) {
  //   return <div>Loading</div>;
  // }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  // if (adminOnly && user?.role !== 'admin') {
  //   return <Navigate to="/" />;
  // }

  const { isAuthenticated , user , loading} = useAuth();
  console.log("user detail according to useAuth ",user);

  if(loading){
    return <div>Loading ...</div>
  }

  if (!isAuthenticated) {
    console.log("you are here ");
    return <Navigate to="/login" />;
  }

  if(emp || adminOnly){
    if(user?.role === 'user'){
      return <Navigate to='/'/>
    }
  }



//   if(adminOnly && user?.role !== 'admin'){
//     return <Navigate to = '/'/>
//   }

  return element;
}

export default ProtectedRoute;
