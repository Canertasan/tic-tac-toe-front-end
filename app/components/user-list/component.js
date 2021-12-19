import Component from '@glimmer/component';
import { arg, forbidExtraArgs } from 'ember-arg-types';
import { func, array } from 'prop-types';

@forbidExtraArgs // Asserts only @arg arguments are provided
export default class UserListComponent extends Component {
  @arg(array.isRequired)
  createdUsers;

  @arg(func.isRequired)
  removeUser;
}