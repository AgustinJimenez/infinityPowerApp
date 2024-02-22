import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ProgressCircle from '../../components/ProgressCircle'
import { scale } from '../../helpers/styles'
import Modal from 'react-native-modal'
import { globalStyles } from '../../helpers/styles'

const styles = StyleSheet.create({
  meditationPercentageCircleContainer: {
    top: scale(0.7),
    width: '100%',
    alignItems: 'center',
  },
  modal: { alignItems: 'center', margin: 0 },
  modalTitleText: {
    fontWeight: '700',
    fontSize: 20,
    color: 'rgba(255,255,255,1)',
    paddingBottom: scale(0.6),
    paddingTop: scale(0.2),
  },
  modalBottomLabel: {
    fontWeight: '400',
    fontSize: 16,
    color: 'rgba(255,255,255,1)',
    paddingBottom: scale(),
    paddingTop: scale(0.4),
    textAlign: 'center',
  },
  modalContentContainer: {
    ...globalStyles.darkTransparentBox,
    position: 'absolute',
    width: '90%',
    top: scale(1.3),
    backgroundColor: 'rgba(35, 35, 36, 1)',
    alignItems: 'center',
  },
})

const MeditationPercentageCircleComponent = ({ onPress, percentage = 0 }) => (
  <ProgressCircle
    onPress={onPress}
    achieved={percentage >= 75}
    progress={Math.round(percentage)}
    size={scale(3.3)}
    titleSize={scale()}
    subtitle=''
    showCheckFailIcon={false}
    strokeWidth={scale(0.3)}
  />
)

const HabitsAverageByDaysPercentageCircle = ({ percentage = 0 }) => {
  const [modalIsOpen, setModalVisibility] = React.useState(false)

  const toggleModal = React.useCallback(() => setModalVisibility(!modalIsOpen), [modalIsOpen])

  return (
    <View style={styles.meditationPercentageCircleContainer}>
      <MeditationPercentageCircleComponent onPress={toggleModal} percentage={percentage} />
      <Modal
        isVisible={modalIsOpen}
        onBackdropPress={toggleModal}
        animationIn='fadeIn'
        animationOut='fadeOut'
        style={styles.modal}
        backdropColor='rgba(0,0,0,0.7)'
      >
        <View style={styles.modalContentContainer}>
          <Text style={styles.modalTitleText}>% de Hábitos</Text>
          <MeditationPercentageCircleComponent onPress={toggleModal} percentage={percentage} />
          <Text style={styles.modalBottomLabel}>Es el promedio de logro de los hábitos activos</Text>
        </View>
      </Modal>
    </View>
  )
}

export default HabitsAverageByDaysPercentageCircle
