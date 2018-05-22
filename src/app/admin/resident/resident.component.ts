import {Component, Input, OnInit} from '@angular/core';
import {Resident} from "../../models/Resident";
import {ResidentService} from "../../services/resident.service";
import {ActivatedRoute} from "@angular/router";
import {Activity} from "../../models/Activity";
import {Observable} from "rxjs/Observable";
import {TaskService} from "../../services/task.service";
import {Task} from '../../models/Task';


@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.css']
})
export class ResidentComponent implements OnInit {

  @Input() resident: Resident;

  today: Date = new Date();

  tabsIndex: number;

  infoDisplay: boolean = false;

  editDisplay: boolean = false;

  enableTab: boolean = true;


  protected infoActiv: Activity = null;
  //protected infoActivity: Activity;

  constructor(private route: ActivatedRoute,
              public residentService: ResidentService,
              protected taskService: TaskService) { }

  editable: boolean = true;

  editResident: boolean = false;

  ngOnInit() {
    this.getResident();

    this.clearInfoActivity();

    this.checkForEditResident();
  }

  getResident(){
    const id = +this.route.snapshot.paramMap.get('id');
      this.residentService.getResident(id)
       .subscribe(resident => this.resident = resident);

   // this.resident = this.residentService.getResident(id);
  }



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

  protected getInfo(activity: Activity):void {
    if (activity === null)
      this.clearInfoActivity();
    else
      this.residentService.setInfoActivity(activity);

    this.infoDisplay = true;

  }

  protected clearInfoActivity():void {
    if (this.residentService.infoActivity!=null)
      this.residentService.infoActivity = null;

    if (this.infoDisplay == true)
      this.infoDisplay = false;
  }



  protected editActivity(activity: Activity):void {
    if (activity === null)
      this.clearInfoActivity();
    else
      this.residentService.setInfoActivity(activity);

    this.infoDisplay = false;
    this.editDisplay = true;

    this.enableTab = false;

  }

  protected exitEditTab():void {
    this.editDisplay = false;
    this.enableTab = true;
  }

  protected reload(): void{
    this.getInfoActivity();
  }

  @Input() activityTask: Task;

  private getInfoActivity() {
    this.infoActiv = this.residentService.infoActivity;

    if (this.infoActiv != null)
      this.taskService.getTask(this.infoActiv.taskId).subscribe(task => this.activityTask = task);
  }


  protected setTabIndex(index: number): void{
    if (this.tabsIndex == index) {
      this.tabsIndex = null;
    }

    this.tabsIndex = index;
  }

  private checkForEditResident() {
    if(this.residentService.editResident) {
      this.editable = false;
      this.editResident = true;
    }

  }

  protected clearEditSetting() {
    this.residentService.editResident = false;
    this.editResident = false;
  }

  saveResident(bio: string, name: string, surname: string) {
    console.log(bio+" -- bio --  "+name+" namee "+surname)
    this.resident.name = name;
    this.resident.surname = surname;
    this.resident.bio = bio;

    this.residentService.updateResident(this.resident);
    alert("Aanpassingen zijn opgeslagen.")
  }
}




// GET ACTIVITES ?!!
//
// const id = +this.route.snapshot.paramMap.get('id');
// this.taskService.getTask(id)
//   .subscribe(task => {
//     return this.steps = task.steps;
//   });
