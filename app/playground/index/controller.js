import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { singularize } from 'ember-inflector';

export default class PlaygroundIndexController extends Controller {
  @service store;

  @tracked isModalDialogVisible = true;
  @tracked users = [];
  @tracked currentUserName = "";

  @tracked userFindError = "" ;

  @action
  closeModalDialog() {
    this.isModalDialogVisible = false;
  }

  @action
  async findUser(name) {
    this.userFindError = "";
    const adapter = this.store.adapterFor('user');
    let response = await adapter.findUserByName(this.currentUserName);

    if (response && response.errors) {
      this.userFindError = response.errors.detail;
    } else {
      //that should be in serializer but i didnt understand the problem.
      response.data.type = singularize(response.data.type); // couldnt handle this actually.
      let user = this.store.push(response);
      let temp = this.users.toArray();
      temp.addObject(user);
      this.users = temp;
    }
    
  }
}
