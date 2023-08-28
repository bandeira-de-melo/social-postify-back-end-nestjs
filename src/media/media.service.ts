import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediaRepository } from './media.reposirory';


@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository){}

  async create(createMediaDto: CreateMediaDto) {

    const { title, username } = createMediaDto;
    const isMediaUsernameMatch = await this.findByMediaAndUsername(title, username);

    if (isMediaUsernameMatch) {
      throw new HttpException('This username is already in use in this media', HttpStatus.CONFLICT)
    }

    return await this.mediaRepository.create(createMediaDto);
  }

  async findAll() {
    const mediaAccounts = await this.mediaRepository.findAll();
    if (mediaAccounts.length < 1) {
      return [];
    }
    return mediaAccounts;
  }

  async findOne(id: number) {
    const mediaAccount = await this.mediaRepository.findOne(id);
    if (!mediaAccount) {
      throw new HttpException('Media Account Not Found', HttpStatus.NOT_FOUND)
    }
    return mediaAccount;// verificar se tem q retornar dentro de array
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const { title, username } = updateMediaDto;

    const isMediaAccount =  await this.mediaRepository.findOne(id);
    if (!isMediaAccount) {
      throw new HttpException('No Media Account Found With Given Id', HttpStatus.NOT_FOUND)
    }

    const isMediaUsernameMatch = await this.mediaRepository.findByMediaAndUsername(title, username)
    if (isMediaUsernameMatch) {
      throw new HttpException('These Credentials Are Already Taken', HttpStatus.CONFLICT)
    }

    return this.mediaRepository.update(id, updateMediaDto);
  }

  async remove(id: number) {
    const isMedia = this.mediaRepository.findOne(id);
    if (!isMedia) {
      throw new HttpException('No Register Found For The Given Id', HttpStatus.NOT_FOUND)
    }
    return await this.mediaRepository.remove(id);
  }

  async findByMediaAndUsername(title: string, username: string) {
    return await this.mediaRepository.findByMediaAndUsername(title, username)
  }
}
