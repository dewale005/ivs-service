FROM node:14-alpine AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /web-ui
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install --production
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]

# # Bundle static assets with nginx
# FROM nginx:1.21.0-alpine as production
# ENV NODE_ENV production
# # Copy built assets from builder
# COPY --from=builder /app/build /usr/share/nginx/html
# # Add your nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# # Expose port
# EXPOSE 80
# # Start nginx
# CMD ["nginx", "-g", "daemon off;"]