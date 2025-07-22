const chapters = 50; // Genesis has 50 chapters
const chapterList = document.getElementById('chapterList');
const progress = document.getElementById('progress');

function loadProgress() {
  const saved = JSON.parse(localStorage.getItem('bibleProgress')) || [];
  return new Set(saved);
}

function saveProgress(set) {
  localStorage.setItem('bibleProgress', JSON.stringify([...set]));
}

function updateProgress(readSet) {
  const percent = ((readSet.size / chapters) * 100).toFixed(1);
  progress.textContent = `You’ve completed ${readSet.size} out of ${chapters} chapters (${percent}%)`;
}

function createTracker() {
  const readChapters = loadProgress();

  for (let i = 1; i <= chapters; i++) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = readChapters.has(i);
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) readChapters.add(i);
      else readChapters.delete(i);
      saveProgress(readChapters);
      updateProgress(readChapters);
    });

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(`Genesis Chapter ${i}`));
    chapterList.appendChild(li);
  }

  updateProgress(readChapters);
}

createTracker();
