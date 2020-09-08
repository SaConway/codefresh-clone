import { Component, Input, OnInit } from '@angular/core';
import { Build } from '../build.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { BuildService } from '../build.service';

@Component({
  selector: 'app-build-info',
  templateUrl: './build-info.component.html',
  styleUrls: ['./build-info.component.scss'],
})
export class BuildInfoComponent implements OnInit {
  @Input() build: Build;
  numOfCompletedSteps: BehaviorSubject<number>;
  buildDuration: Subject<number>;

  constructor(private buildService: BuildService) {}

  ngOnInit() {
    this.numOfCompletedSteps = this.buildService.numOfCompletedSteps;
    this.buildDuration = this.buildService.buildDuration;
  }
}
