# User Personas

## 1. Objective

Define the core user personas for the CondoMais platform to guide UX decisions, feature prioritization, and marketing strategies.

## 2. Scope

This document covers all three primary user roles:
- Morador (Resident)
- Porteiro (Doorman)
- Síndico (Administrator)

## 3. Primary Personas

### 3.1 Maria – A忙碌的职场妈妈 (Busy Working Mom)

| Attribute | Details |
|-----------|---------|
| **Name** | Maria Santos |
| **Age** | 34 |
| **Role** | Moradora (Resident) |
| **Family** | Married, 2 children (ages 5 and 8) |
| **Residence** | Apartment 204, Edifício Solar do Vale |
| **Occupation** | Marketing Manager at a tech company |
| **Tech Comfort** | High – daily use of multiple apps |
| **Primary Device** | iPhone 14 |

#### Goals & Pain Points

| Goals | Pain Points |
|-------|-------------|
| Know when packages arrive while at work | Missed deliveries due to no notification |
| Book the pool for birthday parties | Confirmed reservations getting double-booked |
| Quick contact Síndico for emergencies | Can't reach Síndico via traditional methods |
| Buy/sell items in the building community | No centralized marketplace exists |

#### User Story

> "I work long hours and often can't sign for deliveries. Last month, my new laptop was held at the reception for 3 days because I didn't know it had arrived. If CondoMais notifies me the moment something is registered, I can have my husband pick it up or schedule pickup at the concierge."

#### Key Behaviors

- Checks phone 50+ times daily
- UsesWhatsApp for most communications
- Books amenities on weekends
- Reads announcements during lunch breaks
- Uses fingerprint authentication for speed

#### Requirements from Platform

- Real-time push notifications for deliveries
- WhatsApp deep link to Síndico
- Reservation calendar with availability
- Building-specific classifieds board

---

### 3.2 João – 退休老人 (Retired Senior)

| Attribute | Details |
|-----------|---------|
| **Name** | João Oliveira |
| **Age** | 68 |
| **Role** | Morador (Resident) |
| **Family** | Widower, daughter lives nearby |
| **Residence** | Apartment 502, Edifício Solar do Vale |
| **Occupation** | Retired accountant |
| **Tech Comfort** | Low – uses smartphone for calls and basic apps |
| **Primary Device** | Samsung Galaxy A32 |

#### Goals & Pain Points

| Goals | Pain Points |
|-------|-------------|
| Receive medical deliveries reliably | Forgets to check app for deliveries |
| Stay informed about building notices | Announcements are hard to read on small screens |
| Contact family quickly in emergencies | Complex interfaces frustrate him |
| Participate in building community | Doesn't want to learn new apps |

#### User Story

> "My daughter set up my WhatsApp and taught me how to make video calls. I can use my phone for basic things. When there's a building assembly or important notice, I need to see it clearly and easily. Don't make me navigate through many screens."

#### Key Behaviors

- Uses phone primarily for calls and WhatsApp
- Needs large text and clear icons
- Values simplicity over features
- Trusts building staff for assistance

#### Requirements from Platform

- Large text option (accessibility)
- High contrast mode
- One-tap actions
- Backup contact (daughter) in profile

---

### 3.3 Carla – 年轻专业人士 (Young Professional)

| Attribute | Details |
|-----------|---------|
| **Name** | Carla Mendes |
| **Age** | 26 |
| **Role** | Moradora (Resident) |
| **Family** | Single, lives alone |
| **Residence** | Apartment 108, Edifício Solar do Vale |
| **Occupation** | Software Engineer at a startup |
| **Tech Comfort** | Very high – early adopter |
| **Primary Device** | iPhone 15 Pro |

#### Goals & Pain Points

| Goals | Pain Points |
|-------|-------------|
| Seamless digital experience | Wants app to be as polished as consumer apps |
| Trade items with neighbors | No easy way to connect with neighbors |
| Book gym/pool quickly | Wants to see real-time availability |
| Know building events | Misses events not promoted on WhatsApp |

#### User Story

> "I'm on my phone all day. I want the CondoMais app to feel like a modern consumer app—smooth animations, dark mode, fast load times. If I'm going to use it daily, it needs to be snappy and look good."

