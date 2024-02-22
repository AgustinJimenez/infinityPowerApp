import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Loader from 'helpers/loader'
import { connect } from 'react-redux'
import BottomNavigationBar from '../components/BottomNavigationBar'
import { datasetSelector } from '../redux/selectors'
import capitalizeWords from '../helpers/capitalizeWords'
import { tailwind } from '../tailwind'

import BgMainIconImg from '../img/background-home.jpg'
import { ImageBackground } from 'react-native'
import { secondaryColor } from '../helpers/styles'
import { Icon } from 'native-base'
import { PhrasesContext } from '../context/PhrasesProvider'

class AffirmationCategoryListScreen extends React.Component {
  state = {
    categorias: [],
    imagenes: [
      require('img/slideimages/card1-min.jpg'),
      require('img/slideimages/card2-min.jpg'),
      require('img/slideimages/card3-min.jpg'),
      require('img/slideimages/card4-min.jpg'),
      require('img/slideimages/card5-min.jpg'),
      require('img/slideimages/card6-min.jpg'),
      require('img/slideimages/card7-min.jpg'),
      require('img/slideimages/card8-min.jpg'),
      require('img/slideimages/card9-min.jpg'),
      require('img/slideimages/card10-min.jpg'),
      require('img/slideimages/card11-min.jpg'),
      require('img/slideimages/card12-min.jpg'),
      require('img/slideimages/card13-min.jpg'),
      require('img/slideimages/card14-min.jpg'),
      require('img/slideimages/card15-min.jpg'),
      require('img/slideimages/card16-min.jpg'),
      require('img/slideimages/card17-min.jpg'),
      require('img/slideimages/card18-min.jpg'),
      require('img/slideimages/card19-min.jpg'),
      require('img/slideimages/card20-min.jpg'),
      require('img/slideimages/card21-min.jpg'),
    ],
  }

  static navigationOptions = {
    header: null,
  }

  static contextType = PhrasesContext

  componentDidMount() {
    this.init()
  }

