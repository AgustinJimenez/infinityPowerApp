import request from '../../helpers/request'

export const fetchHabitsPercentage = async () => {
  //sconsole.log("Vishal fetchHabitsPercentage called")
  let { data, error } = await request({
    url: 'mobile/users/habits_percentage',
    method: 'POST',
    //debug: true,
  })
  if (error) return { habits_percentage: 0 }

  return { habits_percentage: data }
}
