import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PlaygroundIndexRoute extends Route {
  @service store;

  @tracked _users = [];


  async model() {
    // let user = await this.store.findAll('user'); for test
    this._users = this.store.peekAll('user');
    // now we can create user and get user to the playground
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('users', this._users.toArray());
  }

  @action
  willTransition() {
    this.controllerFor('playground.index').userFindError = "";
    this.controllerFor('playground.index').currentUserName = "";
  }
}
