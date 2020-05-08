window.onload = function () {
  document.getElementById('generate').onclick = isCurrentTabZohoItemDetails;
};

function openPrompt(id) {
  chrome.tabs.sendMessage(id, null);
}

function isCurrentTabZohoItemDetails() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, ([currentTab]) => {
    if (currentTab.url.indexOf('itemdetails') > -1) {
      injectContentScript(currentTab.id);
    } else {
      document.getElementById('error').innerText = 'Go to Zoho Sprints item details to generate the branch title!';
    }
  });
}

function injectContentScript(id) {
  chrome.tabs.executeScript(id, {
    code: 'document.getElementById(\'injected\');'
  }, (result) => {
    if (result) {
      openPrompt(id);
    } else {
      chrome.tabs.executeScript(id, {
        file: "script.js"
      }, () => {
        window.injected = true;
        openPrompt(id);
      });
    }
  });
}


