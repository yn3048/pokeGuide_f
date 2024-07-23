# 베이스 이미지로 Node.js 사용
FROM node:14

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 앱 소스 복사
COPY . .

# 앱 빌드
RUN npm run build

# 빌드 결과를 Nginx 디렉토리로 이동
RUN mv /app/build /app/nginx/html

# Nginx 베이스 이미지 사용
FROM nginx:alpine
COPY --from=0 /app/nginx/html /usr/share/nginx/html

# Nginx 설정 파일 복사
COPY ../nginx/nginx.conf /etc/nginx/nginx.conf

# Nginx 포트 개방
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
