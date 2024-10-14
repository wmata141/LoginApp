import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

jest.mock('../src/screens/SplashScreen', () => () => <></>);
jest.mock('../src/screens/LogInScreen', () => () => <></>);
jest.mock('../src/screens/UserListScreen', () => () => <></>);
jest.mock('../src/screens/UserDetailScreen', () => () => <></>);
jest.mock('../src/MyContext', () => {
  return {
    MyProvider: ({ children }) => <>{children}</>
  };
});
jest.mock('expo-dev-client', () => { });

describe('App Component', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('MyProvider')).toBeTruthy();
  });

  // it('should have a StatusBar component', () => {
  //   const { getByTestId } = render(<App />);
  //   const statusBar = getByTestId('StatusBar');
  //   expect(statusBar).toBeTruthy();
  // });

  // Aquí puedes agregar más pruebas para verificar la presencia de otras pantallas, etc.
});