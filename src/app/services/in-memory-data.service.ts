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
                  { id: 4, stepImgLink: '/tasks/timer.gif', stepDescription: 'Na de timer moet je stoppen.'}],
        taskTimes:[ {startTime: "08:00", endTime: "09:00"},{startTime: "20:00", endTime: "23:30"} ]
      },
      { id: 3, name: 'Douchen', imgLink: '/tasks/shower.jpg', mainDescription: 'Hier leer je jezelf schoon te maken',
        steps: [  { id: 1, stepImgLink: '/tasks/douche.jpg', stepDescription: 'Zet de douche aan.'},
                  { id: 2, stepImgLink: '/tasks/shower.jpg', stepDescription: 'Stap eronder en was uw zelf. LET OP: leg eerst de ipad weg'}],
        taskTimes:[ {startTime: "11:00", endTime: "12:00"} ]
      },
      { id: 1, name: 'Schoonmaken', imgLink: '/tasks/cleaning.jpg', mainDescription: 'Hier leer je het huis schoon te maken',
        steps: [  { id: 1, stepImgLink: '/tasks/doek.jpg', stepDescription: 'Pak een doekje'},
          { id: 2, stepImgLink: '/tasks/cleaning-table.jpg', stepDescription: 'Neem de tafel ermee af.'}],
        taskTimes:[ {startTime: "13:00", endTime: "14:00"} ]
      },
      { id: 4, name: 'Nieuws lezen', imgLink: '/tasks/reading.jpg', mainDescription: 'Hier leer je het nieuws te begrijpen',
        steps: [  { id: 1, stepImgLink: '/tasks/krant.jpg', stepDescription: 'Pak van de tafel de krant'},
                  { id: 2, stepImgLink: '/tasks/krantopen.jpg', stepDescription: 'Sla de krant open en start lezen.'}],
        taskTimes:[ {startTime: "09:00", endTime: "10:00"},{startTime: "15:00", endTime: "16:00"} ]
      },
      { id: 5, name: 'Lunch eten' , imgLink: '/tasks/cooking.jpg', mainDescription: 'Hier leer je netjes te lunchen',
        steps: [  { id: 1, stepImgLink: '/tasks/step3.png', stepDescription: 'Beschrijving stap 2'},
                  { id: 2, stepImgLink: '/tasks/cleaning.jpg', stepDescription: 'Beschrijving stp 3'}],
        taskTimes:[ {startTime: "13:00", endTime: "14:00"} ]
      },
      { id: 6, name: 'Koken', imgLink: '/tasks/cooking.jpg', mainDescription: 'Hier leer je te koken',
        steps: [  { id: 1, stepImgLink: '/tasks/food.jpg', stepDescription: 'Pak de maaltijd en doe hem in de magnetron.'},
                  { id: 2, stepImgLink: '/tasks/microwave.jpg', stepDescription: 'Zet de magnetron aan'}],
        taskTimes:[ {startTime: "11:00", endTime: "12:00"}, {startTime: "13:00", endTime: "14:00"} ]
      },
      { id: 7, name: 'Tv kijken', imgLink: '/tasks/tv.jpg', mainDescription: 'Hier leer je met de televisie te werken',
        steps: [  { id: 1, stepImgLink: '/tasks/remote.jpg', stepDescription: 'Pak de afstandsbediening '},
                  { id: 2, stepImgLink: '/tasks/onbutton.jpg', stepDescription: 'Druk op de rode aan knop.'},
                  { id: 3, stepImgLink: '/tasks/tv.jpg', stepDescription: 'Nu kan je tv kijken'}],
        taskTimes:[ {startTime: "11:00", endTime: "12:00"},{startTime: "16:00", endTime: "17:00"}, {startTime: "19:00", endTime: "20:00"} ]
      },
      { id: 8, name: 'Gaan slapen', imgLink: '/tasks/sleeping.jpg', mainDescription: 'Hier leer je jezelf klaar te maken voor slaap',
        steps: [  { id: 1, stepImgLink: '/tasks/clothes.jpg', stepDescription: 'Pak je slaap kleding.'},
                  { id: 2, stepImgLink: '/tasks/clothes.jpg', stepDescription: 'Trek dit aan.'},
                  { id: 3, stepImgLink: '/tasks/bed.jpg', stepDescription: 'Ga naar bed.'}],
        taskTimes:[ {startTime: "20:30", endTime: "23:45"} ]
      }
    ];

    const employees = [
      { id: 'Am3', name: 'Werknemer', username: 'root', password: 'root'}
    ];

    const residents = [
      { id: '1', name: 'Sandra', surname: 'Merkel',  bio: "Aardige vrouw maar afwisselend gedrag.",imgPath: '/residents/woman1.jpg',
        activities: [
          {id: '1', name: "Tandenpoetsen", date: new Date(2018, 5, 11), timeStart: "11:00", timeEnd: "12:00", timeStarted: "11:00", timeEnded: "11:00", completedTime: "6", completed: false, residentId: "1", taskId: 1, notes: "Helaas te lang."},
          {id: '2', name: "Douchen", date: new Date(2018, 5, 12), timeStart: "11:00", timeEnd: "11:00", timeStarted: "11:00", timeEnded: "11:00", completedTime: "8", completed: true, residentId: "1", taskId: 2, notes: "Erg goed gegaan."}
        ]
      },
      { id: '2', name: 'Marco', surname: 'Willems', bio: "Al een aantal jaar bij Amsta de poort.", imgPath: '/residents/men1.jpg',
        activities: [
          {id: '3', name: "Sample", date: new Date(2018, 5, 17), timeStart: "11:00", timeEnd: "11:00", timeStarted: "11:00", timeEnded: "11:00", completedTime: "10", completed: true, residentId: "2", taskId: 3, notes: "Kon wat sneller."},
          {id: '4', name: "Tv kijken", date: new Date(2018, 5, 14), timeStart: "11:00", timeEnd: "11:00", timeStarted: "11:00", timeEnded: "11:00", completedTime: "45", completed: true, residentId: "2", taskId: 4, notes: "Top."},
          {id: '5', name: "Tandenpoetsen", date: new Date(2018, 5, 12), timeStart: "11:00", timeEnd: "11:00", timeStarted: "11:00", timeEnded: "11:00", completedTime: "5", completed: true, residentId: "2", taskId: 5, notes: "erg goed gegaan."}
        ]
      }
    ];

    return { tasks, employees, residents };
  }
}
