async function fetchWord() {
  const word = document.getElementById("wordInput").value.trim();
  const output = document.getElementById("output");
  const iconArea = document.getElementById("iconArea");
  output.innerHTML = "";
  iconArea.innerHTML = "";

  if (!word) {
    output.innerHTML = `<p id="error">Please enter a word.</p>`;
    return;
  }

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) throw new Error("Word not found");

    const data = await response.json();
    const entry = data[0];
    const audioUrl = entry.phonetics.find(p => p.audio)?.audio || "";

    let html = `<h2>${entry.word}</h2>`;

    if (audioUrl) {
      html += `
        <button class="sound-btn" onclick="playSound('${audioUrl}')">🔊 Pronounce</button>
      `;
    }

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

function playSound(audioUrl) {
  const audio = new Audio(audioUrl);
  audio.play();
}
