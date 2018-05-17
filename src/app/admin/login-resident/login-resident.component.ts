import { Component, OnInit } from '@angular/core';
import { ResidentService } from '../../services/resident.service'
import { Resident } from '../../models/Resident'

@Component({
  selector: 'app-login-resident',
  templateUrl: './login-resident.component.html',
  styleUrls: ['./login-resident.component.css']
})
export class LoginResidentComponent implements OnInit {

  residents: Resident[];

  constructor(private residentService: ResidentService) {  }

  ngOnInit() {
    this.getResidents();
  }


  getResidents(): void {
    this.residentService.getResidents().subscribe(residents => this.residents = residents);
  }

  public setResident(resident: Resident): void {
    this.residentService.residentLoggedIn = true;
    this.residentService.login(resident);
  }
}
