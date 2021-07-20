import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
const RouteChangeTracker = ({ history }) => {
    const {location} = history;
    useEffect(() => {
            console.log(location.pathname);
            ReactGA.set({ page: location.pathname });
            ReactGA.pageview(location.pathname);
    },[location])

    return <div></div>;
};

export default withRouter(RouteChangeTracker);