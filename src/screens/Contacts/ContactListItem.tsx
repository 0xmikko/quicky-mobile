/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Avatar, Text} from 'react-native-elements';
import {Contact} from '../../entities/contact';
import {ListItemComponentProps} from "../../core/types";

export function ContactListItem({
  data,
  onSelect,
}: ListItemComponentProps<Contact>): React.ReactElement {
  const title = data.firstName + ' ' + data.lastName;

  return (
    <TouchableOpacity
      onPress={() => onSelect(data.id.toString())}
      style={{marginTop: -1}}>
      <View style={styles.container}>
        <View>
          <View style={{paddingTop: 3}}>
            <Avatar
                title={data.firstName.slice(0, 1) + data.lastName.slice(0, 1)}
                size={'medium'}
                containerStyle={{backgroundColor: '#999999'}}
                rounded
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <View>
            <Text h4>{title}</Text>
            <Text>{data.company}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 5,
    marginTop: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
  },
  textContainer: {
    paddingLeft: 15,
    paddingRight: 20,
    flex: 1,
    alignContent: 'flex-start',
  },
  tagContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
  },
});
