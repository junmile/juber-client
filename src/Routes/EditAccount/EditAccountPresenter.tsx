import React from 'react';
import Helmet from 'react-helmet';
import styled from '../../typed-components';

import Button from '../../Components/Button';
import Form from '../../Components/Form';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import PhotoInput from '../../Components/PhotoInput';

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IProps {
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  onInputChange: any;
  loading: boolean;
  onSubmit: any;
  uploading: boolean;
}

const EditAccountPresenter: React.SFC<IProps> = ({
  email,
  firstName,
  lastName,
  profilePhoto,
  onInputChange,
  loading,
  onSubmit,
}) => (
  <Container>
    <Helmet>
      <title>Edit Account | Number</title>
    </Helmet>
    <Header title={'Edit Account'} backTo={'/'} />
    <ExtendedForm submitFn={onSubmit}>
      <PhotoInput
        uploading={false}
        fileUrl={profilePhoto}
        onChange={onInputChange}
      />
      <ExtendedInput
        type="text"
        name="firstName"
        value={firstName}
        placeholder={'First Name'}
        onChange={onInputChange}
      />
      <ExtendedInput
        type="text"
        name="lastName"
        value={lastName}
        placeholder={'Last Name'}
        onChange={onInputChange}
      />
      <ExtendedInput
        type="email"
        name="email"
        value={email}
        placeholder={'Email'}
        onChange={onInputChange}
      />
      <Button value={loading ? '로딩중..' : '수정'} onClick={null} />
    </ExtendedForm>
  </Container>
);

export default EditAccountPresenter;
