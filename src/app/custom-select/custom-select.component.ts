import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent {

  @Input() list:any ;
  @Input() defaultText:String;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  // Used to emit the option selected
  itemSelected(item){

    this.notify.emit(item); 

  }


}
