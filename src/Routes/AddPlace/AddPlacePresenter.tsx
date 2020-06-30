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
  setTitle: any;
  setAddress: any;
  address: string;
  title: string;
  loading: any;
  onSubmit: any;
  pickedAddress: boolean;
  enterFn: any;
}

const AddPlacePresenter: React.SFC<IProps> = ({
  setTitle,
  setAddress,
  address,
  title,
  loading,
  onSubmit,
  pickedAddress,
  enterFn,
}) => (
  <React.Fragment>
    <Helmet>
      <title>Add Place | Juber</title>
    </Helmet>
    <Header title={'나의 장소 추가'} backTo={'/'} />
    <Container>
      <Form submitFn={onSubmit}>
        <ExtendedInput
          placeholder={'이름'}
          name={'name'}
          type={'text'}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <ExtendedInput
          placeholder={'주소'}
          name={'address'}
          type={'text'}
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          enter={enterFn}
        />
        <ExtendedLink to={'/find-address'}>지도에서 장소 선택</ExtendedLink>
        {(pickedAddress || address !== '') && (
          <Button
            onClick={onSubmit}
            value={!loading ? '장소 추가' : '장소 추가중'}
          />
        )}
      </Form>
    </Container>
  </React.Fragment>
);

export default AddPlacePresenter;
