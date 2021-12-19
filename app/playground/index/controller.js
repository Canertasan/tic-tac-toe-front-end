import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { singularize } from 'ember-inflector';

export default class PlaygroundIndexController extends Controller {
  @service store;
  @service cookies;
  @service intl;

  @tracked isModalDialogVisible = true;
  @tracked users = [];
  @tracked currentUserName = "";

  @tracked userFindError = "" ;

  @tracked turns = ['X','O'];
  @tracked isGameStarted  = false;
  @tracked playgrounds = [];

  init() {
    super.init(...arguments);

    var times = 3;
    let resArr = [];
    let cells = [];
    for(var x = 0; x < times; x++){
      for(var y = 0; y < times; y++){
        cells.push(this.store.createRecord('cell', {
          y: y,
          value: '',
        }));
      }
      resArr.push(this.store.createRecord('playground', {
        x: x,
        cells: cells
      }));
      cells = [];
    }
    this.playgrounds = resArr.toArray();
  }

  @action
  closeModalDialog() {
    this.isModalDialogVisible = false;
    let cookieService = this.cookies;
    cookieService.write('entered', true);
  }

  _userExistAlready(id) {
    if (this.users.length && this.users.firstObject.id == id) {
      return true;
    }

    return false;
  }

  @action
  async findUser(name) {
    this.userFindError = "";
    const adapter = this.store.adapterFor('user');
    let response = await adapter.findUserByName(this.currentUserName);

    if (response && response.errors) {
      this.userFindError = response.errors.detail;
    } else if(this._userExistAlready(response.data.id)) {
      this.userFindError = this.intl.t('sameUser');
    } else {
      //that should be in serializer but i didnt understand the problem.
      response.data.type = singularize(response.data.type); // couldnt handle this actually.
      let user = this.store.push(response);
      let temp = this.users.toArray();
      temp.addObject(user);
      this.users = temp;
    }
  }

  @computed
  get cookieNotExist() {
    let cookieService = this.cookies;
    let cookies = cookieService.read();
    if (cookies.hasOwnProperty('entered') && cookies.entered) {
      return false;
    } else{
      return true;
    }
  }

  @action
  async gameOn() {
    let turns = this.turns;
    await this.users.map(function(user, index){
      return user.turn = turns[index];
    });
    this.isGameStarted = true;
  }

  @action
  async removeSelectedUser(user) {
    let currArr = this.users;
    currArr.removeObject(user);
    this.createdUsers = currArr;
    await this.store.unloadRecord(user);
  }

  @action // might use task for finishing the game as well.
  async saveGame(game) {
    console.log('save game');
  }
}
