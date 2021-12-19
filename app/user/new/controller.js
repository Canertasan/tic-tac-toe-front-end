import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UserNewController extends Controller {
  @service flashMessages;
  @service store;
  @service router;

  @tracked currentUserName = null;
  @tracked errorList = [];
  @tracked createdUsers = [];

  @action
  async createUser() {
    this.errorList = [];
    let user = this.store.createRecord('user', {
      name: this.currentUserName,
    });
    try {
      await user.save();
      let currArr = this.createdUsers;
      currArr.addObject(user);
      this.created_users = currArr;
    } catch (e) {
      this.store.unloadRecord(user);
      this.errorList = e.errors;
    }
  }

  @action
  updateUserName(e) {
    this.currentUserName = e.target.value;
  }

  @action
  async removeCreatedUser(user) {
    let currArr = this.createdUsers;
    currArr.removeObject(user);
    this.createdUsers = currArr;
    await this.store.unloadRecord(user);
  }

  @action
  async transitionToPlayground() {
    await this.router.transitionTo('playground');
  }
}
