import { Item } from "./item.js";

class DialogBox{
    constructor(nameOfDialog, displayArea, projectDialogBox = ""){
        this.currentItem = "";
        this.activeProject = "";
        if (projectDialogBox){
            this.projectDialogBox = projectDialogBox;
        }
        else{
            this.projectDialogBox = this;
        }
        this.projectsList = []
        this.projectNameInput = document.querySelector("." + nameOfDialog + "-name-input");

        this.dialogBox = document.querySelector("." + nameOfDialog + "-dialog");
        
        this.form = document.querySelector("." + nameOfDialog + "-dialog-form");
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            
            if(this.currentItem){
                this.currentItem.setName(this.projectNameInput.value);
            }
            else{
                let newItem = new Item(this.projectNameInput.value, displayArea, this.projectDialogBox);
                if(newItem.isProject){
                    this.projectsList.push(newItem);
                    this.activeProject = this.projectsList.indexOf(newItem);
                }
            }

            this.currentItem = "";

            this.projectNameInput.value = "";

            this.dialogBox.close();
        });
    }

    setCurrentItem(item){
        this.currentItem = item;
    }
}

export {DialogBox}