import Model, { attr, hasMany } from '@ember-data/model';

export default class PlaygroundModel extends Model {
  @attr('number') x;
  @hasMany('cell') cells;
}
