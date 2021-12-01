import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const selectUser = (state) => state.user;
  const { currentUser } = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={routeProps => 
        currentUser ? <Component {...routeProps} /> : 
        <Redirect
        to={{
          pathname: "/connection"
        }}
      />
      }
    />
  );
}

export default ProtectedRoute;