import { Injectable } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor(
    private animationCtrl: AnimationController
  ) { }

  removeElementFromList(e: any){
    const animation = this.animationCtrl.create()
          .addElement(e)
          .duration(500)
          .easing('ease-out')
          .fromTo('transform', 'translateX(0px)', 'translateX(-100px)')
          .fromTo('opacity', '1', '0');
        animation.play();
  }

  slideInBottom(e: any){
    const animation = this.animationCtrl.create()
        .addElement(e)
        .duration(500)
        .easing('ease-out')
        .fromTo('transform', 'translateY(100%)', 'translateY(0)')
        .fromTo('opacity', '0', '1');
      animation.play();
  }

  slideOutBottom(e: any){
    const animation = this.animationCtrl.create() // Crear una animación con el AnimationController
        .addElement(e)
        .duration(500)
        .easing('ease-out')
        .fromTo('transform', 'translateY(0)', 'translateY(100%)') 
        .fromTo('opacity', '1', '0');
      animation.play()
  }

}
