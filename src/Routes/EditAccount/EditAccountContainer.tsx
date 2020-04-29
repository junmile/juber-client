import React from 'react';
import { Mutation, Query } from 'react-apollo';
import {
  updateProfile,
  updateProfileVariables,
  userProfile,
} from '../../types/api';
import { RouteComponentProps } from 'react-router-dom';
import { UPDATE_PROFILE } from './EditAccountQueries';
import EditAccountPresenter from './EditAccountPresenter';
import { USER_PROFILE } from '../../sharedQueries.queries';
import { toast } from 'react-toastify';
import axios from 'axios';

class UpdateProfileMutation extends Mutation<
  updateProfile,
  updateProfileVariables
> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  uploading: boolean;
  file?: Blob;
}

class ProfileQuery extends Query<userProfile> {}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    email: '',
    firstName: '',
    lastName: '',
    profilePhoto: '',
    uploading: false,
  };

  public render() {
    const { email, firstName, lastName, profilePhoto, uploading } = this.state;
    return (
      <ProfileQuery
        query={USER_PROFILE}
        onCompleted={this.updateFields}
        fetchPolicy={'cache-and-network'}
      >
        {() => (
          <UpdateProfileMutation
            mutation={UPDATE_PROFILE}
            refetchQueries={[{ query: USER_PROFILE }]}
            variables={{
              email,
              firstName,
              lastName,
              profilePhoto,
            }}
            onCompleted={(data) => {
              const { UpdateMyProfile } = data;
              if (UpdateMyProfile.ok) {
                toast.success('프로필이 성공적으로 변경 되었습니다.');
              } else {
                toast.error(UpdateMyProfile.error);
              }
            }}
          >
            {(updateProfileFn, { loading }) => (
              <EditAccountPresenter
                email={email}
                firstName={firstName}
                lastName={lastName}
                profilePhoto={profilePhoto}
                onInputChange={this.onInputChange}
                loading={loading}
                onSubmit={updateProfileFn}
                uploading={uploading}
              />
            )}
          </UpdateProfileMutation>
        )}
      </ProfileQuery>
    );
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const {
      target: { name, value, files },
    } = event;
    console.log(files);
    if (files) {
      this.setState({
        uploading: true,
      });
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('api_key', '111132645848858');
      formData.append('upload_preset', 'juber');
      formData.append('timestamp', String(Date.now() / 1000));
      const request = await axios.post(
        'https://api.cloudinary.com/v1_1/dejkxwm5u/image/upload',
        formData
      );
      console.log(request);
    }
    this.setState({
      [name]: value,
    } as any);
  };

  public updateFields = (data: {} | userProfile) => {
    if ('GetMyProfile' in data) {
      const {
        GetMyProfile: { user },
      } = data;
      if (user) {
        const { firstName, lastName, email, profilePhoto } = user;
        this.setState({
          firstName,
          lastName,
          email,
          profilePhoto,
          uploaded: profilePhoto !== null,
        } as any);
      }
    }
  };
}

export default EditAccountContainer;
