import { Component } from '@angular/core';
import {HomeComponent} from "../home/home.component";
import {OurStoryComponent} from "../our-story/our-story.component";
import {OurServiceComponent} from "../our-service/our-service.component";
import {WhyChooseUsComponent} from "../why-choose-us/why-choose-us.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    HomeComponent,
    OurStoryComponent,
    OurServiceComponent,
    WhyChooseUsComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
