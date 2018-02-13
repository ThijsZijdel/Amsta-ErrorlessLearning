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

  /**
   * Method for logging out of the application
   * By setting the logged in status to false
   * @author: Thijs Zijdel
   */
  logout() {
    this.data.changeLoggedInStatus(false);
  }
}
