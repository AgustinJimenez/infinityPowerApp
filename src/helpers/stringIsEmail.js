const stringIsEmail = (email = '') => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  email = String(email).toLowerCase()
  const isEmail = re.test(email)
  //console.log('stringIsEmail ===> ', { email, isEmail })
  return isEmail
}

export default stringIsEmail
