# Third-party notices — Float Xiaohongshu read-only MCP

This code is derived from the user-provided ZIP “糯米机小红书MCP移植至float.zip”, whose signing implementation is taken from SullyOS and originally from Cloxl/xhshow. The MCP adaptation in this repository is provided for **personal noncommercial experimentation only**. This is NOT an official Xiaohongshu integration.

## SullyOS signing implementation

Source: https://github.com/qegj567-cloud/SullyOS  
License: PolyForm Noncommercial License 1.0.0  
Full license: https://polyformproject.org/licenses/noncommercial/1.0.0

Required Notice: Copyright (c) 2024-2026 NMJ (SullyOS / 手抓糯米机)

The original SullyOS source's `XHSLite` logic has been adapted with a core-level read-only command allowlist; the transport wrapper was written for the isolated Netlify deployment. PolyForm Noncommercial does **not** permit commercial usage without a separate license.

## Cloxl/xhshow signing algorithm source

Source: https://github.com/Cloxl/xhshow  
License: MIT License

Copyright (c) 2024 Cloxl

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Safety and scope

The public endpoint requires `Authorization: Bearer <MCP_KEY>` for every MCP POST; no XHS cookies or private token values belong in GitHub or query parameters. Only these five read-only commands are exposed: `xhs_check_login`, `xhs_search`, `xhs_list_feeds`, `xhs_get_feed_detail`, `xhs_user_profile`. Account mutations are rejected at the protocol and core levels. This does not guarantee upstream availability, platform authorization, or login success; the unofficial interface may change. Do not add write tools or remove the command whitelist without explicit user approval.
