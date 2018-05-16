import { Component, OnInit } from '@angular/core';
import {Resident} from "../../models/Resident";
import {ResidentService} from "../../services/resident.service";
import {ActivatedRoute} from "@angular/router";
import {Activity} from "../../models/Activity";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.css']
})
export class ResidentComponent implements OnInit {

  resident: Resident;

  doneTasks: Activity[];
  todoTasks: Activity[];
  todayTasks: Activity[];

  today: Date = new Date();

  constructor(private route: ActivatedRoute,
              private residentService: ResidentService) { }

  editable: boolean = true;

  ngOnInit() {
    this.getResident();
    this.orderActivities();
  }

  getResident(){
    const id = +this.route.snapshot.paramMap.get('id');
      this.residentService.getResident(id)
       .subscribe(resident => this.resident = resident);

   // this.resident = this.residentService.getResident(id);
  }

  private orderActivities() {


      for (let activity of this.residentService.getResidentActivities(this.resident)) {

        console.log("activ"+activity.name)

        if (activity.date === this.today) {
          this.todayTasks.push(activity)
        }else if (activity.completed) {
          this.doneTasks.push(activity)
        }else {
          this.todoTasks.push(activity)
        }

      }

  }

  protected isToday(date: Date): boolean {
    return date === this.today;
  }
  protected isCompleted(activity: Activity): boolean {
    return activity.completed;
  }
  protected isTodo(activity: Activity): boolean {
    return (!this.isToday(activity.date) && !this.isCompleted(activity))
  }

}
