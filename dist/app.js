#!/usr/bin/env node
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { render, Box, Text, useInput, useApp } from 'ink';
import Header from './components/Header.js';
import About from './components/About.js';
import Experience from './components/Experience.js';
import Contact from './components/Contact.js';
const SECTIONS = ['header', 'about', 'experience', 'contact'];
const LABELS = {
    header: 'Home',
    about: 'About',
    experience: 'Experience',
    contact: 'Contact',
};
function App() {
    const { exit } = useApp();
    const [active, setActive] = useState('header');
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
    return (_jsxs(Box, { flexDirection: "column", children: [_jsxs(Box, { flexDirection: "row", borderStyle: "single", borderBottom: true, paddingX: 1, children: [SECTIONS.map((s, i) => (_jsx(Box, { marginRight: i < SECTIONS.length - 1 ? 3 : 0, children: _jsx(Text, { color: s === active ? 'cyan' : undefined, dimColor: s !== active, bold: s === active, children: s === active ? `[ ${LABELS[s]} ]` : LABELS[s] }) }, s))), _jsx(Box, { flexGrow: 1 }), _jsx(Text, { dimColor: true, children: "\u2190 \u2192 Tab  q:quit" })] }), _jsxs(Box, { marginTop: 1, children: [active === 'header' && _jsx(Header, {}), active === 'about' && _jsx(About, {}), active === 'experience' && _jsx(Experience, { isActive: active === 'experience' }), active === 'contact' && _jsx(Contact, {})] })] }));
}
render(_jsx(App, {}));
