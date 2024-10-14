import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors } from "../constants";

// COMPONENTE DETALLE DE USUARIO
const UserDetail = ({ item }) => {

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Image source={{ uri: item.avatar }} style={styles.imgStyle} />
                <Text style={styles.title}>{item.first_name} {item.last_name}</Text>
                <Text style={styles.subTitle}>{item.email}</Text>
            </View>
        </View>
    );
};

// ESTILOS DEL COMPONENTE ORDENADOS DE MANERA DECENDENTE POR SU USO
const styles = StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor: colors.background,
    },
    titleContainer: {
        alignItems: 'center',        
    },
    imgStyle: {
        marginTop: 30,
        height: 320,
        width: 320,
        borderRadius: 250,
    },
    title: {
        fontSize: 25, fontWeight: 'bold', marginTop: 40, color: colors.textColor,
    },
    subTitle: {
        fontSize: 20, fontWeight: 'bold', color: colors.textColor
    },
});

export default UserDetail;