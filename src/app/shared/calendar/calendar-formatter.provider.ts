import { Injectable } from '@angular/core';
import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { DatePipe } from '@angular/common';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {

  public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return new DatePipe('fr').transform(date, 'E', 'fr')[0].toUpperCase();
  }

  public monthViewTitle({ date, locale }: DateFormatterParams): string {
    const title = new DatePipe('fr').transform(date, 'MMMM y', 'fr');
    return title[0].toUpperCase() + title.substring(1);
}
}