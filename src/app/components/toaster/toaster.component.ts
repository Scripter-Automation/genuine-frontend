import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'toaster',
  standalone: true,
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent implements OnInit {
  
  protected padding:number=2;
  @Input() super_container_class = "w-full min-h-40 absolute top-1"
  container_class:string="hidden";
  class:string=`p-${this.padding} rounded shadow-lg `;
  container_class_setter:string="w-full flex justify-center"
  @Input() kind:ToastKind=ToastKind.info;
  @Input() HTML?:HTMLElement;
  @Input() message?:string="";
  @Input() title?:string="";
  @Input() duration?:number=5000;

  constructor(){}
  ngOnInit(): void {
    if(this.HTML===undefined){
      switch(this.kind){
        case ToastKind.info:
          this.class = this.class+"bg-white";
          break;
        case ToastKind.error:
          this.class=this.class+"bg-red-500 text-white"
          break;
        case ToastKind.success:
          this.class=this.class+"bg-green-500"
          break;
        case ToastKind.warning:
          this.class=this.class+"bg-yellow-500"
          break;
        case ToastKind.costum:
          this.class="";
          break;
  
      }
    }

  }

  /**
   * Allows for programatic interaction with the toaster title through @ViewChildren
   * @param title The title to be written in the toast
   */
  public setTitle(title:string):void{
    this.title=title;
  }
  /**
   * Allows for programatic interaction with the toaster message through @ViewChildren
   * @param message The message to be written in the toast
   */
  public setMessage(message:string):void{
    this.message=message;
  }
  public setKind(kind:ToastKind):void{
    this.kind=kind;
    this.class=`p-${this.padding} rounded shadow-lg `
    if(this.HTML===undefined){
      switch(this.kind){
        case ToastKind.info:
          this.class = this.class+"bg-white";
          break;
        case ToastKind.error:
          this.class=this.class+"bg-red-500 text-white"
          break;
        case ToastKind.success:
          this.class=this.class+"bg-green-500"
          break;
        case ToastKind.warning:
          this.class=this.class+"bg-yellow-500"
          break;
        case ToastKind.costum:
          this.class="";
          break;
  
      }
    }
  }

  public setPadding(padding:number){
    this.padding=padding;
  }

  /**
   * Overrideds current Toaster-Body class through @ViewChildren
   * @param Class The class to replace the current Toaster-Body class
   */
  public setClass(Class:string):void{
    this.class=Class;
  }


  public setDuration(milisec:number){
    this.duration=milisec;
  }
  /**
   * Sets the container class which determines the position of the container
   * inside of the super container
   * @param Class class to override the current container class
   */
  public setContainerClass(Class:string){
    this.container_class_setter
  }
  /**
   * Controls the absolute position of the whole ToastComponent
   * @param Class class to override the current super container class
   */
  public setSuperContainerClass(Class:string){
    this.super_container_class
  }

  /**
   * Renders the toast visible in the screen
   * @param container_class controlls the position of the container inside the super container
   * @param Class controlls the Toast-Body class
   */
  public showToast(container_class?:string,Class?:string):void{
    if(container_class){
      //uses given container class
      this.container_class=container_class;
    }else{
      //uses default container class
      this.container_class=this.container_class_setter
    }
    if(Class){
      //permenantly changes Toaster's body class
      this.class=Class;
    }
    setTimeout(()=>{
      this.container_class="hidden";
    },this.duration)
  }


}

export enum ToastKind {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
  costum= "costum"
}
