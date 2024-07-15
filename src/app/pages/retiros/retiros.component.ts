import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MagicInputComponent } from '../../components/magic-input/magic-input.component';

@Component({
  selector: 'app-retiros',
  standalone: true,
  imports: [MagicInputComponent, ReactiveFormsModule],
  templateUrl: './retiros.component.html',
  styleUrl: './retiros.component.css'
})
export class RetirosComponent {
  data = new FormGroup({
    cuenta: new FormControl('')

  });

  //Esto se debe convertir en un input
  cuentas = ["**** **** **** *123", "**** **** **** *456", "**** **** **** *789"]

  //Este tambien deberia ser un input
  retiros =[
    {fecha:"01/01/2024", monto:200},
    {fecha:"01/01/2024", monto:200},
    {fecha:"01/01/2024", monto:200},
    {fecha:"01/01/2024", monto:200},
    {fecha:"01/01/2024", monto:200}
  ]
}
