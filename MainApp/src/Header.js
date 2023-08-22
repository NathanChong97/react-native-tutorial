import React from 'react'; 
import {
    Text,
    StyleSheet,
    View,
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';


const Header = () => {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>React Native Tutorial</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    view: {
      width: "100%",
      height: 50,
      backgroundColor: '#00f',
      justifyContent: "center",
      alignItems: "center",
    }, 
    text: {
        color: "#ffffff",
        fontSize: 25,
        fontWeight: 'bold',
    },
  })

export default Header; 