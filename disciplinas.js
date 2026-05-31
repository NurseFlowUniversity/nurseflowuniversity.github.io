const searchInput = document.getElementById("searchInput");

const cards = document.querySelectorAll(".subject-card");

searchInput.addEventListener("keyup", () => {

const value = searchInput.value.toLowerCase();

cards.forEach((card) => {

```
const text = card.innerText.toLowerCase();

if (text.includes(value)) {
  card.style.display = "block";
} else {
  card.style.display = "none";
}
```

});

});
