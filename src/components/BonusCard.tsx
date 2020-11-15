/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import cardBackground from '../assets/doctor_bonus.jpg';

export interface BonusCardProps {
  company: string;
  backgroundImage: string;
  title: string;
  number: string;
  points: number;
}

export function BonusCard({
  company,
  backgroundImage,
  title,
  number,
  points,
}: BonusCardProps): React.ReactElement {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: backgroundImage}}
        style={styles.card}
        imageStyle={{borderRadius: 15}}>
        <View style={styles.cardInside}>
          <View>
            <Text style={{color: 'white', fontSize: 26, fontWeight: 'bold'}}>
              {company}
            </Text>
            <Text style={{color: 'white', fontSize: 14}}>
              G O L D {'  '}M E M B E R
            </Text>
          </View>
          <View>
            <Text style={{color: 'white', fontSize: 28, fontWeight: 'bold'}}>
              {title}
            </Text>
            <Text style={{color: 'white', fontSize: 18}}>{number}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <Text style={{fontSize: 18}}>You have: {points} points</Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    padding: 30,
    paddingRight: 30,
  },
  card: {
    borderRadius: 15,
    width: Dimensions.get('window').width - 60,
    height: ((Dimensions.get('window').width - 60) * 53) / 85,
    backgroundColor: 'red',
  },
  cardInside: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    color: 'white',
  },
});
