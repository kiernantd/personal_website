import React from 'react';
import { Box, Text } from 'ink';
import figlet from 'figlet';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nameArt = figlet.textSync('KIERNAN', { font: 'Epic' });

let asciiPhoto = '';
try {
  asciiPhoto = fs.readFileSync(
    path.join(__dirname, '../../assets/profile.txt'),
    'utf8'
  );
} catch {
  asciiPhoto = '  [no photo]\n  run ascii-image-converter\n  to generate assets/profile.txt';
}

export default function Header() {
  return (
    <Box flexDirection="column" paddingX={2}>
      <Box flexDirection="row" alignItems="flex-start">
        <Box marginRight={4}>
          <Text>{asciiPhoto}</Text>
        </Box>
        <Box flexDirection="column" justifyContent="center">
          <Text color="cyan">{nameArt}</Text>
          <Text color="gray">
            Aspiring full-stack dev — cloud infrastructure, AI architecture, system design
          </Text>
        </Box>
      </Box>

      <Box flexDirection="column" marginTop={1}>
        <Text bold color="cyan">About Me</Text>
        <Text>{'─'.repeat(60)}</Text>
        <Text> </Text>
        <Text>
          Early-career Software Engineer with experience building secure and scalable
          systems across backend infrastructure, distributed services, and applied
          cryptography. Strong foundation in systems programming, software design, and
          concurrent architectures.
        </Text>
        <Text> </Text>
        <Text>
          My goal is to become a cloud engineer delivering top-end IaaS solutions.
          I love working at the intersection of hardware and software — low-latency
          pipelines, distributed systems, and polished user experiences.
        </Text>
      </Box>
    </Box>
  );
}
