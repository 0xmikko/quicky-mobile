/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {Profile} from '../../core/profile';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import actions from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {BonusCard} from '../../components/BonusCard';
import {appSelector} from "../../store/app";

interface ProfileDetailsProps {
  data: Profile;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({data}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const app = useSelector(appSelector);

  const list = [
    {
      title: 'Show bonus card QR',
      icon: 'redeem',
      action: () => navigation.navigate('WebAuthQRScreen'),
    },
    {
      title: 'Name, Phone Numbers, Email',
      icon: 'edit',
      action: () => navigation.navigate('ChangeNameScreen', {data}),
    },
    {
      title: 'Payment methods',
      icon: 'credit-card',
      action: () => navigation.navigate('ChangeNameScreen', {data}),
    },
    {
      title: 'Notifications',
      icon: 'notifications-none',
      action: () => navigation.navigate('WebAuthQRScreen'),
    },
  ];

  return (
    <>
      <View>
        <Text h1>Settings</Text>
      </View>
      {/*<BonusCard*/}
      {/*  company={app.company}*/}
      {/*  // backgroundImage={app.bonusImage}*/}
      {/*  title={data.name}*/}
      {/*  number={'00123'}*/}
      {/*  points={850}*/}
      {/*/>*/}
      <View>
        {list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            leftIcon={<Icon name={item.icon} size={20} />}
            bottomDivider
            chevron
            onPress={item.action}
          />
        ))}
      </View>
      <View style={{marginTop: 30}}>
        <ListItem
          key={'logout'}
          title={'Logout'}
          bottomDivider
          leftIcon={<Icon name={'exit-to-app'} size={20} color={'red'}/>}
          onPress={() => dispatch(actions.auth.logout())}
          containerStyle={{
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}
          titleStyle={{
            color: 'red',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    alignItems: 'center',
    marginBottom: 25,
  },
  level: {
    fontSize: 20,
  },
});
