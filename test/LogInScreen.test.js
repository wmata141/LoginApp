import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LogIn from '../src/screens/LogInScreen';
import { MyContext } from '../src/MyContext';

// Mock de funciones
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('axios');
jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn(),
}));

describe('LogIn Component', () => {
  const mockSetState = jest.fn();
  const contextValue = { state: {}, setState: mockSetState };

  it('should render correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <MyContext.Provider value={contextValue}>
        <LogIn />
      </MyContext.Provider>
    );

    expect(getByPlaceholderText('email')).toBeTruthy();
    expect(getByPlaceholderText('password')).toBeTruthy();
    expect(getByText('sign_in')).toBeTruthy();
  });

  it('should show alert when fields are empty', async () => {
    const { getByText } = render(
      <MyContext.Provider value={contextValue}>
        <LogIn />
      </MyContext.Provider>
    );

    fireEvent.press(getByText('sign_in')); // Simula presionar el botón de Iniciar Sesión

    await waitFor(() => {
      expect(getByText('empty_fields')).toBeTruthy(); // Verifica que se mostró la alerta
    });
  });

  it('should call setItem and navigate on successful login', async () => {
    // Simula la respuesta de axios
    require('axios').post.mockResolvedValue({ data: { token: 'fake-token' } });
    const { getByPlaceholderText, getByText } = render(
      <MyContext.Provider value={contextValue}>
        <LogIn />
      </MyContext.Provider>
    );

    fireEvent.changeText(getByPlaceholderText('email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('password'), 'Password1!');

    fireEvent.press(getByText('sign_in'));

    await waitFor(() => {
      expect(require('@react-native-async-storage/async-storage').setItem)
        .toHaveBeenCalled(); // Verifica si se llamó a setItem
      expect(mockSetState).toHaveBeenCalledWith(expect.objectContaining({
        user: expect.any(Object),
      })); // Verifica que el estado se haya actualizado
    });
  });
});