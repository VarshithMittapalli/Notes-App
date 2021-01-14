showNotes();

let i = 0;
let mainTitle = 'Welcome to Notes App. . . . .';
type();
function type() {
    if (i < mainTitle.length)
    {
        document.getElementById('mainTitle').innerHTML += mainTitle.charAt(i);
        i++;
        setTimeout(type, 100);
    }
}

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {

    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    while (addTxt.value == '') {
        alert('Enter some thing in the Textarea to add notes');
        break;
    }
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let myObj = {
        title : addTitle.value,
        text : addTxt.value
    };

    if (addTxt.value != '') {
        notesobj.push(myObj);
        localStorage.setItem('notes', JSON.stringify(notesobj));
        addTxt.value = "";
        addTitle.value = ""
        showNotes();
    }
})


//function to show notes
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = '';
    notesobj.forEach(function (element, index) {
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text"> ${element.text} </p>
            <button id = "${index}" onclick = "deleteNote(this.id)"class="btn btn-primary">Delete Note</button>
        </div>
    </div>`
    });
    let notesElem = document.getElementById('notes');
    if (notesobj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes`;
    }
}


//function to delete notes
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    showNotes();
}


//function to search
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputTxt = search.value.toLowerCase();
    let noteCard = document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTxt.includes(inputTxt)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })

})
