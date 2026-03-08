(() => {
  const VERSION = '3.343';

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
    VERSION,
    escapeHTML,
    normalizeNL,
    parseCSVRow,
    simpleHash,
    storageLoad,
    storageSave
  };
})();
