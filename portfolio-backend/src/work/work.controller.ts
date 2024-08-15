import {
  Controller,
  Get,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkService } from './work.service';
import { Work } from './work.entity';
import { CreateWorkDto } from './create-work.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createWorkDto: CreateWorkDto,
  ) {
    console.log('File object este asa :', file);
    if (file) {
      createWorkDto.image = await this.workService.uploadFile(file);
    }
    return this.workService.create(createWorkDto);
  }

  @Get()
  async findAll(): Promise<Work[]> {
    return this.workService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Work> {
    return this.workService.findOne(Number(id));
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() createWorkDto: CreateWorkDto,
  ) {
    if (file) {
      createWorkDto.image = await this.workService.uploadFile(file);
    }
    return this.workService.update(Number(id), createWorkDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.workService.remove(Number(id));
  }
}
