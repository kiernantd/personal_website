import React, { useState } from 'react';
import { Box, Text, Newline, useInput } from 'ink';

interface Entry {
  title: string;
  org: string;
  period: string;
  bullets: string[];
}

const entries: Entry[] = [
  {
    title: 'Junior Research Engineer',
    org: 'Surreality Lab',
    period: '2024 – Present',
    bullets: [
      'Built a low-latency 3D marker detection system in AR for Apple Vision Pro.',
      'Engineered real-time computer vision pipelines achieving sub-10 ms detection.',
      'Collaborated across hardware and software teams on spatial computing research.',
    ],
  },
  {
    title: 'Personal Website (this site)',
    org: 'Side Project',
    period: '2025',
    bullets: [
      'TUI personal website accessed over SSH — no browser required.',
      'Built with Ink (React for CLIs), served via OpenSSH in Docker on Fly.io.',
      'Fully keyboard-navigable: sections, scrollable lists, clean exit.',
    ],
  },
  {
    title: 'Cloud Infrastructure Research',
    org: 'Independent',
    period: '2024',
    bullets: [
      'Researched IaaS patterns across AWS, GCP, and Fly.io.',
      'Deployed containerized workloads with Docker and GitHub Actions CI/CD.',
      'Studied distributed systems design and fault-tolerant architectures.',
    ],
  },
];

interface ExperienceProps {
  isActive: boolean;
}

export default function Experience({ isActive }: ExperienceProps) {
  const [selected, setSelected] = useState(0);

  useInput((_input, key) => {
    if (!isActive) return;
    if (key.upArrow) setSelected((s) => Math.max(0, s - 1));
    if (key.downArrow) setSelected((s) => Math.min(entries.length - 1, s + 1));
  });

  const entry = entries[selected];

  return (
    <Box flexDirection="column" paddingX={2}>
      <Text bold color="cyan">Experience &amp; Projects</Text>
      <Text>{'─'.repeat(60)}</Text>
      <Newline />

      {/* Sidebar list */}
      <Box flexDirection="row">
        <Box flexDirection="column" width={32} marginRight={3}>
          {entries.map((e, i) => (
            <Text key={i} color={i === selected ? 'cyan' : undefined} dimColor={i !== selected}>
              {i === selected ? '▶ ' : '  '}
              {e.title}
            </Text>
          ))}
          <Newline />
          {isActive && (
            <Text dimColor>↑ ↓ to navigate</Text>
          )}
        </Box>

        {/* Detail pane */}
        <Box flexDirection="column" flexGrow={1}>
          <Text bold>{entry.title}</Text>
          <Text color="yellow">{entry.org}</Text>
          <Text dimColor>{entry.period}</Text>
          <Newline />
          {entry.bullets.map((line, i) => (
            <Text key={i}>• {line}</Text>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
