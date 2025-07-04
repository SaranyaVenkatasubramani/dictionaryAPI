const form = document.getElementById('search-form');
const input = document.getElementById('word-input');
const result = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const word = input.value.trim();
  result.innerHTML = '';
  result.classList.remove('error');

  if (!word) {
    result.innerHTML = '<p class="error">Please enter a word.</p>';
    return;
  }

  result.innerHTML = '<p>Searching...</p>';

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) throw new Error('Word not found');

    const data = await res.json();
    const { word: foundWord, phonetics, meanings } = data[0];

    result.innerHTML = `
      <h2>${foundWord}</h2>
      <p><strong>Phonetic:</strong> ${phonetics[0]?.text || 'N/A'}</p>
      <div class="meaning">
        ${meanings.map(meaning => `
          <p><strong>${meaning.partOfSpeech}</strong>: ${meaning.definitions[0].definition}</p>
        `).join('')}
      </div>
    `;
  } catch (error) {
    result.innerHTML = `<p class="error">${error.message}</p>`;
  }
});
