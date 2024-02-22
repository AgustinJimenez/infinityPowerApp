import * as fn from 'helpers/scripts'
import AsyncStorage from '@react-native-community/async-storage'
import RNFetchBlob from 'rn-fetch-blob'
import NetInfo from '@react-native-community/netinfo'
class Configure {
  constructor() {
    this.state = {
      token: null,
      tokenType: null,
      user: null,
    }
  }
  get_home_data = () => {
    instance = global.configure
    var date = new Date()
    started_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    //console.log('Getting Home data:' + started_date);
    fetch(fn.url + 'mobile/users/get_home_data', {
      method: 'POST',
      headers: new Headers({
        Authorization: global.tokenType + ' ' + global.token,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: 'lang=' + global.lang + '&imei=' + global.user.imei + '&timezone=' + global.user.timezone,
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 1) {
          AsyncStorage.setItem('get_home_data', JSON.stringify(json))
          //console.log('Get Home Data....');
        }

        return json
      })
  }
  categories = () => {
    instance = global.configure
    fetch(fn.url + 'categories', {
      method: 'POST',
      headers: new Headers({
        Authorization: global.tokenType + ' ' + global.token,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: 'lang=' + global.lang + '&imei=' + global.user.imei + '&timezone=' + global.user.timezone,
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 1) {
          AsyncStorage.setItem('categories_complete', JSON.stringify(json))
          AsyncStorage.setItem('categories', JSON.stringify(json.result))
          //console.log('Get Cateogries....');
        }
        return json
      })
  }
  news = () => {
    instance = global.configure
    fetch(fn.url + 'news', {
      method: 'POST',
      headers: new Headers({
        Authorization: global.tokenType + ' ' + global.token,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: 'lang=' + global.lang + '&imei=' + global.user.imei + '&timezone=' + global.user.timezone,
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 1) {
          AsyncStorage.setItem('news', JSON.stringify(json))
          //console.log('Get News....');
        }
        return json
      })
  }
  tips = () => {
    instance = global.configure
    fetch(fn.url + 'tips', {
      method: 'POST',
      headers: new Headers({
        Authorization: global.tokenType + ' ' + global.token,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: 'lang=' + global.lang + '&imei=' + global.user.imei + '&timezone=' + global.user.timezone,
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 1) {
          AsyncStorage.setItem('tips', JSON.stringify(json))
          //console.log('Get News....');
        }
        return json
      })
  }
  songs = () => {
    instance = global.configure
    fetch(fn.url + 'songs', {
      method: 'POST',
      headers: new Headers({
        Authorization: global.tokenType + ' ' + global.token,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: 'lang=' + global.lang + '&imei=' + global.user.imei + '&timezone=' + global.user.timezone,
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 1) {
          AsyncStorage.setItem('songs', JSON.stringify(json))
          //console.log('Get News....');
        }
        return json
      })
  }
  get_profile_data = () => {
    instance = global.configure
    fetch(fn.url + 'mobile/users/get_profile_data', {
      method: 'POST',
      headers: new Headers({
        Authorization: global.tokenType + ' ' + global.token,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: 'lang=' + global.lang + '&imei=' + global.user.imei + '&timezone=' + global.user.timezone,
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 1) {
          AsyncStorage.setItem('get_profile_data', JSON.stringify(json))
          //console.log('Get Profile Data....');
          //Skipped--
          //this.play_routine(json.result.routine.id)
        }
        return json
      })
  }
  play_routine = routineid => {
    instance = global.configure
    fetch(fn.url + 'mobile/users/play_routine', {
      method: 'POST',
      headers: new Headers({
        Authorization: global.tokenType + ' ' + global.token,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: 'lang=' + global.lang + '&imei=' + global.user.imei + '&timezone=' + global.user.timezone + '&routine_configuration_id=' + routineid,
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 1) {
          AsyncStorage.setItem('play_routine', JSON.stringify(json))
          this.downloadMusics(json)
          this.downloadTones(json)
          this.downloadPhrases(json)
        }
      })
  }
  helper = () => {
    instance = global.configure
    fetch(fn.url + 'helper', {
      method: 'POST',
      headers: new Headers({
        Authorization: global.tokenType + ' ' + global.token,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: 'lang=' + global.lang + '&imei=' + global.user.imei + '&timezone=' + global.user.timezone + '&type=motivation',
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 1) {
          AsyncStorage.setItem('helper', JSON.stringify(json))
          //console.log('Get Helper....');
        }
        return json
      })
  }
  get_app_configuration = () => {
    instance = global.configure
    fetch(fn.url + 'mobile/get_app_configuration', {
      method: 'POST',
      headers: new Headers({
        Authorization: global.tokenType + ' ' + global.token,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: 'lang=' + global.lang + '&imei=' + global.user.imei + '&timezone=' + global.user.timezone,
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 1) {
          AsyncStorage.setItem('get_app_configuration', JSON.stringify(json))
          //console.log('Get App Configuration....');
        }
        return json
      })
  }
  get_consecutive_weeks_achievements_details = () => {
    instance = global.configure
    var d = new Date()
    var n = d.getFullYear()
    fetch(fn.url + 'mobile/get_consecutive_weeks_achievements_details', {
      method: 'POST',
      headers: new Headers({
        Authorization: global.tokenType + ' ' + global.token,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: 'lang=' + global.lang + '&imei=' + global.user.imei + '&timezone=' + global.user.timezone + '&year_number=' + n,
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 1) {
          AsyncStorage.setItem('get_consecutive_weeks_achievements_details', JSON.stringify(json))
          //console.log('Get Consecutive Weeks For Achievement....');
        }
        return json
      })
  }
  getDatas = () => {
    //console.log('Configure started getting data....');
    instance = global.configure
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem('userToken').then(token => {
          AsyncStorage.getItem('userTokenType').then(tokenType => {
            AsyncStorage.getItem('user').then(imei => {
              imei = JSON.parse(imei)
              global.token = token
              global.tokenType = tokenType
              global.user = imei
              AsyncStorage.getItem('reproducciones').then(value => {
                if (value != null) {
                  value = JSON.parse(value)
                  value.map(item => {
                    fetch(fn.url + 'mobile/users/save_reproduction_data', {
                      method: 'POST',
                      headers: new Headers({
                        Authorization: tokenType + ' ' + token,
                        'Content-Type': 'application/json',
                      }),
                      body: JSON.stringify(item),
                    })
                      .then(response => response.json())
                      .then(json => {})
                      .catch(error => {})
                  })
                  AsyncStorage.removeItem('reproducciones')
                  Promise.all([
                    this.get_home_data(),
                    this.categories(),
                    this.news(),
                    this.tips(),
                    this.songs(),
                    this.get_profile_data(),
                    this.helper(),
                    this.get_app_configuration(),
                    this.get_consecutive_weeks_achievements_details(),
                    this.get_screens_translations(),
                  ]).then(values => {
                    //console.log('Promised Data.....')
                    setTimeout(() => {
                      global.navigation.navigate('Main', {
                        transition: 'fadeIn',
                      })
                    }, 3000)
                  })
                } else {
                  Promise.all([
                    this.get_home_data(),
                    this.categories(),
                    this.news(),
                    this.tips(),
                    this.songs(),
                    this.get_profile_data(),
                    this.helper(),
                    this.get_app_configuration(),
                    this.get_consecutive_weeks_achievements_details(),
                    this.get_screens_translations(),
                  ]).then(values => {
                    //console.log('Promised Data.....')
                    setTimeout(() => {
                      global.navigation.navigate('Main', {
                        transition: 'fadeIn',
                      })
                    }, 3000)
                  })
                }
              })
            })
          })
        })
      } else {
        instance.props.navigation.navigate('Main', {
          transition: 'fadeIn',
        })
      }
    })
  }
  downloadMusics = async musics => {
    let dirs = RNFetchBlob.fs.dirs
    let musicName = ''
    let music_remote_path = ''
    let music_local_path = ''
    let exists = false
    for (let music of musics) {
      musicName = music.path
      music_remote_path = music.path_file
      // console.log({ music, music_remote_path })
      if (!music_remote_path) {
        // console.log({ music })
        continue
      }
      music_local_path = `${dirs.DocumentDir}/${musicName}`
      exists = await RNFetchBlob.fs.exists(music_local_path)

      console.log({ music_remote_path, exists })
      if (!exists)
        RNFetchBlob.config({ path: music_local_path })
          .fetch('GET', music_remote_path)
          .catch(error => console.log('downloadMusics ===> ', { music_remote_path, musics, error }))
    }
  }
  downloadTones = async tones => {
    let dirs = RNFetchBlob.fs.dirs
    let toneName = ''
    let tone_remote_path = ''
    let exists = false
    let tone_local_path = `${dirs.DocumentDir}/${toneName}`
    for (let tone of tones) {
      toneName = tone.path
      tone_remote_path = tone.path_file

      exists = await RNFetchBlob.fs.exists(tone_local_path)
      if (!exists)
        RNFetchBlob.config({ path: tone_local_path })
          .fetch('GET', tone_remote_path)
          .catch(error => console.log('downloadTones ===> ', { error }))
    }
  }
  downloadPhrases = async routine_phrases => {
    let dirs = RNFetchBlob.fs.dirs
    let phrase_local_path = ''
    let phrase_remote_path = ''
    for (let phrase of routine_phrases) {
      phrase_local_path = `${dirs.DocumentDir}/${phrase.audio_affirmative}`
      phrase_remote_path = phrase.audio_affirmative_file
      RNFetchBlob.config({ path: phrase_local_path })
        .fetch('GET', phrase_remote_path)
        .catch(error => console.log('downloadPhrases 1 ===> ', { error }))

      phrase_local_path = `${dirs.DocumentDir}/${phrase.audio_gratitude}`
      phrase_remote_path = phrase.audio_gratitude_file
      RNFetchBlob.config({ path: phrase_local_path })
        .fetch('GET', phrase_remote_path)
        .catch(error => console.log('downloadPhrases 2 ===> ', { error }))
      //console.log('get-phrases ===> ', { phrase, phrase_remote_path, phrase_local_path })
    }
  }
  get_screens_translations = () => {
    instance = global.configure
    fetch(fn.url + 'get_screens_translations', {
      method: 'POST',
      headers: new Headers({
        Authorization: global.tokenType + ' ' + global.token,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: 'lang=es&imei=' + global.user.imei + '&timezone=' + global.user.timezone,
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 1) {
          AsyncStorage.setItem('get_screens_translations_es', JSON.stringify(json))
          //console.log('Configure Screen: spanish is fetched.')
          fetch(fn.url + 'get_screens_translations', {
            method: 'POST',
            headers: new Headers({
              Authorization: global.tokenType + ' ' + global.token,
              'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: 'lang=en&imei=' + global.user.imei + '&timezone=' + global.user.timezone,
          })
            .then(response => response.json())
            .then(json => {
              if (json.status == 1) {
                //console.log('Configure Screen: english is fetched.')
                AsyncStorage.setItem('get_screens_translations_en', JSON.stringify(json))
                fetch(fn.url + 'get_screens_translations', {
                  method: 'POST',
                  headers: new Headers({
                    Authorization: global.tokenType + ' ' + global.token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                  }),
                  body: 'lang=pt&imei=' + global.user.imei + '&timezone=' + global.user.timezone,
                })
                  .then(response => response.json())
                  .then(json => {
                    if (json.status == 1) {
                      //console.log('Configure Screen: portuges is fetched.')
                      AsyncStorage.setItem('get_screens_translations_pt', JSON.stringify(json))
                    }
                  })
              }
            })
        }
      })
  }

  loadData = () => {
    //console.log('Configure ... load configure data');
    this.getDatas()
  }

  saveSetting = (key, setting) => {
    settingStr = JSON.stringify(setting)
    AsyncStorage.setItem(key, settingStr)
  }
  loadSetting = key => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key)
        .then(value => {
          if (value != null) resolve(value)
          else reject(value)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}

export default new Configure()
