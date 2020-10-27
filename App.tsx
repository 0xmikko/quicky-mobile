/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect} from 'react';

import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-community/google-signin';
import {Button} from 'react-native-elements';
import { SafeAreaView } from 'react-native';

// Somewhere in your code
async function googleSignIn() {
  try {
    await GoogleSignin.hasPlayServices();
    const result = await GoogleSignin.signIn();
    console.log('KOOLA', result);
    // this.setState({userInfo});
  } catch (error) {
    console.log('KOOLA', error, 'POPP', error.code);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
}

const App = () => {
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
    console.log('HUEVA');
  }, []);

  return <SafeAreaView><Button onPress={googleSignIn} title={'Google'} /></SafeAreaView>;
};


export default App;