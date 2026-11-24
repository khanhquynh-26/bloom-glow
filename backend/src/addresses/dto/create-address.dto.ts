import { IsBoolean, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên người nhận không được để trống' })
  @MaxLength(100)
  receiverName: string;

  @Matches(/^(0|\+84)[0-9]{9}$/, { message: 'Số điện thoại không hợp lệ' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Tỉnh/thành phố không được để trống' })
  @MaxLength(100)
  province: string;

  @IsString()
  @IsNotEmpty({ message: 'Quận/huyện không được để trống' })
  @MaxLength(100)
  district: string;

  @IsString()
  @IsNotEmpty({ message: 'Phường/xã không được để trống' })
  @MaxLength(100)
  ward: string;

  @IsString()
  @IsNotEmpty({ message: 'Địa chỉ cụ thể không được để trống' })
  @MaxLength(255)
  street: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
