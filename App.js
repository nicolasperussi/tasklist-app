/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import Task from './Task';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export default function App() {
  StatusBar.setBackgroundColor('rgba(0,0,0,0)');

  const inputRef = useRef(null);
  //#region Task Management
  const [tasks, setTasks] = useState([]);
  // Store current tasks
  const storeTasks = async tasksToStore => {
    try {
      // console.log(tasks);
      const jsonValue = JSON.stringify(tasksToStore);
      // console.log("Storing tasks value: " + jsonValue);
      await AsyncStorage.setItem('tasks', jsonValue);
    } catch (error) {}
  };

  const saveTask = () => {
    setmodalVisibility(!modalVisibility);
    const tasksToSave = [
      ...tasks,
      {
        id: Math.floor(Math.random() * Date.now()),
        title: newTaskTitle,
        date: newTaskDate,
        time: newTaskTime,
      },
    ];
    storeTasks(tasksToSave);
    setTasks(tasksToSave);
    // console.log("Tasks:" + tasks);
  };
  // Get saved tasks
  useEffect(() => {
    (async () => {
      try {
        const storedTasks = JSON.parse(await AsyncStorage.getItem('tasks'));
        // console.log("Stored tasks: " + storedTasks);
        setTasks(
          storedTasks || [
            {id: 1, title: 'Test task', date: '25/1/21', time: '13:00'},
          ],
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const deleteTask = id => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
    storeTasks(filteredTasks);
  };
  //#endregion

  //#region Modal
  const [modalVisibility, setmodalVisibility] = useState(false);
  const [datePickerVisibility, setdatePickerVisibility] = useState(false);
  const [mode, setMode] = useState('date');

  const [newTaskDate, setNewTaskDate] = useState();
  const [newTaskTime, setNewTaskTime] = useState();
  const [newTaskTitle, setnewTaskTitle] = useState('');

  const onChange = (event, selectedDate) => {
    setdatePickerVisibility(Platform.OS === 'ios');
    const currentDate = selectedDate || newTaskDate;
    if (mode === 'date') {
      setNewTaskDate(
        Intl.DateTimeFormat('pt-BR').format(new Date(currentDate)),
      );
    } else {
      setNewTaskTime(new Date(currentDate).toLocaleTimeString().slice(0, -3));
    }
  };

  useEffect(() => {
    if (modalVisibility) {
      setNewTaskDate(Intl.DateTimeFormat('pt-BR').format(new Date()));
      setNewTaskTime(new Date().toLocaleTimeString().slice(0, -3));
      setnewTaskTitle('');
    }
  }, [modalVisibility]);
  //#endregion

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <StatusBar translucent={true} />

        <View style={styles.header}>
          <Text style={styles.headerText}>Tasklist - Nicolas Perussi</Text>
        </View>

        <View style={styles.taskList}>
          {tasks &&
            tasks.map(task => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  date={task.date}
                  time={task.time}
                  onDelete={deleteTask}
                />
              );
            })}
        </View>
      </ScrollView>
      <Modal
        visible={modalVisibility}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          inputRef?.current?.clear();
          setmodalVisibility(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalInfo}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Text style={styles.modalInfoText}>Tarefa: </Text>
                <TextInput
                  onLayout={() => {
                    setTimeout(() => {
                      inputRef?.current?.focus();
                    }, 100);
                  }}
                  style={{
                    ...styles.modalInfoText,
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                    width: '70%',
                    marginBottom: 15,
                  }}
                  value={newTaskTitle}
                  onChangeText={text => setnewTaskTitle(text)}
                  ref={inputRef}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={styles.modalInfoText}
                  onPress={() => {
                    setMode('date');
                    setdatePickerVisibility(true);
                  }}>
                  Data: {newTaskDate}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  marginBottom: 10,
                }}>
                <Text
                  style={styles.modalInfoText}
                  onPress={() => {
                    setMode('time');
                    setdatePickerVisibility(true);
                  }}>
                  Hora: {newTaskTime}
                </Text>
              </View>
            </View>
            <View style={styles.modalButtons}>
              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#C30F0E'}}
                onPress={() => {
                  setmodalVisibility(!modalVisibility);
                }}>
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#2196F3'}}
                onPress={() => saveTask()}>
                <Text style={styles.textStyle}>Adicionar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      {datePickerVisibility && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={mode}
          is24hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          setmodalVisibility(true);
        }}
        style={styles.addButton}>
        <Icon style={styles.addButtonText} name="plus" />
      </TouchableOpacity>
    </View>
  );
}
