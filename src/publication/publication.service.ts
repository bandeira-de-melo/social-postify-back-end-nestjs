import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PostService } from 'src/post/post.service';
import { PublicationRepository } from './publication.repository';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class PublicationService {
  constructor(
    @Inject(forwardRef(() => PostService))
    private readonly postService: PostService,
    @Inject(forwardRef(() => MediaService)) 
    private readonly mediaService: MediaService,
    private readonly publicationRepository: PublicationRepository
    ){}
  async create(createPublicationDto: CreatePublicationDto) {
    const { postId, mediaId } = createPublicationDto
    await this.checkPostAndMedia(postId, mediaId);
    return await this.publicationRepository.create(createPublicationDto);
  }

  async findAll() {
    const publications = await this.publicationRepository.findAll();
    if(publications.length < 1) {
      return [];
    }
    return publications;
  }

  async findOne(id: number) {
    const publication = await this.publicationRepository.findOne(id);
    if (!publication) {
      throw new HttpException('No Publications Found For Given Id.', HttpStatus.NOT_FOUND)
    }
    return publication;
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const { postId, mediaId } = updatePublicationDto;
    const publication = await this.publicationRepository.findOne(id);
    if (publication.date <= new Date()){
      throw new HttpException('This Publication Has Been Already Released', HttpStatus.FORBIDDEN)
    }
    await this.checkPostAndMedia(postId, mediaId);

    return await this.publicationRepository.update(id, updatePublicationDto);
  }

  async remove(id: number) {
    const publication = await this.findOne(id);
    return await this.publicationRepository.remove(publication.id)
  }

  async findOneByPostId(postId: number) {
    return await this.publicationRepository.findOneByPostId(postId)
  }

  async findOneByMediaId(mediaId: number) {
    return await this.publicationRepository.findOneByMediaId(mediaId)
  }

  async checkPostAndMedia(postId: number, mediaId: number) {
    const isPost = await this.postService.findOne(postId)
    if(!isPost) {
      throw new HttpException('No Post Found For the Given Id', HttpStatus.NOT_FOUND);
    }
    const isMedia = await this.mediaService.findOne(mediaId);
    if(!isMedia) {
      throw new HttpException('No Media Found For The Given Id', HttpStatus.NOT_FOUND);
    }
  }
}
