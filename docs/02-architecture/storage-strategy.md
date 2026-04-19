# Storage Strategy

## 1. Objective

Define the media storage architecture for CondoMais, establishing bucket structures, file organization, and access control patterns.

## 2. Scope

This document covers:
- Storage bucket design
- File path structure
- Upload flows
- Access control (RLS for storage)
- Image processing

---

## 3. Storage Architecture

### 3.1 Core Principle

Images/media are stored in Supabase Storage (S3-compatible), NOT in the database.
The database stores only URLs.

```
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE STORAGE                     │
├────────────────────────────────────────────────────────────┤
│  BUCKETS:                                              │
│  - condominios-images (building photos)               │
│  - users-avatars (profile photos)                     │
│  - deliveries-images (package photos)                  │
│  - occurrences-images (incident photos)                │
│  - classifieds-images (marketplace photos)             │
│  - announcements-attachments (announcement files)       │
└────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE                            │
├────────────────────────────────────────────────────────────┤
│  Stores only:                                          │
│  - users.foto_url = 'https://.../users-avatars/...'   │
│  - condominios.logo_url = 'https://.../...'          │
│  - deliveries.foto_url = 'https://.../...'           │
└────────────────────────────────────────────────────────────┘
```

---

## 4. Bucket Structure

### 4.1 Bucket Definitions

```sql
-- Create buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  (
    'condominios-images', 
    'condominios-images', 
    false, 
    5242880,  -- 5MB
    NULL
  ),
  (
    'users-avatars',
    'users-avatars',
    true,  -- Public for display
    2097152,  -- 2MB
    NULL
  ),
  (
    'deliveries-images',
    'deliveries-images',
    true,
    10485760,  -- 10MB
    NULL
  ),
  (
    'occurrences-images',
    'occurrences-images',
    false,
    10485760,  -- 10MB
    NULL
  ),
  (
    'classifieds-images',
    'classifieds-images',
    true,
    5242880,  -- 5MB
    NULL
  ),
  (
    'announcements-files',
    'announcements-files',
    false,
    20971520,  -- 20MB
    NULL
  );
```

---

## 5. File Path Structure

### 5.1 Path Conventions

| Bucket | Path Pattern | Example |
|--------|-------------|---------|
| condominios-images | `{condominio_id}/{filename}` | `condo-alpha/fachada.jpg` |
| users-avatars | `{user_id}/{filename}` | `user-123/profile.jpg` |
| deliveries-images | `{condominio_id}/{delivery_id}/{filename}` | `condo-alpha/del-456/photo.jpg` |
| occurrences-images | `{condominio_id}/{occurrence_id}/{filename}` | `condo-alpha/occ-789/evidence.jpg` |
| classifieds-images | `{condominio_id}/{classified_id}/{filename}` | `condo-alpha/cla-101/photo1.jpg` |
| announcements-files | `{condominio_id}/{announcement_id}/{filename}` | `condo-alpha/ann-202/doc.pdf` |

### 5.2 Detailed Path Definitions

```typescript
// Storage path builder service
class StoragePathService {
  // condominios-images
  getCondominioImagePath(condominioId: string, filename: string): string {
    return `${condominioId}/${filename}`;
  }
  
  // users-avatars
  getUserAvatarPath(userId: string, filename: string): string {
    return `${userId}/${filename}`;
  }
  
  // deliveries-images
  getDeliveryImagePath(condominioId: string, deliveryId: string, filename: string): string {
    return `${condominioId}/${deliveryId}/${filename}`;
  }
  
  // occurrences-images  
  getOccurrenceImagePath(condominioId: string, occurrenceId: string, filename: string): string {
    return `${condominioId}/${occurrenceId}/${filename}`;
  }
  
  // classifieds-images
  getClassifiedImagePath(condominioId: string, classifiedId: string, filename: string): string {
    return `${condominioId}/${classifiedId}/${filename}`;
  }
}
```

---

## 6. Access Control

### 6.1 Storage RLS Policies

