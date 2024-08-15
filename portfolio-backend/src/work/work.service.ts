import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Work } from './work.entity';
import { CreateWorkDto } from './create-work.dto';
import * as multer from 'multer';
import { extname } from 'path';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private workRepository: Repository<Work>,
  ) {}

  private readonly multer = multer({
    storage: multer.diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, file.fieldname + uniqueSuffix + ext);
      },
    }),
  });

  async uploadFile(file: Express.Multer.File): Promise<string> {
    return `/uploads/${file.filename}`;
  }

  findAll(): Promise<Work[]> {
    return this.workRepository.find();
  }

  findOne(id: number): Promise<Work> {
    return this.workRepository.findOneBy({ id });
  }

  async create(createWorkDto: CreateWorkDto): Promise<Work> {
    const work = this.workRepository.create(createWorkDto);
    work.status = createWorkDto.status || 'display';
    return this.workRepository.save(work);
  }

  async remove(id: number): Promise<void> {
    await this.workRepository.delete(id);
  }

  async update(id: number, createWorkDto: CreateWorkDto): Promise<Work> {
    await this.workRepository.update(id, createWorkDto);
    return this.workRepository.findOne({ where: { id } });
  }
}
