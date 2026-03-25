import React from 'react';
import { Box, Text, Newline } from 'ink';

export default function About() {
  return (
    <Box flexDirection="column" paddingX={2}>
      <Text bold color="cyan">About Me</Text>
      <Text>{'─'.repeat(60)}</Text>
      <Newline />
      <Text>
        Hey! I&apos;m Kiernan — an aspiring full-stack developer with a focus on
        cloud infrastructure, AI architecture, and system design.
      </Text>
      <Newline />
      <Text>
        My goal is to become a cloud engineer delivering top-end IaaS solutions.
        I love working at the intersection of hardware and software — whether
        that&apos;s designing low-latency pipelines, architecting distributed
        systems, or shipping polished user experiences.
      </Text>
      <Newline />
      <Text>
        When I&apos;m not coding you&apos;ll find me exploring new tools,
        contributing to open source, or tinkering with side projects.
      </Text>
    </Box>
  );
}
