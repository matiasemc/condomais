// Models
export * from './lib/interfaces/index.model';

// State
export { AuthState } from './lib/state/auth.state';

// Services
export { AuthService } from './lib/auth/auth.service';
export { SessionService } from './lib/auth/session.service';
export { MembershipService } from './lib/services/membership.service';
export { TenantService } from './lib/services/tenant.service';
export { ContextService, PLATFORM_LABELS, PLATFORM_ALLOWED_ROLES } from './lib/services/context.service';
export type { AppContext } from './lib/services/context.service';
export { DeliveryService } from './lib/services/delivery.service';
export type { ResidentOption, DeliveryRealtimeEvent } from './lib/services/delivery.service';
export { NotificationService } from './lib/services/notification.service';
export { UploadService } from './lib/services/upload.service';
export { OccurrenceService } from './lib/services/occurrence.service';
export type { OccurrenceRealtimeEvent } from './lib/services/occurrence.service';
export { ReservationService } from './lib/services/reservation.service';
export type { ReservationRealtimeEvent } from './lib/services/reservation.service';
export { GoogleCalendarService } from './lib/services/google-calendar.service';
export { BillingService } from './lib/services/billing.service';
export type { Plano, Subscription } from './lib/services/billing.service';
export { FeatureService } from './lib/services/feature.service';
export type { FeatureCode } from './lib/services/feature.service';
export { HasFeatureDirective } from './lib/directives/has-feature.directive';
export { UserManagementService } from './lib/services/user-management.service';
export { PlatformDashboardService } from './lib/services/platform-dashboard.service';
export type { PlatformDashboard, PlatformStats, RecentTenant } from './lib/services/platform-dashboard.service';
export { TenantAdminService } from './lib/services/tenant-admin.service';
export type { CreateTenantInput, TenantAdminRow, TenantPlan, TenantSubscriptionStatus } from './lib/services/tenant-admin.service';
export { PlanManagementService } from './lib/services/plan-management.service';
export type {
  ManagedFeature,
  ManagedPlan,
  ManagedPlanFeature,
  ManagedSubscriptionStatus,
  ManagedTenantPlan,
  PlanManagementSnapshot,
} from './lib/services/plan-management.service';
export { AdminUserService } from './lib/services/admin-user.service';
export type { TenantUserRow } from './lib/services/admin-user.service';
export { AnnouncementService } from './lib/services/announcement.service';
export { MarketplaceService } from './lib/services/marketplace.service';
export { ResidentService } from './lib/services/resident.service';

// Guards
export { GlobalLoginComponent } from './lib/auth/global-login.component';
export { SelectContextComponent } from './lib/features/select-context/select-context.component';
export { AppHeaderComponent } from './lib/features/app-header/app-header.component';
export { authGuard } from './lib/auth/auth.guard';
export { tenantGuard } from './lib/guards/tenant.guard';
export { contextGuard } from './lib/guards/context.guard';
export { roleGuard } from './lib/auth/role.guard';
export { masterAdminGuard } from './lib/guards/master-admin.guard';

// Providers
export { provideCore } from './lib/providers/core.providers';
export type { CoreConfig } from './lib/providers/core.providers';
