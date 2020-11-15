/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Text} from 'react-native-elements';
import {Project} from '../../entities/project';
import {commonStyles} from '../../styles';
import {CircleButtonProps} from '../../components/CircleButtons/CircleButton';
import {CircleButtonBlock} from '../../components/CircleButtons/CircleButtonBlock';
import {DataListItem} from '../../components/DataListItem';
import {DetailsViewComponentProps} from '../../core/types';
import moment from 'moment';
import {DataExtraFields} from "../../components/DataExtraFields";

export function ProjectDetailsView({
  data,
}: DetailsViewComponentProps<Project>): React.ReactElement {
  console.log('DATA', data);
  const actions: Array<CircleButtonProps> = [
    {icon: 'message', title: 'Call'},
    {icon: 'call', title: 'Chat'},
    {icon: 'mail', title: 'Mail'},
  ];
  return (
    <SafeAreaView style={commonStyles.safeAreaContainer}>
      <View style={{alignItems: 'center', paddingTop: '20px', width: '100%'}}>
        <Text h2 style={{marginTop: '15px', paddingBottom: '15px'}}>
          {data.name}
        </Text>
        <CircleButtonBlock data={actions} />
      </View>
      <View style={{marginTop: '25px'}}>
        <DataListItem
            name={'Status'}
            value={data.status}
        />
        <DataListItem
          name={'Starting date'}
          value={moment(data.startDate * 1000).format('YYYY-MM-DD').toString()}
        />
        <DataListItem
          name={'Finishing date'}
          value={moment(data.finishDate * 1000).format('YYYY-MM-DD').toString()}
        />
        <DataExtraFields data={data} />
      </View>
    </SafeAreaView>
  );
}
