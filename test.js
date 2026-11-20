async function addBook() {
    const response = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: "Atomic Habits",
            author: "James Clear",
            year: 2018
        })
    });

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", data);
}

addBook();