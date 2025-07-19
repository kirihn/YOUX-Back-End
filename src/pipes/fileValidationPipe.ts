import { BadRequestException, PipeTransform } from '@nestjs/common';

interface FileValidationParams {
  maxSize: number;
  required: boolean;
  allowedMimeTypes: string[];
}
export class FileValidationPipe implements PipeTransform {
  private readonly properties: FileValidationParams;

  constructor(private params: FileValidationParams) {
    this.properties = params;
  }

  transform(file: Express.Multer.File | undefined) {
    if (!file) {
      if (this.properties.required)
        throw new BadRequestException('Файл не найден');
      return undefined;
    }

    if (file.size > this.properties.maxSize)
      throw new BadRequestException('размер файла слишом велик!');

    if (!this.properties.allowedMimeTypes.includes(file.mimetype))
      throw new BadRequestException(
        `Неправильный формат файла. Доступные форматы: ${this.properties.allowedMimeTypes.join(', ')}`,
      );

    return file;
  }
}
