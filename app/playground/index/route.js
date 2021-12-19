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
    this._users = this.store.peekAll('user');
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
