import Component from '@glimmer/component';
import { arg, forbidExtraArgs } from 'ember-arg-types';
import { tracked } from '@glimmer/tracking';
import { func, array } from 'prop-types';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

@forbidExtraArgs // Asserts only @arg arguments are provided
export default class GameComponent extends Component {
  @service intl;

  @tracked currentWinningCounts = [0,0];
  @tracked lastRoundWinner = "No one :)";
  @tracked currentUserTurn = 'X';
  @tracked numberOfRounds = 0;
  @tracked roundEnded = false;
  @tracked matrix = [['','',''],['','',''],['','','']];

  @arg(array.isRequired)
  usersWithTurn;

  @arg(array.isRequired)
  playgrounds;

  @arg(func.isRequired)
  saveGame;

  @action
  async restartGame() {
    this.numberOfRounds = 0;
    this.currentUserTurn = 'X';
    this.matrix = [['','',''],['','',''],['','','']];
    this.roundEnded = false;

    this.playgrounds.toArray().map(p => {
      p.cells.toArray().map(c => {
        c.value = '';
      });
    });
  }

  _changeTheTurn(temp,x) {
    this.playgrounds[x].cells = temp;
    if (this.currentUserTurn === 'X') {
      this.currentUserTurn = 'O';
    } else {
      this.currentUserTurn = 'X';
    }
  }

  _checkValuesAreEq(arr) {
    if (arr[0] === '') {
      return false;
    }

    if (arr.every(val => val === arr[0])) {
      return true;
    }

    return false;
  }

  _checkAnyWinner() {
    let anyWinner = false;
    let matrix = this.matrix;
    var times = 3;

    //checking rows 
    for(var x = 0; x < times; x++){
      anyWinner = this._checkValuesAreEq(matrix[x])
      if (anyWinner) {
        return true;
      } 

      //checking columns
      let colArr = [];
      for (var y = 0; y < times; y++) {
        colArr.push(matrix[y][x]);
      }

      anyWinner = this._checkValuesAreEq(colArr);
      if (anyWinner) {
        return true;
      }  

    }

    // checking diagnoles
    let firstDiagnolArr = [matrix[0][0],matrix[1][1],matrix[2][2]];
    anyWinner = this._checkValuesAreEq(firstDiagnolArr);
    if (anyWinner) {
      return true;
    } 

    let secondDiagnolArr = [matrix[0][2],matrix[1][1],matrix[2][0]];
    anyWinner = this._checkValuesAreEq(secondDiagnolArr);
    if (anyWinner) {
      return true;
    }
  }

  _findWinner() {
    const index = this.usersWithTurn.toArray().findIndex(user => user.turn === this.currentUserTurn);
    return this.usersWithTurn[index].name
  }

  @action
  updatePlayground(x,y) {
    // if round is ended then dont update
    if (!this.roundEnded) {

      // setting value
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
        // add element to matrix 
        this.matrix[x][y] = this.currentUserTurn; 
        this.numberOfRounds++;
        if (this.numberOfRounds > 4) {
          if(this._checkAnyWinner()){
            //game is over

            //end the round and annouce the winner 
            this.roundEnded = true
            this.lastRoundWinner = this._findWinner();

            //winning count
            let countWinning = this.currentWinningCounts;
            if (this.currentUserTurn === 'X') {
              countWinning[0] += 1;
            } else {
              countWinning[1] += 1;
              
            }
            this.currentWinningCounts = countWinning;
            // this.restartGame(); I am not gonna do that user can click new game
          } else if(this.numberOfRounds === 9) {
              // its a tie
              this.lastRoundWinner = "That was a tie";
              this.roundEnded = true
            }
        }
        if (!this.roundEnded) {
          this._changeTheTurn(temp,x)
        }
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