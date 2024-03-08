const form = document.querySelector(".form-input");
const todoNotesList = document.querySelector(".notes-list");
const completedNotesList = document.querySelector(".completed-notes-list");
const resetBtn = document.querySelector(".reset-btn");
const filter = document.querySelector(".filter-input");

const addNote = (e) => {
  e.preventDefault();
  const note = document.querySelector(".note-txt-input").value;

  // Add note to todo list
  if (note != "") {
    addNoteToDOM(
      note,
      "note space-btw",
      "uncheck",
      "bx bx-square bx-sm",
      "cross",
      "bx bx-x bx-sm bx-sm",
      todoNotesList
    );
    // Add note to Local Storage
    addNoteToLS(note, "todoNotesItems");
  }
  checkUI();
};

function addNoteToLS(item, itemlistKeyName) {
  let itemsfromLS = getNotesFromLS(itemlistKeyName);

  itemsfromLS.push(item);
  localStorage.setItem(itemlistKeyName, JSON.stringify(itemsfromLS));

  document.querySelector(".note-txt-input").value = "";
}

function addNoteToDOM(
  item,
  listClass,
  btnCheckClass,
  iconCheckClass,
  btnCrossClass,
  iconCrossClass,
  listName
) {
  // Create list element
  const li = document.createElement("li");
  li.className = listClass;

  // Create checkbox button
  const buttonCheckBox = createButton(btnCheckClass);
  li.appendChild(buttonCheckBox);

  // Create checkbox icon
  const iconCheckbox = createIcon(iconCheckClass);
  buttonCheckBox.appendChild(iconCheckbox);

  // Appending the note to the list
  li.appendChild(document.createTextNode(item));

  // Create cross button
  const buttonCross = createButton(btnCrossClass);
  li.appendChild(buttonCross);

  // Create cross icon
  const iconCross = createIcon(iconCrossClass);
  buttonCross.appendChild(iconCross);

  listName.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

const showNotes = () => {
  const todoNotes = getNotesFromLS("todoNotesItems");
  const completedNotes = getNotesFromLS("completedNotesItems");

  // Add  todo notes to DOM
  todoNotes.forEach((todoNote) => {
    addNoteToDOM(
      todoNote,
      "note space-btw",
      "uncheck",
      "bx bx-square bx-sm",
      "cross",
      "bx bx-x bx-sm bx-sm",
      todoNotesList
    );
  });

  // Add completed notes to DOM
  completedNotes.forEach((completedNote) => {
    addNoteToDOM(
      completedNote,
      "space-btw txt-linethrough",
      "check",
      "bx bx-check-square bx-sm",
      "cross",
      "bx bx-x bx-sm",
      completedNotesList
    );
  });
  checkUI();
};

function getNotesFromLS(keyName) {
  let itemsfromLS;
  if (localStorage.getItem(keyName) === null) {
    itemsfromLS = [];
  } else {
    itemsfromLS = JSON.parse(localStorage.getItem(keyName));
  }
  return itemsfromLS;
}

function moveNote(removableNoteLi) {
  // Remove note from Todo list
  removableNoteLi.remove();

  const noteToBeMoved = removableNoteLi.textContent;

  return noteToBeMoved;
}

function removeNoteFromLS(note, itemlistKeyName) {
  let itemsFromTodoLS = getNotesFromLS(itemlistKeyName);

  // Filter out item to be removed
  itemsFromTodoLS = itemsFromTodoLS.filter((notes) => notes != note);

  // Re-set to localStorage
  localStorage.setItem(itemlistKeyName, JSON.stringify(itemsFromTodoLS));
}

const onCheckBoxIconClick = (e) => {
  if (e.target.parentElement.classList.contains("uncheck")) {
    // Move note from todo list to completed list
    const completedNote = moveNote(e.target.parentElement.parentElement);

    // Add note to completed list DOM
    addNoteToDOM(
      completedNote,
      "space-btw txt-linethrough",
      "check",
      "bx bx-check-square bx-sm",
      "cross",
      "bx bx-x bx-sm",
      completedNotesList
    );

    // Remove completed note from Local Storage (todoNotesItems)
    removeNoteFromLS(completedNote, "todoNotesItems");

    // Add note to LOcal Storage (completedNotesItems)
    addNoteToLS(completedNote, "completedNotesItems");

    checkUI();
  }
};

const onCheckedCheckBoxIconClick = (e) => {
  if (e.target.parentElement.classList.contains("check")) {
    // Move note from completed list to todo list
    const todoNote = moveNote(e.target.parentElement.parentElement);

    // Add note to todo list DOM
    addNoteToDOM(
      todoNote,
      "note space-btw",
      "uncheck",
      "bx bx-square bx-sm",
      "cross",
      "bx bx-x bx-sm bx-sm",
      todoNotesList
    );

    // Remove todo note from Local Storage (completedNotesItems)
    removeNoteFromLS(todoNote, "completedNotesItems");

    // Add note to Local Storage (todoNotesItems)
    addNoteToLS(todoNote, "todoNotesItems");

    checkUI();
  }
};

const onCrossIconClick = (e) => {
  if (e.target.parentElement.classList.contains("cross")) {
    if (
      e.target.parentElement.parentElement.classList.contains("txt-linethrough")
    ) {
      if (confirm("Sure want to delete note ?")) {
        // Remove from completed list DOM
        const note = moveNote(e.target.parentElement.parentElement);

        // Remove from LS (completedNotesItems)
        removeNoteFromLS(note, "completedNotesItems");
      }
    } else {
      if (confirm("Sure want to delete note ?")) {
        // Remove from todo list DOM
        const note = moveNote(e.target.parentElement.parentElement);

        // Remove from LS (todoNotesItems)
        removeNoteFromLS(note, "todoNotesItems");
        console.log("Item removed");
      }
    }
  }
  checkUI();
};

const resetList = (e) => {
  if (confirm("Sure want to reset your list ?")) {
    // Remove all notes from the DOM
    while (todoNotesList.firstChild) {
      while (completedNotesList.firstChild) {
        completedNotesList.removeChild(completedNotesList.firstChild);

        // Remove all notes from the LS
        localStorage.removeItem("completedNotesItems");
      }
      todoNotesList.removeChild(todoNotesList.firstChild);

      // Remove all notes from the LS
      localStorage.removeItem("todoNotesItems");
    }
  }
  checkUI();
};

function checkUI() {
  // When LS (todoNotesItems) is empty
  if (getNotesFromLS("todoNotesItems").length === 0) {
    document.querySelector(".filter").style.display = "none";
    document.getElementById("completed-notes").style.borderTop = "none";
  } else {
    document.querySelector(".filter").style.display = "flex";
    document.getElementById("completed-notes").style.borderTop =
      "2px solid #002e4e";
  }

  // When LS (completedNotesItems) is empty
  if (getNotesFromLS("completedNotesItems").length === 0) {
    document.getElementById("completed-notes").style.display = "none";
  } else {
    document.getElementById("completed-notes").style.display = "block";
  }

  // When both LS are empty
  if (
    getNotesFromLS("todoNotesItems").length === 0 &&
    getNotesFromLS("completedNotesItems").length === 0
  ) {
    document.querySelector(".clear-all").style.display = "none";
  } else {
    document.querySelector(".clear-all").style.display = "flex";
  }
}

const filterNote = (e) => {
  const searchNote = e.target.value.toLowerCase().trim();
  const todoNotes = todoNotesList.querySelectorAll("li");
  let totalFound = 0;

  todoNotes.forEach((todoNote) => {
    const note = todoNote.textContent.toLowerCase().trim();
    if (note.includes(searchNote)) {
      todoNote.style.display = "flex";
      totalFound++;
    } else {
      todoNote.style.display = "none";
    }
    if (totalFound === 0) {
      document.getElementById("completed-notes").style.borderTop = "none";
    } else {
      document.getElementById("completed-notes").style.borderTop =
        "2px solid #002e4e";
    }
  });
};

function onInit() {
  document.addEventListener("DOMContentLoaded", showNotes);
  form.addEventListener("submit", addNote);

  todoNotesList.addEventListener("click", onCheckBoxIconClick);
  completedNotesList.addEventListener("click", onCheckedCheckBoxIconClick);

  document.addEventListener("click", onCrossIconClick);
  resetBtn.addEventListener("click", resetList);

  filter.addEventListener("input", filterNote);
}

onInit();
