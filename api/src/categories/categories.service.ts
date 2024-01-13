import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  create({ name, description }: CreateCategoryDto) {
    return this.prismaService.category.create({
      data: {
        id: randomUUID(),
        name,
        description: description || null,
      },
    });
  }

  findAll() {
    return this.prismaService.category.findMany();
  }

  findOne(id: string) {
    return this.prismaService.category.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaService.category.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });
  }

  remove(id: string) {
    return this.prismaService.category.delete({
      where: {
        id,
      },
    });
  }
}
