import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PlaygroundIndexRoute extends Route {
  @service store;
  @service intl;

  @tracked _users = [];

  beforeModel() {
    this.intl.setLocale(['en-us']);
  }

  async model() {
    let user1 = await this.store.findRecord('user',154);
    let user2 = await this.store.findRecord('user',155);
    this._users = [user1,user2];
    // this._users = this.store.peekAll('user');
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('users', this._users.toArray());
  }

  @action
  willTransition() {
    let controller = this.controllerFor('playground.index')
    controller.userFindError = "";
    controller.currentUserName = "";
    controller.isGameStarted = false;
  }
}
