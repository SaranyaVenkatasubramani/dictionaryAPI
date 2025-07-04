function fetchWord() {
  const word = document.getElementById("wordInput").value.trim();
  const output = document.getElementById("output");
  
  output.innerHTML = ""; // clear old result

  if (word === "") {
    output.innerHTML = "<p style='color:red;'>Please enter a word.</p>";
    return;
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then(data => {
      // Send parsed data to Member 2 for display logic
      console.log("Fetched Data:", data); // For debugging
      output.innerHTML = `<p style='color:green;'>Data fetched successfully for "<strong>${word}</strong>". Ready for next step.</p>`;
    })
    .catch(error => {
      output.innerHTML = `<p style='color:red;'>Error: ${error.message}</p>`;
    });
}
