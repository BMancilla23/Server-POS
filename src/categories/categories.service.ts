import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findAll() {
    const categories = await this.categoryRepository.find({
      order: {
        id: 'ASC',
      },
    });
    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOneBy({
      id,
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.preload({
      ...updateCategoryDto,
      id,
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    const updatedCategory = await this.categoryRepository.save(category);
    return updatedCategory;
  }

  async remove(id: string) {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return this.categoryRepository.delete(category);
  }
}
