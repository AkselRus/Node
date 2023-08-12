document.addEventListener("click", (event) => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id;
        console.log("remove", id);
        remove(id).then(() => {
            // event.target.parentNode.remove();
            event.target.closest("li").remove();
        });
    }
});

async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE",
    });
}
