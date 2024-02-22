import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { scale } from '../../helpers/styles'
import ActivityIcon from './ActivityIcon'
import ListItemsBox from '../ListItemsBox'
import moment from 'moment'

const PillarsActivitiesListItems = ({ items = [], renderBottomSection = null, useScroll = true }) => {
  if (!items.length)
    return <Text style={{ color: 'white', textAlign: 'center', marginTop: scale(), fontSize: scale(0.5) }}>{global?.['language']?.['no_data']}</Text>
  moment.locale('es', {
    weekdaysShort: 'dom_lun_mar_miér_jue_vié_sáb'.split('_'),
  })
  return (
    <ListItemsBox
      useScroll={useScroll}
      items={items}
      renderItem={(
        {
          title,
          extra_title = null,
          right_title,
          subtitles = [],
          type,
          icon,
          data = null,
          onPressTitle,
          onPressCard,
          border_color = undefined,
          subtitlesStyle = {},
          titleStyle,
          dataset_index,
          id,
        },
        key,
      ) => {
        if (typeof subtitles === 'string') subtitles = [subtitles]

        let BottomSection = null
        let SubtitlesSection = null

        if (!!renderBottomSection && typeof renderBottomSection === 'function')
          BottomSection = renderBottomSection({ title, right_title, subtitles, type, icon, data, onPressCard, dataset_index, id }, key)

        SubtitlesSection = () =>
          subtitles
            ?.filter?.(subtitle => !!subtitle)
            .map((subtitle, key) => (
              <Text key={key} style={[{ color: 'white', marginRight: scale(1), fontSize: scale(0.45) }, subtitlesStyle]}>
                {subtitle}
              </Text>
            ))
        //console.log('HERE ===> ', {title, subtitles, SubtitlesSection})
        return (
          <TouchableOpacity onPress={onPressTitle} disabled={!onPressTitle}>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              {type !== 'closing_report' && (
                <View
                  style={{
                    width: '15%',
                    alignItems: 'center',
                  }}
                >
                  <ActivityIcon type={type} icon={icon} data={data} />
                </View>
              )}
              <View
                style={{
                  width: type !== 'closing_report' ? '85%' : '100%',
                  paddingLeft: scale(0.2),
                  //backgroundColor: 'blue',
                  justifyContent: 'center',
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  {!!title && (
                    <Text style={[{ color: 'white', fontWeight: 'bold', marginBottom: scale(0.1), fontSize: scale(0.55) }, titleStyle]}>{title}</Text>
                  )}
                </View>
                <View style={{ flexDirection: 'row' }}>
                  {!!right_title && (
                    <View style={{ width: '100%', paddingLeft: scale(0.4), right: scale(0.4) }}>
                      {typeof right_title === 'string' ? (
                        <Text style={{ color: 'white', marginBottom: scale(0.1), fontSize: scale(0.3) }}>
                          {type === 'closing_report' && global?.language?.date_for + ' '}

                          {type === 'closing_report'
                            ? moment(data.created_at).calendar({ nextWeek: 'dddd DD/MM', lastWeek: 'dddd DD/MM' })
                            : moment(data.created_at)
                                .hour(right_title.split(':')[0])
                                .minute(right_title.split(':')[1])
                                .calendar({ nextWeek: 'ddd, HH:mm', lastWeek: 'ddd, HH:mm' })}
                        </Text>
                      ) : (
                        right_title
                      )}
                    </View>
                  )}
                </View>

                <SubtitlesSection />
                {extra_title}
              </View>
            </View>
            {!!BottomSection && <View style={{ flexDirection: 'row', paddingTop: scale(0.5), paddingLeft: scale(0.2) }}>{BottomSection}</View>}
          </TouchableOpacity>
        )
      }}
    />
  )
}

export default PillarsActivitiesListItems
