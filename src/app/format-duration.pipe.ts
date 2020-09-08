import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatDuration' })
export class FormatDurationPipe implements PipeTransform {
  transform(duration: number) {
    const minutes: number = Math.floor(duration / 60000);
    const seconds: number = parseInt(((duration % 60000) / 1000).toFixed(0));
    return (minutes ? minutes + 'm ' : '') + seconds + 's';
  }
}
