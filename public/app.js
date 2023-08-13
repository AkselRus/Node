document.addEventListener("click", (event) => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id;
        console.log("remove", id);
        remove(id).then(() => {
            // event.target.parentNode.remove();
            event.target.closest("li").remove();
        });
    } else if (event.target.dataset.type === "update") {
        const id = event.target.dataset.id;
        const title = event.target.dataset.title;

        result = prompt("Введите новое название", title);
        if (result !== "null") {
            update(id, result).then(() => {
                console.log("update complite");
                window.location.reload();
            });
        } else alert("Элемент возвращается в исходное состояние.");
    }
});

async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE",
    });
}

async function update(id, title) {
    const response = await fetch(`/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            title: title,
        }),
    });
    console.log("response", response);
}
