import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateTime',
  standalone: true,
})
export class DateTimePipe implements PipeTransform {
  transform(
    value: Date | string | number | any,
    type: 'date' | 'time' | 'datetime' = 'datetime'
  ): string {
    if (!value) return '';

    // Firestore Timestamp object support
    if (typeof value.toDate === 'function') {
      value = value.toDate(); // convert Firestore Timestamp to JS Date
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) return '';

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);

    switch (type) {
      case 'date':
        return formattedDate;
      case 'time':
        return formattedTime;
      case 'datetime':
      default:
        return `${formattedDate} at ${formattedTime}`;
    }
  }
}
