let node = document.createElement('div');
node.setAttribute('id', 'injected');
node.style.display = "none";
document.body.appendChild(node);

chrome.runtime.onMessage.addListener(() => {
  openPrompt();
});

function openPrompt() {
  let epic = prompt("Please enter project title", 'RHIZOM');
  let title = document.getElementsByTagName("textarea")[0].innerHTML;
  let taskId = getAllElementsWithAttribute('data-zsqa')[0].innerText;

  prompt("Branch title", `${taskId}-${epic.toUpperCase()}-${cleanUpSpecialChars(title)}`);
  prompt("PR title", `${taskId} - ${epic.toUpperCase()} - ${cleanUpSpecialChars(title).split('-').join(' ')}`);
}

function getAllElementsWithAttribute(attribute) {
  let matchingElements = [];
  let allElements = document.getElementsByTagName('*');
  for (let i = 0, n = allElements.length; i < n; i++) {
    if (allElements[i].getAttribute(attribute) !== null && allElements[i].dataset.zsqa === 'itempop_prefix') {
      matchingElements.push(allElements[i]);
    }
  }
  return matchingElements;
}

function cleanUpSpecialChars(str) {
  return str
    .replace(/[ÀÁÂÃÄÅ]/g, "A")
    .replace(/[àáâãäå]/g, "a")
    .replace(/[ÈÉÊË]/g, "E")
    .replace(/[èéêë]/g, "e")
    .replace(/[ÒÓÔÕ]/g, "O")
    .replace(/[òóôõ]/g, "o")
    .replace(/[ÙÚÛ]/g, "U")
    .replace(/[ùúû]/g, "u")
    .replace(/[çÇ]/g, "c")
    .replace(/[^\w\s]/gi, '')
    .split(' ').join('-');
}
