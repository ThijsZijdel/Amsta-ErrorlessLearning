import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 1, name: 'Schoonmaken', imgLink: '/tasks/cleaning.jpg', mainDescription: 'Hier leer je het huis schoon te maken' },
      { id: 2, name: 'Tanden poetsen', imgLink: '/tasks/brushing.jpg', mainDescription: 'Hier leer je je tanden schoon te maken' },
      { id: 3, name: 'Douchen', imgLink: '/tasks/shower.jpg', mainDescription: 'Hier leer je jezelf schoon te maken' },
      { id: 4, name: 'Nieuws lezen', imgLink: '/tasks/reading.jpg', mainDescription: 'Hier leer je het nieuws te begrijpen' },
      { id: 5, name: 'Lunch eten' , imgLink: '/tasks/cooking.jpg', mainDescription: 'Hier leer je netjes te lunchen' },
      { id: 6, name: 'Koken', imgLink: '/tasks/cooking.jpg', mainDescription: 'Hier leer je te koken' },
      { id: 7, name: 'Tv kijken', imgLink: '/tasks/tv.jpg', mainDescription: 'Hier leer je met de televisie te werken' },
      { id: 8, name: 'Gaan slapen', imgLink: '/tasks/sleeping.jpg', mainDescription: 'Hier leer je jezelf klaar te maken voor slaap' }
    ];
    return { tasks };
  }
}
