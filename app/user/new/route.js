import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class UserNewRoute extends Route {
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
    controller.set('createdUsers', this._users.toArray());
  }

  @action
  willTransition() {
    this.controllerFor('user.new').errorList = [];
    this.controllerFor('user.new').currentUserName = "";
  }
}
