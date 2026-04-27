import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule, type TableLazyLoadEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { UserManagementService, type UserManagementListItem } from '@condomais/core';
import { CardComponent, EmptyStateComponent, SearchInputComponent, SectionHeaderComponent } from '@condomais/ui';
import { UserEditDialogComponent } from './user-edit-dialog.component';

@Component({
  selector: 'cm-users',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    ButtonModule,
    TableModule,
    TagModule,
    ToastModule,
    CardComponent,
    EmptyStateComponent,
    SearchInputComponent,
    SectionHeaderComponent,
    UserEditDialogComponent,
  ],
  providers: [MessageService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly userManagement = inject(UserManagementService);
  private readonly messageService = inject(MessageService);

  readonly isLoading = signal(true);
  readonly users = signal<UserManagementListItem[]>([]);
  readonly totalRecords = signal(0);
  readonly selectedUserId = signal<string | null>(null);
  readonly isDialogVisible = signal(false);
  readonly first = signal(0);
  readonly rows = signal(10);
  readonly searchTerm = signal('');

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
    await this.loadUsers(undefined, false);
  }

  async onSearch(term: string): Promise<void> {
    this.searchTerm.set(term);
    this.first.set(0);
    await this.loadUsers({
      first: 0,
      rows: this.rows(),
      sortField: 'name',
      sortOrder: 1,
    }, false);
  }

  masterAdminSeverity(value: boolean): 'danger' | 'secondary' {
    return value ? 'danger' : 'secondary';
  }

  async loadUsers(event?: TableLazyLoadEvent, showToast = true): Promise<void> {
    const first = event?.first ?? this.first();
    const rows = event?.rows ?? this.rows();
    const sortField = Array.isArray(event?.sortField) ? event?.sortField[0] : event?.sortField;
    const sortOrder = event?.sortOrder === -1 ? -1 : 1;

    this.first.set(first);
    this.rows.set(rows);
    this.isLoading.set(true);

    try {
      const page = await this.userManagement.getUsersPage({
        first,
        rows,
        sortField: sortField ?? 'name',
        sortOrder,
        globalFilter: this.searchTerm(),
      });
      this.users.set(page.data);
      this.totalRecords.set(page.totalRecords);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao carregar usuÃ¡rios',
        detail: error instanceof Error ? error.message : 'Tente novamente em instantes.',
      });

      if (showToast) {
        this.users.set([]);
        this.totalRecords.set(0);
      }
    } finally {
      this.isLoading.set(false);
    }
  }
}
