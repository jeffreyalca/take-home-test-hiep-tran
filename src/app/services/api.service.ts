import { Injectable } from '@angular/core';
import { SORT_BY } from 'constants/constants';
import { patientName } from 'mocks';
import { PatientResponse } from 'models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /*
   * Simulate API logic that query patient name from DB
   * Returns list of patient name
   * @param {string} keyword
   * @param {string} order
   * @returns {Observable} API response with status and result
   */
  searchPatient(
    keyword: string,
    order: string = SORT_BY.ASC
  ): Observable<PatientResponse> {
    const result: string[] = patientName
      .filter(
        ({ first_name, last_name }) =>
          first_name.toLowerCase().includes(keyword) ||
          last_name.toLowerCase().includes(keyword)
      )
      .map(({ first_name, last_name }) => `${first_name} ${last_name}`);

    if (order === SORT_BY.DESC) {
      result.sort((a, b) => {
        if (a.localeCompare(b) > 0) {
          return -1;
        } else if (a.localeCompare(b) < 0) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      result.sort((a, b) => a.localeCompare(b));
    }

    if (!result.length) {
      return of({ status: 400, result });
    }

    return of({ status: 200, result });
  }
}
