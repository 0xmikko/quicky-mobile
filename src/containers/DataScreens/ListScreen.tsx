/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {DataListView} from 'rn-mobile-components/lib/DataListView';
import {SafeAreaView, View} from 'react-native';
import {commonStyles} from '../../styles';
import {SearchBar, Text} from 'react-native-elements';
import {RootState} from '../../store';
import {DataObjectWithID} from 'redux-data-connect';

export interface ListScreenProps<T extends DataObjectWithID> {
  title: string;
  getList: (opHash: string) => void;
  filter: (data: Array<T>, search: string) => Array<T>;
  detailsScreenName: string;
  listItemComponent: ({
    data,
    onSelect,
  }: {
    data: T;
    onSelect: (id: string) => void;
  }) => React.ReactElement;
  listItemSelector: (state: RootState) => Array<T>;
}

export function ListScreen<T extends DataObjectWithID>({
  title,
  getList,
  filter,
  detailsScreenName,
  listItemComponent,
  listItemSelector,
}: ListScreenProps<T>): React.ReactElement {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const data = useSelector(listItemSelector);

  const [search, setSearch] = useState('');

  const filteredData = search === '' ? data : filter(data, search);

  const onSelect = async (id: string) => {
    navigation.navigate(detailsScreenName, {id});
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaContainer}>
      <View>
        <Text h1>{title}</Text>
      </View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
        lightTheme={true}
        round={true}
        // containerStyle={{backgroundColor: 'red'}}
        // text={search}
        // searchBarStyle={'minimal'}
      />
      <DataListView
        data={filteredData || []}
        getList={getList}
        renderItem={listItemComponent}
        onSelect={onSelect}
      />
    </SafeAreaView>
  );
}
