import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'financialInfo'
})
export class FinancialInfoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
