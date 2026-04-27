import { Injectable, inject } from '@angular/core';
import { SUPABASE_CLIENT } from './supabase-client.service';

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

  compress(file: File, maxWidth = 1920, quality = 0.82): Promise<File> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const scale  = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width  = Math.round(img.width  * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (!blob) { reject(new Error('Canvas toBlob failed')); return; }
            resolve(new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' }));
          },
          'image/jpeg',
          quality,
        );
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image load failed')); };
      img.src = url;
    });
  }
}
