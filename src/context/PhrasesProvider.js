import React, { createContext, Component } from 'react'
import * as fn from 'helpers/scripts'
import AsyncStorage from '@react-native-community/async-storage'

const PhrasesContext = createContext()

class PhrasesProvider extends Component {
  state = {
    phrases: [],
    selectedRoutine: null,
    loading: false,
    numberPhrasesRoutine: null,
    isFull: false,
    actualPhrases: [],
  }

  handle = () => {
    console.log('[PhrasesProvider]')
  }
  storeNumberPhrases = number => {
    this.setState({ numberPhrasesRoutine: number })
  }

  savePhrasesHandler = () => {
    console.log('[save]')
    this.setState({ loading: true })
    AsyncStorage.getItem('userToken').then(token => {
      AsyncStorage.getItem('userTokenType').then(tokenType => {
        AsyncStorage.getItem('user').then(value => {
          const user = JSON.parse(value)
          this.state.phrases.map(async item => {
            let newObj = {}
            newObj['lang'] = global.lang
            newObj['imei'] = user.imei
            newObj['timezone'] = user.timezone
            newObj['source'] = item.source
            newObj['phrase_id'] = item.phrase_id
            newObj['destination'] = 'myRoutine'
            newObj['routine_id'] = this.state.selectedRoutine

            await fetch(fn.url + 'mobile/users/add_phrase_to', {
              method: 'POST',
              headers: new Headers({
                Authorization: tokenType + ' ' + token,
                'Content-Type': 'application/json',
              }),
              body: JSON.stringify(newObj),
            })
              .then(response => response.json())
              .then(json => {
                if (json.status == 1) {
                } else {
                  this.setState({
                    loading: false,
                  })
                }
              })
              .catch(error => {
                this.setState({
                  loading: false,
                })
              })
          })
          this.setState({
            loading: false,
          })
          this.props.navigation.navigate('MeditationHome')
        })
      })
    })
  }

  selectedPhrase = phrase => {
    //const oldPhrases = [...this.state.phrases];
    let newArray
    if (phrase.selected == true) {
      newArray = [...this.state.phrases, phrase]
    } else {
      newArray = this.state.phrases.filter(item => item.phrase_id != phrase.phrase_id)
    }
    const totalNumber = this.state.numberPhrasesRoutine + newArray.length
    if (totalNumber >= 5) {
      this.setState({ phrases: newArray, isFull: true })
    } else {
      this.setState({ phrases: newArray, isFull: false })
    }
  }

  /* storeActualPhrases = ( phrases ) => {
        this.setState({actualPhrases: phrases})
    }
 */
  render() {}

  render() {
    return (
      <PhrasesContext.Provider
        value={{
          handle: this.handle,
          storePhrase: phrase => this.selectedPhrase(phrase),
          selectedPhrases: this.state.phrases,
          resetPhrases: () => this.setState({ phrases: [], isFull: false, actualPhrases: [] }),
          storeRoutineSelected: routine => this.setState({ selectedRoutine: routine }),
          storeRoutinePhrases: phrases => this.setState({ actualPhrases: phrases }),
          actualPhrases: this.state.actualPhrases,
          save: this.savePhrasesHandler,
          isFull: this.state.isFull,
          numberPhrasesRoutine: this.state.numberPhrasesRoutine,
          storeNumberPhrases: number => this.storeNumberPhrases(number),
        }}
      >
        {this.props.children}
      </PhrasesContext.Provider>
    )
  }
}

export default PhrasesProvider
export { PhrasesContext }
