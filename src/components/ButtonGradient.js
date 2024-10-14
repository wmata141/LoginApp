import React from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { playSoundClick } from "../services/playSound";

// COMPONENTE BOTON CON ESTILO GRADIENTE
const ButtonGradient = ({ textButton, onPress, colors, disabled, borderRadius }) => {

    const handleOnPress = () => {
        playSoundClick()
        onPress()
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleOnPress}
            disabled={disabled}
        >
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.button, { borderRadius: borderRadius }]}
            >
                <Text style={styles.text}>{textButton}</Text>
            </LinearGradient>
        </ TouchableOpacity>
    );
}

// ESTILOS DEL COMPONENTE ORDENADOS DE MANERA DECENDENTE POR SU USO
const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 40,
    },
});

export default ButtonGradient