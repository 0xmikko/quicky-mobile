/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect} from 'react';
import {UserSendCodeDTO} from '../../core/auth';
import {
  FormikForm,
  FormikFormViewProps,
  LoadingView,
} from 'rn-mobile-components';

import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-community/google-signin';
import {Button} from 'react-native-elements';

// Somewhere in your code
async function googleSignIn() {
  try {
    await GoogleSignin.hasPlayServices();
    const result = await GoogleSignin.signIn();
    console.log("KOOLA", result);
    // this.setState({userInfo});
  } catch (error) {
    console.log("KOOLA", error, "POPP", error.code);
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

interface FormViewProfileProps extends FormikFormViewProps<UserSendCodeDTO> {}

export const FormPhoneView: React.FC<FormViewProfileProps> = ({
  data,
  onSubmit,
  isSubmitted,
}) => {

  useEffect(() => {
    GoogleSignin.configure({
      // scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '372309546970-obgomvqh17flsk2nno61lqd1v0pk5023.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
    console.log("HUEVA")
  }, [])

  const fields = {
    phone: {keyboard: 'phone-pad'},
  };

  if (!data) {
    return <LoadingView />;
  }

  return <Button onPress={googleSignIn} title={'Google'} />;
};
