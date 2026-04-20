import { Component, input, ChangeDetectionStrategy, computed } from '@angular/core';

@Component({
  selector: 'cm-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="avatar" [style.width.px]="size()" [style.height.px]="size()"
         [style.fontSize.px]="size() * 0.4" [style.background]="bgColor()">
      {{ initials() }}
    </div>
  `,
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  name   = input<string>('');
  color  = input<string>('#E8D5C4');
  size   = input<number>(44);

  initials = computed(() => {
    const parts = this.name().trim().split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : this.name().slice(0, 2).toUpperCase();
  });

  bgColor = computed(() => this.color());
}
