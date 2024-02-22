import { StyleSheet } from 'react-native';
import { colors } from 'src/modules/constants/colors';

export const styles = StyleSheet.create({
  cardContent: {
    width: '100%',
  },
  btnEveryDay: {
    maxWidth: '40%',
    paddingHorizontal: 2,
  },
  backgroundWhite: {
    backgroundColor: '#fff',
  },
  backgroundNotSelected: {
    backgroundColor: '#4E5A59',
    opacity: 0.8
  },
  backgroundBlackOpacity: {
    backgroundColor: '#192323',
    marginTop: 20
  },
  backgroundSelected: {
    backgroundColor: "#00DDC7",
  },
  marginCard: {
    marginTop: 20,
    opacity: 0.8,
  },
  avatar: {
    borderRadius: 25,
    width: 50,
    height: 50,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  maxWidthBox: {
    maxWidth: '100%',
  },
  textoDiaLetra: {
    color: "white"
  },
  // modal estilos
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    paddingTop: 30
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  tituloRecordatorios: {
    color: "white",
    fontSize: 23,
    fontWeight: 'bold',
  },
  subTituloRecordatorios: {
    color: "white",
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  tituloView: {
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10
  },
  dias: {
    justifyContent: "center",
    marginVertical: 20,
  },
});
