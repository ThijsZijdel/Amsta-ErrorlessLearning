import {Step} from './Step';

export class Task {
  id: number;
  name: string;
  imgLink: string;
  mainDescription: string;
  steps: Step[];
}
