import { Component } from '@angular/core';

@Component({
  selector: 'investment-slider',
  standalone: true,
  imports: [],
  templateUrl: './investment-slider.component.html',
  styleUrl: './investment-slider.component.css'
})
export class InvestmentSliderComponent {
  open:boolean=false;

  setOpen(){this.open=!this.open
    console.log(this.open)
  }
}
