// Saves options to chrome.storage
function save_options() {
  var url = document.getElementById('url').value;
  while (url.endsWith("/")) {
    url = url.substring(0, url.length - 1);
  }
  url = url.replace("http://", "");
  url = url.replace("https://", "");

  chrome.storage.local.set({
    url: url,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores options found in chrome.storage
function restore_options() {
  chrome.storage.local.get({
    url: 'http://your-url-here',
  }, function(items) {
    document.getElementById('url').value = items.url;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
