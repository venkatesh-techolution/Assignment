import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  makes: any[] = [];
  mades: any[] = [];
  imageUrl: String = '';
  description : String = ''; 
  



  constructor(private appService: AppService) { }


  // Method helps us to load all makes and made dynamically
  private load(url, isMake) {
    this.appService.get(url).
      subscribe(
      response => {
        if (isMake)
          this.makes = response;
        else
          this.mades = response;
      },
      error => {
        console.log(error);
      });
  }

  // Load all makes before compoenent load
  ngOnInit(): void {

    this.load("make/all", true);

  }

  // Call Load function to get mades from server
  onMakeSelected(item) {
    // Reset Dependent Values when the make is changed
    this.mades = [];
    this.imageUrl = '';
    this.description = '';
    this.load("made/search?makeId=" + item, false);
  }

  // Get imageUrl for selected Made
  onMadeSelected(id) {

    let made = this.mades.find(item => item._id === id);

    this.imageUrl = made.imageUrl;
    this.description = made.description;
  }

}
