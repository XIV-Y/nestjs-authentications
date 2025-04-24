import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

class EncodeCredentialsDto {
  username: string;
  password: string;
}

@Controller('basic-auth')
export class BasicAuthController {
  @Post('encode')
  encodeCredentials(@Body() dto: EncodeCredentialsDto) {
    if (!dto.username || !dto.password) {
      throw new BadRequestException('ユーザー名とパスワードは必須です');
    }

    // username:passwordの形式でBase64エンコード
    const credentials = `${dto.username}:${dto.password}`;
    const encoded = Buffer.from(credentials).toString('base64');

    return {
      base64: encoded,
    };
  }
}
