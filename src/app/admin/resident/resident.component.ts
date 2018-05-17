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

  today: Date = new Date();

  tabsIndex: number;

  infoDisplay: boolean = false;

  protected infoActiv: Activity = null;
  //protected infoActivity: Activity;

  constructor(private route: ActivatedRoute,
              protected residentService: ResidentService) { }

  editable: boolean = true;

  ngOnInit() {
    this.getResident();

    this.clearInfoActivity();
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
    this.residentService.infoActivity = null;
    this.infoDisplay = false;
  }



  protected reload(): void{
    this.getInfoActivity();
  }


  private getInfoActivity() {
    this.infoActiv = this.residentService.infoActivity;
  }


  protected setTabIndex(index: number): void{
    if (this.tabsIndex == index) {
      this.tabsIndex = null;
    }

    this.tabsIndex = index;
  }
}
