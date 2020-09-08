import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Build } from './build.model';
import { Step } from './step.model';
import { buildStatus } from './build-status.enum';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  public output$: BehaviorSubject<Build>;
  private initialBuild: Build;
  private input: Step[];
  private nextBuild: Build;
  private stepIndex: number;
  private logIndex: number;
  private interval;

  constructor(private http: HttpClient) {
    this.getJSON().subscribe((data: { steps: Step[] }) => {
      this.initInput(data.steps);
      this.setInitialBuild(data.steps);
    });
  }

  public doBuild(): void {
    this.initOutput();
    this.stepIndex = this.logIndex = 0;
    this.interval = setInterval(
      () => this.updateOutput(),
      Math.random() * 100 + 40
    );
  }

  public stopBuild(): void {
    clearInterval(this.interval);
    this.nextBuild.status = buildStatus.Terminated;
    this.nextBuild.steps[this.stepIndex].status = buildStatus.Terminated;
  }

  private updateOutput(): void {
    this.setNextOutput();
    this.checkIfStepCompleted();
    this.checkIfBuildCompleted();
    this.output$.next(this.nextBuild);
  }

  private checkIfBuildCompleted(): void {
    const completedBuild = this.stepIndex >= this.input.length;

    if (completedBuild) {
      clearInterval(this.interval);
      this.nextBuild.status = buildStatus.Completed;
    }
  }

  private checkIfStepCompleted(): void {
    const completedStep =
      this.logIndex >= this.input[this.stepIndex].logs.length;

    if (completedStep) {
      this.nextBuild.steps[this.stepIndex].status = buildStatus.Completed;
      this.stepIndex++;
      this.logIndex = 0;
    }
  }

  private setNextOutput(): void {
    this.nextBuild = { ...this.output$.value };
    this.nextBuild.status = buildStatus.Running;
    this.nextBuild.steps[this.stepIndex].status = buildStatus.Running;
    this.nextBuild.steps[this.stepIndex].logs.push(
      this.input[this.stepIndex].logs[this.logIndex]
    );
    this.logIndex++;
  }

  private initOutput(): void {
    const clonedBuild = this.getClonedBuild(this.initialBuild);
    clonedBuild.created = new Date().getTime();

    this.output$ = new BehaviorSubject(clonedBuild);
  }

  private setInitialBuild(steps: Step[]): void {
    const cleanSteps: Step[] = steps.map((step: Step) => {
      return {
        name: step.name,
        status: buildStatus.Pending,
        logs: [],
      };
    });

    this.initialBuild = {
      status: buildStatus.Pending,
      steps: cleanSteps,
    };
  }

  private initInput(steps: Step[]): void {
    this.input = steps.map((step: Step) => {
      return {
        name: step.name,
        logs: step.logs,
      };
    });
  }

  private getJSON(): Observable<any> {
    return this.http.get('./assets/build.json');
  }

  private getClonedBuild(build): Build {
    return JSON.parse(JSON.stringify(build));
  }
}
