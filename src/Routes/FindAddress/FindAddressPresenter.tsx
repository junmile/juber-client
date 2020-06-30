import React from 'react';
import Helmet from 'react-helmet';
import styled from '../../typed-components';
import AddressBar from '../../Components/App/AddressBar';
import Button from '../../Components/Button';
import arrow from '../../images/arrow.gif';

const FindAddressAddressBar = styled(AddressBar)`
  z-index: 10;
`;

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;
const Center = styled.div`
  pointer-events: none;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-content: center;
  justify-content: center;
  font-size: 30px;
  margin: auto;
`;

const Arrow = styled.img`
  position: absolute;
  margin: auto;
  justify-content: center;
  align-content: center;
  justify-content: center;
  top: 0;
  bottom: 40px;
  left: 0;
  right: 0;
  height: 80px;
  width: 40px;
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

interface IProps {
  enter: any;
  mapRef: any;
  address: string;
  onInputBlur: () => void;
  setAddress: any;
  onPickPlace: () => void;
}

const FindAddressPresenter: React.SFC<IProps> = ({
  mapRef,
  onInputBlur,
  setAddress,
  address,
  onPickPlace,
  enter,
}) => (
  <div>
    <Helmet>
      <title>Find Address | Juber</title>
    </Helmet>
    <FindAddressAddressBar
      enter={enter}
      name={'address'}
      value={address}
      onBlur={onInputBlur}
      onChangeFn={setAddress}
    />
    <ExtendedButton value={'장소 선택'} onClick={onPickPlace} />
    <Map ref={mapRef} />
    <Center>
      <Arrow src={arrow}></Arrow>
    </Center>
  </div>
);
export default FindAddressPresenter;
