import Component from '@glimmer/component';
import { arg, forbidExtraArgs } from 'ember-arg-types';
import { func, string } from 'prop-types';

@forbidExtraArgs // Asserts only @arg arguments are provided
export default class CoolButtonComponent extends Component {
  @arg(func.isRequired)
  onClick;

  @arg(string.isRequired)
  buttonName;
}