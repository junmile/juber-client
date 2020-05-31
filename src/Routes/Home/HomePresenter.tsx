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
  getRidebyId,
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

const CancelButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  width: 80%;
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
  requested: boolean;
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
  getRidebyIdQuery: getRidebyId | undefined;
}

const HomePresenter: React.SFC<IProps> = ({
  requested,
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
  getRidebyIdQuery: { GetRidebyId: { ok = null } = {} } = {},
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
      {user && user.isDriving && <></>}
      {user && !user.isDriving && !ok && !requested && (
        <React.Fragment>
          <AddressBar
            readOnly={false}
            name={'toAddress'}
            onChange={onInputChange}
            value={toAddress}
            onBlur={null}
            enter={enter}
          />

          <ExtendedButton
            onClick={onAddressSubmit}
            disabled={toAddress === ''}
            value={price ? '주소 다시 검색' : '주소 검색'}
          />
        </React.Fragment>
      )}
      {price !== 0 && !ok && !requested && (
        <RequestButton
          onClick={requestRideFn}
          disabled={toAddress === ''}
          value={`탑승 요청 : ${price}원`}
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
      {(requested || ok) && (
        <React.Fragment>
          <AddressBar
            name={'toAddress'}
            onChange={onInputChange}
            value={toAddress}
            onBlur={null}
            enter={enter}
            readOnly={true}
          />
          <CancelButton
            onClick={requestRideFn}
            disabled={toAddress === ''}
            value={'탑승 요청 취소'}
          />
        </React.Fragment>
      )}

      <Map ref={mapRef} />
    </Sidebar>
  </Container>
);

export default HomePresenter;
