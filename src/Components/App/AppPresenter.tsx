import React from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AddPlace from '../../Routes/AddPlace';
import EditAcount from '../../Routes/EditAcount';
import Home from '../../Routes/Home';
import OutHome from '../../Routes/OutHome';
import PhoneLogin from '../../Routes/PhoneLogin';
import Ride from '../../Routes/Ride';
import Settings from '../../Routes/Settings';
import VerifyPhone from '../../Routes/VerifyPhone';
import SocialLogin from '../../Routes/SocialLogin';
import Places from '../../Routes/Places';
import FindAddress from '../../Routes/FindAddress';

interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
  <BrowserRouter>
    {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
  </BrowserRouter>
);

const LoggedOutRoutes: React.SFC = () => (
  <Switch>
    <Route path={'/'} exact={true} compomnent={OutHome} />
    <Route path={'/phone-login'} compomnent={PhoneLogin} />
    <Route path={'/verify-phone/:number'} compomnent={VerifyPhone} />
    <Route path={'/social-login'} compomnent={SocialLogin} />
    <Redirect from={'*'} to={'/'} />
  </Switch>
);

const LoggedInRoutes: React.SFC = () => (
  <Switch>
    <Route path={'/'} exact={true} compomnent={Home} />
    <Route path={'/ride'} exact={true} compomnent={Ride} />
    <Route path={'/edit-account'} exact={true} compomnent={EditAcount} />
    <Route path={'/settings'} exact={true} compomnent={Settings} />
    <Route path={'/places'} exact={true} compomnent={Places} />
    <Route path={'/add-places'} exact={true} compomnent={AddPlace} />
    <Route path={'/find-address'} exact={true} compomnent={FindAddress} />
    <Redirect from={'*'} to={'/'} />
  </Switch>
);

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppPresenter;
