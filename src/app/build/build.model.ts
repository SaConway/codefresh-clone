import { Step } from './step.model';
import { buildStatus } from './build-status.enum';

export class Build {
  created?: number;
  finished?: number;
  status: buildStatus;
  steps: Step[];
}
