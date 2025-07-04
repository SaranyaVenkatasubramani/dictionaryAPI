function fetchDefinition() {
  const word = document.getElementById("word").value.trim();
  const resultBox = document.getElementById("result");

  resultBox.innerHTML = ""; // clear previous result

  if (!word) {
    resultBox.innerHTML = "<p style='color:red;'>Please enter a word.</p>";
    return;
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Word not found ❌");
      }
      return response.json();
    })
    .then(data => {
      const definition = data[0].meanings[0].definitions[0].definition;
      resultBox.innerHTML = `<strong>Meaning of "${word}":</strong><p>${definition}</p>`;
    })
    .catch(error => {
      resultBox.innerHTML = `<p style='color:red;'>${error.message}</p>`;
    });
}

