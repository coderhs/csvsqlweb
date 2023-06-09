//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
  dragFile = dropArea.querySelector(".drag-file"),
  button = dropArea.querySelector(".file-input-button"),
  input = dropArea.querySelector(".file-input");

let documentImages = document.querySelector("#document-images");

/*
 * When the user clicks the previous button, the current section is hidden and the previous section is
 * shown.
 * @param sectionContainer - the section that is currently being displayed
 */
const prevButtonNavigation = (sectionContainer) => {
  sectionContainer.classList.add("hidden");
  sectionContainer.previousElementSibling.classList.add("block");
  sectionContainer.previousElementSibling.classList.remove("hidden");
};

/*
 * When the next button is clicked, hide the current section and show the next section.
 * @param sectionContainer - the section that is currently being displayed
 */

// Files array to check whether there is any file
// selected or not
let documentFileObj = {
  fileName: [],
  files: []
};


// Input validation to check whether the fileName
// array in documentFileObj has any file or not and
// throw the error accordingly
const validationInputs = (container, dataObject) => {
  const errorMessage = container.querySelector("#input-empty-error");
  const emptyFields = [];
  for (const key in dataObject) {
    if (dataObject[key].length <= 0) {
      emptyFields.push(key.toUpperCase());
    }
  }
  errorMessage.textContent = `Please fill ${emptyFields.join()} fields!!`;
  errorMessage.classList.remove("hidden");
  setTimeout(() => {
    errorMessage.classList.add("hidden");
  }, 2000);
};



button.onclick = () => {
  input.click(); //if user click on the button then the input also gets clicked
};

input.addEventListener("change", function (e) {
  const target = e.target;
  settingFileValue(target);
});


/**
 * If the file type is jpg, jpeg, or png, return the text-violet-600 fa-image class. Otherwise, return
 * the text-red-600 fa-file-pdf class.
 * @param fileType - The file type of the file.
 * @returns A function that takes a fileType as an argument and returns a string.
 */
const fileTypeLogo = (fileType) => {
  if (fileType === "csv") {
    return "text-violet-600 fa-image";
  } else {
    return "text-red-600 fa-file-pdf";
  }
};

// //If user Drag File Over DropArea
/* This is an event listener. It is listening for the dragover event. When the dragover event is
triggered, it will prevent the default behavior, add the active class to the dropArea element, and
change the text of the dragFile element. */
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault(); //preventing from default behavior
  dropArea.classList.add("active");
  dragFile.textContent = "Release to Upload File";
});

// //If user leave dragged File from DropArea
/* This is an event listener. It is listening for the dragleave event. When the dragleave event is
triggered, it will remove the active class from the dropArea element and change the text of the
dragFile
element. */
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragFile.textContent = "Drag files here to upload";
});

//If user drop File on DropArea
/* This is an event listener. It is listening for the drop event. When the drop event is triggered, it
will prevent the default behavior, remove the active class from the dropArea element, change the
text of the dragFile element, and call the settingFileValue function. */
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  const target = e.dataTransfer;
  dropArea.classList.remove("active");
  dragFile.textContent = "Drag files here to upload";
  settingFileValue(target);
});

// Navigation part
/* This is an event listener. It is listening for the click event. When the click event is triggered,
it will check if the target is the nextButton or prevButton. If it is the nextButton, it will check
if the documentFileObj object has a fileName property. If it does, it will call the
nextButtonNavigation function. If it does not, it will show an alert. If the target is the
prevButton, it will call the prevButtonNavigation function. */
document.querySelector("body").addEventListener("click", (e) => {
  const target = e.target;
  const importButton = target.closest(".document-import-button");
  const sectionContainer = target.closest(".section-container");

  if (importButton) {
    if (documentFileObj["fileName"].length !== 0) {
      importCSVtoSqlite3();
    } else {
      validationInputs(sectionContainer, documentFileObj);
    }
  }
});


const settingFileValue = (target) => {
  /*getting user select file and [0] this means if user select multiple files then we'll select only the first one
     This is getting the file name, file size, and file type. */
  console.log(target)
  console.log(target.files[0])
  const fileName = target.files[0].name.split(".")[0].toLowerCase();
  const fileSize = target.files[0].size;
  const fileType = target.files[0].type.split("/").pop(); //fetching only the part after slash

  let filetypeErrorMessage = document.getElementById("filetype-error");
  filetypeErrorMessage.classList.add("hidden");

  const fileTypes = ["text/csv","application/csv"]
  if (
    fileTypes.includes(target.files[0].type)
  ) {
    filetypeErrorMessage.classList.add("hidden");

    documentFileObj["fileName"][0] = fileName;
    documentFileObj["files"][0] = target.files[0];
    importCSVtoSqlite3();
  } else {
    filetypeErrorMessage.classList.remove("hidden");
  }
};
