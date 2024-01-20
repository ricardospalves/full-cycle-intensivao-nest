import { Video, Category } from '@prisma/client';
import { basename } from 'node:path';

type VideoSerializerOptions = Video & { category: Category };

export class VideoSerializer {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  category: {
    id: string;
    name: string;
    description: string | null;
  };

  constructor(video: VideoSerializerOptions) {
    this.id = video.id;
    this.title = video.title;
    this.description = video.description;
    this.category = video.category;
    this.file_url = `http://localhost:3000/videos/file/${basename(
      video.file_path,
    )}`;
  }
}
