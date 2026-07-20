//Set Up Local Storage
if (!localStorage.getItem("kangbangItems")) {
  localStorage.setItem("kangbangItems", JSON.stringify([]));
} else {
  // Load existing items from localStorage
  const items = JSON.parse(localStorage.getItem("kangbangItems"));
  items.forEach((item) => {
    const listItem = document.createElement("li");
    var date1 = new Date()
    var date2 = new Date(item.itemDate);
    lapsedTime = Math.abs(date1 - date2);
    lapsedDays = Math.floor(lapsedTime/(1000*60*60*24));
    listItem.innerHTML = `
          <div class="valign-wrapper">
            <i class="material-icons left teal-text text-darken-2">drag_handle</i>
            <span>${item.text}</span>
            <a href="#!" class="secondary-content red-text" onclick="removeItem(this)">
            <i class="material-icons right">delete</i>
            </a>
          </div>
          <div class="bp-eyebrow-date">🗓️${lapsedDays} days ago</div>
        `;
    listItem.setAttribute("id", item.id);
    listItem.setAttribute("draggable", "true");
    listItem.classList.add("collection-item", "draggable");
    listItem.addEventListener("dragstart", dragstartHandler);
    document.getElementById(item.status).appendChild(listItem);
  });
}

// Initiate Modal with id="modal1"
const modal = document.getElementById("modal1");
const modalInstance = M.Modal.init(modal, {
  dismissible: true,
});
const modalContent = document.getElementById("modal1Content");
// function to customize modal and show messages
function showModal(message) {
  modalContent.textContent = message;
  modalInstance.open();
}

//Generic function to add items to a list
function addToList(e, listId) {
  const input = e.target.querySelector('input[type="text"]');
  const text = input.value.trim();
  e.preventDefault(); // Prevent form submission
  if (!text) {
    showModal("Please enter a valid item.");
    e.target.reset(); // Clear the input field
    return;
  } else {
    const listItem = document.createElement("li");
    lapsedDays = 0;
    listItem.innerHTML = `
          <div class="valign-wrapper">
            <i class="material-icons left teal-text text-darken-2">drag_handle</i>
            <span>${text}</span>
            <a href="#!" class="secondary-content red-text" onclick="removeItem(this)">
            <i class="material-icons">delete</i>
            </a>
            </div>
            <div class="bp-eyebrow-date">🗓️${lapsedDays} days ago</div>
        `;
    var itemID = `${Date.now().valueOf().toString(36)}`;
    var itemDate = new Date();
    listItem.setAttribute("id", itemID);
    // Store the item in localStorage
    let items = JSON.parse(localStorage.getItem("kangbangItems"));
    items.push({ id: itemID, text: text, status: listId, itemDate:itemDate });
    localStorage.setItem("kangbangItems", JSON.stringify(items));
    listItem.setAttribute("draggable", "true");
    listItem.classList.add("collection-item", "draggable");
    listItem.addEventListener("dragstart", dragstartHandler);
    document.getElementById(listId).appendChild(listItem);
    input.value = "";
  }
}

function dragstartHandler(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  e.target.classList.add("dragging");
}

function dragoverHandler(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}
function dropHandler(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const draggedElement = document.getElementById(id);
  if (draggedElement) {
    e.target.classList.remove("drag-over");
    const dropArea = e.target.querySelector("ul");
    dropArea.appendChild(draggedElement);
    draggedElement.classList.remove("dragging");
    // Update the item's status in localStorage
    let items = JSON.parse(localStorage.getItem("kangbangItems"));
    items = items.map((item) => {
      if (item.id === id) {
        item.status = dropArea.id; // Update the status to the new list ID
      }
      localStorage.setItem("kangbangItems", JSON.stringify(items));
      return item;
    });
  }
}

function removeItem(itemToRemove){
let items = JSON.parse(localStorage.getItem("kangbangItems"));
var itemId = itemToRemove.parentElement.parentElement.id;
if(itemId){
var newItems = items.filter(item => item.id !== itemId);
localStorage.setItem('kangbangItems', JSON.stringify(newItems));
itemToRemove.parentElement.parentElement.remove();
}else{
  return;
}
}

function setGreeting() {
  const hour = new Date().getHours();
  let greeting;

  if (hour < 5)       greeting = "Burning the midnight oil";
  else if (hour < 12)  greeting = "Good morning";
  else if (hour < 17)  greeting = "Good afternoon";
  else if (hour < 21)  greeting = "Good evening";
  else                 greeting = "Working late";

  const el = document.getElementById('bp-greeting');
  if (el) el.textContent = `${greeting}!`;
}

setGreeting();

