// ============================================================
// ACTIVIDAD 3: Paginación, Botón "Cargar más" y Rate Limit
// ============================================================

// Capturamos los elementos del HTML
const usernameInput = document.getElementById('username-input');
const searchBtn = document.getElementById('search-btn');
const sortSelect = document.getElementById('sort-select');
const reposList = document.getElementById('repos-list');
const languageSummary = document.getElementById('language-summary');
const loadMoreBtn = document.getElementById('load-more');      // Actividad 3
const rateLimitP = document.getElementById('rate-limit');     // Actividad 3

// Variables de control de paginación (Actividad 3)
let currentPage = 1;
const perPage = 30; // Cuántos repos traer por página

// ============================================================
// Función principal para cargar repositorios
// ============================================================
async function loadRepos(reset = false) {
  const username = usernameInput.value.trim();
  if (!username) return;

  // Si es una nueva búsqueda, reiniciamos la página y limpiamos la lista
  if (reset) {
    currentPage = 1;
    reposList.innerHTML = '';
    languageSummary.innerHTML = '';
  }

  // ------------------------------------------------------------
  // Construcción de la URL con URLSearchParams (Actividad 2 y 3)
  // ------------------------------------------------------------
  const url = new URL(`https://api.github.com/users/${username}/repos`);
  const params = new URLSearchParams();
  
  // Actividad 3: Paginación
  params.append('page', currentPage);
  params.append('per_page', perPage);
  
  // Actividad 2: Ordenamiento
  const sortValue = sortSelect.value;
  if (sortValue) {
    params.append('sort', sortValue);
  }
  
  url.search = params.toString();
  // ------------------------------------------------------------

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al cargar repositorios');

    // ------------------------------------------------------------
    // ACTIVIDAD 3: Mostrar peticiones restantes (x-ratelimit-remaining)
    // ------------------------------------------------------------
    const remaining = response.headers.get('x-ratelimit-remaining');
    if (remaining) {
      rateLimitP.textContent = `Peticiones restantes: ${remaining}`;
    }
    // ------------------------------------------------------------

    const repos = await response.json();

    // ------------------------------------------------------------
    // ACTIVIDAD 3: Mostrar u ocultar el botón "Cargar más"
    // Si la API devuelve menos de 5 resultados, ocultamos el botón
    // ------------------------------------------------------------
    if (repos.length < 5) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    // Renderizar repos y contar lenguajes (Actividad 2)
    // ------------------------------------------------------------
    const languageCounts = {};
    
    repos.forEach(repo => {
      // Renderizamos cada repositorio en la lista
      const repoDiv = document.createElement('div');
      repoDiv.className = 'repo-item';
      repoDiv.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        <p>${repo.description || 'Sin descripción'}</p>
        <small>Lenguaje: ${repo.language || 'No especificado'}</small>
      `;
      reposList.appendChild(repoDiv);

      // Contamos los lenguajes (solo importa en la primera carga)
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });

    // Solo mostramos el resumen en la primera búsqueda (reset = true)
    if (reset && Object.keys(languageCounts).length > 0) {
      let summaryHtml = '<h2>Resumen de Lenguajes</h2><ul>';
      Object.entries(languageCounts)
        .sort((a, b) => b[1] - a[1])
        .forEach(([lang, count]) => {
          summaryHtml += `<li><strong>${lang}:</strong> ${count} repositorio(s)</li>`;
        });
      summaryHtml += '</ul>';
      languageSummary.innerHTML = summaryHtml;
    } else if (reset) {
      languageSummary.innerHTML = '<p>No se encontraron lenguajes especificados.</p>';
    }
    // ------------------------------------------------------------

  } catch (error) {
    console.error(error);
    reposList.innerHTML = '<p>Error al cargar los repositorios. Verifica el usuario.</p>';
  }
}

// ============================================================
// EVENTOS
// ============================================================

// Búsqueda nueva (reinicia la paginación)
searchBtn.addEventListener('click', () => loadRepos(true));

// Cambio de ordenamiento (reinicia la paginación)
sortSelect.addEventListener('change', () => loadRepos(true));

// ACTIVIDAD 3: Botón "Cargar más" (avanza de página sin reiniciar)
loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  loadRepos(false); // 'false' significa que NO reiniciamos la lista
});

// Ejecutamos una búsqueda automática al cargar la página
window.addEventListener('DOMContentLoaded', () => loadRepos(true));