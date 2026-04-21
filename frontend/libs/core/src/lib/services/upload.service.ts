import { Injectable, inject } from '@angular/core';
import { SUPABASE_CLIENT } from '../supabase/client';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  async upload(bucket: string, path: string, file: File): Promise<string> {
    const { error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: false, contentType: file.type });
    if (error) throw new Error(error.message);
    const { data } = this.supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  buildPath(condominioId: string, ocorrenciaId: string, file: File): string {
    const uuid = crypto.randomUUID();
    const ext  = file.name.split('.').pop() ?? 'jpg';
    return `${condominioId}/${ocorrenciaId}/${uuid}.${ext}`;
  }
}
