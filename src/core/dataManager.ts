/*
 * Copyright (c) 2020, Mikael Lazarev
 */

import {EntityType} from './types';
import {EntityManager} from './entityManager';
import {EntityManagerI} from './entityManagerI';
import {ContactDataManager} from '../entities/contactManager';
import {ProjectDataManager} from '../entities/projectManager';
import {TaskDataManager} from '../entities/taskManager';

export class AppDataManager {
  protected static _managers: Map<EntityType, EntityManager<any>> = new Map<
    EntityType,
    EntityManager<any>
  >();

  static getManager(entityType: EntityType): EntityManagerI<any> {
    if (!AppDataManager._managers.has(entityType)) {
      AppDataManager._managers.set(
        entityType,
        AppDataManager.createNewManager(entityType),
      );
    }
    return AppDataManager._managers.get(entityType)!;
  }

  private static createNewManager(entityType: EntityType): EntityManager<any> {
    switch (entityType) {
      case 'Project':
        return new ProjectDataManager();
      case 'Contact':
        return new ContactDataManager();
      case 'Task':
        return new TaskDataManager();
      default:
        throw new Error("Entity type doesn't exist");
      // case 'Setting':
      //   return new SettingDataManager();
    }
  }
}
