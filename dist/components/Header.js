import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import figlet from 'figlet';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nameArt = figlet.textSync('KIERNAN', { font: 'Epic' });
const nameLines = nameArt.split('\n');
function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = (x) => Math.round(255 * x).toString(16).padStart(2, '0');
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}
let asciiPhoto = '';
try {
    asciiPhoto = fs.readFileSync(path.join(__dirname, '../../assets/profile.txt'), 'utf8');
}
catch {
    asciiPhoto = '  [no photo]\n  run ascii-image-converter\n  to generate assets/profile.txt';
}
export default function Header() {
    const [phase, setPhase] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setPhase((p) => p + 1), 80);
        return () => clearInterval(timer);
    }, []);
    return (_jsxs(Box, { flexDirection: "column", paddingX: 2, children: [_jsxs(Box, { flexDirection: "row", alignItems: "flex-start", children: [_jsx(Box, { marginRight: 4, children: _jsx(Text, { children: asciiPhoto }) }), _jsxs(Box, { flexDirection: "column", justifyContent: "center", children: [_jsx(Box, { flexDirection: "column", children: nameLines.map((line, i) => (_jsx(Text, { color: hslToHex((i * 35 + phase * 6) % 360, 100, 62), children: line }, i))) }), _jsx(Text, { color: "gray", children: "Aspiring full-stack dev \u2014 cloud infrastructure, AI architecture, system design" })] })] }), _jsxs(Box, { flexDirection: "column", marginTop: 1, children: [_jsx(Text, { bold: true, color: "cyan", children: "About Me" }), _jsx(Text, { children: '─'.repeat(60) }), _jsx(Text, { children: " " }), _jsx(Text, { children: "Early-career Software Engineer with experience building secure and scalable systems across backend infrastructure, distributed services, and applied cryptography. Strong foundation in systems programming, software design, and concurrent architectures." }), _jsx(Text, { children: " " }), _jsx(Text, { children: "My goal is to become a cloud engineer delivering top-end IaaS solutions. I love working at the intersection of hardware and software \u2014 low-latency pipelines, distributed systems, and polished user experiences." })] })] }));
}
