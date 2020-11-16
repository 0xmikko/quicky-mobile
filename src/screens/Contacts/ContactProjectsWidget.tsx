/*
 * Copyright (c) 2020, Mikael Lazarev
 */

/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {DataListView} from 'rn-mobile-components/lib/DataListView';
import {AppDataManager} from '../../core/dataManager';
import {appSelector} from '../../store/app';

export function ContactProjectsWidget(): React.ReactElement {
  const navigation = useNavigation();

  const route = useRoute() as {params: {id: string}};
  const {id} = route.params;

  const dispatch = useDispatch();
  const dataManager = AppDataManager.getManager('Project');
  const data = useSelector(dataManager.getListSelector());
  const app = useSelector(appSelector);
  const stackName = app.entitiesMap['Project'].name;

  const getList = (opHash: string) => {
    dispatch(dataManager.getListAction(opHash, 'ContactId', id));
  };

  const onSelect = async (id: string) => {
    navigation.navigate(`ProjectDetailsScreen`, {
      id,
    });
  };

  return (
    <DataListView
      data={data || []}
      getList={getList}
      renderItem={dataManager.getListItemComponent()}
      onSelect={onSelect}
    />
  );
}
