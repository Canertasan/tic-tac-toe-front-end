import Component from '@glimmer/component';
import { arg, forbidExtraArgs } from 'ember-arg-types';
import { func, array } from 'prop-types';
import { inject as service } from '@ember/service';

@forbidExtraArgs // Asserts only @arg arguments are provided
export default class UserCreateFormComponent extends Component {
  @service intl;

  @arg(array.isRequired)
  createdUsers;

  @arg(func.isRequired)
  createUser;

  @arg(func.isRequired)
  updateUserName;
}