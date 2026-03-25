#!/usr/bin/env node
import React, { useState } from 'react';
import { render, Box, Text, useInput, useApp } from 'ink';
import Header from './components/Header.js';
import Experience from './components/Experience.js';
import Contact from './components/Contact.js';

type Section = 'header' | 'experience' | 'contact';

const SECTIONS: Section[] = ['header', 'experience', 'contact'];
const LABELS: Record<Section, string> = {
  header: 'Home',
  experience: 'Experience',
  contact: 'Contact',
};

function App() {
  const { exit } = useApp();
  const [active, setActive] = useState<Section>('header');

  useInput((input, key) => {
    if (input === 'q' || (key.ctrl && input === 'c')) {
      exit();
      return;
    }

    const idx = SECTIONS.indexOf(active);

    if (key.rightArrow || input === '\t') {
      setActive(SECTIONS[(idx + 1) % SECTIONS.length]);
    }
    if (key.leftArrow) {
      setActive(SECTIONS[(idx - 1 + SECTIONS.length) % SECTIONS.length]);
    }
  });

  return (
    <Box flexDirection="column">
      {/* Nav bar */}
      <Box flexDirection="row" borderStyle="single" borderBottom paddingX={1}>
        {SECTIONS.map((s, i) => (
          <Box key={s} marginRight={i < SECTIONS.length - 1 ? 3 : 0}>
            <Text color={s === active ? 'cyan' : undefined} dimColor={s !== active} bold={s === active}>
              {s === active ? `[ ${LABELS[s]} ]` : LABELS[s]}
            </Text>
          </Box>
        ))}
        <Box flexGrow={1} />
        <Text dimColor>← → Tab  q:quit</Text>
      </Box>

      {/* Content */}
      <Box marginTop={1}>
        {active === 'header' && <Header />}
        {active === 'experience' && <Experience isActive={active === 'experience'} />}
        {active === 'contact' && <Contact />}
      </Box>
    </Box>
  );
}

render(<App />);
