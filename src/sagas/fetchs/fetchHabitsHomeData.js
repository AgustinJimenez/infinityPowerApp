import request from '../../helpers/request'

export function* fetchHabitsHomeData({ objectives_ids = [] }) {
  let habits_home_datas = {
    objectives: [],
    isRefreshing: false,
  }
  let { data, error } = yield request({
    url: 'mobile/users/habits_home_datas',
    method: 'POST',
    data: {
      objectives_ids,
    },
    //debug: true,
  })
  if (!error) habits_home_datas = data

  return { habits_home_datas }
}
