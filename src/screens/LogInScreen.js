import React, { useState, useEffect, useContext } from 'react';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import axios from "axios";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert, Image, TextInput } from 'react-native';
import { useTranslation } from "react-i18next";
import { EXPO_API_URL } from "@env";
import * as Clipboard from 'expo-clipboard';
import ButtonGradient from '../components/ButtonGradient';
import SvgTopGradient from '../components/SvgTopGradient';
import QrModal from '../components/QrModal';
import i18next from '../services/i18next';
import { playSoundClick } from '../services/playSound';
import usa from '../assets/usa.png'
import spain from '../assets/spain.png'
import brasil from '../assets/brasil.png'
import { colors } from '../constants';
import { MyContext } from '../MyContext';

const { width, height } = Dimensions.get('window')

// IDIOMAS DISPONIBLES
const countryLanguage = [
  { id: 0, name: 'U.S.A.', language: 'en', icon: usa },
  { id: 1, name: 'Spain', language: 'es', icon: spain },
  { id: 2, name: 'Brasil', language: 'ptbr', icon: brasil },
]

// VISTA DE LOGUEO Y SELECCION DE LOS IDIOMAS DE PANTALLA
const LogIn = ({ navigation }) => {
  const [language, setLanguage] = useState("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, setState } = useContext(MyContext); // Utiliza el contexto

  const { t } = useTranslation();

  useEffect(() => {
    getData()
  }, [])

  // FUNCION PARA OBTENER LA DATA DEL FONDO DE PANTALLA GUARDADO EN MEMORIA
  const getData = async () => {
    try {
      const languageGetItem = await ReactNativeAsyncStorage.getItem('language');
      const userGetItem = await ReactNativeAsyncStorage.getItem('user');

      if (languageGetItem != null) {
        const languageParse = languageGetItem
        i18next.changeLanguage(languageParse)
        setLanguage(languageParse);
      }

      if (userGetItem != null) {
        const userParse = JSON.parse(userGetItem)
        setState({ ...state, user: userParse });
        navigation.navigate('UserList')
      }

    } catch (error) {
      console.log(error);
    }
  };

  // Validar si el formato de una dirección de correo electrónico es correcta.
  const verifyEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  // Validar si el formato de una dirección de correo electrónico es correcta.
  const verifyPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.{6,}).*$/;
    return regex.test(password);
  }

  // FUNCION PARA MOSTRAR EL CARTEL DE ALERTA POR UN CAMPO VACIO EN EL FORMULARIO
  const emptyFields = () => {
    try {
      Alert.alert(
        t('alert'),
        t('empty_fields'),
        [
          {
            text: t('confirm'),
            onPress: async () => {
              playSoundClick()
            }
          }
        ]
      );
    } catch (error) {
      console.log("error", error);
    }
  }

  // FUNCION PARA MOSTRAR EL CARTEL DE ALERTA POR UN CAMPO CON FORMATO INVALIDO EN EL FORMULARIO
  const formatFields = () => {
    try {
      Alert.alert(
        t('alert'),
        t('format_fields'),
        [
          {
            text: t('confirm'),
            onPress: async () => {
              playSoundClick()
            }
          }
        ]
      );
    } catch (error) {
      console.log("error", error);
    }
  }

  // FUNCION PARA MOSTRAR EL CARTEL DE ALERTA POR UN ERROR DEL SERVIDOR
  const connectionError = (errorMessage) => {
    try {
      Alert.alert(
        t('alert'),
        errorMessage,
        [
          {
            text: t('confirm'),
            onPress: async () => {
              playSoundClick()
            }
          }
        ]
      );
    } catch (error) {
      console.log("error", error);
    }
  }

  const onPressHandleLogIn = async () => {

    if (email === '' || password === '') {
      return emptyFields()
    }

    // if (!verifyEmail(email) && !verifyPassword(password)) {
    //   return formatFields()
    // }

    let objData = {
      "email": email,
      "password": password
    }

    try {
      const response = await axios.post(`${EXPO_API_URL}/register`, objData)

      objData.token = response.data.token
      delete objData.password;

      const userString = JSON.stringify(objData);

      await ReactNativeAsyncStorage.setItem('user', userString);

      setEmail("")
      setPassword("")

      setState({ ...state, user: objData });
      navigation.navigate('UserList')

    } catch (error) {
      console.log(error);
      const errorMessage = error.message
      connectionError(errorMessage)
    }
  };

  // FUNCION PARA AGREGAR EL LINK DE LA APP AL PORTA PAPELES
  const onPressTextCopy = async () => {
    await Clipboard.setStringAsync('https://binco.mx/');
    try {
      Alert.alert(
        t('thanks'),
        t('on_press_text_copy'),
        [
          {
            text: t('confirm'),
            onPress: async () => {
              playSoundClick()
            }
          }
        ]
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  // FUNCION PARA CAMBIAR EL LENGUAJE DEL SISTEMA
  const onPressLanguage = async (newLanguage) => {
    if (language != newLanguage) {
      playSoundClick()

      setLanguage(newLanguage)

      await ReactNativeAsyncStorage.setItem('language', newLanguage);
      i18next.changeLanguage(newLanguage)
    }
  }

  return (
    <View style={styles.mainContainer}>
      {/* FONDO AZUL */}
      <View style={styles.containerSVG}>
        <SvgTopGradient width={width} height={height / 2.5} />
      </View>

      {/* AVATAR FLOTANTE PARA ACCEDER AL COMPONENTE WELCOME */}
      <TouchableOpacity style={styles.containerLottieView} onPress={onPressHandleLogIn}>
        <LottieView
          source={require('../assets/birdBlue.json')}
          style={{ flex: 1, width: width * 0.6 }}
          autoPlay
          loop
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.title}>{t('title')}</Text>
        <Text style={styles.subTitle}>{t('sub_title')}</Text>

        <TextInput
          placeholder={t('email')}
          value={email}
          onChangeText={(texto) => setEmail(texto)}
          style={styles.textInput}
        />
        <TextInput
          placeholder={t('password')}
          value={password}
          onChangeText={(texto) => setPassword(texto)}
          style={styles.textInput}
          secureTextEntry={true}
        />

        {/* BOTON PARA ACCEDER AL COMPONENTE WELCOME */}
        <View style={styles.buttonGradient}>
          <ButtonGradient
            textButton={t('sign_in')}
            onPress={e => onPressHandleLogIn(e)}
            colors={[colors.BLUEONE, colors.BLUETWO]}
            borderRadius={5}
          />
        </View>
        {/* <Text style={styles.forgotPassword}>{t('dont_need_account')}</Text> */}
      </View>

      {/* BOTONES PARA SELECCIONAR EL IDIOMA DEL SISTEMA */}
      <View style={styles.containerButtons}>
        {countryLanguage.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onPressLanguage(item.language)}
          >
            <Image
              source={item.icon}
              style={[
                styles.button,
                {
                  borderWidth: 1, borderStyle: 'solid', borderColor: language === item.language ? colors.BLACKONE : colors.WHITEONE
                }
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.content}>{t('choose_language')}</Text>

      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        {/* // COMPONENTE MODAL QR */}
        <QrModal />

        {/* BOTON AZUL PARA COMPARTIR APLICACION */}
        <ButtonGradient
          textButton={t('click_and_share')}
          onPress={onPressTextCopy}
          colors={[colors.BLUEONE, colors.BLUETWO]}
          borderRadius={0}
        />
      </View>
    </View>
  );
}

// ESTILOS DEL COMPONENTE ORDENADOS DE MANERA DECENDENTE POR SU USO
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  containerSVG: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLottieView: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height / 2
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: '#34434D',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5
  },
  subTitle: {
    fontSize: 15,
    color: 'gray',
    marginBottom: 5
  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  forgotPassword: {
    fontSize: 14,
    color: 'gray',
    marginTop: 20,
    marginBottom: 20
  },
  containerButtons: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  button: {
    top: 20,
    padding: 20,
    margin: 5,
    borderRadius: 70,
    width: 20,
    height: 20
  },
  content: {
    textAlign: 'center',
    padding: 20,
    fontSize: 20,
    color: '#34434D',
  },
  buttonGradient: {
    width: '40%',
    marginTop: 15
  },
  adView: {
    alignItems: 'flex-start',
    alignSelf: 'stretch'
  },
});

export default LogIn