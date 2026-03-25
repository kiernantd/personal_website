import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text, Newline } from 'ink';
const links = [
    { key: 'g', label: 'GitHub', value: 'github.com/kiernan' },
    { key: 'e', label: 'Email', value: 'kiernan@example.com' },
    { key: 'l', label: 'LinkedIn', value: 'linkedin.com/in/kiernan' },
];
export default function Contact() {
    return (_jsxs(Box, { flexDirection: "column", paddingX: 2, children: [_jsx(Text, { bold: true, color: "cyan", children: "Contact" }), _jsx(Text, { children: '─'.repeat(60) }), _jsx(Newline, {}), _jsx(Text, { children: "Let's connect:" }), _jsx(Newline, {}), links.map(({ key, label, value }) => (_jsxs(Box, { flexDirection: "row", marginBottom: 1, children: [_jsxs(Text, { color: "cyan", bold: true, children: ["[", key, "]"] }), _jsx(Text, { children: '  ' }), _jsx(Text, { bold: true, children: label.padEnd(10) }), _jsx(Text, { dimColor: true, children: value })] }, key))), _jsx(Newline, {}), _jsx(Text, { dimColor: true, children: "(Copy a link above and open it in your browser.)" })] }));
}
