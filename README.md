**Chrome Extension Text Summarizer**

This Chrome extension summarizes web pages using a deployed backend API. Users can click the "Summarize Page" button in the extension popup to get a concise summary of the current page.

**Features**

Summarizes any web page by extracting the text from paragraphs.
Uses a backend deployed on Render with Hugging Face facebook/bart-large-cnn model.
Modern, responsive popup UI with auto-resizing textarea.

**Getting Started**
1. Install the Extension Locally
- Clone this repository:

```git clone https://github.com/opalak12/chrome-extension-text-summarizer.git
  cd chrome-extension-text-summarizer
```


- Open Chrome and go to chrome://extensions/.
- Enable Developer Mode (top-right toggle).
- Click Load unpacked and select the folder chrome-extension-text-summarizer.

2. Using the Extension
- Navigate to any web page you want to summarize.
- Click the extension icon in Chrome to open the popup.
- Click the Summarize Page button.

The summary will appear in the textarea below the button.
