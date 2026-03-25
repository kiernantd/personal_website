import React from 'react';
import { Box, Text, Newline } from 'ink';

const links: { key: string; label: string; value: string }[] = [
  { key: 'g', label: 'GitHub', value: 'github.com/kiernan' },
  { key: 'e', label: 'Email', value: 'kiernan@example.com' },
  { key: 'l', label: 'LinkedIn', value: 'linkedin.com/in/kiernan' },
];

export default function Contact() {
  return (
    <Box flexDirection="column" paddingX={2}>
      <Text bold color="cyan">Contact</Text>
      <Text>{'─'.repeat(60)}</Text>
      <Newline />
      <Text>Let&apos;s connect:</Text>
      <Newline />
      {links.map(({ key, label, value }) => (
        <Box key={key} flexDirection="row" marginBottom={1}>
          <Text color="cyan" bold>[{key}]</Text>
          <Text>{'  '}</Text>
          <Text bold>{label.padEnd(10)}</Text>
          <Text dimColor>{value}</Text>
        </Box>
      ))}
      <Newline />
      <Text dimColor>
        (Copy a link above and open it in your browser.)
      </Text>
    </Box>
  );
}
