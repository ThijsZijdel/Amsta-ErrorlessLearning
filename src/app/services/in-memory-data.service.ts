import { InMemoryDbService } from 'angular-in-memory-web-api';

/**
 * Dummy data json
 */
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 1, name: 'Schoonmaken', imgLink: '/tasks/cleaning.jpg', mainDescription: 'Hier leer je het huis schoon te maken',
        steps: [  { id: 1, stepImgLink: '/tasks/step3.png', stepDescription: 'Beschrijving stap 1'},
                  { id: 2, stepImgLink: '/tasks/step2.jpg', stepDescription: 'Beschrijving stap 1'}   ]
      },
      { id: 2, name: 'Tanden poetsen', imgLink: '/tasks/brushing.jpg', mainDescription: 'Hier leer je je tanden schoon te maken',
        steps: [  { id: 1, stepImgLink: '/tasks/step3.png', stepDescription: 'Beschrijving stap 1'},
                  { id: 2, stepImgLink: '/tasks/brushing.jpg', stepDescription: 'Beschrijving stap 111'},
                  { id: 3, stepImgLink: '/tasks/step2.jpg', stepDescription: 'Beschrijving stap 31'}]
      },
      { id: 3, name: 'Douchen', imgLink: '/tasks/shower.jpg', mainDescription: 'Hier leer je jezelf schoon te maken',
        steps: [  { id: 1, stepImgLink: '/tasks/step3.png', stepDescription: 'Beschrijving stap 2'},
                  { id: 2, stepImgLink: '/tasks/shower.jpg', stepDescription: 'Beschrijving stap 3'}   ]
      },
      { id: 4, name: 'Nieuws lezen', imgLink: '/tasks/reading.jpg', mainDescription: 'Hier leer je het nieuws te begrijpen',
        steps: [  { id: 1, stepImgLink: '/tasks/step3.jpg', stepDescription: 'Beschrijving stap 2'},
                  { id: 2, stepImgLink: '/tasks/reading.jpg', stepDescription: 'Beschrijving stap 3'}   ]
      },
      { id: 5, name: 'Lunch eten' , imgLink: '/tasks/cooking.jpg', mainDescription: 'Hier leer je netjes te lunchen',
        steps: [  { id: 1, stepImgLink: '/tasks/step3.png', stepDescription: 'Beschrijving stap 2'},
                  { id: 2, stepImgLink: '/tasks/cleaning.jpg', stepDescription: 'Beschrijving stp 3'}   ]
      },
      { id: 6, name: 'Koken', imgLink: '/tasks/cooking.jpg', mainDescription: 'Hier leer je te koken',
        steps: [  { id: 1, stepImgLink: '/tasks/cooking.jpg', stepDescription: 'Beschrijving stap 1'},
                  { id: 2, stepImgLink: '/tasks/step2.jpg', stepDescription: 'Beschrijving stap 1'}   ]
      },
      { id: 7, name: 'Tv kijken', imgLink: '/tasks/tv.jpg', mainDescription: 'Hier leer je met de televisie te werken',
        steps: [  { id: 1, stepImgLink: '/tasks/step2.jpg', stepDescription: 'Beschrijving stap 1'},
                  { id: 2, stepImgLink: '/tasks/tv.jpg', stepDescription: 'Beschrijving stap 1'}   ]
      },
      { id: 8, name: 'Gaan slapen', imgLink: '/tasks/sleeping.jpg', mainDescription: 'Hier leer je jezelf klaar te maken voor slaap',
        steps: [  { id: 1, stepImgLink: '/tasks/step3.png', stepDescription: 'Beschrijving stap 1'},
                  { id: 2, stepImgLink: '/tasks/sleeping.jpg', stepDescription: 'Beschrijving stap 17'},
                  { id: 3, stepImgLink: '/tasks/step2.jpg', stepDescription: 'Beschrijving stap 12'}]
      }
    ];

    const employees = [
      { id: 'Am3', name: 'Werknemer', username: 'root', password: 'root'}
    ];

    return { tasks, employees };
  }
}
