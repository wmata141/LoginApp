import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ContactHeader from '../components/UserListHeader';
import ContactList from '../components/UserList';
import { colors } from '../constants';

const ContactScreen = props => {
  const [usersNumber, setUsersNumber] = useState(0);
  
  const { userId } = props.route.params;

  return (
    <ScrollView style={styles.scrollViewStyle}>
      <ContactHeader usersNumber={usersNumber}/>
      <ContactList userId={userId} setUsersNumber={setUsersNumber}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    backgroundColor: colors.background,
  },
});

export default ContactScreen;
