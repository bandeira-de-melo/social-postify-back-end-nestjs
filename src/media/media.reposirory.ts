import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MediaRepository {

  constructor(private readonly prisma: PrismaService){}
  create(createMediaDto: CreateMediaDto) {
    return this.prisma.media.create({ data: createMediaDto})
  }

  findAll() {
    return this.prisma.media.findMany({})
  }

  findOne(id: number) {
    return this.prisma.media.findUnique({ where : { id } }) 
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return this.prisma.media.update({ where: { id }, data: updateMediaDto});
  }

  remove(id: number) {
    return this.prisma.media.delete({ where: { id }});
  }
  
  findByMediaAndUsername(title: string, username: string) {
    return this.prisma.media.findFirst({ where: { title , username }})
  }
}
