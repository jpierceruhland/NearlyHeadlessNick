function firstRun() {
  chrome.tabs.create({url: "options.html"});
}

chrome.runtime.onInstalled.addListener(firstRun);
