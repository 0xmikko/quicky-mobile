/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Avatar, Icon, ListItem, Text} from 'react-native-elements';
import {Contact} from '../../entities/contact';
import {CircleButtonProps} from '../../components/CircleButtons/CircleButton';
import {CircleButtonBlock} from '../../components/CircleButtons/CircleButtonBlock';
import {DataListItem} from '../../components/DataListItem';
import {DataExtraFields} from '../../components/DataExtraFields';
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
      <View style={{marginTop: 15}}>{connectedScreens}</View>
    ) : (
      <View />
    );

  return (
    <View style={{width: '100%'}}>
      <View style={{alignItems: 'center', paddingTop: 20, width: '100%'}}>
        <Avatar
          title={data.firstName.slice(0, 1) + data.lastName.slice(0, 1)}
          size={'xlarge'}
          containerStyle={{backgroundColor: '#999999'}}
          rounded
        />
        <Text h2 style={{marginTop: 15, paddingBottom: 5}}>
          {data.firstName + ' ' + data.lastName}
        </Text>
        <Text style={{fontSize: 16, paddingBottom: 15}}>{data.company}</Text>
        <CircleButtonBlock data={actions} />
      </View>

      <View style={{marginTop: 25, width: '100%'}}>
        <DataListItem name={'phone'} value={data.phone} key={1} />
        <DataListItem name={'mobile'} value={data.mobile} key={2} />
        <DataListItem name={'email'} value={data.email} key={3} />
        <DataExtraFields data={data} />
      </View>
      {conntectedScreensRendered}
    </View>
  );
}
