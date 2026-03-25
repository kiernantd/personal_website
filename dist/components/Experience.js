import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Text, Newline, useInput } from 'ink';
const entries = [
    // Work Experience
    {
        title: 'Junior Research Engineer',
        org: 'Surreality Lab',
        period: 'Jan 2025 – May 2025  ·  Pittsburgh, PA',
        bullets: [
            'Developed AR spatial markers using linear transformations for 2D/3D environments.',
            'Refactored computer vision pipelines from C to Swift using OpenCV for Apple Vision Pro.',
            'Collaborated in Agile sprint cycles with researchers and engineers to ship production-ready features.',
        ],
    },
    {
        title: 'Pool Technician / Apprentice',
        org: 'Great Valley Pool Service',
        period: 'May 2025 – Aug 2025  ·  Great Valley, PA',
        bullets: [
            'Only new hire to independently manage a full residential pool service route.',
            'Completed 100+ jobs and earned recognition as the top new technician in performance.',
        ],
    },
    // Projects
    {
        title: 'Scalable Event Booking Backend',
        org: 'Project',
        period: 'Feb 2026 – current',
        bullets: [
            'Built a REST API supporting concurrent seat reservations with Redis distributed locks preventing race conditions.',
            'Designed relational schemas with indexing and transaction guarantees for consistent data storage.',
            'Implemented sliding-window rate limiting; containerized deployment with Docker (AWS soon).',
        ],
    },
    {
        title: 'Secure Cryptographic Messaging System',
        org: 'Project',
        period: 'Sep 2024 – Dec 2024',
        bullets: [
            'Team of five: AES encryption, RSA digital signatures, and SHA-512 hashing for client-server comms.',
            'Designed auth workflows ensuring confidentiality and integrity of messages.',
            'Tested API via Postman; authored user guide and README documentation.',
        ],
    },
    {
        title: "L's Labyrinth",
        org: 'Project',
        period: 'Jan 2025 – April 2025',
        bullets: [
            "Procedural maze generation using Wilson's Algorithm for dynamic game environments.",
            'Monte Carlo-based enemy AI responsive to player state and resources.',
        ],
    },
    {
        title: 'Personal Website (this site)',
        org: 'Project',
        period: '2025',
        bullets: [
            'TUI personal website accessed over SSH — no browser required.',
            'Built with Ink (React for CLIs), served via OpenSSH in Docker on Fly.io.',
            'Fully keyboard-navigable: sections, scrollable lists, clean exit.',
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
