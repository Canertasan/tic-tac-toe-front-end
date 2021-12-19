import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { singularize } from 'ember-inflector';
import { computed } from '@ember/object';

export default class PlaygroundIndexController extends Controller {
  @service store;
  @service cookies;
  @service intl;

  @tracked isModalDialogVisible = true;
  @tracked users = [];
  @tracked currentUserName = "";

  @tracked userFindError = "" ;

  @action
  closeModalDialog() {
    this.isModalDialogVisible = false;
    let cookieService = this.cookies;
    cookieService.write('entered', true);
  }

  _userExistAlready(id) {
    if (this.users.length && this.users.firstObject.id == id) {
      return true;
    }

    return false;
  }

  @action
  async findUser(name) {
    this.userFindError = "";
    const adapter = this.store.adapterFor('user');
    let response = await adapter.findUserByName(this.currentUserName);

    if (response && response.errors) {
      this.userFindError = response.errors.detail;
    } else if(this._userExistAlready(response.data.id)) {
      this.userFindError = this.intl.t('sameUser');
    } else {
      //that should be in serializer but i didnt understand the problem.
      response.data.type = singularize(response.data.type); // couldnt handle this actually.
      let user = this.store.push(response);
      let temp = this.users.toArray();
      temp.addObject(user);
      this.users = temp;
    }
  }

  @computed()
  get cookieNotExist() {
    let cookieService = this.cookies;
    let cookies = cookieService.read();
    if (cookies.hasOwnProperty('entered') && cookies.entered) {
      return false;
    } else{
      return true;
    }
  }

  @action
  async removeSelectedUser(user) {
    let currArr = this.users;
    currArr.removeObject(user);
    this.createdUsers = currArr;
    await this.store.unloadRecord(user);
  }
}
