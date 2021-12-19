import Model, { attr, belongsTo } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') name;
  @attr('string') turn;
  @attr('number', { defaultValue: 0 }) winningCount;
}
