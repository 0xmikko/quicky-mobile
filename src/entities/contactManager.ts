import {EntityManager} from "../core/entityManager";
import {ContactListItem} from "../screens/Contacts/ContactListItem";
import {ContactDetailsView} from "../screens/Contacts/ContactDetailsView";
import {isContain} from "../helpers/search";
import {Contact} from "./contact";

export class ContactDataManager extends EntityManager<Contact> {
  constructor() {
    super('Contact', Contact,  ContactListItem, ContactDetailsView);

    this._sampleData = [
      {
        id: '0',
        firstName: 'John',
        lastName: 'Appleseed',
        company: 'Apple',
        email: 'john.appleseed@apple.com',
        address: 'Strings Ave.',
        phone: '+1 800 275-2273',
        mobile: '+1 800 275-2273',
      },
      {
        id: '1',
        firstName: 'Joe',
        lastName: 'Cocker',
        company: 'Apple',
        email: 'koo@koo.ru',
        address: 'Strings Ave.',
        phone: '+1 800 233-3344',
        mobile: '+1 800 233-3344',
      },
    ];
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
