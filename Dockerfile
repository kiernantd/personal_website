FROM node:20-alpine

RUN apk add --no-cache openssh

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY dist/ ./dist/
COPY assets/ ./assets/

# Create a locked-down guest user whose login shell is the Ink app
RUN adduser -D -s /app/dist/app.js guest

# Allow passwordless login for the guest user
RUN echo "guest:" | chpasswd -e 2>/dev/null || \
    (echo "guest:x" | chpasswd 2>/dev/null || true)
RUN passwd -d guest 2>/dev/null || true
RUN mkdir -p /home/guest/.ssh && chmod 700 /home/guest/.ssh && chown guest:guest /home/guest/.ssh

# Generate host keys and configure sshd
RUN ssh-keygen -A
RUN printf 'PermitRootLogin no\nPasswordAuthentication no\nMatch User guest\n  PasswordAuthentication yes\n  PermitEmptyPasswords yes\n' \
    > /etc/ssh/sshd_config.d/website.conf

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
