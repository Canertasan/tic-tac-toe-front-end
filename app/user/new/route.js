import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class UserNewRoute extends Route {

  @tracked _users = [];

  async model() {
    // let user = await this.store.findAll('user'); for test
    this._users = this.store.peekAll('user');
    // now we can create user and get user to the playground
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('createdUsers', this._users.toArray());
  }
}
