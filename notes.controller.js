const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
    const notes = await getNotes();
    const note = {
        title,
        id: Date.now().toString(),
    };

    notes.push(note);

    await saveNotes(notes);
    console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
    await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
    const notes = await getNotes();

    console.log(chalk.bgBlue("Here is the list of notes:"));
    notes.forEach((note) => {
        console.log(chalk.bgGray(note.id), chalk.blue(note.title));
    });
}

async function removeNote(id) {
    const notes = await getNotes();
    const newNote = notes.filter(function (note) {
        return note.id !== id;
    });

    if (notes.length > newNote.length) {
        console.log(chalk.green.inverse("Note removed"));
        saveNotes(newNote);
    } else {
        console.log(chalk.red.inverse("No note found"));
    }
}
async function updateNote(data) {
    console.log("data", data);
    if (data) {
        const notes = await getNotes();
        const newNote = notes.map((note) =>
            note.id === data.id ? { ...note, title: data.title } : note
        );
        saveNotes(newNote);
        console.log(chalk.green("Update Complite"));
    }
}

module.exports = {
    addNote,
    getNotes,
    printNotes,
    removeNote,
    updateNote,
};
