import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text, Newline } from 'ink';
export default function About() {
    return (_jsxs(Box, { flexDirection: "column", paddingX: 2, children: [_jsx(Text, { bold: true, color: "cyan", children: "About Me" }), _jsx(Text, { children: '─'.repeat(60) }), _jsx(Newline, {}), _jsx(Text, { children: "Hey! I'm Kiernan \u2014 an aspiring full-stack developer with a focus on cloud infrastructure, AI architecture, and system design." }), _jsx(Newline, {}), _jsx(Text, { children: "My goal is to become a cloud engineer delivering top-end IaaS solutions. I love working at the intersection of hardware and software \u2014 whether that's designing low-latency pipelines, architecting distributed systems, or shipping polished user experiences." }), _jsx(Newline, {}), _jsx(Text, { children: "When I'm not coding you'll find me exploring new tools, training in Brazilian Jiujitsu, or cooking up a new tasty meal." })] }));
}
