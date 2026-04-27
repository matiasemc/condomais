import {
  Directive, TemplateRef, ViewContainerRef, inject, input, effect,
} from '@angular/core';
import { FeatureService } from '../services/feature.service';

@Directive({ selector: '[appHasFeature]', standalone: true })
export class HasFeatureDirective {
  private readonly featureSvc = inject(FeatureService);
  private readonly vcr = inject(ViewContainerRef);
  private readonly tpl = inject(TemplateRef<unknown>);
  private hasView = false;

  readonly appHasFeature = input.required<string>();

  constructor() {
    effect(() => {
      const show = this.featureSvc.hasFeature(this.appHasFeature());
      if (show && !this.hasView) {
        this.vcr.createEmbeddedView(this.tpl);
        this.hasView = true;
      } else if (!show && this.hasView) {
        this.vcr.clear();
        this.hasView = false;
      }
    });
  }
}
