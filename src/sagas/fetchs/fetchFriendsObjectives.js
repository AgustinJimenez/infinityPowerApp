import request from '../../helpers/request'

export function* fetchFriendsObjectives() {
  let friends_objectives = {}
  let { data, error } = yield request({
    url: 'mobile/users/friends_objectives',
    method: 'POST',
    //debug: true,
  })
  if (!error) friends_objectives = data

  return { friends_objectives }
}
