import { DialogBox } from "./dialog-box.js";

class Item{
    
    constructor(name, displayArea, projectDialogBox){
        this.name = name;
        this.displayArea = displayArea;
        this.projectDialogBox = projectDialogBox;

        if(displayArea == ".projects"){
            this.isProject = true;
            this.itemList = [];
        }
        else{
            this.isProject = false;
            this.projectDialogBox.projectsList[this.projectDialogBox.activeProject].addItem(this)
        }

        this.createElements();
        this.displayItem();
        this.displayProject();

        this.elements.itemContainer.addEventListener("click", (event) => {
            if (this.isProject && (event.target == this.elements.sidecolor || event.target == this.elements.itemContainer || event.target == this.elements.editButton || event.target == this.elements.itemContents || event.target == this.elements.itemName)){
                this.displayProject();
            }
        })
    }

    createElements(){

        this.elements = {
            itemContainer : document.createElement("div"),
            sidecolor : document.createElement("div"),
            itemContents : document.createElement("div"),
            itemName : document.createElement("h2"),
            itemButtons : document.createElement("div"),
            editButton : document.createElement("img"),
            trashButton : document.createElement("img")
        }

        this.elements.itemContainer.classList.add("item-container");

        this.elements.sidecolor.classList.add("sidecolor");
        this.elements.itemContainer.appendChild(this.elements.sidecolor);

        this.elements.itemContents.classList.add("item-contents");
        this.elements.itemContainer.appendChild(this.elements.itemContents);

        this.elements.itemName.classList.add("item-name");
        this.elements.itemName.textContent = this.name;
        this.elements.itemContents.appendChild(this.elements.itemName);

        this.elements.itemButtons.classList.add("item-buttons");
        this.elements.itemContents.appendChild(this.elements.itemButtons);

        this.elements.editButton.classList.add("edit-button");
        this.elements.editButton.setAttribute("src", "images/edit-icon.png");
        this.elements.itemButtons.appendChild(this.elements.editButton);

        this.elements.trashButton.classList.add("trash-button");
        this.elements.trashButton.setAttribute("src", "images/trash.png");
        this.elements.itemButtons.appendChild(this.elements.trashButton);

        this.elements.trashButton.addEventListener("click", () => {
            this.removeItem();
        })

        this.elements.editButton.addEventListener("click", () => {
            if (this.isProject){
                document.querySelector(".project-dialog-title").textContent = "Project"
                document.querySelector(".project-submit-button").value = "Edit Project"
            }
            else{
                document.querySelector(".project-dialog-title").textContent = "Task"
                document.querySelector(".project-submit-button").value = "Edit Task"
            }
            this.projectDialogBox.projectNameInput.value = this.name;
            this.projectDialogBox.setCurrentItem(this)
            this.projectDialogBox.dialogBox.showModal();
        })
    }

    displayProject(){
        if (this.isProject){
            this.projectDialogBox.activeProject = this.projectDialogBox.projectsList.indexOf(this)
            // Set current project display to this project
            let projectContainer = document.querySelector(".project");
            document.querySelector(".project-title-div").style.setProperty("display", "flex");
            
            while(projectContainer.children.length > 1){
                projectContainer.children[1].remove();
            }

            this.itemList.forEach(item => {
                item.displayItem();
            })

            document.querySelector(".project-name").innerHTML = this.name;
        }
    }

    displayItem(){
        let projectsContainer = document.querySelector(this.displayArea);

        projectsContainer.appendChild(this.elements.itemContainer);
    }

    setName(newName){
        this.name = newName;
        this.elements.itemName.textContent = newName;
        this.displayProject();
    }

    removeItem(){
        if (this.isProject){
            let projectContainer = document.querySelector(".project");
            
            this.itemList = []
            while(projectContainer.children.length > 1){
                projectContainer.children[1].remove();
            }

            document.querySelector(".project-title-div").style.setProperty("display", "none");

            this.projectDialogBox.projectsList.splice(this.projectDialogBox.projectsList.indexOf(this) , 1);
        }
        else{
            this.projectDialogBox.projectsList[this.projectDialogBox.activeProject].removeItemFromList(this);
        }

        while(Object.keys(this.elements).length > 0){
            Object.values(this.elements)[0].remove()

            delete this.elements[Object.keys(this.elements)[0]]
        }
    }

    addItem(item){
        this.itemList.push(item);
    }

    removeItemFromList(item){
        this.itemList.splice(this.itemList.indexOf(item) , 1);
    }
}

export {Item}