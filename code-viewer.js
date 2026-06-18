(function () {
    "use strict";

    const viewerState = {
        activeTab: "html",
        sources: null
    };

    function initCodeViewer() {
        if (document.querySelector(".code-viewer-root")) {
            return;
        }

        const root = document.createElement("div");
        root.className = "code-viewer-root";
        root.innerHTML = [
            '<button type="button" class="code-viewer-toggle" aria-haspopup="dialog" aria-controls="code-viewer-modal">View Code</button>',
            '<div class="code-viewer-modal" id="code-viewer-modal" aria-hidden="true">',
            '  <div class="code-viewer-backdrop" data-close-viewer="true"></div>',
            '  <section class="code-viewer-panel" role="dialog" aria-modal="true" aria-labelledby="code-viewer-title">',
            '    <header class="code-viewer-header">',
            '      <div class="code-viewer-title-wrap">',
            '        <h2 class="code-viewer-title" id="code-viewer-title">Source Code</h2>',
            '        <p class="code-viewer-subtitle">HTML is shown by default. Switch tabs to view CSS or JavaScript.</p>',
            "      </div>",
            '      <div class="code-viewer-actions">',
            '        <button type="button" class="code-viewer-copy">Copy Code</button>',
            '        <button type="button" class="code-viewer-close" data-close-viewer="true" aria-label="Close code viewer">Close</button>',
            "      </div>",
            "    </header>",
            '    <nav class="code-viewer-tabs" aria-label="Code sections"></nav>',
            '    <div class="code-viewer-body"></div>',
            "  </section>",
            "</div>"
        ].join("");

        document.body.appendChild(root);

        const toggleButton = root.querySelector(".code-viewer-toggle");
        const modal = root.querySelector(".code-viewer-modal");
        const tabsContainer = root.querySelector(".code-viewer-tabs");
        const bodyContainer = root.querySelector(".code-viewer-body");
        const copyButton = root.querySelector(".code-viewer-copy");
        const closeControls = root.querySelectorAll("[data-close-viewer='true']");

        viewerState.sources = collectSources();
        buildTabs(tabsContainer, bodyContainer);
        renderActiveView(bodyContainer);

        toggleButton.addEventListener("click", function () {
            openViewer(modal);
        });

        closeControls.forEach(function (control) {
            control.addEventListener("click", function () {
                closeViewer(modal, toggleButton);
            });
        });

        tabsContainer.addEventListener("click", function (event) {
            const tab = event.target.closest(".code-viewer-tab");
            if (!tab) {
                return;
            }

            viewerState.activeTab = tab.getAttribute("data-tab");
            updateTabs(tabsContainer);
            renderActiveView(bodyContainer);
        });

        copyButton.addEventListener("click", function () {
            copyActiveCode(copyButton);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && modal.classList.contains("is-open")) {
                closeViewer(modal, toggleButton);
            }
        });
    }

    function openViewer(modal) {
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("code-viewer-open");
    }

    function closeViewer(modal, toggleButton) {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("code-viewer-open");
        toggleButton.focus();
    }

    function buildTabs(tabsContainer, bodyContainer) {
        const tabDefs = getTabDefinitions();
        tabsContainer.innerHTML = tabDefs.map(function (tab) {
            return '<button type="button" class="code-viewer-tab' +
                (tab.id === viewerState.activeTab ? " is-active" : "") +
                '" data-tab="' + tab.id + '">' + tab.label + "</button>";
        }).join("");

        bodyContainer.innerHTML = tabDefs.map(function (tab) {
            return '<div class="code-viewer-view code-viewer-single" data-view="' + tab.id + '"></div>';
        }).join("");
    }

    function updateTabs(tabsContainer) {
        tabsContainer.querySelectorAll(".code-viewer-tab").forEach(function (tab) {
            tab.classList.toggle("is-active", tab.getAttribute("data-tab") === viewerState.activeTab);
        });
    }

    function getTabDefinitions() {
        const tabs = [
            { id: "html", label: "HTML" },
            { id: "css", label: "CSS" }
        ];

        if (viewerState.sources.js.trim()) {
            tabs.push({ id: "js", label: "JS" });
        }

        return tabs;
    }

    function renderActiveView(bodyContainer) {
        const htmlView = bodyContainer.querySelector('[data-view="html"]');
        const cssView = bodyContainer.querySelector('[data-view="css"]');
        const jsView = bodyContainer.querySelector('[data-view="js"]');

        if (htmlView) {
            htmlView.innerHTML = createCodeCard("HTML", viewerState.sources.html);
        }

        if (cssView) {
            cssView.innerHTML = createCodeCard("CSS", viewerState.sources.css);
        }

        if (jsView) {
            jsView.innerHTML = createCodeCard("JavaScript", viewerState.sources.js);
        }

        bodyContainer.querySelectorAll(".code-viewer-view").forEach(function (view) {
            view.classList.toggle("is-active", view.getAttribute("data-view") === viewerState.activeTab);
        });
    }

    function createCodeCard(label, code) {
        if (!code.trim()) {
            return createEmptyState(label + " source is not available.");
        }

        return [
            '<section class="code-viewer-card">',
            '  <div class="code-viewer-card-title">' + escapeHtml(label) + "</div>",
            '  <pre class="code-viewer-pre"><code class="code-viewer-lines">' + buildCodeLines(code) + "</code></pre>",
            "</section>"
        ].join("");
    }

    function createEmptyState(message) {
        return '<div class="code-viewer-card"><div class="code-viewer-empty">' + escapeHtml(message) + "</div></div>";
    }

    function buildCodeLines(source) {
        return source.replace(/\r\n/g, "\n").split("\n").map(function (line, index) {
            const safeLine = line.length ? escapeHtml(line) : "&nbsp;";
            return [
                '<span class="code-viewer-line">',
                '  <span class="code-viewer-line-number">' + (index + 1) + "</span>",
                '  <span class="code-viewer-line-text">' + safeLine + "</span>",
                "</span>"
            ].join("");
        }).join("");
    }

    function copyActiveCode(copyButton) {
        const sources = viewerState.sources;
        let text = sources.html;

        if (viewerState.activeTab === "css") {
            text = sources.css;
        } else if (viewerState.activeTab === "js") {
            text = sources.js;
        }

        const originalLabel = copyButton.textContent;
        copyText(text).then(function () {
            copyButton.textContent = "Copied";
            window.setTimeout(function () {
                copyButton.textContent = originalLabel;
            }, 1500);
        }).catch(function () {
            copyButton.textContent = "Copy Failed";
            window.setTimeout(function () {
                copyButton.textContent = originalLabel;
            }, 1500);
        });
    }

    function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        }

        return new Promise(function (resolve, reject) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.setAttribute("readonly", "readonly");
            textArea.style.position = "fixed";
            textArea.style.top = "-9999px";
            textArea.style.left = "-9999px";
            document.body.appendChild(textArea);
            textArea.select();

            try {
                const successful = document.execCommand("copy");
                document.body.removeChild(textArea);
                if (successful) {
                    resolve();
                    return;
                }
            } catch (error) {
                document.body.removeChild(textArea);
                reject(error);
                return;
            }

            reject(new Error("Copy command failed."));
        });
    }

    function collectSources() {
        return {
            html: formatHtml(getDocumentSource()),
            css: formatCss(getStyleSource()),
            js: getJavaScriptSource()
        };
    }

    function getDocumentSource() {
        const clone = document.documentElement.cloneNode(true);
        clone.querySelectorAll("[data-code-viewer-asset], [data-code-source], .code-viewer-root").forEach(function (node) {
            node.remove();
        });
        return getDoctypeSource() + clone.outerHTML;
    }

    function getDoctypeSource() {
        const docType = document.doctype;
        if (!docType) {
            return "";
        }

        let source = "<!DOCTYPE " + docType.name;
        if (docType.publicId) {
            source += ' PUBLIC "' + docType.publicId + '"';
        }
        if (docType.systemId) {
            source += ' "' + docType.systemId + '"';
        }
        return source + ">\n";
    }

    function getStyleSource() {
        const embeddedSource = getEmbeddedSource("css");
        if (embeddedSource) {
            return embeddedSource;
        }

        const chunks = [];

        Array.from(document.styleSheets).forEach(function (sheet) {
            const ownerNode = sheet.ownerNode;
            if (ownerNode && ownerNode.matches && ownerNode.matches("[data-code-viewer-asset]")) {
                return;
            }

            try {
                const rules = Array.from(sheet.cssRules || []);
                if (rules.length) {
                    chunks.push(rules.map(function (rule) {
                        return rule.cssText;
                    }).join("\n\n"));
                }
            } catch (error) {
                if (ownerNode && ownerNode.tagName === "STYLE" && ownerNode.textContent.trim()) {
                    chunks.push(ownerNode.textContent.trim());
                }
            }
        });

        return chunks.join("\n\n").trim();
    }

    function getJavaScriptSource() {
        const embeddedSource = getEmbeddedSource("js");
        if (embeddedSource) {
            return embeddedSource;
        }

        const chunks = [];

        document.querySelectorAll("script").forEach(function (script) {
            if (script.hasAttribute("data-code-viewer-asset")) {
                return;
            }

            if (script.textContent.trim()) {
                chunks.push(script.textContent.trim());
            }
        });

        return chunks.join("\n\n").trim();
    }

    function getEmbeddedSource(type) {
        const sourceNode = document.querySelector('[data-code-source="' + type + '"]');
        if (!sourceNode) {
            return "";
        }

        if (sourceNode.tagName === "TEMPLATE") {
            return sourceNode.content.textContent.trim();
        }

        return sourceNode.textContent.trim();
    }

    function formatHtml(source) {
        const tokens = source
            .replace(/>\s*</g, ">\n<")
            .replace(/\n{2,}/g, "\n")
            .split("\n");
        const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
        let indentLevel = 0;

        return tokens.map(function (token) {
            const line = token.trim();
            if (!line) {
                return "";
            }

            if (/^<\//.test(line)) {
                indentLevel = Math.max(indentLevel - 1, 0);
            }

            const formattedLine = "  ".repeat(indentLevel) + line;
            const tagMatch = line.match(/^<([a-zA-Z0-9-]+)/);
            const isOpeningTag = /^<[^!/][^>]*>$/.test(line);
            const isSelfClosing = /\/>$/.test(line);
            const hasClosingOnSameLine = /<[^>]+>.*<\/[^>]+>$/.test(line);

            if (isOpeningTag && !isSelfClosing && !hasClosingOnSameLine && tagMatch && !voidTags.has(tagMatch[1].toLowerCase())) {
                indentLevel += 1;
            }

            return formattedLine;
        }).join("\n").trim();
    }

    function formatCss(source) {
        if (!source.trim()) {
            return "";
        }

        let indentLevel = 0;
        let formatted = "";
        let previousChar = "";

        for (let index = 0; index < source.length; index += 1) {
            const character = source[index];

            if (character === "{") {
                formatted += " {\n";
                indentLevel += 1;
                formatted += "  ".repeat(indentLevel);
            } else if (character === "}") {
                indentLevel = Math.max(indentLevel - 1, 0);
                formatted = formatted.trimEnd() + "\n" + "  ".repeat(indentLevel) + "}\n" + "  ".repeat(indentLevel);
            } else if (character === ";") {
                formatted += ";\n" + "  ".repeat(indentLevel);
            } else if (character === "\n" || character === "\r") {
                if (previousChar !== "\n") {
                    formatted += "\n" + "  ".repeat(indentLevel);
                }
            } else {
                formatted += character;
            }

            previousChar = character;
        }

        return formatted.replace(/\n{3,}/g, "\n\n").trim();
    }

    function escapeHtml(value) {
        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCodeViewer);
    } else {
        initCodeViewer();
    }
}());
