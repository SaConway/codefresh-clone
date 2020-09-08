import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cleanText' })
export class CleanTextPipe implements PipeTransform {
  transform(text: string) {
    return text.replace('...', '');
  }
}
