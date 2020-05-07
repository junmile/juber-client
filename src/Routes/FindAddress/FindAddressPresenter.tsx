import React from 'react';
import Helmet from 'react-helmet';
import styled from '../../typed-components';
import AddressBar from '../../Components/App/AddressBar';

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;
const Center = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  width: 30px;
  height: 30px;
  align-content: center;
  justify-content: center;
  font-size: 30px;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

interface IProps {
  mapRef: any;
  address: string;
  onInputBlur: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class FindAddressPresenter extends React.Component<IProps> {
  public render() {
    const { mapRef, onInputBlur, onInputChange, address } = this.props;
    return (
      <div>
        <Helmet>
          <title>Find Address | Juber</title>
        </Helmet>
        <AddressBar
          name={'address'}
          value={address}
          onBlur={onInputBlur}
          onChange={onInputChange}
        />
        <Center>📍</Center>
        <Map ref={mapRef} />
      </div>
    );
  }
}

export default FindAddressPresenter;
