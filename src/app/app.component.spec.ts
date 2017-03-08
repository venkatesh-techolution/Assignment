import { TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { AppService } from './app.service';

import {Observable} from 'rxjs/Rx';


let mockMakes =[{
  '_id':1,
	'name' : 'Ford'
},
{
  '_id':2,
	'name' : 'Acura'
}];

let mockMades = [
		{
      "_id": 1,
			"name": "Edge",
			"imageUrl": "/images/ford_edge.jpg",
			"description": "The Ford Edge is a mid-sized crossover SUV manufactured by Ford.The first generation Edge is based on the Ford CD3 platform shared with the first generation Ford Fusion, Mazda CX-9, first & second generation Mazda 6 and Lincoln MKX.Along with a rebadged premium variant, the Lincoln MKX, the Edge (codename U387), is manufactured at Ford's Oakville Assembly Complex in Oakville, Ontario, Canada."
		},
		{
      "_id": 2,      
			"name": "Escape",
			"imageUrl": "/images/ford_escape.jpg",
			"description": "The Ford Escape is a compact crossover vehicle sold by Ford since 2000 over three generations. Ford released the original model in 2000 for the 2001 model year—a model jointly developed and released with Mazda of Japan—who took a lead in the engineering of the two models and sold their version as the Mazda Tribute"
		}
	];

class MockAppService {

  get(url){
    if(url.indexOf('make/all')!==-1){
      return Observable.create(observer => {
        observer.next(mockMakes);
        observer.complete();
      });
    }
    return Observable.create(observer => {
      observer.next(mockMades);
      observer.complete();
    });
  }
  
}


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CustomSelectComponent
      ],
      providers:[
        { provide: AppService, useClass : MockAppService}
      ]
    }).compileComponents();
  }));

  it('should Initilize the app correctly', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    expect(app.makes).toEqual([]);
    expect(app.mades).toEqual([]);
    expect(app.imageUrl).toEqual('');
    expect(app.description).toEqual('');
  }));

  it('should get the makes correctly', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    expect(app.makes).toEqual(mockMakes);
    expect(app.mades).toEqual([]);
    expect(app.imageUrl).toEqual('');
    expect(app.description).toEqual('');
  }));

  it('should get the mades correctly when make is selected', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.onMakeSelected(1);
    // For this testcase we are not calling ngOnInit and only testing for onMakeSelected. Hence app.makes will not change
    expect(app.makes).toEqual([]);
    expect(app.mades).toEqual(mockMades);
    expect(app.imageUrl).toEqual('');
    expect(app.description).toEqual('');
  }));

  it('should get the imageUrl correctly when made is selected', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.onMakeSelected(1);
    app.onMadeSelected(mockMades[0]._id);
    // For this testcase we are not calling ngOnInit and only testing for onMakeSelected and onMadeSelected. Hence app.makes will not change
    expect(app.makes).toEqual([]);
    expect(app.mades).toEqual(mockMades);
    expect(app.imageUrl).toEqual(mockMades[0].imageUrl);
    expect(app.description).toEqual(mockMades[0].description);
  }));

  it('should render the image correctly when made is selected', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.onMakeSelected(1);
    app.onMadeSelected(mockMades[0]._id);
    // For this testcase we are not calling ngOnInit and only testing for onMakeSelected and onMadeSelected. Hence app.makes will not change
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('img')).nativeElement).toBeDefined();
    expect(fixture.debugElement.query(By.css('img')).nativeElement.src).toContain(mockMades[0].imageUrl);

    expect(fixture.debugElement.query(By.css('p')).nativeElement.textContent).toContain(mockMades[0].description);
    
  }));
});
