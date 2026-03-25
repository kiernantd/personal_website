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
    </Box>
  );
}
