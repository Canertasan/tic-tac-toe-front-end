import Model, { attr, belongsTo } from '@ember-data/model';
import { inject as service } from '@ember/service';

export default class UserModel extends Model {
  @attr('string') name;
  @attr('number', { defaultValue: 0 }) winningCount;
}
