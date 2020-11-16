/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {Avatar, Icon, ListItem, Text} from 'react-native-elements';
import {Contact} from '../../entities/contact';
import {commonStyles} from '../../styles';
import {CircleButtonProps} from '../../components/CircleButtons/CircleButton';
import {CircleButtonBlock} from '../../components/CircleButtons/CircleButtonBlock';
import {DataListItem} from '../../components/DataListItem';
import {DataExtraFields} from '../../components/DataExtraFields';
import {useSelector} from 'react-redux';
import {appSelector} from '../../store/app';
import {useNavigation} from '@react-navigation/native';

export interface ContactDetailsViewProps {
  data: Contact;
}

export function ContactDetailsView({
  data,
}: ContactDetailsViewProps): React.ReactElement {
  console.log('DATA', data);

  // const app = useSelector(appSelector);

  const navigation = useNavigation();

  const actions: Array<CircleButtonProps> = [
    {icon: 'call', title: 'Call'},
    {icon: 'message', title: 'Chat'},
    {icon: 'mail', title: 'Mail'},
  ];

  const connectedScreens: Array<React.ReactElement> = [];
  // if (app.entitiesMap['Project'] !== undefined) {
  connectedScreens.push(
    <TouchableOpacity
      onPress={() => navigation.navigate('ContactProjects', {id: data.id})}>
      <ListItem bottomDivider>
        <Icon name={'ios-briefcase-outline'} type={'ionicon'} />
        <ListItem.Content>
          <ListItem.Title>Projects</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>,
  );
  // }

  const conntectedScreensRendered =
    connectedScreens.length > 0 ? (
      <View style={{marginTop: '15px'}}>{connectedScreens}</View>
    ) : (
      <View />
    );

  return (
    <SafeAreaView style={commonStyles.safeAreaContainer}>
      <View style={{alignItems: 'center', paddingTop: '20px', width: '100%'}}>
        <Avatar
          title={data.firstName.slice(0, 1) + data.lastName.slice(0, 1)}
          size={'xlarge'}
          containerStyle={{backgroundColor: '#999999'}}
          rounded
        />
        <Text h2 style={{marginTop: '15px', paddingBottom: '5px'}}>
          {data.firstName + ' ' + data.lastName}
        </Text>
        <Text style={{fontSize: 16, paddingBottom: '15px'}}>
          {data.company}
        </Text>
        <CircleButtonBlock data={actions} />
      </View>

      <View style={{marginTop: '25px'}}>
        <DataListItem name={'phone'} value={data.phone} />
        <DataListItem name={'mobile'} value={data.mobile} />
        <DataListItem name={'email'} value={data.email} />
        <DataExtraFields data={data} />
      </View>
      {conntectedScreensRendered}
    </SafeAreaView>
  );
}