  init = async () => {
    await this.setState({ loading: false })

    let newCategories = []
    const personalizados = {
      name: 'Personal',
    }
    newCategories.push(personalizados)

    //console.log('HERE CATEGORIAS ===> ', { categorias: JSON.parse(categorias), redux_categorias: this.categoriesList() })

    this.props.categories.map(tipo => {
      tipo.items.map(item => {
        if (item.name != 'Grabadas con mi voz' && item.name != 'Grabadas por la Aplicacion' && item.name != 'Lista de Deseos') {
          newCategories.push(item)
        }
      })
    })

    this.setState({ categorias: newCategories, loading: false })
  }
  renderHeaderOld = () => {
    return (
      <View>
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, marginBottom: 30 }}>
          {capitalizeWords(global?.['language']?.['affirmations_categories'])}{' '}
        </Text>
      </View>
    )
  }
  renderOld() {
    return (
      <SafeAreaView style={{ backgroundColor: 'black' }}>
        <Loader loading={this.state.loading} modalText={this.state.modalText} />
        <View style={{ height: '100%', width: '100%', padding: 20, paddingTop: 30 }}>
          {this.renderHeader()}
          {this.state.categorias && (
            <View style={{ marginBottom: 100 }}>
              <FlatList
                data={this.state.categorias}
                renderItem={({ item, index }) => {
                  const imagePath = this.state.imagenes[index % this.state.imagenes.length]
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('PhrasesScreen', {
                          routineId: this.props.navigation.state.params.routineId,
                          categoryId: item.id,
                        })
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottomColor: '#5c9c93',
                          borderWidth: 1,
                          paddingHorizontal: 10,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            width: '90%',
                          }}
                        >
                          <Image source={imagePath} style={{ width: 30, height: 30, borderRadius: 15 }} />
                          <Text style={{ paddingLeft: 10, paddingRight: 5, color: 'white', fontSize: 20 }}>{item.name}</Text>
                        </View>
                        <View style={{ width: '10%', alignItems: 'flex-end' }}>
                          <Image source={require('img/icon_rightarrow.png')} style={{ width: 13, height: 20 }} />
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                }}
              />
            </View>
          )}
          <View style={{ height: 75 }} />
        </View>
        <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack />
      </SafeAreaView>
    )
  }

  render() {
    return (
      <View style={tailwind('w-full h-full relative')}>
        <ImageBackground source={BgMainIconImg} imageStyle={{ resizeMode: 'stretch' }} style={tailwind('absolute h-full w-full ')} />
        <View style={[tailwind('absolute w-full h-full'), { backgroundColor: secondaryColor(0.8) }]}></View>
        {/* 
        {this.renderAddAffirmationModal()} */}
        <SafeAreaView style={tailwind('flex')}>
          <ScrollView>
            <View style={tailwind('flex p-6 flex-col justify-start pb-24')}>
              {/* Header */}
              {this.renderHeader()}
              {/* Status */}
              {this.renderStatus()}
              {/* Categories */}
              {this.renderCategories()}
            </View>
          </ScrollView>
        </SafeAreaView>
        <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack />
      </View>
    )
  }

  renderHeader = () => {
    return (
      <View style={tailwind('flex flex-col')}>
        {/* Top Buttons */}
        <View style={tailwind('flex flex-row justify-between mb-2')}>
          <TouchableOpacity
            style={tailwind('relative')}
            onPress={() => {
              this.props.navigation.navigate('TodayActivitiesScreen')
            }}
          >
            <Text>{global?.language?.cancel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tailwind('relative')}
            onPress={() => {
              this.props.navigation.navigate('TodayActivitiesScreen')
            }}
          >
            <Text>{global?.language?.save}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderStatus = () => {
    let { routines = [] } = this.props
    let routineId = this.props.navigation?.state?.params?.routineId

    let routine = routines.filter(r => (r.id = routineId)).pop()

    let selectedPhrases = this.context.selectedPhrases || []
    let actualPhrases = this.context.actualPhrases || []

    let actual_count = actualPhrases.length
    let selected_count = selectedPhrases.length
    let count = actual_count + selected_count

    return (
      <View style={tailwind('flex w-full mt-2')}>
        <View style={tailwind('flex justify-center w-full mb-3')}>
          {/* Titulo */}
          <Text style={tailwind('text-3xl font-bold text-white capitalize text-center')}> {global?.['language']?.['affirmations_categories']} </Text>
        </View>
        <View style={tailwind('mb-5')}>
          {/* Info */}
          <Text style={tailwind('text-white text-xl text-center')}>
            {global?.language?.affirmations_categories_subtitle || 'Navega en las categorias y selecciona 1 y 5 afirmaciones para la rutina'} {routine.name}
          </Text>
        </View>
        <View style={tailwind('flex justify-center items-center')}>
          {/* Icons */}
          <View style={tailwind('flex flex-row')}>
            {[1, 2, 3, 4, 5].map(i => {
              return count >= i ? (
                <View style={tailwind('w-8 h-8 rounded-full flex justify-center items-center mx-2 bg-green-300')}>{/*  */}</View>
              ) : (
                <View style={tailwind('w-8 h-8 rounded-full flex justify-center items-center mx-2 bg-white bg-opacity-' + (60 - 10 * i))}>
                  {/* <Icon type='FontAwesome' name={'chevron-right'} /> */}
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }

  renderCategories = () => {
    return (
      <View>
        <View style={tailwind('flex justify-center items-center pt-6 pb-3')}>
          <View>
            <Text style={tailwind('text-3xl text-white font-bold')}>{global?.language?.label_categories}</Text>
          </View>
        </View>
        {this.state.categorias && (
          <View style={{ marginBottom: 100 }}>
            <FlatList data={this.state.categorias} renderItem={this.renderCategory} />
          </View>
        )}
      </View>
    )
  }

  renderCategory = ({ item, index }) => {
    let selectedPhrases = this.context.selectedPhrases || []
    let actualPhrases = this.context.actualPhrases || []

    let actual_count = actualPhrases.filter(p => p.category_id == item.id).length
    let selected_count = selectedPhrases.filter(p => p.category_id == item.id).length
    let count = actual_count + selected_count

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('PhrasesScreen', {
            routineId: this.props.navigation.state.params.routineId,
            categoryId: item.id,
            category: item,
          })
        }}
      >
        <View style={[tailwind('flex flex-row justify-between border-b border-white border-opacity-25 px-0')]}>
          <View
            style={[
              {
                width: '10%',
              },
              tailwind('flex-row items-center py-4 px-0'),
            ]}
          >
            <Text style={[tailwind('pl-2 pr-1 text-white text-xl font-bold text-opacity-75')]}>{!!count && `(${count})`}</Text>
          </View>
          <View
            style={[
              {
                width: '80%',
              },
              tailwind('flex-row items-center py-4 px-0'),
            ]}
          >
            <Text style={[tailwind(' pr-1 text-white text-xl font-bold text-opacity-75')]}>{item.name}</Text>
          </View>
          <View style={[{ width: '10%' }, tailwind('flex justify-center items-center ')]}>
            <Icon type='FontAwesome' name={'chevron-right'} style={tailwind('text-white text-lg text-opacity-75')} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = state => ({
  categories: datasetSelector(state, 'categories', { list_format: true }),
  routines: datasetSelector(state, 'routines', { list_format: true }),
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AffirmationCategoryListScreen)
