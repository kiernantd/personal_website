import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text } from 'ink';
import figlet from 'figlet';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nameArt = figlet.textSync('KIERNAN', { font: 'Epic' });
let asciiPhoto = '';
try {
    asciiPhoto = fs.readFileSync(path.join(__dirname, '../../assets/profile.txt'), 'utf8');
}
catch {
    asciiPhoto = '  [no photo]\n  run ascii-image-converter\n  to generate assets/profile.txt';
}
export default function Header() {
    return (_jsxs(Box, { flexDirection: "column", paddingX: 2, children: [_jsxs(Box, { flexDirection: "row", alignItems: "flex-start", children: [_jsx(Box, { marginRight: 4, children: _jsx(Text, { children: asciiPhoto }) }), _jsxs(Box, { flexDirection: "column", justifyContent: "center", children: [_jsx(Text, { color: "cyan", children: nameArt }), _jsx(Text, { color: "gray", children: "Aspiring full-stack dev \u2014 cloud infrastructure, AI architecture, system design" })] })] }), _jsxs(Box, { flexDirection: "column", marginTop: 1, children: [_jsx(Text, { bold: true, color: "cyan", children: "About Me" }), _jsx(Text, { children: '─'.repeat(60) }), _jsx(Text, { children: " " }), _jsx(Text, { children: "Early-career Software Engineer with experience building secure and scalable systems across backend infrastructure, distributed services, and applied cryptography. Strong foundation in systems programming, software design, and concurrent architectures." }), _jsx(Text, { children: " " }), _jsx(Text, { children: "My goal is to become a cloud engineer delivering top-end IaaS solutions. I love working at the intersection of hardware and software \u2014 low-latency pipelines, distributed systems, and polished user experiences." })] })] }));
}
