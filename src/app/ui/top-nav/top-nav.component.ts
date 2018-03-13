import { Component, OnInit } from '@angular/core';
import { StatusService} from '../../admin/login/status.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
/**
 * Nav bar component class
 */
export class TopNavComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(private statuss: StatusService) { }

  ngOnInit() {
    this.isLoggedIn = this.statuss.getLoggedInStatus();
  }

}
