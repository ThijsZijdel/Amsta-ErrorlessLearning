import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

/**
 * Messages component
 */
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
/**
 * Messages class
 * implements Initialize (OnInit)
 */
export class MessagesComponent implements OnInit {

  /**
   * Constructor with a connection to the message Service
   * @param {MessageService} messageService, application messages
   */
  constructor(public messageService: MessageService) {}

  /**
   * Called on initializing
   */
  ngOnInit() {
  }

}
