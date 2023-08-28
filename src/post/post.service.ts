import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository){}

  async create(createPostDto: CreatePostDto) {
    return await this.postRepository.create(createPostDto);
  }

  async findAll() {
    const posts = await this.postRepository.findAll();
    if (posts.length < 1) {
      return [];
    }
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new HttpException('No Post Found For the Given Id', HttpStatus.NOT_FOUND)
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new HttpException('No Post Found For the Given Id', HttpStatus.NOT_FOUND)
    }
    return await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new HttpException('No Post Found For the Given Id', HttpStatus.NOT_FOUND)
    }
    return await this.postRepository.remove(id)  
  }
}