```sql
-- Bucket: users-avatars (PUBLIC read, auth write)
CREATE POLICY "Avatar public read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'users-avatars');

CREATE POLICY "User upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'users-avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "User update own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'users-avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );


-- Bucket: deliveries-images (authenticated read, porteiro/sindico write)
CREATE POLICY "Delivery images read"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'deliveries-images'
    AND EXISTS (
      SELECT 1 FROM user_condominios uc
      WHERE uc.user_id = auth.uid()
        AND uc.status = 'active'
    )
  );

CREATE POLICY "Porteiro upload delivery image"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'deliveries-images'
    AND EXISTS (
      SELECT 1 FROM user_condominios uc
      WHERE uc.user_id = auth.uid()
        AND uc.role IN ('porteiro', 'sindico')
        AND uc.status = 'active'
    )
  );


-- Bucket: occurrences-images (porteiro/sindico only)
CREATE POLICY "Occurrence images write"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'occurrences-images'
    AND EXISTS (
      SELECT 1 FROM user_condominios uc
      WHERE uc.user_id = auth.uid()
        AND uc.role IN ('porteiro', 'sindico')
        AND uc.status = 'active'
    )
  );
```

---

## 7. Upload Implementation

### 7.1 Frontend Service

```typescript
// storage.service.ts
@Injectable({ providedIn: 'root' })
export class StorageService {
  private supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);

  // Upload user avatar
  async uploadAvatar(userId: string, file: File): Promise<string> {
    const path = `${userId}/${Date.now()}_${file.name}`;
    
    const { data, error } = await this.supabase.storage
      .from('users-avatars')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true  // Replace existing
      });
    
    if (error) throw error;
    
    // Get public URL
    const { data: urlData } = this.supabase.storage
      .from('users-avatars')
      .getPublicUrl(path);
    
    return urlData.publicUrl;
  }

  // Upload delivery photo
  async uploadDeliveryPhoto(
    condominioId: string, 
    deliveryId: string, 
    file: File
  ): Promise<string> {
    const path = `${condominioId}/${deliveryId}/${Date.now()}_${file.name}`;
    
    const { data, error } = await this.supabase.storage
      .from('deliveries-images')
      .upload(path, file);
    
    if (error) throw error;
    
    const { data: urlData } = this.supabase.storage
      .from('deliveries-images')
      .getPublicUrl(path);
    
    return urlData.publicUrl;
  }

  // Upload occurrence photos (multiple)
  async uploadOccurrencePhotos(
    condominioId: string,
    occurrenceId: string,
    files: File[]
  ): Promise<string[]> {
    const urls: string[] = [];
    
    for (const file of files) {
      const path = `${condominioId}/${occurrenceId}/${Date.now()}_${file.name}`;
      
      const { data, error } = await this.supabase.storage
        .from('occurrences-images')
        .upload(path, file);
      
      if (error) throw error;
      
      const { data: urlData } = this.supabase.storage
        .from('occurrences-images')
        .getPublicUrl(path);
      
      urls.push(urlData.publicUrl);
    }
    
    return urls;
  }
}
```

---

## 8. Image Processing

### 8.1 Client-Side Compression

```typescript
// Compress image before upload
async function compressImage(file: File, maxWidth = 800): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        resolve(new File([blob], file.name, { type: 'image/jpeg', quality: 0.7 }));
      }, 'image/jpeg', 0.7);
    };
    
    img.src = URL.createObjectURL(file);
  });
}
```

---

## 9. Database Storage Fields

### 9.1 User Table (updates)

```sql
ALTER TABLE users 
ADD COLUMN foto_url TEXT;
-- Stores: https://xxx.supabase.co/storage/v1/object/public/users-avatars/user-id/filename.jpg
```

### 9.2 Condominio Table (updates)

```sql
ALTER TABLE condominios 
ADD COLUMN logo_url TEXT,
ADD COLUMN fachada_url TEXT;
```

### 9.3 Entrega Table (updates)

```sql
ALTER TABLE entregas 
ADD COLUMN foto_url TEXT;
```

### 9.4 Ocorrencia Table (updates)

```sql
ALTER TABLE ocorrencias 
ADD COLUMN fotos TEXT[];  -- Array of URLs
```

---

## 10. Implementation Checklist

### Backend
- [ ] Create all storage buckets with correct permissions
- [ ] Configure RLS policies per bucket
- [ ] Add foto_url columns to relevant tables

### Frontend
- [ ] Create StorageService with upload methods
- [ ] Implement image compression utility
- [ ] Create image picker components
- [ ] Handle upload progress UI

---

## 11. Related Files

- `tables-users.md`: User table with foto_url
- `tables-entregas.md`: Delivery table with foto_url
- `tables-ocorrencias.md`: Occurrence with fotos array
- `upload-flow.md`: Complete upload flow documentation