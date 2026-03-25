FROM node:20-alpine

RUN apk add --no-cache openssh

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY dist/ ./dist/
COPY assets/ ./assets/

# Make the app executable and register it as a valid login shell
RUN chmod +x /app/dist/app.js && echo "/app/dist/app.js" >> /etc/shells

# Create a locked-down guest user whose login shell is the Ink app
RUN deluser guest 2>/dev/null || true && adduser -D -s /app/dist/app.js guest

# Allow passwordless login for the guest user
RUN echo "guest:" | chpasswd -e 2>/dev/null || \
    (echo "guest:x" | chpasswd 2>/dev/null || true)
RUN passwd -d guest 2>/dev/null || true
RUN mkdir -p /home/guest/.ssh && chmod 700 /home/guest/.ssh && chown guest:guest /home/guest/.ssh

# Generate host keys and configure sshd
RUN ssh-keygen -A
RUN printf 'Port 2222\nPermitRootLogin no\nPasswordAuthentication no\nMatch User guest\n  PasswordAuthentication yes\n  PermitEmptyPasswords yes\n' \
    > /etc/ssh/sshd_config.d/website.conf

EXPOSE 2222
CMD ["/usr/sbin/sshd", "-D"]
