import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PlaygroundIndexRoute extends Route {
  @service store;

  @tracked users = [];


  async model() {
    this.users = this.store.peekAll('user');
    // now we can create user and get user to the playground
  }

}
