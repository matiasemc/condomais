# CondoMais - Audit Report

Date: 2026-04-27

Rules source: `docs/agents.md`

Scope:
- Audited repository structure, frontend source, Supabase migrations/functions, package metadata, and project docs.
- Excluded generated/vendor bulk scans except where dependency state itself is relevant.
- No application code was modified.

## Summary

- `docs/agents.md` requires Angular 21, PrimeNG 21, Bootstrap 5+, standalone components, Signals/computed, strict folders (`components`, `services`, `interfaces`, `pipes`, `enums`), no feature-based structure, and Supabase access only through Angular services.
- No runtime `@NgModule`, `bootstrapModule`, or `platformBrowserDynamic` usage was found.
- No direct Supabase data calls were found in Angular app components after the current refactor.
- Major remaining violations are structural drift, stale installed dependencies, component-held mock data, service typing/query patterns, RxJS event bridging, and Supabase RLS/storage gaps.

## Findings

| File path | Issue type | Description | Impact |
|---|---|---|---|
| `frontend/package-lock.json` | Angular 21 / dependency drift | Lockfile root asks for Angular 21, but locked packages include Angular CLI/build/compiler/core 19.x. `npm ls` reports Angular packages as invalid against `^21.0.0`. | high |
| `frontend/node_modules/@angular/core/package.json` | Angular 21 / dependency drift | Installed Angular core is `19.2.21`, not Angular 21. | high |
| `frontend/node_modules/@angular/cli/package.json` | Angular 21 / dependency drift | Installed Angular CLI is 19.x, not Angular 21. | high |
| `frontend/node_modules/@angular-devkit/build-angular/package.json` | Angular 21 / dependency drift | Installed Angular builder is `19.2.24`, not Angular 21. | high |
| `frontend/node_modules/primeng/package.json` | PrimeNG 21 / dependency drift | Installed PrimeNG is `19.1.4`, not PrimeNG 21. | high |
| `frontend/package.json` | Stack | Bootstrap 5+ is required by `docs/agents.md`, but no `bootstrap` dependency or Bootstrap stylesheet import is present. | medium |
| `frontend/apps/admin/src/app/features/**` | Structure | Feature-based folder structure is used, explicitly forbidden by `docs/agents.md`. | high |
| `frontend/apps/master-admin/src/app/features/**` | Structure | Feature-based folder structure is used, explicitly forbidden by `docs/agents.md`. | high |
| `frontend/apps/morador/src/app/features/**` | Structure | Feature-based folder structure is used, explicitly forbidden by `docs/agents.md`. | high |
| `frontend/apps/porteiro/src/app/features/**` | Structure | Feature-based folder structure is used, explicitly forbidden by `docs/agents.md`. | high |
| `frontend/apps/*/src/app/app.routes.ts` | Structure | Routes lazy-load from `./features/...`, preserving the forbidden feature-based architecture. | high |
| `frontend/apps/admin/src/app/layout/**` | Structure | `layout` is outside the allowed folder contract. | medium |
| `frontend/apps/master-admin/src/app/layout/**` | Structure | `layout` is outside the allowed folder contract. | medium |
| `frontend/apps/morador/src/app/layout/**` | Structure | `layout` is outside the allowed folder contract. | medium |
| `frontend/apps/porteiro/src/app/layout/**` | Structure | `layout` is outside the allowed folder contract. | medium |
| `frontend/apps/admin/src/app/core/**` | Structure | `core` is outside the allowed folder contract. | medium |
| `frontend/apps/morador/src/app/core/**` | Structure | `core` is outside the allowed folder contract. | medium |
| `frontend/apps/porteiro/src/app/core/**` | Structure | `core` is outside the allowed folder contract. | medium |
| `frontend/libs/core/src/lib/auth/**` | Structure | Auth services, guards, and login component live under `auth` instead of allowed folders. | medium |
| `frontend/libs/core/src/lib/directives/**` | Structure | `directives` is outside the allowed folder contract. | low |
| `frontend/libs/core/src/lib/features/**` | Structure | Shared UI is organized under `features`, violating the anti-feature-structure rule. | medium |
| `frontend/libs/core/src/lib/guards/**` | Structure | `guards` is outside the allowed folder contract. | medium |
| `frontend/libs/core/src/lib/providers/**` | Structure | `providers` is outside the allowed folder contract. | low |
| `frontend/libs/core/src/lib/state/**` | Structure | `state` is outside the allowed folder contract. | medium |
| `frontend/libs/ui/src/lib/tokens/**` | Structure | `tokens` is outside the allowed folder contract. | low |
| `frontend/libs/ui/src/lib/components/*/*.component.ts` | Structure | Components are nested per component folder, while the contract lists `/components/*.component.ts`. | low |
| `frontend/apps/**/*.component.ts` | Naming / structure | 60 component files are outside a `components` folder. | high |
| `frontend/libs/core/src/lib/{auth,features}/**/*.component.ts` | Naming / structure | Shared components are outside `components`. | medium |
| `frontend/**/*.component.ts` | Naming / file pattern | 55 component files use inline templates and/or inline styles instead of the required `*.component.html` and `*.component.css` companion files. | medium |
| `frontend/apps/morador/src/app/core/models.ts` | Naming / interfaces | Interface file is named `models.ts` and is under `core`, not `interfaces/*.model.ts`. | high |
| `frontend/libs/core/src/lib/services/*.service.ts` | Naming / interfaces | Several service files declare/export interfaces and types locally instead of keeping typed contracts in `interfaces/*.model.ts`. | medium |
| `frontend/apps/**/**/*.component.ts` | Naming / interfaces | Multiple components declare local domain interfaces in component files instead of `interfaces/*.model.ts`. | medium |
| `frontend/libs/ui/src/lib/components/**/*.component.ts` | Naming / interfaces | UI component input/types such as `ToastData`, `TabItem`, `ButtonVariant`, and `BadgeVariant` are declared in component files instead of interfaces/enums folders. | low |
| `frontend/apps/admin/src/app/core/toast.service.ts` | Structure / duplication | App-local service lives in `core` and duplicates toast service ownership. | medium |
| `frontend/apps/morador/src/app/core/toast.service.ts` | Structure / duplication | App-local service lives in `core` and duplicates toast service ownership. | medium |
| `frontend/apps/porteiro/src/app/core/toast.service.ts` | Structure / duplication | App-local service lives in `core` and duplicates toast service ownership. | medium |
| `frontend/libs/core/src/lib/auth/auth.service.ts` | Supabase / structure | Uses `SUPABASE_CLIENT` outside `/services`, violating the "Supabase access through services" location contract even though it is a service class. | medium |
| `frontend/libs/core/src/lib/auth/session.service.ts` | Supabase / structure | Uses `SUPABASE_CLIENT` outside `/services`, violating the service folder contract. | medium |
| `frontend/libs/core/src/lib/services/auth.service.ts` | Architecture | Re-export shim exists because real auth service is outside `/services`, creating mixed ownership paths. | medium |
| `frontend/libs/core/src/lib/services/supabase-client.service.ts` | Architecture | Exposes injectable raw Supabase client inside the public core library; this makes future component-level direct access easy despite current components not doing it. | medium |
| `frontend/apps/porteiro/src/app/features/residents/residents.component.ts` | Architecture / service layer | Holds resident mock data directly in the component instead of using a resident/domain service. | high |
| `frontend/apps/porteiro/src/app/features/residents/resident-detail.component.ts` | Architecture / service layer | Holds resident and delivery mock database directly in the component. | high |
| `frontend/apps/porteiro/src/app/features/home/home.component.ts` | Architecture / service layer | Holds KPI and recent delivery mock data directly in the component instead of service-derived state. | medium |
| `frontend/apps/porteiro/src/app/features/occurrences/occurrences.component.ts` | Architecture / service layer | Holds occurrence mock data directly in the component instead of `OccurrenceService`. | high |
| `frontend/apps/porteiro/src/app/features/occurrences/new-occurrence.component.ts` | Architecture / service layer | Saves only local UI state/toast and does not use `OccurrenceService` or Supabase-backed service flow. | high |
| `frontend/apps/porteiro/src/app/features/announcements/announcements.component.ts` | Architecture / service layer | Holds announcement mock data directly in the component; no announcement service layer exists. | medium |
| `frontend/apps/morador/src/app/features/home/home.component.ts` | Architecture / service layer | Holds delivery, reservation, announcement, and user mock data directly in the component. | high |
| `frontend/apps/morador/src/app/features/announcements/announcements.component.ts` | Architecture / service layer | Holds announcement mock data directly in the component; no announcement service layer exists. | medium |
| `frontend/apps/morador/src/app/features/marketplace/marketplace.component.ts` | Architecture / service layer | Holds marketplace mock data directly in the component; no classifieds/marketplace service layer exists. | high |
| `frontend/apps/morador/src/app/features/notifications/notifications.component.ts` | Architecture / service layer | Holds notification mock data directly in the component instead of using the shared `NotificationService`. | medium |
| `frontend/apps/morador/src/app/features/profile/google-integrations.component.ts` | Architecture / service layer | Google connection/preferences are local component signals only; they do not use `GoogleCalendarService` or persistent service-backed state. | medium |
| `frontend/apps/morador/src/app/features/reservations/new-reservation.component.ts` | Mixed responsibilities | Component orchestrates reservation creation, Google event creation, persistence update, routing, and toast handling in one place. | medium |
| `frontend/apps/admin/src/app/layout/shell.component.ts` | Mixed responsibilities | Layout shell starts realtime services, notification handling, and toast side effects, mixing layout with app orchestration. | medium |
| `frontend/apps/morador/src/app/layout/app-shell/app-shell.component.ts` | Mixed responsibilities | Layout shell starts billing, notification, occurrence, and routing side effects, mixing layout with app orchestration. | medium |
| `frontend/libs/core/src/lib/services/delivery.service.ts` | RxJS misuse | Uses `Subject` for realtime events while Angular 21 contract prefers Signals/computed; this creates mixed reactive paradigms. | medium |
| `frontend/libs/core/src/lib/services/occurrence.service.ts` | RxJS misuse | Uses `Subject` for realtime events while Angular 21 contract prefers Signals/computed. | medium |
| `frontend/libs/core/src/lib/services/reservation.service.ts` | RxJS misuse | Uses `Subject` for realtime events while Angular 21 contract prefers Signals/computed. | medium |
| `frontend/libs/core/src/lib/services/notification.service.ts` | RxJS misuse | Manually subscribes to service Subjects and manages a `Subscription`; a signal/effect path would better match the Angular 21 rule. | medium |
| `frontend/libs/core/src/lib/directives/has-feature.directive.ts:14` | Angular 21 signals | Uses legacy `@Input()` setter instead of signal `input()`. | medium |
| `frontend/apps/morador/src/app/features/reservations/reservations.component.ts:103` | Angular / UX | Uses blocking `confirm()` in component logic; not a signal-driven/dialog-based PrimeNG flow. | low |
| `frontend/apps/morador/src/app/features/reservations/admin-reservas.component.ts:146` | Angular / UX | Uses blocking `confirm()` in component logic; not a signal-driven/dialog-based PrimeNG flow. | low |
| `frontend/apps/admin/src/app/features/reservations/reservations.component.ts:142` | Angular / UX | Uses blocking `confirm()` in component logic; not a signal-driven/dialog-based PrimeNG flow. | low |
| `frontend/apps/master-admin/src/app/features/users/user-edit-dialog.component.ts:194` | Angular / UX | Uses `window.confirm()` instead of PrimeNG dialog/service-driven confirmation. | low |
| `frontend/apps/admin/src/app/core/toast.service.ts` | PrimeNG | Custom toast service is used instead of PrimeNG `p-toast`/MessageService pattern required by the contract. | medium |
| `frontend/apps/morador/src/app/core/toast.service.ts` | PrimeNG | Custom toast service is used instead of PrimeNG `p-toast`/MessageService pattern required by the contract. | medium |
| `frontend/apps/porteiro/src/app/core/toast.service.ts` | PrimeNG | Custom toast service is used instead of PrimeNG `p-toast`/MessageService pattern required by the contract. | medium |
| `frontend/libs/ui/src/lib/components/toast/toast.component.ts` | PrimeNG | Custom toast component duplicates functionality that should use `p-toast`. | medium |
| `frontend/apps/admin/src/app/features/billing/billing.component.ts` | PrimeNG / template performance | Template contains repeated `ngClass`/ternary feature rendering logic; contract says avoid heavy template logic and inefficient bindings. | medium |
| `frontend/apps/morador/src/app/features/billing/billing.component.ts` | PrimeNG / template performance | Template contains repeated `ngClass`/ternary feature rendering logic; contract says avoid heavy template logic and inefficient bindings. | medium |
| `frontend/apps/master-admin/src/app/features/plans/plans.component.ts` | PrimeNG / template performance | Matrix template calls methods such as `isFeatureEnabled()`/`planColor()` across nested loops, creating inefficient bindings. | medium |
| `frontend/apps/master-admin/src/app/features/tenants/tenants.component.ts` | PrimeNG / template performance | Row-level plan/status changes are handled directly in template bindings over the full tenant list instead of table-style lazy/paginated interaction. | medium |
| `frontend/libs/core/src/lib/services/delivery.service.ts:106` | Supabase / query pattern | Uses `select('*')`; contract prefers optimized typed queries. | medium |
| `frontend/libs/core/src/lib/services/delivery.service.ts:121` | Supabase / query pattern | Uses `select('*')`; contract prefers optimized typed queries. | medium |
| `frontend/libs/core/src/lib/services/delivery.service.ts:134` | Supabase / query pattern | Uses `select('*')`; contract prefers optimized typed queries. | medium |
| `frontend/libs/core/src/lib/services/delivery.service.ts:160` | Supabase / query pattern | Uses `select('*')`; contract prefers optimized typed queries. | medium |
| `frontend/libs/core/src/lib/services/reservation.service.ts:129` | Supabase / query pattern | Uses `select('*')`; contract prefers optimized typed queries. | medium |
| `frontend/libs/core/src/lib/services/reservation.service.ts:140` | Supabase / query pattern | Uses `select('*')`; contract prefers optimized typed queries. | medium |
| `frontend/libs/core/src/lib/services/reservation.service.ts:221` | Supabase / query pattern | Uses `select('*')`; contract prefers optimized typed queries. | medium |
| `frontend/libs/core/src/lib/services/occurrence.service.ts:108` | Supabase / query pattern | Uses `select('*')`; contract prefers optimized typed queries. | medium |
| `frontend/libs/core/src/lib/services/occurrence.service.ts:122` | Supabase / query pattern | Uses `select('*')`; contract prefers optimized typed queries. | medium |
| `frontend/libs/core/src/lib/services/occurrence.service.ts:133` | Supabase / query pattern | Uses `select('*')`; contract prefers optimized typed queries. | medium |
| `frontend/libs/core/src/lib/services/occurrence.service.ts:143` | Supabase / query pattern | Uses `select('*')`; contract prefers optimized typed queries. | medium |
| `frontend/libs/core/src/lib/services/delivery.service.ts:104` | Supabase / performance | Loads all tenant deliveries without pagination/range; can become expensive. | high |
| `frontend/libs/core/src/lib/services/delivery.service.ts:119` | Supabase / performance | Loads all deliveries for a unit without pagination/range. | medium |
| `frontend/libs/core/src/lib/services/delivery.service.ts:158` | Supabase / performance | Loads all user deliveries without pagination/range. | medium |
| `frontend/libs/core/src/lib/services/reservation.service.ts:188` | Supabase / performance | Loads all user reservations without pagination/range. | medium |
| `frontend/libs/core/src/lib/services/reservation.service.ts:205` | Supabase / performance | Loads all tenant reservations without pagination/range. | high |
| `frontend/libs/core/src/lib/services/occurrence.service.ts:106` | Supabase / performance | Loads all user occurrences without pagination/range. | medium |
| `frontend/libs/core/src/lib/services/occurrence.service.ts:120` | Supabase / performance | Loads all tenant occurrences without pagination/range. | high |
| `frontend/libs/core/src/lib/services/admin-user.service.ts:25` | Supabase / performance | Loads all tenant users without pagination/range; admin user screens can grow unbounded. | medium |
| `frontend/libs/core/src/lib/services/feature.service.ts:13` | Security / backend authority | Has frontend fallback feature flags. If DB is unavailable, UI may show features based on local constants; backend RLS still protects writes, but frontend-only feature state can drift. | medium |
| `frontend/libs/core/src/lib/services/google-calendar.service.ts:29` | Security | Stores Google OAuth tokens in `localStorage`, increasing exposure to XSS and relying on frontend-held secrets. | high |
| `frontend/libs/core/src/lib/services/tenant.service.ts:13` | Security / context | Stores tenant context in `localStorage`; guards must revalidate every route/query because frontend context is user-controlled. | medium |
| `frontend/libs/core/src/lib/services/context.service.ts:63` | Security / context | Stores platform/tenant context in `localStorage`; guards must revalidate every route/query because frontend context is user-controlled. | medium |
| `supabase/migrations/20260421000001_ocorrencias_morador.sql:30` | Supabase / RLS | Creates permissive `ocorrencias_insert_staff_or_morador` policy. Later feature-gated migration does not drop this policy, so insert feature gates are OR-bypassed. | high |
| `supabase/migrations/20260426000002_rls_feature_gate_platform_stats.sql:4` | Supabase / RLS | Drops old `ocorrencias_insert_staff`, but the active permissive policy is named `ocorrencias_insert_staff_or_morador`; the intended replacement is incomplete. | high |
| `supabase/migrations/20260421000002_ocorrencias_storage.sql:17` | Supabase / storage security | Any authenticated user can upload to the public `ocorrencias` bucket with only `bucket_id` checked; tenant/occurrence ownership is not enforced in the storage policy. | high |
| `supabase/migrations/20260421000002_ocorrencias_storage.sql:22` | Supabase / storage security | Occurrence images bucket is public-readable; this can expose incident images beyond tenant membership. | high |
| `supabase/functions/create-checkout-session/index.ts:47` | Supabase / auth pattern | Checks role `master_admin` inside `user_condominios`, while master admin is modeled as global `users.is_master_admin`; global master admins may be incorrectly rejected. | medium |
| `supabase/functions/create-checkout-session/index.ts:17` | Security / CORS | Allows `Access-Control-Allow-Origin: *` for checkout endpoint. JWT is checked, but origin is still overly broad for payment actions. | medium |
| `supabase/functions/create-checkout-session/index.ts:39` | Security / validation | Trusts client-provided `successUrl` and `cancelUrl`; values are required but not origin allowlisted. | high |
| `supabase/functions/stripe-webhook/index.ts` | Architecture | Webhook function mixes Stripe event handling, subscription persistence, and tenant state updates in one file instead of separated service/helpers. | medium |
| `.env` | Security / repo hygiene | Environment file exists in repository root. Environment-specific values should not be committed. | medium |
| `frontend/admin-dev.log` | Structure / repo hygiene | Runtime log file is present in source tree. | low |
| `frontend/admin-dev.err.log` | Structure / repo hygiene | Runtime error log file is present in source tree. | low |
| `frontend/morador-dev.log` | Structure / repo hygiene | Runtime log file is present in source tree. | low |
| `frontend/morador-dev.err.log` | Structure / repo hygiene | Runtime error log file is present in source tree. | low |
| `supabase/snippets/Untitled query 105.sql` | Structure / naming | Ad-hoc untitled SQL snippet is outside versioned migrations/tests. | low |
| `supabase/snippets/Untitled query 109.sql` | Structure / naming | Ad-hoc untitled SQL snippet is outside versioned migrations/tests. | low |
| `supabase/snippets/Untitled query 124.sql` | Structure / naming | Ad-hoc untitled SQL snippet is outside versioned migrations/tests. | low |
| `supabase/snippets/Untitled query 228.sql` | Structure / naming | Ad-hoc untitled SQL snippet is outside versioned migrations/tests. | low |
| `supabase/snippets/Untitled query 290.sql` | Structure / naming | Ad-hoc untitled SQL snippet is outside versioned migrations/tests. | low |
| `supabase/snippets/Untitled query 391.sql` | Structure / naming | Ad-hoc untitled SQL snippet is outside versioned migrations/tests. | low |
| `supabase/snippets/Untitled query 447.sql` | Structure / naming | Ad-hoc untitled SQL snippet is outside versioned migrations/tests. | low |
| `supabase/snippets/Untitled query 499.sql` | Structure / naming | Ad-hoc untitled SQL snippet is outside versioned migrations/tests. | low |
| `supabase/snippets/Untitled query 530.sql` | Structure / naming | Ad-hoc untitled SQL snippet is outside versioned migrations/tests. | low |
| `supabase/snippets/Untitled query 555.sql` | Structure / naming | Ad-hoc untitled SQL snippet is outside versioned migrations/tests. | low |
| `supabase/snippets/Untitled query 610.sql` | Structure / naming | Ad-hoc untitled SQL snippet is outside versioned migrations/tests. | low |
| `supabase/snippets/Untitled query 716.sql` | Structure / naming | Ad-hoc untitled SQL snippet is outside versioned migrations/tests. | low |
| `supabase/snippets/Untitled query 850.sql` | Structure / naming | Ad-hoc untitled SQL snippet is outside versioned migrations/tests. | low |
| `supabase/snippets/Untitled query 934.sql` | Structure / naming | Ad-hoc untitled SQL snippet is outside versioned migrations/tests. | low |
| `supabase/snippets/Untitled query 966.sql` | Structure / naming | Ad-hoc untitled SQL snippet is outside versioned migrations/tests. | low |
| `docs/01-product/vision.md:87` | Documentation drift | Documentation still states Angular 19, conflicting with `docs/agents.md` requiring Angular 21. | medium |
| `docs/02-architecture/overview.md:57` | Documentation drift | Architecture overview references Angular 19. | medium |
| `docs/02-architecture/overview.md:60` | Documentation drift | Architecture overview references Angular 19. | medium |
| `docs/02-architecture/frontend-architecture.md:11` | Documentation drift | Recommends feature modules and lazy loading, conflicting with standalone-only and no feature-based structure. | medium |
| `docs/02-architecture/frontend-architecture.md:61` | Documentation drift | Documents `models/` instead of `interfaces/*.model.ts`. | medium |
| `docs/02-architecture/frontend-architecture.md:87` | Documentation drift | Documents `core/` module/folder, outside the allowed folder contract. | medium |
| `docs/02-architecture/frontend-architecture.md:95` | Documentation drift | Documents `features/` modules, explicitly forbidden by `docs/agents.md`. | medium |
| `docs/02-architecture/frontend-architecture.md:184` | Documentation drift / NgModule | Shows `deliveries.module.ts` and `@NgModule`, conflicting with standalone-only. | medium |
| `docs/02-architecture/frontend-architecture.md:245` | Documentation drift / NgModule | Shows `loadChildren` to feature modules, conflicting with standalone-only. | medium |
| `docs/04-auth/tenant-selection.md:254` | Documentation drift / NgModule | Shows `loadChildren` to `admin.module`, conflicting with standalone-only. | medium |
| `docs/04-auth/tenant-selection.md:261` | Documentation drift / NgModule | Shows `loadChildren` to `morador.module`, conflicting with standalone-only. | medium |
| `docs/04-auth/tenant-selection.md:268` | Documentation drift / NgModule | Shows `loadChildren` to `porteiro.module`, conflicting with standalone-only. | medium |
| `docs/04-auth/roles-and-permissions.md:221` | Documentation drift / NgModule | Shows `loadChildren` to `admin.module`, conflicting with standalone-only. | medium |
| `docs/04-auth/role-resolution.md:154` | Documentation drift / NgModule | Shows `loadChildren` to `admin.module`, conflicting with standalone-only. | medium |
| `docs/04-auth/readme_auth.md:407` | Documentation drift / NgModule | Shows `loadChildren` to `admin.module`, conflicting with standalone-only. | medium |
| `docs/04-auth/readme_auth.md:412` | Documentation drift / NgModule | Shows `loadChildren` to `morador.module`, conflicting with standalone-only. | medium |
| `docs/04-auth/readme_auth.md:417` | Documentation drift / NgModule | Shows `loadChildren` to `porteiro.module`, conflicting with standalone-only. | medium |
| `docs/09-frontend-angular/routing.md:10` | Documentation drift / NgModule | Shows feature-module routing with `loadChildren`, conflicting with standalone-only. | medium |
| `docs/09-frontend-angular/routing.md:17` | Documentation drift / NgModule | Shows feature-module routing with `loadChildren`, conflicting with standalone-only. | medium |
| `docs/09-frontend-angular/routing.md:24` | Documentation drift / NgModule | Shows feature-module routing with `loadChildren`, conflicting with standalone-only. | medium |
| `docs/09-frontend-angular/routing.md:31` | Documentation drift / NgModule | Shows feature-module routing with `loadChildren`, conflicting with standalone-only. | medium |
| `docs/09-frontend-angular/project-structure.md:31` | Documentation drift | Documents `models/` and extra folders, conflicting with the strict folder contract. | medium |

## Non-Findings

- No Angular runtime `NgModule` usage was found in `frontend/apps` or `frontend/libs`.
- No direct Supabase `from/rpc/auth/storage` usage was found inside Angular app components.
- `frontend/package.json` now declares Angular 21 and PrimeNG 21, but lockfile and installed packages remain on 19.x.
