import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
// import { inject as service } from '@ember/service';

export default class PlaygroundIndexController extends Controller {
  // @service router;

  @tracked isModalDialogVisible = true;
  // @action
  // updateOrganizationName(e) {
  //   this.organizationName = e.target.value;
  // }
  @action
  closeModalDialog() {
    this.isModalDialogVisible = false;
  }
}
