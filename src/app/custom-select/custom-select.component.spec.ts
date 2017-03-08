
import { TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CustomSelectComponent } from './custom-select.component';

let mockList = [{
  _id:1,
  name:'Ford'
},{
  _id:2,
  name:'Acura'
}]

let mockDefaultText = 'Select Car';

describe('CustomSelectComponent', () => {
  let component;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSelectComponent);
    component = fixture.componentInstance;
    component.list=mockList;
    component.defaultText = mockDefaultText;
    fixture.detectChanges();
  });

  it('should Initilise Values Correctly', () => {
    expect(component).toBeTruthy();
    expect(component.list).toBeDefined();
    expect(component.defaultText).toBeDefined();
    expect(component.list).toEqual(mockList);
    expect(component.defaultText).toEqual(mockDefaultText);
  });

  it('should Render the Values Correctly',() => {
      expect(fixture.debugElement.query(By.css('option'))).toBeDefined();
      expect(fixture.debugElement.query(By.css('option:nth-child(1)')).nativeElement.textContent).toContain(mockDefaultText);
      expect(fixture.debugElement.query(By.css('option:nth-child(2)')).nativeElement.textContent).toContain(mockList[0].name);
      expect(fixture.debugElement.query(By.css('option:nth-child(3)')).nativeElement.textContent).toContain(mockList[1].name);
      expect(fixture.debugElement.query(By.css('option:nth-child(1)')).nativeElement.value).toContain('');
      expect(fixture.debugElement.query(By.css('option:nth-child(2)')).nativeElement.value).toContain(mockList[0]._id);
      expect(fixture.debugElement.query(By.css('option:nth-child(3)')).nativeElement.value).toContain(mockList[1]._id);     
});

});
