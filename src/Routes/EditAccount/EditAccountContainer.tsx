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
}

class ProfileQuery extends Query<userProfile> {}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    email: '',
    firstName: '',
    lastName: '',
    profilePhoto: '',
  };

  public render() {
    const { email, firstName, lastName, profilePhoto } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE} onCompleted={this.updateFields}>
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
              />
            )}
          </UpdateProfileMutation>
        )}
      </ProfileQuery>
    );
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as any);
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
        } as any);
      }
    }
  };
}

export default EditAccountContainer;
