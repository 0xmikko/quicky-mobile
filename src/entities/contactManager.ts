import {EntityManager} from '../core/entityManager';
import {ContactListItem} from '../screens/Contacts/ContactListItem';
import {ContactDetailsView} from '../screens/Contacts/ContactDetailsView';
import {isContain} from '../helpers/search';
import {Contact} from './contact';

export class ContactDataManager extends EntityManager<Contact> {
  constructor() {
    super('Contact', Contact, ContactListItem, ContactDetailsView);

    this._sampleData = [];
  }

  search(data: Contact[], search: string): Contact[] {
    return data.filter(
      (d) =>
        isContain(d.firstName, search) ||
        isContain(d.lastName, search) ||
        isContain(d.email, search),
    );
  }
}
