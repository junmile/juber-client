import React from 'react';
import Helmet from 'react-helmet';
import Header from '../../Components/Header';
import Form from '../../Components/Form';
import Input from '../../Components/Input';
import styled from '../../typed-components';
import Button from '../../Components/Button';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
`;

const ExtendedLink = styled(Link)`
  text-decoration: underline;
  margin-bottom: 20px;
  display: block;
`;

interface IProps {
  address: string;
  name: string;
  onInputChange: (event: React.ChangeEventHandler<HTMLInputElement>) => void;
  loading: any;
  onSubmit: any;
  pickedAddress: boolean;
}

const AddPlacePresenter: React.SFC<IProps> = ({
  address,
  name,
  onInputChange,
  loading,
  onSubmit,
  pickedAddress,
}) => (
  <React.Fragment>
    <Helmet>
      <title>Add Place | Juber</title>
    </Helmet>
    <Header title={'Add Place'} backTo={'/'} />
    <Container>
      <Form submitFn={onSubmit}>
        <ExtendedInput
          placeholder={'이름'}
          name={'name'}
          type={'text'}
          onChange={onInputChange}
          value={name}
        />
        <ExtendedInput
          placeholder={'주소'}
          name={'address'}
          type={'text'}
          onChange={onInputChange}
          value={address}
        />
        <ExtendedLink to={'/find-address'}>지도에서 장소 선택</ExtendedLink>
        {pickedAddress && (
          <Button
            onClick={onSubmit}
            value={loading ? '장소 추가' : '장소 추가중'}
          />
        )}
      </Form>
    </Container>
  </React.Fragment>
);

export default AddPlacePresenter;
