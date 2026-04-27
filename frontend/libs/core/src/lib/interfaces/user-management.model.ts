export type UserManagementRole = 'MORADOR' | 'PORTEIRO' | 'SINDICO' | 'CONSELHO';
export type UserManagementDbRole = 'morador' | 'porteiro' | 'sindico' | 'conselho';

export interface UserManagementListItem {
  id: string;
  email: string;
  name: string;
  isMasterAdmin: boolean;
  condominioCount: number;
  createdAt: string;
}

export interface UserManagementPageRequest {
  first: number;
  rows: number;
  sortField?: string | null;
  sortOrder?: 1 | -1 | 0 | null;
  globalFilter?: string | null;
}

export interface UserManagementPage {
  data: UserManagementListItem[];
  totalRecords: number;
}

export interface UserManagementMembership {
  id: string;
  userId: string;
  condominioId: string;
  condominioName: string;
  role: UserManagementRole;
  status: string;
}

export interface UserManagementUserDetail {
  id: string;
  email: string;
  name: string;
  isMasterAdmin: boolean;
  memberships: UserManagementMembership[];
}

export interface UserManagementCondominioOption {
  id: string;
  name: string;
}

export interface UpdateUserManagementInput {
  id: string;
  name: string;
  isMasterAdmin: boolean;
}

export interface AddUserMembershipInput {
  userId: string;
  condominioId: string;
  role: UserManagementRole;
}
