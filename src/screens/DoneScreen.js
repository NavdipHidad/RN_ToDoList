import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import TaskScreen from './Task';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTaskID, setTasks} from '../redux/actions';
import CheckBox from '@react-native-community/checkbox';
Icons.loadFont();

const DoneScreen = ({navigation}) => {
  const {tasks} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const deleteTask = id => {
    const filteredTasks = tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        dispatch(setTasks(filteredTasks));
        Alert.alert('Success', 'Item removed successfully');
      })
      .catch(err => console.log(err));
  };

  const checkTask = (id, newValue) => {
    const index = tasks.findIndex(task => task.ID === id);
    if (index > -1) {
      let newTasks = [...tasks];
      newTasks[index].Done = newValue;
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasks(newTasks));
          Alert.alert('Success', 'Item state is changed');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <View style={styles.screen}>
      {/* <Text style={styles.screenTxt}>ToDo list </Text> */}

      <FlatList
        data={tasks.filter(task => task.Done === true)}
        // data={tasks}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.tasks}
            onPress={() => {
              dispatch(setTaskID(item.ID));
              navigation.navigate('TaskScreen');
            }}>
            <View style={styles.item_row}>
              <CheckBox
                value={item.Done}
                onValueChange={newValue => {
                  checkTask(item.ID, newValue);
                }}
              />
              <View style={styles.item_data}>
                <Text numberOfLines={1} style={styles.tasksTitleTxt}>
                  {item.Title}
                </Text>
                <Text numberOfLines={2} style={styles.tasksDescTxt}>
                  {item.Desc}
                </Text>
              </View>
              <TouchableOpacity style={styles.item_binIcon}>
                <Icons
                  name="trash"
                  size={30}
                  color={'#ff3636'}
                  onPress={() => {
                    deleteTask(item.ID);
                  }}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#0080ff',
  },
  logo: {
    height: 150,
    width: 150,
    margin: 10,
  },
  screenTxt: {
    // color: '#ffffff',
    fontSize: 27,
  },
  tasks: {
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
  },
  tasksTitleTxt: {
    fontSize: 25,
  },
  tasksDescTxt: {
    fontSize: 20,
    color: '#999999',
    marginTop: 7,
  },
  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_data: {width: '75%', marginLeft: 4},
  item_binIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DoneScreen;
