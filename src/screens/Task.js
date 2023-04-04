import React, {useState, useEffect} from 'react';
import {
  Alert,
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import Icons from 'react-native-vector-icons/Ionicons';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import CameraScreen from './Camera';
import {SafeAreaView} from 'react-native-safe-area-context';
import PushNotification from 'react-native-push-notification';
Icons.loadFont();

const TaskScreen = ({navigation}) => {
  const {tasks, taskID, token} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [done, setDone] = useState(false);
  const [showBellModal, setShowBellModal] = useState(false);
  const [bellTime, setBellTime] = useState('1');

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    // console.warn(undefined === undefined);
    if (Task) {
      setTitle(Task.Title);
      setDesc(Task.Desc);
      setDone(Task.Done);
    }
  };

  const setTaskFunc = () => {
    if (title.length == 0) {
      Alert.alert('Warning!', 'Please enter Tasks title');
    } else {
      try {
        var Task = {ID: taskID, Title: title, Desc: desc, Done: done};
        const index = tasks.findIndex(task => task.ID === taskID);
        // console.warn('Updt tasks: ', index);
        let newTasks = [];
        if (index > -1) {
          newTasks = [...tasks];
          newTasks[index] = Task;
        } else {
          newTasks = [...tasks, Task];
        }
        // console.warn('Task Data:- ', Task);
        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
          .then(() => {
            dispatch(setTasks(newTasks));
            Alert.alert('Success!', 'Task saved successfully');
            navigation.goBack();
          })
          .catch(err => console.log('Err in setTaskFunc Task', err));
      } catch (err) {
        console.log('Err in set tasks at Task', err);
      }
    }
  };

  PushNotification.createChannel({
    channelId: 'task-channel',
    channelName: 'Task Channel',
  });

  const setTaskAlarm = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'task-channel',
      title: title,
      message: desc,
      date: new Date(Date.now() + parseInt(bellTime) * 60 * 1000),
      allowWhileIdle: true,
    });
  };

  // const setTaskAlarm = () => {
  //   const date = new Date();
  //   date.setSeconds(date.setSeconds() + 5);
  //   PushNotificationIOS.addNotificationRequest({
  //     id: 'title',
  //     title: 'This is title',
  //     subtitle: 'alerts body',
  //     // fireDate: new Date(Date.now() + parseInt(bellTime) * 60 * 1000),
  //     // fireDate: date.toISOString(),
  //     // fireDate: new Date(Date.now() + 5 * 1000).toISOString(),
  //   });
  // };

  // const setTaskAlarm = () => {
  //   PushNotification.localNotificationSchedule({
  //     alertTitle: 'title',
  //     alertBody: 'alt body',
  //   });
  // };

  return (
    <ScrollView>
      <Modal
        visible={showBellModal}
        transparent
        onRequestClose={() => {
          setShowBellModal(false);
        }}
        animationType="slide"
        hardwareAccelerated>
        <View style={styles.centered_view}>
          <View style={styles.bell_modal}>
            <View style={styles.bell_body}>
              <Text style={styles.modal_text}>Remind me After</Text>
              <TextInput
                maxLength={1}
                keyboardType="numeric"
                style={styles.bell_Input}
                value={bellTime}
                onChangeText={value => {
                  setBellTime(value);
                }}
              />
              <Text style={styles.modal_text}>Minute(s)</Text>
            </View>
            <View style={styles.bell_buttons}>
              <TouchableOpacity
                style={styles.bell_cancel_buttons}
                onPress={() => {
                  setShowBellModal(false);
                }}>
                <Text style={styles.modal_text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bell_ok_buttons}
                onPress={() => {
                  setTaskAlarm();
                  setShowBellModal(false);
                }}>
                <Text style={styles.modal_text}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.screen}>
        <TextInput
          value={title}
          style={styles.input}
          placeholder="Title"
          onChangeText={value => {
            setTitle(value);
          }}
        />
        <TextInput
          value={desc}
          style={styles.input}
          placeholder="Description"
          multiline
          onChangeText={value => {
            setDesc(value);
          }}
        />
        <View style={styles.extra_row}>
          <TouchableOpacity style={styles.timerBtn}>
            <Icons
              name="notifications"
              size={30}
              color={'#ffffff'}
              onPress={() => {
                setShowBellModal(true);
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.timerBtn}>
            <Icons
              name="camera"
              size={30}
              color={'#ffffff'}
              onPress={() => {
                navigation.navigate('CameraScreen');
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxView}>
          <CheckBox
            value={done}
            onValueChange={newValue => setDone(newValue)}
          />
          <Text style={styles.checkboxTxt}>Is Done !!</Text>
        </View>
        <Button title="Save Task" onPress={setTaskFunc} />
        <Button
          title={'Next page'}
          onPress={() => navigation.navigate('Dashboard')}
          // onPress={getToken}
        />
      </View>
      <Text>Token by redux {token}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    // backgroundColor: '#0080ff',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#555555',
    backgroundColor: '#ffffff',
    fontSize: 22,
    margin: 10,
    paddingVertical: 2,
    paddingHorizontal: 5,
    // paddingTop: ,
  },
  checkboxView: {
    flexDirection: 'row',
  },
  checkboxTxt: {
    fontSize: 20,
    margin: 5,
    // color: '#999',
  },
  extra_row: {
    flexDirection: 'row',
  },
  timerBtn: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0080ff',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  centered_view: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_modal: {
    width: 300,
    height: 200,
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  bell_body: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_buttons: {
    flexDirection: 'row',
    height: 50,
  },
  bell_Input: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#555555',
    borderRadius: 10,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  bell_cancel_buttons: {
    flex: 1,
    borderColor: '#000000',
    borderWidth: 1,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_ok_buttons: {
    flex: 1,
    borderColor: '#000000',
    borderWidth: 1,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskScreen;
