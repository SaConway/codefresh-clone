import { buildStatus } from './build-status.enum';

export class Step {
  name: string;
  status?: buildStatus;
  logs: string[];
}
