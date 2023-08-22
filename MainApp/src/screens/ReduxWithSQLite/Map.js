import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import GlobalStyle from '../../utils/GlobalStyle';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

export default function Map({ route }) {

    const { city, lat, lng } = route.params;

    return (
        <View style={styles.body}>
             <Text style={[
                    GlobalStyle.CustomFont, 
                    styles.text
                ]}>
                    {city}
            </Text>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        margin: 10
    },
    map: {
        width: '100%',
        height: '100%'
    }
})