/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import {Task} from '../../entities/task';
import {ListItemComponentProps} from '../../core/types';
import moment from "moment";

export function TaskListItem({
  data,
  onSelect,
}: ListItemComponentProps<Task>): React.ReactElement {
  const title = data.name;

  return (
    <TouchableOpacity onPress={() => onSelect(data.id.toString())}>
      <ListItem bottomDivider>
        <Icon name={'ios-radio-button-off'} type={'ionicon'} />
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
          <ListItem.Subtitle>{moment(data.deadline).format('YYYY-MM-DD hh:mm').toString()}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );
}
