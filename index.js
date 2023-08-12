// const http = require("http");
const express = require("express");

const chalk = require("chalk");
// const fs = require("fs/promises");
const path = require("path");
const { addNote, getNotes, removeNote } = require("./notes.controller");

const PORT = 3000;

// const basePath = path.join(__dirname, "pages");
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(
    express.urlencoded({
        extended: true,
    })
);

// const server = http.createServer(async (req, res) => {
//     if (req.method === "GET") {
//         const content = await fs.readFile(path.join(basePath, "index.html"));
//         // res.setHeader("Content-Type", "text/html");
//         res.writeHead(200, {
//             "Content-Type": "text/html",
//         });
//         res.end(content);
//     } else if (req.method === "POST") {
//         const body = [];
//         res.writeHead(200, {
//             "Content-Type": "text/plain; charset=utf-8",
//         });
//         req.on("data", (data) => {
//             body.push(Buffer.from(data));
//         });
//         req.on("end", () => {
//             const title = body.toString().split("=")[1].replaceAll("+", " ");
//             addNote(title);
//             res.end(`Title = ${title}`);
//         });
//     }
// });

app.get("/", async (req, res) => {
    // res.sendFile(path.join(basePath, "index.html"));
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
    });
});

app.post("/", async (req, res) => {
    await addNote(req.body.title);
    // res.sendFile(path.join(basePath, "index.html"));
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: true,
    });
});

app.delete("/:id", async (req, res) => {
    removeNote(req.params.id);
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
    });
});

app.listen(PORT, () => {
    console.log(chalk.green(`Server has been started on port ${PORT}...`));
});
