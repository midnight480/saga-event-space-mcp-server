# ビルドステージ
FROM node:22-alpine AS builder

WORKDIR /app

# 依存関係のインストール
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# ソースコードのコピーとビルド
COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build

# 実行ステージ
FROM node:22-alpine AS runner

WORKDIR /app

# 本番用依存関係のみインストール
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# ビルド済みファイルをコピー
COPY --from=builder /app/dist ./dist

# 非rootユーザーで実行
RUN addgroup -g 1001 -S mcpuser && \
    adduser -S mcpuser -u 1001 -G mcpuser
USER mcpuser

ENTRYPOINT ["node", "dist/index.js"]
