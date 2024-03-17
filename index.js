import { DialogBox } from "./dialog-box.js";
import { Item } from "./item.js";

let projectDialogBox = new DialogBox("project", ".projects");
let itemDialogBox = new DialogBox("item", ".project", projectDialogBox);

let projectPlusButton = document.querySelector(".project-plus-button")
projectPlusButton.addEventListener("click", () => {
    projectDialogBox.dialogBox.showModal();
})

let itemPlusButton = document.querySelector(".item-plus-button")
itemPlusButton.addEventListener("click", () => {
    itemDialogBox.dialogBox.showModal();
})


// Create original project
let newItem = new Item("My First Project", ".projects", projectDialogBox);
projectDialogBox.projectsList.push(newItem);
projectDialogBox.activeProject = projectDialogBox.projectsList.indexOf(newItem);

new Item("Be Cool", ".project", projectDialogBox);
new Item("Be Awesome!", ".project", projectDialogBox);