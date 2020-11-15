/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {ListItemComponentProps} from "../../core/types";
import {Settings} from "../../entities/setting";

export function SettingListItem({
  data,
  onSelect,
}: ListItemComponentProps<Settings>): React.ReactElement {

  return (
    <TouchableOpacity
      onPress={() => onSelect(data.id.toString())}
      style={{marginTop: -1}}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View>
            <Text h4>{'Setting'}</Text>
            <Text>{data.id}</Text>
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
