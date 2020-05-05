window.onload = function () {
  document.getElementById('generate').onclick = isCurrentTabZohoItemDetails;
};

function isCurrentTabZohoItemDetails () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, ([currentTab]) => {
    if (currentTab.url.indexOf('itemdetails') > -1) {
      generateBranchTitle(currentTab.id);
    } else {
      document.getElementById('error').innerText = 'Go to Zoho Sprints item details to generate the branch title!';
    }
  });
}

function generateBranchTitle(id) {
  chrome.tabs.executeScript(id, {
    file: "script.js"
  }, function () {
    console.log("script.js injected")
  });
}


