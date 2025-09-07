Next.js + NestJS で4つの認証方式を実装したデモプロジェクトです。

### 実装済み認証方式

1. **JWT認証**: ステートレスなトークンベース認証
2. **Cookie/Session認証**: サーバーサイドセッション管理
3. **カスタムToken認証**: メモリベースのトークン管理
4. **Basic認証**: HTTPヘッダーベースの簡易認証

## 環境構築

### 前提条件
- Docker & Docker Compose

### 1. 環境変数の設定

`.env` ファイルを作成してください：

```bash
# JWT設定
JWT_SECRET=your-super-secret-jwt-key-here

# セッション設定
SESSION_SECRET=your-super-secret-session-key-here
```

### 2. アプリケーション起動

```bash
# リポジトリをクローン
git clone <repository-url>
cd <project-directory>

# Docker Compose でアプリケーションを起動
docker-compose up --build
```

## 認証方式別動作確認

### 1. JWT認証

#### ログイン
```bash
curl -X POST http://localhost:3001/jwt-auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"password123"}'
```

#### 認証が必要なエンドポイントにアクセス
```bash
# レスポンスのaccess_tokenを使用
curl http://localhost:3001/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 2. Cookie/Session認証

#### ログイン
```bash
curl -X POST http://localhost:3001/cookie-based/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"password123"}' \
  -c cookies.txt
```

#### セッション情報で認証
```bash
curl http://localhost:3001/users/profile \
  -b cookies.txt
```

#### ログアウト
```bash
curl http://localhost:3001/cookie-based/logout \
  -b cookies.txt
```

### 3. カスタムToken認証

#### ログイン
```bash
curl -X POST http://localhost:3001/token-auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"password123"}'
```

#### トークンで認証
```bash
# レスポンスのaccess_tokenを使用
curl http://localhost:3001/users/profile \
  -H "Authorization: Bearer YOUR_CUSTOM_TOKEN"
```

#### トークン更新
```bash
curl -X POST http://localhost:3001/token-auth/refresh \
  -H "Authorization: Bearer YOUR_CUSTOM_TOKEN"
```

### 4. Basic認証

#### Base64エンコードされた認証情報を生成
```bash
curl -X POST http://localhost:3001/basic-auth/encode \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"password123"}'
```

#### Basic認証でアクセス
```bash
# 生成されたbase64文字列を使用
curl http://localhost:3001/users/profile \
  -H "Authorization: Basic YOUR_BASE64_STRING"

# または直接ユーザー名:パスワードを指定
curl -u john:password123 http://localhost:3001/users/profile
```

## 認証方式の切り替え

`backend/src/modules/users/users.controller.ts` で使用する認証方式を変更できます：

```typescript
@Controller('users')
export class UsersController {
  // 使用したい認証方式のコメントアウトを外す
  
  // @UseGuards(JwtAuthGuard)        // JWT認証
  // @UseGuards(CookieBasedGuard)    // Cookie認証
  // @UseGuards(TokenGuard)          // カスタムToken認証
  @UseGuards(BasicAuthGuard)         // Basic認証（現在有効）
  
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
```
