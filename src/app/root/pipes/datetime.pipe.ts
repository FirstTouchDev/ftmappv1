import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
     name: 'formatDateTime',
     standalone: true
})
export class DateTimePipe implements PipeTransform {
     transform(value: Date | string | number, type: 'date' | 'time' | 'datetime' = 'datetime'): string {
          if (!value) return '';

          const date = new Date(value);

          const options: Intl.DateTimeFormatOptions = {
               year: 'numeric',
               month: 'long',
               day: 'numeric',
          };

          const timeOptions: Intl.DateTimeFormatOptions = {
               hour: 'numeric',
               minute: '2-digit',
               hour12: true,
          };

          const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
          const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);

          switch (type) {
               case 'date':
                    return formattedDate;
               case 'time':
                    return formattedTime;
               case 'datetime':
                    return `${formattedDate} at ${formattedTime}`;
               default:
                    return `${formattedDate} at ${formattedTime}`;
          }
     }
}
