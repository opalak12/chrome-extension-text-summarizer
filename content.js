function getSelectedOrAllText() {
  const selected = window.getSelection().toString().trim();
  if (selected.length > 0) return selected;

  const paragraphs = Array.from(document.querySelectorAll("p"))
    .map(p => p.innerText.trim())
    .filter(p => p.length > 40);

  return paragraphs.join("\n\n");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getText") {
    sendResponse({ text: getSelectedOrAllText() });
  }
});
