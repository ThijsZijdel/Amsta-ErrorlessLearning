import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 1, name: 'Cleaning', imgLink: '/tasks/cleaning.jpg' },
      { id: 2, name: 'Brushing teeth', imgLink: '/tasks/brushing.jpg' },
      { id: 3, name: 'Take a shower', imgLink: '/tasks/shower.jpg' },
      { id: 4, name: 'Read the news', imgLink: '/tasks/reading.jpg' },
      { id: 5, name: 'Eat lunch' , imgLink: '/tasks/cooking.jpg' },
      { id: 6, name: 'Cook lunch', imgLink: '/tasks/cooking.jpg' },
      { id: 7, name: 'Watch tv', imgLink: '/tasks/tv.jpg' },
      { id: 8, name: 'Go to bed', imgLink: '/tasks/sleeping.jpg' }
    ];
    return { tasks };
  }
}
