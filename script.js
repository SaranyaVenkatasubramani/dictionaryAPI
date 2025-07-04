async function fetchWord() {
  const word = document.getElementById("wordInput").value.trim();
  const output = document.getElementById("output");
  output.innerHTML = "";

  if (!word) {
    output.innerHTML = `<p id="error">Please enter a word.</p>`;
    return;
  }

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) throw new Error("Word not found");

    const data = await response.json();
    const entry = data[0];

    let html = `<h2>${entry.word}</h2>`;

    entry.meanings.forEach((meaning) => {
      html += `<h3>Part of Speech: ${meaning.partOfSpeech}</h3>`;
      meaning.definitions.forEach((def, index) => {
        html += `<p class="definition"><strong>Definition ${index + 1}:</strong> ${def.definition}</p>`;
        if (def.example) {
          html += `<p class="example"><strong>Example:</strong> "${def.example}"</p>`;
        }
      });
    });

    output.innerHTML = html;
  } catch (error) {
    output.innerHTML = `<p id="error">${error.message}</p>`;
  }
}
