import React from 'react';
import Helmet from 'react-helmet';
import Sidebar from 'react-sidebar';
import Menu from '../../Components/Menu';
import styled from '../../typed-components';
import Button from '../../Components/Button';
import AddressBar from '../../Components/App/AddressBar';
import {
  userProfile,
  requestRide,
  requestRideVariables,
  getNearbyRides,
  acceptRide,
  acceptRideVariables,
} from '../../types/api';
import { MutationFn } from 'react-apollo';
import RidePopUp from '../../Components/RidePopUp';

const Container = styled.div``;

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  width: 80%;
`;
const RequestButton = styled(ExtendedButton)`
  bottom: 7rem;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  mapRef: any;
  toAddress: string;
  onInputChange: any;
  onAddressSubmit: (event: React.ChangeEvent<HTMLInputElement>) => void;
  price?: number;
  data?: userProfile;
  requestRideFn?: MutationFn<requestRide, requestRideVariables>;
  getNearbyRide?: getNearbyRides | any;
  acceptRideFn: MutationFn<acceptRide, acceptRideVariables> | any;
  enter: any;
}

const HomePresenter: React.SFC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  mapRef,
  toAddress,
  onInputChange,
  onAddressSubmit,
  price,
  enter,
  acceptRideFn,
  data: { GetMyProfile: { user = null } = {} } = {},
  requestRideFn,
  getNearbyRide: { GetNearbyRides: { ride = null } = {} } = {},
}) => (
  <Container>
    <Helmet>
      <title>Home | Number</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu />}
      open={isMenuOpen}
      onSetOpen={toggleMenu}
      styles={{
        sidebar: {
          backgroundColor: 'white',
          width: '80%',
          zIndex: '10',
        },
      }}
    >
      {<MenuButton onClick={toggleMenu}>|||</MenuButton>}
      {user && !user.isDriving && (
        <React.Fragment>
          <AddressBar
            name={'toAddress'}
            onChange={onInputChange}
            value={toAddress}
            onBlur={null}
            enter={enter}
          />
          <ExtendedButton
            onClick={onAddressSubmit}
            disabled={toAddress === ''}
            value={price ? 'Change Address' : 'Pick Address'}
          />
        </React.Fragment>
      )}
      {price !== 0 && (
        <RequestButton
          onClick={requestRideFn}
          disabled={toAddress === ''}
          value={`Request Ride (${price}원)`}
        />
      )}
      {ride && (
        <RidePopUp
          id={ride.id}
          pickUpAddress={ride.pickUpAddress}
          dropOffAddress={ride.dropOffAddress}
          price={ride.price}
          distance={ride.distance}
          duration={ride.duration}
          passengerName={ride.passenger.fullName}
          passengerPhoto={ride.passenger.profilePhoto}
          acceptRideFn={acceptRideFn}
        />
      )}
      <Map ref={mapRef} />
    </Sidebar>
  </Container>
);

export default HomePresenter;
