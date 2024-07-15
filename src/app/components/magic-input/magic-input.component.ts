import { Component, Input, forwardRef, Injector } from '@angular/core';
import { NgControl,FormsModule,ReactiveFormsModule, ControlValueAccessor,NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'magic-input',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './magic-input.component.html',
  styleUrl: './magic-input.component.css',
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>MagicInputComponent),
      multi:true
    }
  ]
})
export class MagicInputComponent implements ControlValueAccessor {

  @Input() kind:string="text";
  @Input() id:string="";
  @Input() label:string="";
  @Input() placeholder?:string="";
  @Input() required:boolean=false;
  @Input() formControlName?: string="";
  @Input() options?:string[];
  

  controlDir!: NgControl;

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.controlDir = this.injector.get(NgControl);
  }

  get control() {
    return this.controlDir.control as FormControl;
  }
  

  value:any = "";
  onChange:any =()=>{};
  onTouch:any=()=>{};

  writeValue(value: any): void {
    this.value=value;
  }
  registerOnChange(fn: any): void {
    this.onChange=fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch=fn;
  }

}