#### Key Behaviors

- Expects consumer-grade UX
- Uses dark mode extensively
- Provides feedback on apps
- Early adopter of new features

#### Requirements from Platform

- Dark mode support
- Fast performance (<2s load)
- Modern UI patterns
- Push notification preferences

---

### 3.4 Pedro – 专业门童 (Professional Doorman)

| Attribute | Details |
|-----------|---------|
| **Name** | Pedro Costa |
| **Age** | 42 |
| **Role** | Porteiro (Doorman) |
| **Family** | Married, 2 children |
| **Building** | Edifício Solar do Vale |
| **Experience** | 8 years as building doorman |
| **Tech Comfort** | Medium – uses WhatsApp and basic apps |

#### Goals & Pain Points

| Goals | Pain Points |
|-------|-------------|
| Complete delivery registration quickly | Current paper log is time-consuming |
| Find resident unit numbers easily | Residents give vague addresses |
| Notify residents of arrivals | No efficient way to notify multiple people |
| Track daily delivery stats | No reporting on delivery volume |

#### User Story

> "I work 12-hour shifts and handle 50+ deliveries per day. The old paper book is a nightmare—smeared ink, lost entries, residents arguing about whether their package was logged. I need something that's faster than writing and lets me find anyone in the building instantly."

#### Key Behaviors

- Works on desktop during shifts
- Needs large search functionality
- Values speed over features
- Prints reports for management

#### Requirements from Platform

- Fast delivery entry form
- Global search (name, unit, phone)
- Bulk notification capability
- Daily delivery reports

---

### 5.1 Dona Glória – 公寓管理员 (Building Administrator)

| Attribute | Details |
|-----------|---------|
| **Name** | Dona Glória Ferreira |
| **Age** | 55 |
| **Role** | Síndica (Administrator) |
| **Building** | Edifício Solar do Vale (120 units) |
| **Experience** | 6 years as Síndica |
| **Tech Comfort** | Medium – uses email, WhatsApp, Excel |

#### Goals & Pain Points

| Goals | Pain Points |
|-------|-------------|
| Reduce time spent on administrative tasks | Spends hours on paper and phone calls |
| Communicate with all residents efficiently | WhatsApp groups are chaotic |
| Track building amenities usage | No data on reservation patterns |
| Manage resident onboarding | Manual process for new residents |

#### User Story

> "Before CondoMais, I managed everything with paper notices, WhatsApp groups, and a whiteboard. When a resident moves in, I have to visit every unit to collect contact info. When there's a water shutoff, I call 120 units. I need a system that automates the routine stuff."

#### Key Behaviors

- Checks email first thing in morning
- Uses WhatsApp for urgent communication
- Needs audit trails for complaints
- Reports to condo owners monthly

#### Requirements from Platform

- Bulk announcement system
- Resident database with contact info
- Amenity reservation management
- Monthly usage reports

---

## 4. Persona Summary Matrix

| Persona | Role | Age | Tech Comfort | Key Need |
|---------|------|-----|--------------|----------|
| Maria | Moradora | 34 | High | Real-time notifications |
| João | Morador | 68 | Low | Simplicity, accessibility |
| Carla | Moradora | 26 | High | Modern UX |
| Pedro | Porteiro | 42 | Medium | Speed, search |
| Dona Glória | Síndica | 55 | Medium | Automation, reporting |

---

## 5. Design Guidelines per Persona

### 5.1 Morador (Resident) Guidelines

- Push notifications must be timely and actionable
- Support dark mode for younger users
- Large text option for accessibility
- Onboarding must be under 3 minutes

### 5.2 Porteiro (Doorman) Guidelines

- Desktop-first interface
- Search must handle 1000+ residents
- Forms must have large tap targets
- Daily reports must be exportable

### 5.3 Síndico (Administrator) Guidelines

- Dashboard with key metrics
- Bulk actions (announcements, exports)
- Audit logs for all actions
- Multi-building support for portfolios

---

## 6. Device Distribution (Initial Target Building)

| Device Type | Percentage |
|------------|------------|
| iOS | 45% |
| Android (Samsung) | 35% |
| Android (Other) | 15% |
| Desktop/Tablet | 5% |