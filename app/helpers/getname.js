import { helper } from '@ember/component/helper';

function getname(args) {
  let [usersWithTurn, currentUserTurn] = args;
  if (usersWithTurn) {
    const index = usersWithTurn.toArray().findIndex(user => user.turn === currentUserTurn);
    if (index !== -1) {
      return usersWithTurn[index].name;
    }
  }
  return '';
}

export default helper(getname);
