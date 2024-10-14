import React, { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { View, Text, StyleSheet, Dimensions, Modal } from 'react-native';
import { useTranslation } from "react-i18next";
import ButtonGradient from './ButtonGradient';
import { colors } from '../constants';

const { width } = Dimensions.get('window')

// COMPONENTE MODAL QR
const QrModal = () => {
    const [showModal, setShowModal] = useState(false);

    const { t } = useTranslation();

    return (
        <View>
            {/* BOTON VERDE PARA COMPARTIR APLICACION */}
            <View style={styles.buttonOutSide}>
                <ButtonGradient
                    textButton={t('click_and_share')}
                    onPress={() => setShowModal(true)}
                    colors={[colors.GREENONE, colors.GREENTWO]}
                    borderRadius={0}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => { setShowModal(false) }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>{t('play_store')}</Text>
                        <QRCode
                            value="https://binco.mx/"
                        />

                        <View style={styles.separatorVertical} />

                        {/* BOTON ROJO PARA SALIR DE LA MODAL QR */}
                        <View style={styles.buttonInSide}>
                            <ButtonGradient
                                textButton={t('exit')}
                                onPress={() => setShowModal(false)}
                                colors={[colors.REDONE, colors.REDTWO]}
                                borderRadius={5}
                            />
                        </View>
                    </View>
                </View>
            </Modal >
        </View>
    )
};

// ESTILOS DEL COMPONENTE ORDENADOS DE MANERA DECENDENTE POR SU USO
const styles = StyleSheet.create({
    centeredView: {
        flex: 1, justifyContent: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 24, fontWeight: 'bold', marginBottom: 10,
    },
    buttonOutSide: {
        justifyContent: 'center', alignItems: 'center', width: width,
    },
    buttonInSide: {
        width: Dimensions.get('screen').width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    separatorVertical: {
        height: 1,
        backgroundColor: colors.BLACKONE,
        marginTop: 5,
        marginBottom: 5,
    }
});

export default QrModal;