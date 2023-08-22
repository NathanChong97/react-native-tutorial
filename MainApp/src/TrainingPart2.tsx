import React, {useState} from 'react';
import {
    Button,
    FlatList,
    Linking,
    Pressable,
    RefreshControl,
    ScrollView,
    SectionList,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View,
    Alert,
    ToastAndroid,
    Modal,
    Image,
    ImageBackground,
  } from 'react-native';
  import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
import MyCustomButton from './utils/CustomButton';
import Header from './Header';


  export function BasicsComponents(): JSX.Element {
    const [name, setName] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [showWarning, setShowWarning] = useState(false)

    const onPressHandler = () => {
      if (name.length > 3) {
        setSubmitted(!submitted)
      } else {
        // Alert.alert("Warning", "The name must be longer than 3 characters.", [
        //   {text: "Later", onPress: () => console.warn("Later button was pressed.")},
        //   {text: "Cancel", onPress: () => console.warn("Cancel button was pressed.")},
        //   {text: "Ok", onPress: () => console.warn("Ok button was pressed.")}
        // ], {cancelable: true, onDismiss: () => console.warn("Alert Dismissed")})

        ToastAndroid.showWithGravityAndOffset(
          "The name must be longer than 3 characters.",
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          200,
        )
      }
    }

    return(
      <ImageBackground
       style={basicsComponentsStyles.body}
       source={{uri: "https://img.freepik.com/free-vector/abstract-blue-geometric-shapes-background_1035-17545.jpg?w=2000"}}
       >
        <Header/>
        <Modal
          visible={false}
        >
          <Text>The name must be longer than 3 characters.</Text>
        </Modal>
        <Text style={basicsComponentsStyles.text}>Write your own name: </Text>
        <TextInput 
          multiline
          maxLength={4}
          secureTextEntry={false}
          style={basicsComponentsStyles.input} 
          placeholder="Eg, John"
          onChangeText={(value) => setName(value)}/>
        {/* <Button 
          title= {submitted ? "Clear" : "Submit"}
          onPress={onPressHandler}
          color="#00f"/> */}

        {/* <TouchableOpacity
          style={[{backgroundColor: "#00ff00"},basicsComponentsStyles.button]}
          onPress={onPressHandler}
        >
          <Text style={basicsComponentsStyles.text}>{submitted? "Clear" : "Submit"} </Text> 
        </TouchableOpacity> */}

        {/* <TouchableHighlight
          style={[{backgroundColor: "#00ff00"},basicsComponentsStyles.button]}
          onPress={onPressHandler}
          underlayColor="#dddddd"
        >
          <Text style={basicsComponentsStyles.text}>{submitted? "Clear" : "Submit"} </Text> 
        </TouchableHighlight> */}

        {/* check out CustomButton to compare, it uses props */}
        <MyCustomButton
          onPressfunction={onPressHandler}
          title={submitted? "Clear" : "Submit"}
          color={"#00ff00"}
          style={{margin: 10}}
        />
        <MyCustomButton
          onPressfunction={onPressHandler}
          title={'Test'}
          color={"#ff00ff"}
          style={{margin: 10}}
        />
        {/* <Pressable
          style={({pressed}) => [
            {backgroundColor: pressed? "#dddddd" : "#dd00dd"}, 
            basicsComponentsStyles.button,
          ]}
          onPress={onPressHandler}
          hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
          android_ripple={{color: "#00f"}}
        >
          <Text style={basicsComponentsStyles.text}>{submitted? "Clear" : "Submit"} </Text> 
        </Pressable> */}
        {
          submitted ? 
            <View style={basicsComponentsStyles.body}>
               <Text style={basicsComponentsStyles.text}>Your name is: {name} </Text> 
              <Image 
              style={basicsComponentsStyles.image}
              source={require("../assets/done.jpg")}
              resizeMode= "stretch"/>
            </View>
            : 
            <Image 
            style={basicsComponentsStyles.image}
            source={{ uri: "https://cdn.pixabay.com/photo/2014/04/02/10/26/attention-303861_960_720.png"}}
            resizeMode= "stretch"/>
        }
      </ImageBackground>
    )
  }

  const basicsComponentsStyles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        color: Colors.black,
        fontSize: 20,
        margin: 10,
    },
    input: {
      width: 200,
      borderWidth: 1,
      borderColor: "#555",
      borderRadius: 5,
      textAlign: 'center',
      fontSize: 15,
      margin: 5,
    },
    button: {
      width: 150,
      height: 50,
      alignItems: 'center',
      margin: 5,
    },
    image: {
      width: 100,
      height: 100,
      margin: 10,
    }
  })
