import { Component, Input } from '@angular/core';
import { BuildService } from '../build.service';
import { buildStatus } from '../build-status.enum';

@Component({
  selector: 'app-build-manage',
  templateUrl: './build-manage.component.html',
  styleUrls: ['./build-manage.component.scss'],
})
export class BuildManageComponent {
  @Input() status: buildStatus;

  constructor(private buildService: BuildService) {}

  onBuildClick(): void {
    this.buildService.doBuild();
  }

  onStopClick(): void {
    this.buildService.stopBuild();
  }
}
