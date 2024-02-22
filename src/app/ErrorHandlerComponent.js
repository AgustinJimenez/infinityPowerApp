import React from 'react'
import { parse } from 'stacktrace-parser'

const parseErrorStack = error => {
  if (!error || !error.stack) return []

  return Array.isArray(error.stack) ? error.stack : parse(error.stack)
}

class ErrorHandlerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.defaultHandler = ErrorUtils.getGlobalHandler()
    ErrorUtils.setGlobalHandler(this.customErrorHandler) // feed errors directly to our wrapGlobalHandler function
  }

  customErrorHandler = async (error, isFatal) => {
    const stack = parseErrorStack(error)

    //do anything with the error here
    //if (isFatal) console.log('wrapGlobalHandler ===> ', { error, isFatal })
    this.defaultHandler(error, isFatal) //after you're finished, call the defaultHandler so that react-native also gets the error
  }
}
export default ErrorHandlerComponent
