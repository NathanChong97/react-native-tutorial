import React from 'react'; 
import {
    Pressable,
    Text,
    StyleSheet,
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';


const MyCustomButton = (props) => {
    return (
        <Pressable
        style={({pressed}) => [
          {backgroundColor: pressed? "#dddddd" : props.color}, 
          styles.button,
          {...props.style}
        ]}
        onPress={props.onPressFunction}
        hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
        android_ripple={{color: "#00f"}}
      >
        <Text style={styles.text}>{props.title}</Text> 
      </Pressable>
    )
}

const styles = StyleSheet.create({
    text: {
        color: Colors.black,
        fontSize: 20,
        margin: 10,
    },
    button: {
      width: 150,
      height: 50,
      alignItems: 'center',
      margin: 5,
      borderRadius: 10,
    },
  })

export default MyCustomButton; 