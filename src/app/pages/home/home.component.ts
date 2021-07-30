import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { excludePattern } from 'validators';
import { ApiService } from 'services';
import { ORDER_BY } from 'constants/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  formConfig = {
    id: 'keyword',
    label: 'Search by Patient',
    type: 'text',
    placeholder: 'Patient name',
  };
  errorMsg = {
    specialChar: 'cannot contain any special characters',
    empty: 'cannot be empty',
    notFound: 'Not found',
  };
  searchForm: FormGroup;
  patientName: string[] = [];
  notFound = false;

  constructor(formBuilder: FormBuilder, private apiService: ApiService) {
    this.searchForm = formBuilder.group({
      keyword: [
        '',
        [
          Validators.required,
          excludePattern(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/),
        ],
      ],
    });
  }

  /*
   * Returns keyword form control
   * @returns {AbstractControl}
   */
  get keyword() {
    return this.searchForm.get('keyword');
  }

  /*
   * Search for patient name
   * @param {string} keyword
   */
  search(keyword: string = '') {
    const currentKeyword = keyword.trim();

    if (!currentKeyword) {
      this.keyword?.setValue('');
      return;
    }

    this.apiService.searchPatient(currentKeyword, ORDER_BY.DESC).subscribe((res) => {
      if (res?.status === 200) {
        this.patientName = res?.result ?? [];
        this.notFound = false;
        return;
      }

      this.notFound = true;
      this.patientName = [];
    });
  }

  /*
   * Clear search input and result
   */
  clearSearch() {
    this.keyword?.reset('');
    this.patientName = [];
  }
}
