document.getElementById("summarize-btn").addEventListener("click", async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const response = await fetch("https://chrome-extension-text-summarizer.onrender.com/summarize-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: tab.url })
    });


    const data = await response.json();
    document.getElementById("summary").value = data.summary;

    const textarea = document.getElementById("summary");
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto"; 
      textarea.style.height = textarea.scrollHeight + "px"; 
    });

  } catch (err) {
    console.error(err);
    document.getElementById("summary").value = "Error: " + err.message;
  }
});
