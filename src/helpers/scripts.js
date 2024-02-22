import { api_url } from '../../env.json'

export const url = api_url

export function isEmpty(obj) {
  if (obj == null) return true
  if (obj.length > 0) return false
  if (obj.length === 0) return true
  if (typeof obj !== 'object') return true
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false
  }
  return true
}
