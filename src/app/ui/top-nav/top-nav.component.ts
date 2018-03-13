import { Component, OnInit } from '@angular/core';
import { StatusService} from '../../admin/login/status.service';
import {observable} from "rxjs/symbol/observable";

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
/**
 * Nav bar component class
 */
export class TopNavComponent implements OnInit {

  constructor(private statusService: StatusService) { }

  ngOnInit() {
  }

}
