import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UserNewController extends Controller {
  @service store;

  @tracked currentUserName = null;
  @tracked errorList = [];
  @tracked created_users = [];

  @action
  async createUser() {
    try {
      let user = this.store.createRecord('user', {
        name: this.currentUserName,
      });
      user.save();
      let currArr = this.created_users;
      currArr.addObject(user);
      this.created_users = currArr;
    } catch (e) {
      this.errorList = e.errors;
    }
  }

  @action
  updateUserName(e) {
    this.currentUserName = e.target.value;
  }
}
