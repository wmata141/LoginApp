import { Audio } from 'expo-av';

// SONIDO DEL INTRO DEL SISTEMA
export const playSoundIntro = async () => {
    const { sound } = await Audio.Sound.createAsync(require(`../assets/intro.mp3`));
    sound.playAsync();
}

// SONIDO DE LOS BOTONES DEL SISTEMA
export const playSoundClick = async () => {
    const { sound } = await Audio.Sound.createAsync(require(`../assets/click.mp3`));
    sound.playAsync();
}