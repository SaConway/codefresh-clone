import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Build } from './build.model';
import { ServerService } from './server.service';
import { buildStatus } from './build-status.enum';
import { Step } from './step.model';

@Injectable({
  providedIn: 'root',
})
export class BuildService {
  public build$: Subject<Build> = new Subject();
  public numOfCompletedSteps: BehaviorSubject<number> = new BehaviorSubject(0);
  public buildDuration: Subject<number> = new Subject();

  constructor(private http: HttpClient, private server: ServerService) {
    this.getJSON().subscribe((data) => {
      const steps = data.steps.map((step: { name: string }) => {
        return {
          name: step.name,
          status: buildStatus.Pending,
          logs: [],
        };
      });

      this.build$.next({
        status: buildStatus.Pending,
        steps: steps,
      });
    });
  }

  public doBuild(): void {
    this.server.doBuild();

    this.server.output$.subscribe((build: Build) => {
      this.build$.next(build);

      this.setNumOfCompletedSteps(build.steps);
      this.setDuration(build.created, build.finished);
    });
  }

  public stopBuild(): void {
    this.server.stopBuild();
  }

  private setNumOfCompletedSteps(steps: Step[]): void {
    const completedSteps = steps.filter(
      (step: Step) => step.status == 'Completed'
    );

    this.numOfCompletedSteps.next(completedSteps.length);
  }

  private setDuration(created: number, finished: number): void {
    const duration: number =
      (finished ? finished : new Date().getTime()) - created;

    this.buildDuration.next(duration);
  }

  private getJSON(): Observable<Build> {
    return this.http.get<Build>('./assets/build.json');
  }
}
