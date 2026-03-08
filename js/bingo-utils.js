(() => {
  const storageLoad = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };

  const storageSave = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  };

  const normalizeNL = (value) => String(value).replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  const simpleHash = (value) => {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = ((hash << 5) - hash) + value.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  };

  const escapeHTML = (value) => {
    const node = document.createElement("div");
    node.appendChild(document.createTextNode(String(value ?? "")));
    return node.innerHTML;
  };

  const parseCSVRow = (row) => {
    const cols = [];
    let cur = "";
    let inQ = false;
    for (let i = 0; i < row.length; i++) {
      const ch = row[i];
      if (inQ) {
        if (ch === "\"" && row[i + 1] === "\"") {
          cur += "\"";
          i++;
        } else if (ch === "\"") {
          inQ = false;
        } else {
          cur += ch;
        }
      } else if (ch === "\"") {
        inQ = true;
      } else if (ch === ",") {
        cols.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    cols.push(cur.trim());
    return cols;
  };

  window.BingoUtils = {
    escapeHTML,
    normalizeNL,
    parseCSVRow,
    simpleHash,
    storageLoad,
    storageSave
  };
  
  // Also add a small, non-intrusive link to the approved leaderboard on the index page.
  // This keeps the change local to the JS utilities so index.html doesn't need direct edits.
  try {
    document.addEventListener('DOMContentLoaded', () => {
      try {
        const path = location.pathname.replace(/\\/g, '/');
        const isIndex = path.endsWith('/index.html') || path === '/' || path === '' || path.endsWith('/');
        if (!isIndex) return;

        const header = document.querySelector('header.dashboard') || document.querySelector('header[role=banner]');
        if (!header) return;

        const link = document.createElement('a');
        link.href = 'approved.html';
        link.textContent = 'Approved Leaderboard';
        link.className = 'nav-btn';
        link.style.marginLeft = '8px';
        link.style.fontSize = '0.9rem';
        link.setAttribute('aria-label', 'Open Approved Leaderboard');

        const right = header.querySelector('.header-actions, .admin-header-right, .header-right');
        if (right) right.appendChild(link);
        else header.appendChild(link);
      } catch (e) {
        // ignore
      }
    });
  } catch (e) {}

})();
