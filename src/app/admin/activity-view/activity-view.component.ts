import { Component, OnInit } from '@angular/core';
import {Activity} from "../../models/Activity";
import {ResidentService} from "../../services/resident.service";

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.css']
})
export class ActivityViewComponent implements OnInit {

  protected infoActivityView: Activity;

  constructor(protected residentService: ResidentService) { }

  ngOnInit() {
    this.infoActivityView = this.residentService.getInfoActivity();
  }


}
