import { Component, OnInit } from '@angular/core';
import { StatusService} from '../../login/status.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
/**
 * Nav bar component class
 */
export class TopNavComponent implements OnInit {
  isLoggedIn = false;

  constructor(private data: StatusService) { }

  ngOnInit() {
    this.data.actualStatus.subscribe(loggedInStatus => this.isLoggedIn = loggedInStatus);
  }

  logout() {
    this.data.changeLoggedInStatus(false);
  }
}
