import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Build } from './build.model';
import { BuildService } from './build.service';
import { Step } from './step.model';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss'],
})
export class BuildComponent implements OnInit {
  public build$: Subject<Build>;

  constructor(private buildService: BuildService) {}

  ngOnInit() {
    this.build$ = this.buildService.build$;
  }

  getLogs(steps: Step[]): string[] {
    const stepLogs = steps.map((s) => s.logs);
    return [].concat(...stepLogs);
  }
}
