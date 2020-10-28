/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, { useEffect } from 'react';
import {Image, ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {commonStyles} from '../../../styles';
import { GoogleSignin } from '@react-native-community/google-signin';

export function SplashScreen() : React.ReactElement {
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      // scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '372309546970-obgomvqh17flsk2nno61lqd1v0pk5023.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '372309546970-sitm1g8b0t6cmtggs7eu3ecf991ij2eu.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }, []);

  
  return (
    <View
      style={{
        ...commonStyles.safeAreaContainerCentered,
        backgroundColor: '#0b1535',
          width: '100%',
      }}>
        {/*<ImageBackground source={require('../../assets/background.jpg')} style={styles.image} >*/}
      <Image
        source={require('../../../logo.png')}
        style={styles.image}
      />
      <Text h1>Quicky</Text>
      <Text
        style={styles.subHeader}>
       Smart Business Assistant
      </Text>
      <View style={styles.button}>
        <Button
          title="Login with Google"
          onPress={() => navigation.navigate('PhoneScreen')}
          type="outline"
          buttonStyle={{borderColor: "#FFF"}}
          titleStyle={{color: "#FFF"}}


        />
      </View>
        {/*</ImageBackground>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '70%',
    paddingTop: 50,
      borderColor: "#ffeb83"
  },
    image: {
      height: 220,
      resizeMode: 'contain',
      marginBottom: 28,
      marginTop: -40,
    },
    subHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffeb83',
      marginTop: 5,
    }
});
