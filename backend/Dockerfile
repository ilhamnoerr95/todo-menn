# Gunakan Node.js versi LTS sebagai base image
FROM node:18-alpine AS deps

# Tentukan working directory di dalam container
WORKDIR /app

# Copy file package.json dan package-lock.json ke working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy seluruh project files ke working directory
COPY . .

# # Build aplikasi Next.js
# RUN npm run build

# Set environment variable untuk production
ENV NODE_ENV=development

# Expose port 3000 di container
# EXPOSE 3000

# Jalankan aplikasi Next.js menggunakan perintah start
# CMD ["npm", "run" ,"start"]
