import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen'
import LogInScreen from './src/screens/LogInScreen'
import UserListScreen from './src/screens/UserListScreen'
import UserDetailScreen from './src/screens/UserDetailScreen'
import { colors } from './src/constants';
import { MyProvider } from './src/MyContext';

import 'expo-dev-client';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <MyProvider>
      <NavigationContainer>
        <StatusBar translucent={true} backgroundColor="transparent" color={colors.BLACKONE} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="UserList" component={UserListScreen} />
          <Stack.Screen name="UserDetail" component={UserDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MyProvider>
  )
}

export default App