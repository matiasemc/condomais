import { ChangeDetectionStrategy, Component, OnInit, computed, effect, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { CardComponent, EmptyStateComponent, SpinnerComponent } from '@condomais/ui';
import {
  UserManagementService,
  type UserManagementCondominioOption,
  type UserManagementMembership,
  type UserManagementRole,
  type UserManagementUserDetail,
} from '@condomais/core';

interface RoleOption {
  label: string;
  value: UserManagementRole;
}

@Component({
  selector: 'cm-user-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    SelectModule,
    InputTextModule,
    TagModule,
    CardComponent,
    EmptyStateComponent,
    SpinnerComponent,
  ],
  templateUrl: './user-edit-dialog.component.html',
  styleUrl: './user-edit-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditDialogComponent implements OnInit {
  private readonly userManagement = inject(UserManagementService);
  private readonly messageService = inject(MessageService);

  readonly visible = input(false);
  readonly userId = input<string | null>(null);

  readonly visibleChange = output<boolean>();
  readonly updated = output<void>();

  readonly isLoading = signal(false);
  readonly isSavingUser = signal(false);
  readonly isAddingMembership = signal(false);
  readonly membershipsLoading = signal(false);
  readonly userDetail = signal<UserManagementUserDetail | null>(null);
  readonly condominios = signal<UserManagementCondominioOption[]>([]);

  readonly roleOptions: RoleOption[] = [
    { label: 'Morador', value: 'MORADOR' },
    { label: 'Porteiro', value: 'PORTEIRO' },
    { label: 'SÃ­ndico', value: 'SINDICO' },
    { label: 'Conselho', value: 'CONSELHO' },
  ];

  readonly availableCondominios = computed(() => {
    const selectedIds = new Set(this.userDetail()?.memberships.map((membership) => membership.condominioId) ?? []);
    return this.condominios().filter((condominio) => !selectedIds.has(condominio.id));
  });

  name = '';
  isMasterAdmin = false;
  selectedCondominioId: string | null = null;
  selectedRole: UserManagementRole = 'MORADOR';

  constructor() {
    effect(() => {
      if (this.visible() && this.userId()) {
        void this.loadUser();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.condominios.set(await this.userManagement.getCondominios());
    } catch (error) {
      this.showError(error, 'NÃ£o foi possÃ­vel carregar a lista de condomÃ­nios.');
    }
  }

  close(): void {
    this.visibleChange.emit(false);
  }

  onDialogVisibleChange(visible: boolean): void {
    if (!visible) {
      this.close();
    }
  }

  async saveUser(): Promise<void> {
    const detail = this.userDetail();
    if (!detail || !this.name.trim()) {
      return;
    }

    this.isSavingUser.set(true);

    try {
      await this.userManagement.updateUser({
        id: detail.id,
        name: this.name,
        isMasterAdmin: this.isMasterAdmin,
      });

      this.userDetail.update((current) => current ? {
        ...current,
        name: this.name.trim(),
        isMasterAdmin: this.isMasterAdmin,
      } : current);

      this.updated.emit();
      this.messageService.add({
        severity: 'success',
        summary: 'UsuÃ¡rio atualizado',
        detail: 'As configuraÃ§Ãµes globais foram salvas.',
      });
    } catch (error) {
      this.showError(error, 'NÃ£o foi possÃ­vel salvar o usuÃ¡rio.');
    } finally {
      this.isSavingUser.set(false);
    }
  }

  async addMembership(): Promise<void> {
    const detail = this.userDetail();
    if (!detail || !this.selectedCondominioId) {
      return;
    }

    this.isAddingMembership.set(true);

    try {
      const membership = await this.userManagement.addMembership({
        userId: detail.id,
        condominioId: this.selectedCondominioId,
        role: this.selectedRole,
      });

      this.updateMembership(membership);
      this.selectedCondominioId = null;
      this.selectedRole = 'MORADOR';
      this.updated.emit();
      this.messageService.add({
        severity: 'success',
        summary: 'VÃ­nculo adicionado',
        detail: 'O condomÃ­nio foi associado ao usuÃ¡rio.',
      });
    } catch (error) {
      this.showError(error, 'NÃ£o foi possÃ­vel adicionar o vÃ­nculo.');
    } finally {
      this.isAddingMembership.set(false);
    }
  }

  async changeMembershipRole(membership: UserManagementMembership, role: UserManagementRole | null): Promise<void> {
    if (!role || membership.role === role) {
      return;
    }

    this.membershipsLoading.set(true);

    try {
      const updatedMembership = await this.userManagement.updateMembershipRole(membership.id, role);
      this.updateMembership(updatedMembership);
      this.updated.emit();
      this.messageService.add({
        severity: 'success',
        summary: 'Perfil atualizado',
        detail: `O papel em ${updatedMembership.condominioName} foi atualizado.`,
      });
    } catch (error) {
      this.showError(error, 'NÃ£o foi possÃ­vel atualizar o papel do vÃ­nculo.');
    } finally {
      this.membershipsLoading.set(false);
    }
  }

  async removeMembership(membership: UserManagementMembership): Promise<void> {
    const confirmed = window.confirm(`Remover o vÃ­nculo com ${membership.condominioName}?`);
    if (!confirmed) {
      return;
    }

    this.membershipsLoading.set(true);

    try {
      await this.userManagement.removeMembership(membership.id);
      this.userDetail.update((current) => current ? {
        ...current,
        memberships: current.memberships.filter((item) => item.id !== membership.id),
      } : current);
      this.updated.emit();
      this.messageService.add({
        severity: 'success',
        summary: 'VÃ­nculo removido',
        detail: 'A associaÃ§Ã£o foi removida com sucesso.',
      });
    } catch (error) {
      this.showError(error, 'NÃ£o foi possÃ­vel remover o vÃ­nculo.');
    } finally {
      this.membershipsLoading.set(false);
    }
  }

  membershipSeverity(role: UserManagementRole): 'success' | 'info' | 'warn' | 'secondary' {
    if (role === 'SINDICO') {
      return 'info';
    }

    if (role === 'PORTEIRO') {
      return 'warn';
    }

    if (role === 'CONSELHO') {
      return 'secondary';
    }

    return 'success';
  }

  private async loadUser(): Promise<void> {
    const userId = this.userId();
    if (!userId) {
      return;
    }

    this.isLoading.set(true);

    try {
      const detail = await this.userManagement.getUserWithMemberships(userId);
      this.userDetail.set(detail);
      this.name = detail.name;
      this.isMasterAdmin = detail.isMasterAdmin;
      this.selectedCondominioId = null;
      this.selectedRole = 'MORADOR';
    } catch (error) {
      this.showError(error, 'NÃ£o foi possÃ­vel carregar os detalhes do usuÃ¡rio.');
      this.close();
    } finally {
      this.isLoading.set(false);
    }
  }

  private updateMembership(membership: UserManagementMembership): void {
    this.userDetail.update((current) => {
      if (!current) {
        return current;
      }

      const memberships = current.memberships.filter((item) => item.id !== membership.id);
      memberships.push(membership);
      memberships.sort((a, b) => a.condominioName.localeCompare(b.condominioName));

      return {
        ...current,
        memberships,
      };
    });
  }

  private showError(error: unknown, fallback: string): void {
    const detail = error instanceof Error ? error.message : fallback;
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail,
    });
  }
}
