// Select DOM elements
let id = '';
let searchValue = '';
// FETCH NOTES FUNCTION
const fetchNotes = async(id, searchValue) => {
    try {
        // console.log(id);
        // console.log(searchValue);
        // Define url
        let url = `http://localhost:3000/notes?_sort=date&_order=desc`;
        if (id) {
            url = `http://localhost:3000/notes/${id}`;
        }
        if (searchValue) {
            url += `&q=${searchValue}`;
        }

        let fetchData = await fetch(url);
        let res = await fetchData.json();
        // console.log(res);
        if (id === '') {
            // Select the container and reset content
            let container = document.querySelector('.container');
            container.innerHTML = '';
            // Loop through and append to the DOM
            res.forEach(n => {
                // Append to the container if not null

                let articleEl = document.createElement('article');
                articleEl.innerHTML = `
                <div class='note'>
                <h1>${n.title}</h1>
                <div class='date'>${new Date(n.date).toLocaleDateString(navigator.language, {
                    hour: '2-digit',
                    minute:'2-digit'})}</div>
                <p>${n.note.substring(0,50)}</p>
                <button class='more' onclick='fetchNotes(${n.id})'> More </button>
                </div>
            `;
                // Append
                container.append(articleEl);
            });
        } else {
            // Select the container and reset content
            let container = document.querySelector('.container');
            container.innerHTML = '';
            // Create an div
            let divEl = document.createElement('div');
            // Add a class
            divEl.classList.add('note');
            // Set inner HTML
            divEl.innerHTML = ` 
            <button class="send" onclick="sendEmail('${res.note}')"></button>

            <form class="updateNote">
                <input type="text" required name="title" value="${res.title}" class="title" autocomplete="off">

                <textarea name="note" class="note" cols="30" rows="10" required>${res.note}</textarea>

                <button class="submit" type="submit">Update</button>
            </form>
            <button class='delete' onclick='deleteNote(${res.id})'></button>
            <a class='back' href="/"><img src="./img/back.svg" alt="back"></a>
            `;
            // Append
            container.append(divEl);

            // ─── UPDATE NOTE ────────────────────────────────────────────────────────────────
            // Select update form
            if (id !== '') {
                const updateNoteForm = document.querySelector('.updateNote');

                // Update note
                const updateNote = async e => {
                    // As always prevent default
                    e.preventDefault();
                    // console.log('Updated...');
                    // Create object to submit
                    let updateNote = {
                        date: Date.now(),
                        title: updateNoteForm.title.value,
                        note: updateNoteForm.note.value
                    };
                    // console.log(note);
                    // Url
                    let url = `http://localhost:3000/notes/${id}`;
                    // Add note
                    await fetch(url, {
                        method: 'PUT',
                        body: JSON.stringify(updateNote),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    // Reset the form after submition
                    form.reset();
                }

                // Form submit event listener
                updateNoteForm.onsubmit = e => updateNote(e);

                // ─── UPDATE NOTE ────────────────────────────────────────────────────────────────
            }
        }
    } catch (err) {
        if (err) console.log(err)
    }
};
// Run fetch on window load
window.addEventListener('DOMContentLoaded', () => fetchNotes(id, searchValue));

// ─── SORT ───────────────────────────────────────────────────────────────────────
// let sortValue = '';
// url = `http://localhost:3000/notes?_sort=${sortValue}`;
// url = `http://localhost:3000/notes?_sort=${sortValue}&_order=desc`;

// ─── CREATE NEW NOTES ───────────────────────────────────────────────────────────

// Select form
const addNoteForm = document.querySelector('.addNote');
// Select modal
const modal = document.querySelector('.modal');
// Select button
const showModal = document.querySelector('.add');
let open = false;
// Add event listener
showModal.onclick = () => {
    if (open === false) {
        // Form reset
        addNoteForm.reset();
        // Add show class to the modal window
        modal.classList.add('show');
        // Change button 
        showModal.innerHTML = '-'
            // Set Open true
        open = true;
    } else {
        // Remove show class to the modal window
        modal.classList.remove('show');
        // Change button 
        showModal.innerHTML = '+'
            // Set Open true
        open = false;
    }
};
// Add new note function
const addNewNote = async e => {
    // Prevent default reload
    e.preventDefault();
    // console.log('Submited.');
    // Create object to submit
    let note = {
        date: Date.now(),
        title: addNoteForm.title.value,
        note: addNoteForm.note.value
    };
    // console.log(note);
    // Url
    let url = 'http://localhost:3000/notes';
    // Add note
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(note),
        headers: { 'Content-Type': 'application/json' }
    });
    // Reset the form after submition
    addNoteForm.reset();
};
// Add Submit event listener to the form
// Short
addNoteForm.onsubmit = e => addNewNote(e); // pass the event;

// ─── DELETE ─────────────────────────────────────────────────────────────────────
const deleteNote = async id => {
    // console.log(id)
    // Define Url pass the id
    let url = `http://localhost:3000/notes/${id}`;
    // Fetch delete
    await fetch(url, {
        method: 'DELETE'
    });
    // window.location.reload();
    // window.location.replace('/index.html');
};

// ─── SEARCH ─────────────────────────────────────────────────────────────────────
// Select the search form
const searchForm = document.querySelector('.searchForm');
searchForm.onsubmit = e => {
    // As always Prevent default
    e.preventDefault();
    // console.log('Searching...');
    // Take search word
    let searchValue = searchForm.search.value;
    // Run fetch function and pass search word
    fetchNotes(id, searchValue.trim());
};

// ─── SEND EMAIL ─────────────────────────────────────────────────────────────────
const sendEmail = (note) => {
    return window.open(`mailto:yourAddress@email.com?subject=Note 🎶 💌 💜&body= 📝 ${note} `);
};