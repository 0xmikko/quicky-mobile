/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React, {useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Avatar, Text, Divider} from 'react-native-elements';
import {Contact} from '../../entities/contact';
import {commonStyles} from '../../styles';
import {CircleButtonProps} from '../../components/CircleButtons/CircleButton';
import {CircleButtonBlock} from '../../components/CircleButtons/CircleButtonBlock';
import {DataListItem} from '../../components/DataListItem';
import {DataExtraFields} from "../../components/DataExtraFields";

export interface ContactDetailsViewProps {
  data: Contact;
}

export function ContactDetailsView({
  data,
}: ContactDetailsViewProps): React.ReactElement {
  console.log('DATA', data);
  const actions: Array<CircleButtonProps> = [
    {icon: 'message', title: 'Call'},
    {icon: 'call', title: 'Chat'},
    {icon: 'mail', title: 'Mail'},
  ];



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
        <Text style={{fontSize: 16, paddingBottom: '15px'}}>{data.company}</Text>
        <CircleButtonBlock data={actions} />
      </View>
      <View style={{marginTop: '25px'}}>
        <DataListItem name={'phone'} value={data.phone} />
        <DataListItem name={'mobile'} value={data.mobile} />
        <DataListItem name={'email'} value={data.email} />
        <DataExtraFields data={data} />
      </View>
    </SafeAreaView>
  );
}
