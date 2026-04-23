// Models
export * from './lib/models/index';

// Supabase
export { SUPABASE_CLIENT, SUPABASE_CONFIG, SupabaseConfig } from './lib/supabase/client';

// State
export { AuthState } from './lib/state/auth.state';

// Services
export { AuthService } from './lib/auth/auth.service';
export { SessionService } from './lib/auth/session.service';
export { MembershipService } from './lib/services/membership.service';
export { TenantService } from './lib/services/tenant.service';
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
export { UserManagementService } from './lib/services/user-management.service';

// Guards
export { GlobalLoginComponent } from './lib/auth/global-login.component';
export { authGuard } from './lib/auth/auth.guard';
export { tenantGuard } from './lib/guards/tenant.guard';
export { roleGuard } from './lib/auth/role.guard';
export { masterAdminGuard } from './lib/guards/master-admin.guard';

// Providers
export { provideCore } from './lib/providers/core.providers';
export type { CoreConfig } from './lib/providers/core.providers';
