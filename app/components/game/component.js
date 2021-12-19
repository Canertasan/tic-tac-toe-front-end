import Component from '@glimmer/component';
import { arg, forbidExtraArgs } from 'ember-arg-types';
import { tracked } from '@glimmer/tracking';
import { func, array } from 'prop-types';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';

@forbidExtraArgs // Asserts only @arg arguments are provided
export default class GameComponent extends Component {
  @service intl;

  @tracked currentWinningCounts = [0,0];
  @tracked lastRoundWinner = "No one :)";
  @tracked currentUserTurn = 'X';

  @arg(array.isRequired)
  usersWithTurn;

  @arg(array.isRequired)
  playgrounds;

  @arg(func.isRequired)
  saveGame;

  @action
  async restartGame() {
    console.log('restartGame');
  }

  @action
  updatePlayground(x,y,value) {
    let isClickFilledOne = false;
    let temp = this.playgrounds[x].cells.toArray();
    temp.forEach(c => {
      if (c.y === y) {
        if (c.value === '') {
          c.value = this.currentUserTurn;
        } else {
          isClickFilledOne = true
        }
      }
    });
    if (!isClickFilledOne) {
      this.playgrounds[x].cells = temp;
      if (this.currentUserTurn === 'X') {
        this.currentUserTurn = 'O';
      } else {
        this.currentUserTurn = 'X';
      }
    }
    
  }

  @action
  swapUsers() {
    let tempArr = [this.currentWinningCounts[1]];
    tempArr.push(this.currentWinningCounts[0]);
    this.currentWinningCounts = tempArr;
    if (this.usersWithTurn.length === 2) {
      // this.usersWithTurn = this.usersWithTurn.reverse(); stuck in here
      // Cannot set property usersWithTurn of #<GameComponent> which has only a getter
      // doesnt wanna lost too much time on this
      // not familar with ember 3.28 :/ 2.18 i used on my job
      //work around (sorry for this bad code)
      let name = this.usersWithTurn[1].name;
      // let id = this.usersWithTurn[1].id; cannot update this not important tho but make sense :D 
      // names are unique haha happy right now :D
      let winningCount = this.usersWithTurn[1].winningCount;
      this.usersWithTurn[1].name = this.usersWithTurn[0].name;
      // this.usersWithTurn[1].id = this.usersWithTurn[0].id;
      this.usersWithTurn[1].winningCount = this.usersWithTurn[0].winningCount;
      this.usersWithTurn[0].name = name;
      // this.usersWithTurn[0].id = id;
      this.usersWithTurn[0].winningCount = winningCount;
    }
  }
}