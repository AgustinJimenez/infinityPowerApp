import React from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import * as fn from '../../helpers/scripts'
import CheckedImage from 'img/home-action.png'
import { globalStyles } from '../../helpers/styles'

const CategoryListItems = ({
  category,
  listItemsFromCategory,
  onPressCategoryListItem,
  categoryListItemIsChecked,
  renderCategoryListItemLabel,
  categoryListItemIsAllowed,
  categoryListItemsEmptyMessage,
  rightIconComponent,
  isLast,
  sort,
}) => {
  let categoryListItems = []
  categoryListItems = listItemsFromCategory(category) || []

  if (!categoryListItems.length)
    return (
      <View style={{ marginBottom: 15 }}>
        <View
          style={{
            justifyContent: 'center',
            color: 'white',
            alignItems: 'center',
            marginVertical: 15,
          }}
        >
          <Text style={{ color: 'white' }}>{categoryListItemsEmptyMessage || global?.language?.no_data}</Text>
        </View>
        {!isLast && <View style={globalStyles.listDivider} />}
      </View>
    )

  if (!!sort) categoryListItems.sort(sort)

  return categoryListItems?.map((category_item, key) => {
    //console.log('rend ===> ', { categoryListItems, count: categoryListItems.length, key })
    if (categoryListItemIsAllowed(category_item))
      return (
        <TouchableOpacity key={key} onPress={event => onPressCategoryListItem(category_item, event, key)} style={{ marginBottom: 15 }}>
          <View style={globalStyles.categoryListItemContainer}>
            <View style={{ flexDirection: 'row' }}>
              <View style={globalStyles.infoPoint} />
              <View style={globalStyles.categoryListItemTextContainer}>
                <Text style={globalStyles.categoryListItemText}>
                  {/* <Text style={globalStyles.categoryListItemSubText}>{!fn.isEmpty(habit.children) ? '' : habit.padre !== undefined ? habit.padre + '\n' : ''}</Text> */}
                  {renderCategoryListItemLabel(category_item)}
                </Text>
              </View>
              <View style={globalStyles.categoryListItemIconContainer}>{categoryListItemIsChecked(category_item) && rightIconComponent(category_item)}</View>
            </View>
            {key + 1 === categoryListItems.length && !isLast && <View style={globalStyles.listDivider} />}
          </View>
        </TouchableOpacity>
      )
  })
}

const CategoryList = ({
  categoriesList = [],
  renderCategoryLabel = () => null,
  listItemsFromCategory = () => {},
  onPressCategoryListItem = () => {},
  categoryListItemIsChecked = () => false,
  renderCategoryListItemLabel,
  categoryListItemIsAllowed = () => true,
  categoryListItemsEmptyMessage,
  rightIconComponent = () => <Image source={CheckedImage} style={globalStyles.categoryListItemIconImage} />,
  isLoading = false,
  sort = '' || (() => {}),
}) => {
  let List = null
  if (!categoriesList?.length)
    List = (
      <View
        style={{
          justifyContent: 'center',
          color: 'white',
          alignItems: 'center',
          marginVertical: 30,
        }}
      >
        <Text style={{ color: 'white' }}>{global?.language?.no_data}</Text>
      </View>
    )
  else
    List = categoriesList?.map((category, key) => {
      let categoryLabel = renderCategoryLabel(category)

      let isLast = key + 1 === categoriesList.length
      let isFirst = !key

      return (
        <React.Fragment key={key}>
          {!!renderCategoryLabel && (
            <View style={{ marginBottom: 5 }}>
              <Text style={globalStyles.categoryListTitle}>{categoryLabel}</Text>
            </View>
          )}
          {CategoryListItems({
            category,
            listItemsFromCategory,
            onPressCategoryListItem,
            categoryListItemIsChecked,
            renderCategoryListItemLabel,
            categoryListItemIsAllowed,
            categoryListItemsEmptyMessage,
            rightIconComponent,
            isLoading,
            isFirst,
            isLast,
            sort,
          })}
        </React.Fragment>
      )
    })

  return <>{List}</>
}

export default CategoryList
