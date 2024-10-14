import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { ScrollView, StyleSheet } from 'react-native';
import { EXPO_API_URL } from "@env";
import ContactHeader from '../components/UserListHeader';
import UserList from '../components/UserList';
import { colors } from '../constants';
import { MyContext } from '../MyContext';

const UserListScreen = () => {
  const [userList, setUserList] = useState([]);
  const [usersNumber, setUsersNumber] = useState(0);
  const { state, setState } = useContext(MyContext);  
  
  useEffect(() => {
    getData()
  }, [])

  // FUNCION PARA OBTENER LA DATA DE LOS USUARIOS
  const getData = async () => {
    try {
      const response = await axios.get(`${EXPO_API_URL}/users`)

      setUserList(response.data.data);
      setUsersNumber(response.data.data.length)

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.scrollViewStyle}>
      <ContactHeader user={state.user} usersNumber={usersNumber} state={state} setState={setState}/>
      <UserList userList={userList} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    backgroundColor: colors.background,
  },
});

export default UserListScreen;
