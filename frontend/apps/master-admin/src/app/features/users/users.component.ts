import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { UserManagementService, type UserManagementListItem } from '@condomais/core';
import { UserEditDialogComponent } from './user-edit-dialog.component';

@Component({
  selector: 'cm-users',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    TagModule,
    ToastModule,
    UserEditDialogComponent,
  ],
  providers: [MessageService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly userManagement = inject(UserManagementService);
  private readonly messageService = inject(MessageService);

  readonly isLoading = signal(true);
  readonly users = signal<UserManagementListItem[]>([]);
  readonly selectedUserId = signal<string | null>(null);
  readonly isDialogVisible = signal(false);

  searchTerm = '';

  readonly filteredUsers = computed(() => {
    const query = this.searchTerm.trim().toLowerCase();

    return this.users().filter((user) =>
      !query ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  constructor() {
    void this.loadUsers();
  }

  openEditDialog(userId: string): void {
    this.selectedUserId.set(userId);
    this.isDialogVisible.set(true);
  }

  closeDialog(): void {
    this.isDialogVisible.set(false);
    this.selectedUserId.set(null);
  }

  async reloadUsers(): Promise<void> {
    await this.loadUsers(false);
  }

  masterAdminSeverity(value: boolean): 'danger' | 'secondary' {
    return value ? 'danger' : 'secondary';
  }

  private async loadUsers(showToast = true): Promise<void> {
    this.isLoading.set(true);

    try {
      this.users.set(await this.userManagement.getUsers());
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao carregar usuários',
        detail: error instanceof Error ? error.message : 'Tente novamente em instantes.',
      });

      if (showToast) {
        this.users.set([]);
      }
    } finally {
      this.isLoading.set(false);
    }
  }
}
