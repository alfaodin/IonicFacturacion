import { Component } from '@angular/core';

/**
 * Generated class for the FilePickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'file-picker',
  templateUrl: 'file-picker.html'
})
export class FilePickerComponent {

  text: string;

  constructor() {
    console.log('Hello FilePickerComponent Component');
    this.text = 'Hello World';
  }

}
