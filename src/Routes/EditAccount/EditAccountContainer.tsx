import React from 'react';
import { Mutation } from 'react-apollo';
import { updateProfile, updateProfileVariables } from '../../types/api';
import { RouteComponentProps } from 'react-router-dom';
import { UPDATE_PROFILE } from './EditAccountQueries';
import EditAccountPresenter from './EditAccountPresenter';

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
      <UpdateProfileMutation
        mutation={UPDATE_PROFILE}
        variables={{
          email,
          firstName,
          lastName,
          profilePhoto,
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
    );
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as any);
  };
}

export default EditAccountContainer;
