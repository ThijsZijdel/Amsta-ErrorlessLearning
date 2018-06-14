import {Timer} from "../../models/Timer";

export class TimerController
{
  timer: Timer;
  time: number = 12000;
  loader: HTMLElement;
  border: HTMLElement;
  backgroundLoader: HTMLElement;
  backgroundBorder: HTMLElement;
  htmlText: HTMLElement;
  a: number = 0;
  p: number = Math.PI;
  normalise: number = 360;
  isCompleted: boolean = false;
  currentTime: number;
  timeouts = [];

  constructor(timer: Timer) {
    this.timer = timer;
    this.isCompleted = false;
    this.time = timer.time;
    this.currentTime = this.time;
  }

  public stopTimer(): void {
    this.clearTimeouts();
    this.a = 0;
    this.isCompleted = false;
  }

  public startTimer(): void {
    this.clearTimeouts();
    this.a = 0;
    this.isCompleted = false;

    this.loader = document.getElementById('timer-loader');
    this.border = document.getElementById('timer-border');
    this.backgroundLoader = document.getElementById('timer-background-loader');
    this.backgroundBorder = document.getElementById('timer-background-border');
    this.htmlText = document.getElementById('timer-text');

    this.currentTime = this.time;
    this.htmlText.innerText = this.millisToMinutesAndSeconds(this.currentTime);

    this.draw(this);
    this.drawBackground();
    this.timeouts.push(setTimeout(this.changeTimedText(this), 1000));
  }

  private changeTimedText(timer: TimerController): void {
    const second = 1000;
    timer.currentTime -= second;
    timer.htmlText.innerText = this.millisToMinutesAndSeconds(timer.currentTime);

    if(!timer.isCompleted) {
      timer.timeouts.push(setTimeout(() => {
        timer.changeTimedText(timer);
      }, second));
    } else {
      this.htmlText.innerText = "Voltooid!";
    }
  }

  private millisToMinutesAndSeconds(milliSeconds: number): string {
    // Fixing a weird bug where it tries to count to -1
    milliSeconds += 1000;

    let minutes = Math.floor(milliSeconds / 60000);
    let seconds = Math.floor((milliSeconds % 60000) / 1000);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  private draw(timer: TimerController): void {
    timer.a++;
    timer.a %= 360;
    const r = ( timer.a * timer.p / 180 );
    const x = Math.sin(r) * 125;
    const y = Math.cos(r) * -125;
    const mid = ( timer.a > 180 ) ? 1 : 0;
    const anim = 'M 0 0 v -125 A 125 125 1 '
      + mid + ' 1 '
      + x + ' '
      + y + ' z';
    // [x,y].forEach(function( d ){
    //  d = Math.round( d * 1e3 ) / 1e3;
    // });

    timer.loader.setAttribute('d', anim);
    timer.border.setAttribute('d', anim);

    if (timer.a === 359) {
      timer.completeTimer();
    } else {
      timer.timeouts.push(setTimeout(() => {
        timer.draw(timer);
      }, timer.time / 360));
    }
  }

  private drawFull(): void {
    this.a = 360;
    const r = ( this.a * this.p / 180 );
    const x = Math.sin(r) * 125;
    const y = Math.cos(r) * -125;
    const mid = ( this.a > 180 ) ? 1 : 0;
    const anim = 'M 0 0 v -125 A 125 125 1 '
      + mid + ' 1 '
      + x + ' '
      + y + ' z';
    // [x,y].forEach(function( d ){
    //  d = Math.round( d * 1e3 ) / 1e3;
    // });

    this.loader.setAttribute('d', anim);
    this.border.setAttribute('d', anim);
  }

  private completeTimer(): void {
    this.drawFull();
    this.clearTimeouts();

    this.htmlText.innerText = "Voltooid!";
    alert("Goed gedaan, je kan naar de volgende stap!");
    this.isCompleted = true;
    this.timer.isCompleted = true;
  }

  private drawBackground(): void {
    const r: number = ( this.normalise * this.p / 180 );
    const x: number = Math.sin(r) * 125;
    const y: number = Math.cos(r) * -125;
    const mid: number = ( this.normalise > 180 ) ? 1 : 0;
    const anim: string = 'M 0 0 v -125 A 125 125 1 '
      + mid + ' 1 '
      + x + ' '
      + y + ' z';
    // [x,y].forEach(function( d ){
    //  d = Math.round( d * 1e3 ) / 1e3;
    // });

    this.backgroundLoader.setAttribute('d', anim);
    this.backgroundBorder.setAttribute('d', anim);
  }

  private clearTimeouts(): void {
    for (let i = 0; i < this.timeouts.length; i++) {
      clearTimeout(this.timeouts[i]);
    }
  }
}
