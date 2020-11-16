/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Text} from 'react-native-elements';
import {Task} from '../../entities/task';
import {commonStyles} from '../../styles';
import {CircleButtonProps} from '../../components/CircleButtons/CircleButton';
import {CircleButtonBlock} from '../../components/CircleButtons/CircleButtonBlock';
import {DataListItem} from '../../components/DataListItem';
import {DetailsViewComponentProps} from '../../core/types';
import moment from 'moment';
import {DataExtraFields} from '../../components/DataExtraFields';

export function TaskDetailsView({
  data,
}: DetailsViewComponentProps<Task>): React.ReactElement {
  console.log('DATA', data);
  const actions: Array<CircleButtonProps> = [
    {icon: 'done', title: 'Done'},
    {icon: 'alarm', title: 'Notifications'},
    {icon: 'schedule', title: 'Postpone'},
  ];
  return (
    <SafeAreaView style={commonStyles.safeAreaContainer}>
      <View style={{alignItems: 'center', paddingTop: 20, width: '100%'}}>
        <Text h2 style={{marginTop: 15, paddingBottom: 15}}>
          {data.name}
        </Text>
        <CircleButtonBlock data={actions} />
      </View>
      <View style={{marginTop: 25}}>
        <DataListItem name={'Status'} value={data.status} />
        <DataListItem name={'Description'} value={data.description} />
        <DataListItem
          name={'Deadline'}
          value={moment(data.deadline * 1000)
            .format('YYYY-MM-DD')
            .toString()}
        />
        <DataExtraFields data={data} />
      </View>
    </SafeAreaView>
  );
}
