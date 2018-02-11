import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 11, name: 'Cleaning', imgLink: '/tasks/cleaning.jpg' },
      { id: 12, name: 'Brushing teeth', imgLink: '/tasks/brushing.jpg' },
      { id: 14, name: 'Take a shower', imgLink: '/tasks/shower.jpg' },
      { id: 16, name: 'Read the news', imgLink: '/tasks/reading.jpg' },
      { id: 17, name: 'Eat lunch' , imgLink: '/tasks/cooking.jpg' },
      { id: 18, name: 'Cook lunch', imgLink: '/tasks/cooking.jpg' },
      { id: 19, name: 'Watch tv', imgLink: '/tasks/tv.jpg' },
      { id: 20, name: 'Go to bed', imgLink: '/tasks/sleeping.jpg' }
    ];
    return { tasks };
  }
}
