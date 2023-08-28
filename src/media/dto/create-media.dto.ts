import { IsNotEmpty, IsString, IsUrl, MinLength } from "class-validator";

export class CreateMediaDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    username: string;
}
