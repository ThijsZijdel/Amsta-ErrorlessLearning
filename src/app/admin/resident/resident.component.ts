import { Component, Input, OnInit } from '@angular/core';
import { Resident } from "../../models/Resident";
import { ResidentService } from "../../services/resident.service";
import { ActivatedRoute } from "@angular/router";
import { Activity } from "../../models/Activity";
import { Observable } from "rxjs/Observable";
import { TaskService } from "../../services/task.service";
import { Task } from '../../models/Task';


@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.css']
})
export class ResidentComponent implements OnInit {

  @Input() resident: Resident;

  protected today: Date = new Date();

  protected tabsIndex: number;

  //More information about an activity
  protected infoDisplay: boolean = false;

  //Edit an activity
  protected editDisplay: boolean = false;

  //Steps option to edit
  protected editable: boolean = true;

  //Edit the resident itself
  protected editResident: boolean = false;

  protected enableTab: boolean = true;


  protected infoActiv: Activity = null;

  //Uploading Image
  selectedFile: File;
  uploading = false;
  imgLink: string;
  random = new Date().getTime();

  @Input() activityTask: Task;

  constructor(private route: ActivatedRoute,
    public residentService: ResidentService,
    public taskService: TaskService) { }

  ngOnInit() {
    this.getResident();

    this.clearInfoActivity();

    this.checkForEditResident();
  }

  /**
   * Get all the residents
   * @author Thijs Zijdel
   */
  protected getResident(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.residentService.getResident(id)
      .subscribe(resident => this.resident = resident);

    // this.resident = this.residentService.getResident(id);
  }


  /**
   * Check if an activity is today
   *
   * @param {Date} date
   * @returns {boolean} true= today || false= not today
   * @author Thijs Zijdel
   */
  protected isToday(date: Date): boolean {
    return date === this.today;
  }

  /**
   * Check if an activity is already completed
   *
   * @param {Activity} activity
   * @returns {boolean} true= completed || false= not completed
   * @author Thijs Zijdel
   */
  protected isCompleted(activity: Activity): boolean {
    if (activity.completed) {
      //this.completedActivities.push(activity);
      return true;
    } else {
      return false;
    }

  }

  /**
   * Get more info from an activity
   * @param {Activity} activity
   * @author Thijs Zijdel
   */
  protected getInfo(activity: Activity): void {
    if (activity === null)
      this.clearInfoActivity();
    else
      this.residentService.setInfoActivity(activity);

    this.infoDisplay = true;

  }

  /**
   * Clear/ exit the more info activity
   * @author Thijs Zijdel
   */
  protected clearInfoActivity(): void {
    if (this.residentService.infoActivity != null)
      this.residentService.infoActivity = null;

    if (this.infoDisplay == true)
      this.infoDisplay = false;
  }


  /**
   * Set an activity ready for editing
   * @param {Activity} activity
   * @author Thijs Zijdel
   */
  protected editActivity(activity: Activity): void {
    if (activity === null)
      this.clearInfoActivity();
    else
      this.residentService.setInfoActivity(activity);

    this.infoDisplay = false;
    this.editDisplay = true;

    this.enableTab = false;

  }

  /**
   * Method for exiting the edit activity tab
   * This ensures that the variables are setup right.
   * @author Thijs Zijdel
   */
  protected exitEditTab(): void {
    this.editDisplay = false;
    this.enableTab = true;
  }

  /**
   * Reload the info activity
   */
  protected reload(): void {
    this.getInfoActivity();
  }


  /**
   * Get the right info activity from the resident service
   * Asign this to the local variables
   * @author Thijs Zijdel
   */
  private getInfoActivity(): void {
    this.infoActiv = this.residentService.infoActivity;

    if (this.infoActiv != null)
      this.taskService.getTask(this.infoActiv.taskId).subscribe(task => this.activityTask = task);
  }


  /**
   * Set the main ((residentComponents) tab for the options
   * @param {number} index (of the tab)
   * @author Thijs Zijdel
   */
  protected setTabIndex(index: number): void {
    if (this.tabsIndex == index) {
      this.tabsIndex = null;
    }

    this.tabsIndex = index;
  }

  /**
   * Check if there is an editable resident setup in the service layer
   * @author Thijs Zijdel
   */
  private checkForEditResident(): void {
    if (this.residentService.editResident) {
      this.editable = false;
      this.editResident = true;
    }

  }

  /**
   * Clearing the edit functionality
   * @author Thijs Zijdel
   */
  protected clearEditSetting(): void {
    this.residentService.editResident = false;
    this.editResident = false;
  }

  /**
   * Save an resident when editing enabled
   *
   * @param {string} bio   (description of the resident)
   * @param {string} name
   * @param {string} surname
   * @author Thijs Zijdel
   */
  saveResident(bio: string, name: string, surname: string): void {
    console.log(bio + " -- bio --  " + name + " namee " + surname)
    this.resident.name = name;
    this.resident.surname = surname;
    this.resident.bio = bio;
    this.resident.imgPath = this.imgLink;

    this.residentService.updateResident(this.resident);
    alert("Aanpassingen zijn opgeslagen.")
  }

  /**
     * Checks if there's any file pending to upload
     * @author René Kok
     */
  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  /**
   * Upload image to server and set names to right path
   * @author René Kok
   */
  onUploadImgLink() {
    this.uploading = true;
    var fileName = this.resident.name + " " + this.resident.surname + ".jpg";

    this.imgLink = "bezig met uploaden";
    this.resident.imgPath = "bezig met uploaden";
    console.log("Set fileurl to " + this.resident.imgPath)

    this.residentService.uploadImage(this.selectedFile, fileName)
      .then(() => this.updateImgPath(fileName));
  }

  /**
   * Updates the path for the images
   * @author René Kok
   */
  updateImgPath(fileName: string) {
    setTimeout(() => {
      var fileLocation = "/residents/";
      this.resident.imgPath = fileLocation + fileName;
      this.random = new Date().getTime();
      console.log("Set fileurl to " + this.resident.imgPath)
      this.uploading = false;
    }, 1000);
  }

}


