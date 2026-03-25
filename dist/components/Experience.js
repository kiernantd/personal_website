import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Text, Newline, useInput } from 'ink';
const entries = [
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
export default function Experience({ isActive }) {
    const [selected, setSelected] = useState(0);
    useInput((_input, key) => {
        if (!isActive)
            return;
        if (key.upArrow)
            setSelected((s) => Math.max(0, s - 1));
        if (key.downArrow)
            setSelected((s) => Math.min(entries.length - 1, s + 1));
    });
    const entry = entries[selected];
    return (_jsxs(Box, { flexDirection: "column", paddingX: 2, children: [_jsx(Text, { bold: true, color: "cyan", children: "Experience & Projects" }), _jsx(Text, { children: '─'.repeat(60) }), _jsx(Newline, {}), _jsxs(Box, { flexDirection: "row", children: [_jsxs(Box, { flexDirection: "column", width: 32, marginRight: 3, children: [entries.map((e, i) => (_jsxs(Text, { color: i === selected ? 'cyan' : undefined, dimColor: i !== selected, children: [i === selected ? '▶ ' : '  ', e.title] }, i))), _jsx(Newline, {}), isActive && (_jsx(Text, { dimColor: true, children: "\u2191 \u2193 to navigate" }))] }), _jsxs(Box, { flexDirection: "column", flexGrow: 1, children: [_jsx(Text, { bold: true, children: entry.title }), _jsx(Text, { color: "yellow", children: entry.org }), _jsx(Text, { dimColor: true, children: entry.period }), _jsx(Newline, {}), entry.bullets.map((line, i) => (_jsxs(Text, { children: ["\u2022 ", line] }, i)))] })] })] }));
}
