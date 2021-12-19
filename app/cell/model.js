import Model, { attr, belongsTo } from '@ember-data/model';

export default class CellModel extends Model {
  @attr('number') y;
  @attr('string', { defaultValue: '' }) value;
}
