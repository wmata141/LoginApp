import React from 'react';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import VectorIcon from '../utils/VectorIcon';
import { colors } from '../constants';

const UserListHeader = ({ user, usersNumber, setState, state }) => {
  const navigation = useNavigation();

  const onPresshandleGoBack = () => {
    ReactNativeAsyncStorage.removeItem('user');
    setState({ ...state, user: null });

    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor={colors.primaryColor} />

      <View style={styles.headerContainer}>
        <VectorIcon
          name="arrow-back"
          type="Ionicons"
          size={24}
          color={colors.white}
          onPress={() => onPresshandleGoBack()}
        />
        <View>
          <Text style={styles.selectContact}>Select User</Text>
          <Text style={styles.count}>{usersNumber} Users</Text>
        </View>
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.selectContact}>{user.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectContact: {
    fontSize: 17,
    color: colors.white,
    marginLeft: 20,
  },
  count: {
    fontSize: 12,
    color: colors.white,
    marginLeft: 20,
    marginTop: 2,
  }
});

export default UserListHeader;
