import React, { useRef, useEffect, useContext  } from 'react';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Animated, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from "react-i18next";
// import { playSoundIntro } from '../services/playSound';
import { colors } from '../constants';
import { MyContext } from '../MyContext';

// VISTA INICIAL DE LA APP
const SplashScreen = ({ navigation }) => {
    const { state, setState } = useContext(MyContext);

    const rotationValue = useRef(new Animated.Value(0)).current;

    const { t } = useTranslation();

    // FUNCION PARA MANEJAR EL MOVIMIENTOS DE LA IMAGEN
    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(rotationValue, { toValue: 1, duration: 3000, useNativeDriver: true })
        );
        animation.start();

        // playSoundIntro();

        setTimeout(async () => {
            if (navigation.getState().index < 1) {
                const userGetItem = await ReactNativeAsyncStorage.getItem('user');
                if (userGetItem != null) {
                    const userParse = JSON.parse(userGetItem)
                    setState({ ...state, user: userParse });
                    return navigation.navigate('UserList')
                }

                handleToLogin()
            }
        }, 2800);
    }, []);

    const rotateInterpolate = rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    // FUNCION PARA IR A LA VISTA LOGIN
    const handleToLogin = () => {
        navigation.navigate('LogIn')
    };

    return (
        <View style={styles.container}>
            {/* FONDO AZUL */}
            <LinearGradient
                colors={[colors.BLUEONE, colors.BLUETWO]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                {/* AVATAR FLOTANTE PARA ACCEDER AL LOGIN DEL SISTEMA */}
                <TouchableOpacity onPress={handleToLogin} style={styles.container}>
                    <Animated.Image
                        style={[styles.image, { transform: [{ rotate: rotateInterpolate }] }]}
                        source={require('../assets/react.png')}
                    />
                    <Text style={styles.text}>{t('intro')}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

// ESTILOS DEL COMPONENTE ORDENADOS DE MANERA DECENDENTE POR SU USO
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    gradient: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
    text: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SplashScreen