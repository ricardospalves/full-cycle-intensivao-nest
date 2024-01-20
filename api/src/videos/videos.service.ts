import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { randomUUID } from 'node:crypto';
import { InvalidRelationError } from '../errors/invalid-relation.error';

@Injectable()
export class VideosService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVideoDto: CreateVideoDto & { file: Express.Multer.File }) {
    const categoryExists =
      (await this.prismaService.category.count({
        where: {
          id: createVideoDto.category_id,
        },
      })) !== 0;

    if (!categoryExists) {
      throw new InvalidRelationError('Category not found.');
    }

    return this.prismaService.video.create({
      data: {
        id: randomUUID(),
        title: createVideoDto.title,
        category_id: createVideoDto.category_id,
        file_path: createVideoDto.file.path,
      },
    });
  }

  findAll() {
    return this.prismaService.video.findMany({
      include: {
        category: true,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.video.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: string, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: string) {
    return `This action removes a #${id} video`;
  }
}
