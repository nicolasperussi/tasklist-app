import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Task({id, title, date, time, onDelete}) {
  return (
    <View style={styles.taskWrapper}>
      <View style={styles.infoWrapper}>
        <Text style={styles.infoText}>{title}</Text>
        <Text style={styles.infoText}>{date}</Text>
        <Text style={styles.infoText}>{time}</Text>
      </View>
      <Icon
        style={styles.deleteIcon}
        onPress={() => {
          Alert.alert(
            'Confirmar exclusão',
            `Deseja realmente excluir a tarefa ${title}?`,
            [
              {
                text: 'Não',
                style: 'cancel',
              },
              {text: 'Sim', onPress: () => onDelete(id)},
            ],
          );
        }}
        name="trash-alt"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  taskWrapper: {
    padding: 10,
    borderColor: '#e5e5e5',
    borderWidth: 5,
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 10,
  },
  infoWrapper: {
    flex: 9,
  },
  infoText: {
    fontSize: 18,
  },
  deleteIcon: {
    color: 'red',
    flex: 1,
    fontSize: 25,
  },
});
