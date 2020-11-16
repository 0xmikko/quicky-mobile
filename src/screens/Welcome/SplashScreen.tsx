/*
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {commonStyles} from '../../styles';

export function SplashScreen(): React.ReactElement {
  const navigation = useNavigation();
  return (
    <View
      style={{
        ...commonStyles.safeAreaContainerCentered,
        backgroundColor: '#763e9a',
        width: '100%',
      }}>
      <Image
        source={require('../../../logo.png')}
        style={{
          height: 220,
          resizeMode: 'contain',
          marginBottom: 28,
          marginTop: -40,
        }}
      />
      <Text h1>Quicky</Text>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 14,
        }}>
        AI powered Quick Base®
      </Text>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 2,
        }}>
        App Builder
      </Text>
      <View style={{...styles.button, paddingTop: 50}}>
        <Button
          title="Scan QR code"
          onPress={() => navigation.navigate('QRScanScreen')}
          // type="outline"
          buttonStyle={{borderColor: '#FFF', backgroundColor: '#EEE'}}
          titleStyle={{color: '#763e9a'}}
        />
      </View>
      <View style={{...styles.button, paddingTop: 25}}>
        <Button
          title="Enter credentials manually"
          onPress={() => navigation.navigate('PhoneScreen')}
          type="outline"
          buttonStyle={{borderColor: '#FFF'}}
          titleStyle={{color: '#FFF'}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '70%',
    paddingTop: 50,
    borderColor: '#ffeb83',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
