// shared/utils/component-injector.ts
import { ApplicationRef, ComponentRef, Injectable, Injector, Type, createComponent } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ComponentInjectorService {
     constructor(private appRef: ApplicationRef, private injector: Injector) {}

     public appendComponent<T>(component: Type<T>): ComponentRef<T> {
          const componentRef = createComponent(component, {
               environmentInjector: this.appRef.injector
          });

          this.appRef.attachView(componentRef.hostView);
          const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
          document.body.appendChild(domElem);

          return componentRef;
     }
}
