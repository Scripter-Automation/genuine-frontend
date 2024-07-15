import { Component } from '@angular/core';
import { UserDataHeaderComponent } from '../../components/user-data-header/user-data-header.component';
import { InvestmentSliderComponent } from '../../components/investment-slider/investment-slider.component';

@Component({
  selector: 'app-inversiones',
  standalone: true,
  imports: [UserDataHeaderComponent,InvestmentSliderComponent],
  templateUrl: './inversiones.component.html',
  styleUrl: './inversiones.component.css'
})
export class InversionesComponent {
  cards = [1,2,3,4]
}
