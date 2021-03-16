import {StatusBar, StyleSheet} from 'react-native';

export default StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight / 2,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  modalInfo: {},
  modalInfoText: {
    fontSize: 20,
  },
  modalButtons: {
    marginTop: 20,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  openButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
  },
  addButton: {
    backgroundColor: 'dodgerblue',
    height: 60,
    width: 60,
    borderRadius: 30,
    position: 'absolute',
    right: 25,
    bottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  addButtonText: {
    fontSize: 25,
    color: 'white',
  },
});
