import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

/** Ép tham số id về số nguyên dương: @Param('id', ParsePositiveIntPipe) id: number */
@Injectable()
export class ParsePositiveIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const num = Number(value);
    if (!Number.isInteger(num) || num <= 0) {
      throw new BadRequestException(`${metadata.data ?? 'id'} phải là số nguyên dương`);
    }
    return num;
  }
}
