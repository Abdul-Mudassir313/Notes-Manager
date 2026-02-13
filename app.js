let notes = []
//this function shows a alert on the top of the screen
function custom_alert(text) {
  const popup = document.createElement('div')
  popup.className = 'popup'
  popup.textContent = text
  document.body.appendChild(popup)
  setTimeout(() => {
    popup.remove()
  }, 3000)
}

//this function is loads all notes on the display 
function reload_notes() {
  document.querySelector('.list').replaceChildren()
  notes.forEach(note => {
    let title = note.title
    let text = note.text
    let uid = note.uid
    add_to_list(title, text, uid)
  })
}
reload_notes()

function add_to_list(title, text, uid) {
  const noteItem = document.createElement("div");
  noteItem.className = "note_item";
  
  const titleDiv = document.createElement("div");
  titleDiv.className = "nitemtitle";
  titleDiv.textContent = `${(title||"").slice(0,20)}...`;
  
  const textDiv = document.createElement("div");
  textDiv.className = "nitemtext";
  textDiv.textContent = `${(text||"").slice(0,450)}...`;
  
  const note_edit = document.createElement('img')
  note_edit.className = 'note_edit'
  note_edit.src = 'edit_icon.png'
  note_edit.addEventListener('click', () => {
    ntitle.value = title;
    ntext.value = text;
    current_uid = uid
    npage.style.display = 'flex';
    document.querySelector('.background_page').style.display = 'none';
  })
  
  const n_delete_btn = document.createElement('img')
  n_delete_btn.src = 'delete_icon.png'
  n_delete_btn.className = 'note_delete'
  n_delete_btn.addEventListener('click', () => {
    let delete_note = confirm('do you want to delete this note')
    if (delete_note) {
      notes = notes.filter(note => note.uid !== uid)
      reload_notes()
    }
  })
  
  const note_tools = document.createElement('div')
  note_tools.className = 'note_tools'
  
  note_tools.appendChild(n_delete_btn)
  note_tools.appendChild(note_edit)
  noteItem.appendChild(note_tools)
  noteItem.appendChild(titleDiv);
  noteItem.appendChild(textDiv);

  document.querySelector('.list').prepend(noteItem); // or any container
}

current_uid = null;
document.querySelector('.ftr').style.display = 'none';
const npage = document.createElement('section')
npage.className = 'note_page'

const ntitle = document.createElement('textarea')
ntitle.className = 'note_title'
ntitle.placeholder = 'Title'

const ntext = document.createElement('textarea')
ntext.className = 'note_text'
ntext.placeholder = 'note'

const checkbtn = document.createElement('img')
checkbtn.src = "check_icon.png"
checkbtn.className = 'check_icon'
checkbtn.addEventListener('click', () => {
  let confirm_edit = confirm('save')
  if (confirm_edit) {
    if (ntitle.value.trim() || ntext.value.trim()) {
      let note = notes.find(note => note.uid === current_uid)
      if (note) {
        note.title = ntitle.value;
        note.text = ntext.value;
        reload_notes()
        current_uid=null;
        custom_alert('note edited successfully')
      }
      else {
        note = {
          title: ntitle.value,
          text: ntext.value,
          uid: Date.now().toString(36) + Math.random().toString(36),
        }
        notes.push(note)
        reload_notes()
        custom_alert("Note Saved successfully.")
      }
    }
    else {
      custom_alert('Empty note discarded.')
    }
    npage.style.display = 'none';
    document.querySelector('.background_page').style.display = 'block';
  }
})

const editbar = document.createElement('div')
editbar.className = 'edit_bar'

const undo = document.createElement('img')
undo.src = 'undo_icon.png'
undo.className = 'undo_icon'
undo.id = 'undo_icon'

const redo = document.createElement('img')
redo.src = 'redo_icon.png'
redo.className = 'redo_icon'

npage.appendChild(ntitle)
npage.appendChild(ntext)
npage.appendChild(checkbtn)
npage.appendChild(editbar)
editbar.appendChild(undo)
editbar.appendChild(redo)

document.body.appendChild(npage)

document.getElementById('create_icon').addEventListener('click', () => {
  ntitle.value=null;
  ntext.value=null;
  npage.style.display = 'flex';
  document.querySelector('.background_page').style.display = 'none';
})