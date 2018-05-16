import { InMemoryDbService } from 'angular-in-memory-web-api';

/**
 * Dummy data json
 */
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 2, name: 'Tanden poetsen', imgLink: '/tasks/brushing.jpg', mainDescription: 'Hier leer je je tanden schoon te maken',
        steps: [  { id: 1, stepImgLink: '/tasks/step1.jpg', stepDescription: 'Pak je tandenborstel'},
                  { id: 2, stepImgLink: '/tasks/step3.jpg', stepDescription: 'Doe hier een beetje tandpasta op'},
                  { id: 3, stepImgLink: '/tasks/brushing.jpg', stepDescription: 'En poets maar.'},
                  { id: 4, stepImgLink: '/tasks/timer.gif', stepDescription: 'Na de timer moet je stoppen.'},
                  { id: 5, stepImgLink: '/tasks/end.jpg', stepDescription: 'Nu ben je klaar.'}],
        taskTimes:[ {startTime: "08:00", endTime: "09:00"},{startTime: "20:00", endTime: "23:30"} ]
      },
      { id: 3, name: 'Douchen', imgLink: '/tasks/shower.jpg', mainDescription: 'Hier leer je jezelf schoon te maken',
        steps: [  { id: 1, stepImgLink: '/tasks/step3.png', stepDescription: 'Beschrijving stap 2'},
                  { id: 2, stepImgLink: '/tasks/shower.jpg', stepDescription: 'Beschrijving stap 3'}],
        taskTimes:[ {startTime: "11:00", endTime: "12:00"} ]
      },
      { id: 1, name: 'Schoonmaken', imgLink: '/tasks/cleaning.jpg', mainDescription: 'Hier leer je het huis schoon te maken',
        steps: [  { id: 1, stepImgLink: '/tasks/step3.png', stepDescription: 'Beschrijving stap 1'},
          { id: 2, stepImgLink: '/tasks/step2.jpg', stepDescription: 'Beschrijving stap 1'}],
        taskTimes:[ {startTime: "13:00", endTime: "14:00"} ]
      },
      { id: 4, name: 'Nieuws lezen', imgLink: '/tasks/reading.jpg', mainDescription: 'Hier leer je het nieuws te begrijpen',
        steps: [  { id: 1, stepImgLink: '/tasks/step3.jpg', stepDescription: 'Beschrijving stap 2'},
                  { id: 2, stepImgLink: '/tasks/reading.jpg', stepDescription: 'Beschrijving stap 3'}],
        taskTimes:[ {startTime: "09:00", endTime: "10:00"},{startTime: "15:00", endTime: "16:00"} ]
      },
      { id: 5, name: 'Lunch eten' , imgLink: '/tasks/cooking.jpg', mainDescription: 'Hier leer je netjes te lunchen',
        steps: [  { id: 1, stepImgLink: '/tasks/step3.png', stepDescription: 'Beschrijving stap 2'},
                  { id: 2, stepImgLink: '/tasks/cleaning.jpg', stepDescription: 'Beschrijving stp 3'}],
        taskTimes:[ {startTime: "13:00", endTime: "14:00"} ]
      },
      { id: 6, name: 'Koken', imgLink: '/tasks/cooking.jpg', mainDescription: 'Hier leer je te koken',
        steps: [  { id: 1, stepImgLink: '/tasks/cooking.jpg', stepDescription: 'Beschrijving stap 1'},
                  { id: 2, stepImgLink: '/tasks/step2.jpg', stepDescription: 'Beschrijving stap 1'}],
        taskTimes:[ {startTime: "11:00", endTime: "12:00"}, {startTime: "13:00", endTime: "14:00"} ]
      },
      { id: 7, name: 'Tv kijken', imgLink: '/tasks/tv.jpg', mainDescription: 'Hier leer je met de televisie te werken',
        steps: [  { id: 1, stepImgLink: '/tasks/step2.jpg', stepDescription: 'Beschrijving stap 1'},
                  { id: 2, stepImgLink: '/tasks/tv.jpg', stepDescription: 'Beschrijving stap 1'}],
        taskTimes:[ {startTime: "11:00", endTime: "12:00"},{startTime: "16:00", endTime: "17:00"}, {startTime: "19:00", endTime: "20:00"} ]
      },
      { id: 8, name: 'Gaan slapen', imgLink: '/tasks/sleeping.jpg', mainDescription: 'Hier leer je jezelf klaar te maken voor slaap',
        steps: [  { id: 1, stepImgLink: '/tasks/step3.png', stepDescription: 'Beschrijving stap 1'},
                  { id: 2, stepImgLink: '/tasks/sleeping.jpg', stepDescription: 'Beschrijving stap 17'},
                  { id: 3, stepImgLink: '/tasks/step2.jpg', stepDescription: 'Beschrijving stap 12'}],
        taskTimes:[ {startTime: "20:30", endTime: "23:45"} ]
      }
    ];

    const employees = [
      { id: 'Am3', name: 'Werknemer', username: 'root', password: 'root'}
    ];

    const residents = [
      { id: '1', name: 'Sandra', surname: 'Merkel', imgPath: '/tasks/step2.jpg',
        activities: [
          {id: '1', name: "Tandenpoetsen", date: new Date(), timeStart: "11:00", timeEnd: "12:00", timeStarted: "11:00", timeEnded: "11:00", completedTime: "6", completed: false, residentId: "1", taskId: 1},
          {id: '2', name: "Douchen", date: new Date(), timeStart: "11:00", timeEnd: "11:00", timeStarted: "11:00", timeEnded: "11:00", completedTime: "8", completed: true, residentId: "1", taskId: 2}
        ]
      },
      { id: '2', name: 'Marco', surname: 'Willems', imgPath: '/tasks/step2.jpg',
        activities: [
          {id: '3', name: "Sample", date: new Date(), timeStart: "11:00", timeEnd: "11:00", timeStarted: "11:00", timeEnded: "11:00", completedTime: "10", completed: true, residentId: "2", taskId: 3},
          {id: '4', name: "Tv kijken", date: new Date(), timeStart: "11:00", timeEnd: "11:00", timeStarted: "11:00", timeEnded: "11:00", completedTime: "45", completed: true, residentId: "2", taskId: 4},
          {id: '5', name: "Tandenpoetsen", date: new Date(), timeStart: "11:00", timeEnd: "11:00", timeStarted: "11:00", timeEnded: "11:00", completedTime: "5", completed: true, residentId: "2", taskId: 5}
        ]
      }
    ];

    return { tasks, employees, residents };
  }
}
