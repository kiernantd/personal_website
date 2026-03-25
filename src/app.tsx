#!/usr/bin/env node

// Enter alternate screen buffer before Ink takes over — this gives a clean
// fullscreen canvas (like vim/htop) and prevents content bleeding into the
// scroll-back buffer or appearing at the bottom of the terminal.
process.stdout.write('\x1b[?1049h\x1b[2J\x1b[H');
process.on('exit', () => process.stdout.write('\x1b[?1049l'));

import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useApp, useStdout } from 'ink';
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
  const { stdout } = useStdout();
  const [active, setActive] = useState<Section>('header');
  const [cols, setCols] = useState(stdout.columns ?? 80);

  // Track terminal width so Header can hide the photo when too narrow
  useEffect(() => {
    const onResize = () => setCols(stdout.columns ?? 80);
    stdout.on('resize', onResize);
    return () => { stdout.off('resize', onResize); };
  }, [stdout]);

  // Clear the alternate screen buffer on every section change so stale
  // content from a taller previous section never bleeds through.
  useEffect(() => {
    process.stdout.write('\x1b[2J\x1b[H');
  }, [active]);

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
        {active === 'header' && <Header cols={cols} />}
        {active === 'experience' && <Experience isActive={active === 'experience'} />}
        {active === 'contact' && <Contact />}
      </Box>
    </Box>
  );
}

render(<App />);
