document.getElementById("ticketForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const titolo = document.getElementById("titolo").value;
  const descrizione = document.getElementById("descrizione").value;
  const utenti = Array.from(document.getElementById("utenti").selectedOptions).map(opt => opt.value);

  const response = await fetch("https://BACKEND.vercel.app/api/create-ticket", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titolo, descrizione, utenti }),
  });

  const result = await response.json();
  document.getElementById("risposta").innerText = JSON.stringify(result, null, 2);
});
