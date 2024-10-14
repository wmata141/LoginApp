import React from "react";
import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import ButtonGradient from '../components/ButtonGradient';
import UserDetail from "../components/UserDetail";
import { colors } from "../constants";
import { useNavigation, useRoute } from '@react-navigation/native';

// VISTA DETALLE DE USUARIO
const UserDetailScreen = () => {

  const route = useRoute();
  const { item } = route.params;

  const navigation = useNavigation();

  const { t } = useTranslation();

  // FUNCION PARA IR A LA VISTA LISTA DE USUARIOS
  const onPressToBack = async () => {
    navigation.navigate('UserList');
  }
  
  return (
    <View style={styles.container}>
      {/* LISTA DE USUARIOS */}
      {item && <UserDetail item={item} />}

      {/* BOTON DE SALIDA */}
      <View style={styles.ButtonGradient}>
        <ButtonGradient
          textButton={t('back')}
          onPress={onPressToBack}
          colors={[colors.background, colors.textColor]}
          borderRadius={5}
        />
      </View>
    </View>
  );
}

// ESTILOS DEL COMPONENTE ORDENADOS DE MANERA DECENDENTE POR SU USO
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ButtonGradient: {
    width: '100%'
  }
})

export default UserDetailScreen