// Models
export * from './lib/models/index';

// Supabase
export { SUPABASE_CLIENT, SUPABASE_CONFIG, SupabaseConfig } from './lib/supabase/client';

// State
export { AuthState } from './lib/state/auth.state';

// Services
export { AuthService } from './lib/services/auth.service';
export { MembershipService } from './lib/services/membership.service';
export { TenantService } from './lib/services/tenant.service';
export { DeliveryService } from './lib/services/delivery.service';
export type { ResidentOption, DeliveryRealtimeEvent } from './lib/services/delivery.service';
export { NotificationService } from './lib/services/notification.service';
export { UploadService } from './lib/services/upload.service';
export { OccurrenceService } from './lib/services/occurrence.service';
export type { OccurrenceRealtimeEvent } from './lib/services/occurrence.service';

// Guards
export { authGuard } from './lib/guards/auth.guard';
export { tenantGuard } from './lib/guards/tenant.guard';
export { roleGuard } from './lib/guards/role.guard';

// Providers
export { provideCore } from './lib/providers/core.providers';