var titleElement;
var lastScrolledTime;

function setup() {
  var element;
  for (element in document.all) {
    if (element.style) {
      element.style.position="relative";
      element.style.zIndex="-1";
    }
  }

  var iDiv = document.createElement('div');
  iDiv.id = 'headless-container';
  iDiv.className = 'headless-container';
  var parent = document.getElementsByTagName('body')[0]
  parent.insertBefore(iDiv, parent.children[0]);

  var innerDiv = document.createElement('div');
  innerDiv.className = 'headless';
  innerDiv.innerHTML = 'Loading...';

  iDiv.appendChild(innerDiv);
  titleElement = innerDiv;
}

//Slow down calls to refreshText();
function scrolled() {
  var now = new Date().getTime();
  if (!lastScrolledTime || lastScrolledTime < now - 250) {
    lastScrolledTime = now;
    refreshText();
  }
}

function refreshText() {
  var candidate;
  var junk;
  var i = 0;
  for (junk in document.getElementsByClassName('differential-file-icon-header')) {
    element = document.getElementsByClassName('differential-file-icon-header')[i];
    if (elementAboveViewport(element)) {
      candidate = element;
    }
    i += 1;
  }

  if (candidate) {
    titleElement.style.display = 'block';
    titleElement.innerHTML = candidate.innerHTML;
  }
  else {
    titleElement.style.display = 'none';
  }
}

function elementAboveViewport(el) {
  if (!el) {
    return false;
  }
  var top = el.offsetTop;
  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
  }
  return top <= window.pageYOffset;
}

chrome.storage.local.get({
    url: 'http://your-url-here',
  }, function(items) {
    if (document.location.origin.match(items.url)) {
      setup();
      refreshText();
      window.onscroll = scrolled;
    }
});

