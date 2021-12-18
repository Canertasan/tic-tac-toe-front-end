import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class UserNewController extends Controller {
  @service flashMessages;
  @service store;
  @service router;

  @tracked currentUserName = null;
  @tracked errorList = [];
  @tracked created_users = [];

  @action
  async createUser() {
    this.errorList = [];
    let user = this.store.createRecord('user', {
      name: this.currentUserName,
    });
    try {
      await user.save();
      let currArr = this.created_users;
      currArr.addObject(user);
      this.created_users = currArr;
    } catch (e) {
      user.deleteRecord();
      this.errorList = e.errors;
    }
  }

  @action
  updateUserName(e) {
    this.currentUserName = e.target.value;
  }

  @action
  removeCreatedUser(user) {
    let currArr = this.created_users;
    currArr.removeObject(user);
    this.created_users = currArr;
  }

  @action
  async transitionToPlayground() {
    await this.router.transitionTo('playground');
  }
}
