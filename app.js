const addBtn = document.querySelector("#addBtn"); //Grabbed the element with the Id addBtn
const main = document.querySelector("#main");

//This function helps to store all the data in the local storage
const saveNotes = () =>{
   const notes = document.querySelectorAll(".note textarea");
   console.log(notes);
   const data = [];
   notes.forEach(
    (note) =>{ 
      data.push(note.value)
    }
   )
   //console.log(data);
   if(data.length === 0)
   {
    localStorage.removeItem("notes");
   }else{
    localStorage.setItem("notes",JSON.stringify(data))
   }
  
}



//Attaching eventlistener to the grabbed element
addBtn.addEventListener(
     "click",
     function() {
       addNote()
     }

)




 //Replication of div with class node in html with the help of dom.
 //We have created a new ele i.e div and have added class="note" to it.

const addNote = (text = "") =>{
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
            
                <i class="save fa-solid fa-floppy-disk"></i>
                <i class="trash fa-solid fa-trash"></i>
            </div>
            <textarea >${text}</textarea>
    `;

  note.querySelector(".trash").addEventListener(
       "click",
       function(){
        note.remove();
        saveNotes();
       }
  )

  note.querySelector(".save").addEventListener(
        "click",
        function(){
            saveNotes();
        }
  )
  //auto save functionality
  note.querySelector("textarea").addEventListener(
    "focusout",
    function(){
      saveNotes()
    }
  )
  main.appendChild(note);
  saveNotes();
                         
}

//self calling function: When a user refreshes a page the notes will still be there with saved data
(
  function(){
      const lsNotes = JSON.parse(localStorage.getItem("notes"));
      if(lsNotes === null){
        addNode()
      }else{
        lsNotes.forEach(
          (lsNote) =>{
            addNote(lsNote);
          }
        )
      }       
    }
)()