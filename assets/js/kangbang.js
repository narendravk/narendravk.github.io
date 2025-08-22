//Set Up Local Storage
if (!localStorage.getItem("kangbangItems")) {
  localStorage.setItem("kangbangItems", JSON.stringify([]));
} else {
  // Load existing items from localStorage
  const items = JSON.parse(localStorage.getItem("kangbangItems"));
  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
          <div class="valign-wrapper">
            <i class="material-icons left teal-text text-darken-2">drag_handle</i>
            <span>${item.text}</span>
            <a href="#!" class="secondary-content red-text" onclick="this.parentElement.parentElement.remove()">
            <i class="material-icons right">delete</i>
            </a>
          </div>
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
    listItem.innerHTML = `
          <div class="valign-wrapper">
            <i class="material-icons left teal-text text-darken-2">drag_handle</i>
            <span>${text}</span>
            <a href="#!" class="secondary-content red-text" onclick="this.parentElement.parentElement.remove()">
            <i class="material-icons">delete</i>
            </a>
            </div>
        `;
    var itemID = `${Date.now().valueOf().toString(36)}`;
    listItem.setAttribute("id", itemID);
    // Store the item in localStorage
    let items = JSON.parse(localStorage.getItem("kangbangItems"));
    items.push({ id: itemID, text: text, status: listId });
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
