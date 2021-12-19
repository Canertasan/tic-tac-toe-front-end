import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class UserAdapter extends JSONAPIAdapter {
  findUserByName(name) {
    let url = '/find_user_by_name';
    return this.ajax(url, 'GET', { data: { "name": name } });
  }
}