import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import figlet from 'figlet';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nameArt = figlet.textSync('KIERNAN', { font: 'Epic' });
const nameLines = nameArt.split('\n');

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x: number) => Math.round(255 * x).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

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
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setPhase((p) => p + 1), 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box flexDirection="column" paddingX={2}>
      <Box flexDirection="row" alignItems="flex-start">
        <Box marginRight={4}>
          <Text>{asciiPhoto}</Text>
        </Box>
        <Box flexDirection="column">
          <Box flexDirection="column">
            {nameLines.map((line, i) => (
              <Text key={i} color={hslToHex((i * 35 + phase * 6) % 360, 100, 62)}>
                {line}
              </Text>
            ))}
          </Box>
          <Text color="gray">
            Aspiring full-stack dev — cloud infrastructure, AI architecture, system design
          </Text>
          <Text> </Text>
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
    </Box>
  );
}
