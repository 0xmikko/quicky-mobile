/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import React from 'react';
import {SettingsStack} from '../screens/Settings/SettingsStack';
import {EntityType} from '../core/types';
import {createEntityStack} from '../components/EntityStack';

export const stacks: Record<EntityType, () => React.ReactElement> = {
  Contact: createEntityStack('Contact'),
  Project: createEntityStack('Project'),
  Setting: SettingsStack,
};
