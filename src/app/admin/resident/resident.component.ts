import { Component, OnInit } from '@angular/core';
import {Resident} from "../../models/Resident";
import {ResidentService} from "../../services/resident.service";
import {ActivatedRoute} from "@angular/router";
import {Activity} from "../../models/Activity";
import {Observable} from "rxjs/Observable";
import {ActivityViewComponent} from "../activity-view/activity-view.component";

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

  //protected infoActivity: Activity;

  constructor(private route: ActivatedRoute,
              protected residentService: ResidentService) { }

  editable: boolean = true;

  ngOnInit() {
    this.getResident();
    this.orderActivities();
    this.clearInfoActivity();
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

  completedActivities:Activity[] ;

  protected isToday(date: Date): boolean {
    return date === this.today;
  }

  protected isCompleted(activity: Activity): boolean {
    if (activity.completed) {
      //this.completedActivities.push(activity);
      return true;
    }else {
      return false;
    }

  }
  protected isTodo(activity: Activity): boolean {
    return (!this.isToday(activity.date) && !this.isCompleted(activity))
  }

  protected getInfo(activity: Activity):void {
    if (activity === null)
      this.clearInfoActivity();
    else
      this.residentService.setInfoActivity(activity);

  }


  protected getStatAvgTime():void {
    let timeMin: number;
    for (let activity of this.completedActivities){
      timeMin += parseInt(activity.completedTime);
    }
  }


  private clearInfoActivity() {
    //this.infoActivity = new Activity(null, "null", null, null, null, null,null ,null,null,null,null);
  }
}
