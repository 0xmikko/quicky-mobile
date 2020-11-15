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
import {AppDataManager} from '../../core/dataManager';
import {DMDataScreenProps} from "./types";


export function DMListScreen({type} : DMDataScreenProps): React.ReactElement {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const dataManager = AppDataManager.getManager(type);
  const data = useSelector(dataManager.getListSelector());

  const [search, setSearch] = useState('');

  const filteredData =
      search === ''
          ? data
          : dataManager.search(data, search);

  const getList = (opHash: string) => {
    dispatch(dataManager.getListAction(opHash));
  };

  const onSelect = async (id: string) => {
    navigation.navigate(`${type}DetailsScreen`, {id});
  };

  return (
      <SafeAreaView style={commonStyles.safeAreaContainer}>
        <View>
          <Text h1>Contacts</Text>
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
            renderItem={dataManager.getListItemComponent()}
            onSelect={onSelect}
        />
      </SafeAreaView>
  );
}
