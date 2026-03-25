#!/usr/bin/env node
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Enter alternate screen buffer before Ink takes over — this gives a clean
// fullscreen canvas (like vim/htop) and prevents content bleeding into the
// scroll-back buffer or appearing at the bottom of the terminal.
process.stdout.write('\x1b[?1049h\x1b[2J\x1b[H');
process.on('exit', () => process.stdout.write('\x1b[?1049l'));
import { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useApp, useStdout } from 'ink';
import Header from './components/Header.js';
import Experience from './components/Experience.js';
import Contact from './components/Contact.js';
const SECTIONS = ['header', 'experience', 'contact'];
const LABELS = {
    header: 'Home',
    experience: 'Experience',
    contact: 'Contact',
};
function App() {
    const { exit } = useApp();
    const { stdout } = useStdout();
    const [active, setActive] = useState('header');
    const [cols, setCols] = useState(stdout.columns ?? 80);
    // Track terminal width so Header can hide the photo when too narrow
    useEffect(() => {
        const onResize = () => setCols(stdout.columns ?? 80);
        stdout.on('resize', onResize);
        return () => { stdout.off('resize', onResize); };
    }, [stdout]);
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
    return (_jsxs(Box, { flexDirection: "column", children: [_jsxs(Box, { flexDirection: "row", borderStyle: "single", borderBottom: true, paddingX: 1, children: [SECTIONS.map((s, i) => (_jsx(Box, { marginRight: i < SECTIONS.length - 1 ? 3 : 0, children: _jsx(Text, { color: s === active ? 'cyan' : undefined, dimColor: s !== active, bold: s === active, children: s === active ? `[ ${LABELS[s]} ]` : LABELS[s] }) }, s))), _jsx(Box, { flexGrow: 1 }), _jsx(Text, { dimColor: true, children: "\u2190 \u2192 Tab  q:quit" })] }), _jsxs(Box, { marginTop: 1, children: [active === 'header' && _jsx(Header, { cols: cols }), active === 'experience' && _jsx(Experience, { isActive: active === 'experience' }), active === 'contact' && _jsx(Contact, {})] }, active)] }));
}
render(_jsx(App, {}));
