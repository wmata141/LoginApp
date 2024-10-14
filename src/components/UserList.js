import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants';

const UserList = ({ userList }) => {
  const navigation = useNavigation();

  const onNavigate = item => {
    navigation.navigate('UserDetail', { item });
  };

  return (
    <View style={styles.container}>
      {userList.map(item => (
        <View key={item.id}>
          <TouchableOpacity
            onPress={() => onNavigate(item)}
            style={styles.userContainer}>
            <View style={styles.imgNameContainer}>
              <Image source={{ uri: item.avatar }} style={styles.imgStyle} />
              <Text style={styles.text}>{item.first_name} {item.last_name}</Text>
            </View>
            <Text style={styles.text}>{item.email}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 15,
    flex: 1,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',    
  },
  imgNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  imgStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  text: {
    fontSize: 15,
    color: colors.textColor,
    marginLeft: 15,
  },
});

export default UserList;
