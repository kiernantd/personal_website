#!/bin/sh
set -e

if [ -n "$SSH_HOST_ED25519_KEY" ]; then
    printf '%s' "$SSH_HOST_ED25519_KEY" | base64 -d > /etc/ssh/ssh_host_ed25519_key
    chmod 600 /etc/ssh/ssh_host_ed25519_key
else
    echo "WARNING: SSH_HOST_ED25519_KEY secret not set — generating ephemeral key (fingerprint will change on redeploy)"
    ssh-keygen -t ed25519 -f /etc/ssh/ssh_host_ed25519_key -N "" -q
fi

exec /usr/sbin/sshd -D
