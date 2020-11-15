/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import {DataObjectWithID} from "redux-data-connect";
import {DetailsViewComponent, ListItemComponent} from "./types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../store";
import {Action, CombinedState, Reducer} from "redux";
import {DataLoaderDetailsState} from "redux-data-connect/lib/dataloader";
import {DataLoaderListState} from "redux-data-connect/lib/dataloader/list";
import {Field} from "../core/field";

export interface EntityManagerI<T extends DataObjectWithID> {
    getListItemComponent(): ListItemComponent<T>;

    getDetailsViewComponent(): DetailsViewComponent<T>;

    search(data: T[], search: string): T[];

    getListAction(
        opHash: string,
    ): ThunkAction<void, RootState, unknown, Action<string>>;

    getListSelector(): (state: RootState) => T[];

    getDetailsSelector(id: string): (state: RootState) => T;

    getDetailsAction(
        id: string,
        opHash: string,
    ): ThunkAction<void, RootState, unknown, Action<string>>;

    getReducer(): Reducer<CombinedState<{
        Details: DataLoaderDetailsState<T>;
        List: DataLoaderListState<T>;
    }>>;

    getReduxIndex() : string;

    getSampleListData(dataMapper: Record<string, Field>): T[];

    getSampleDetailsData(
        dataMapper: Record<string, Field>,
        id: string,
    ): T | undefined;
}
