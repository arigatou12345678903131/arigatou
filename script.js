/**
 * ありがとう教 公式ウェブサイト (script.js)
 * - 聖歌シンセサイザー (ありがとう.ust 完全再現)
 * - 世界のありがとう40言語Atlas & 音声読み上げ
 * - インタラクティブ鍵盤
 * - ありがとうカウンター & 画面エフェクト
 * - 感謝のおみくじ
 * - 信徒証 Canvas ジェネレーター
 * - 桜吹雪 Canvas パーティクル
 */

// ==========================================================================
// 1. 世界の「ありがとう」40言語データ
// ==========================================================================
const ARIGATO_LANGUAGES = [
  { language: "日本語", phrase: "ありがとう", reading: "Arigatou", flag: "🇯🇵", region: "asia", code: "ja-JP" },
  { language: "英語", phrase: "Thank you", reading: "サンキュー", flag: "🇺🇸", region: "america", code: "en-US" },
  { language: "中国語（普通話）", phrase: "谢谢", reading: "シェイシェイ (Xièxiè)", flag: "🇨🇳", region: "asia", code: "zh-CN" },
  { language: "韓国語", phrase: "감사합니다 / 고맙습니다", reading: "カムサハムニダ / コマプスムニダ", flag: "🇰🇷", region: "asia", code: "ko-KR" },
  { language: "スペイン語", phrase: "Gracias", reading: "グラシアス", flag: "🇪🇸", region: "europe", code: "es-ES" },
  { language: "フランス語", phrase: "Merci", reading: "メルシー", flag: "🇫🇷", region: "europe", code: "fr-FR" },
  { language: "ドイツ語", phrase: "Danke", reading: "ダンケ", flag: "🇩🇪", region: "europe", code: "de-DE" },
  { language: "イタリア語", phrase: "Grazie", reading: "グラツィエ", flag: "🇮🇹", region: "europe", code: "it-IT" },
  { language: "ポルトガル語", phrase: "Obrigado", reading: "オブリガード (女性: オブリーガーダ)", flag: "🇵🇹", region: "europe", code: "pt-PT" },
  { language: "ロシア語", phrase: "Спасибо", reading: "スパシーバ (Spasibo)", flag: "🇷🇺", region: "europe", code: "ru-RU" },
  { language: "アラビア語", phrase: "شكرا", reading: "シュクラン (Shukran)", flag: "🇸🇦", region: "mideast", code: "ar-SA" },
  { language: "ヒンディー語", phrase: "धन्यवाद / शुक्रिया", reading: "ダニヴァード / シュクリア", flag: "🇮🇳", region: "asia", code: "hi-IN" },
  { language: "ベトナム語", phrase: "Cảm ơn", reading: "カームオン", flag: "🇻🇳", region: "asia", code: "vi-VN" },
  { language: "タイ語", phrase: "ขอบคุณครับ / ขอบคุณค่ะ", reading: "コープクン クラップ / カ", flag: "🇹🇭", region: "asia", code: "th-TH" },
  { language: "インドネシア語 / マレー語", phrase: "Terima kasih", reading: "テリマ カシ", flag: "🇮🇩", region: "asia", code: "id-ID" },
  { language: "タガログ語（フィリピン）", phrase: "Salamat", reading: "サラマット", flag: "🇵🇭", region: "asia", code: "fil-PH" },
  { language: "トルコ語", phrase: "Teşekkür ederim", reading: "テシュキュル エデリム", flag: "🇹🇷", region: "mideast", code: "tr-TR" },
  { language: "ギリシャ語", phrase: "Ευχαριστώ", reading: "エフハリスト (Efcharistó)", flag: "🇬🇷", region: "europe", code: "el-GR" },
  { language: "オランダ語", phrase: "Dank je", reading: "ダンク イェ", flag: "🇳🇱", region: "europe", code: "nl-NL" },
  { language: "スウェーデン語", phrase: "Tack", reading: "タック", flag: "🇸🇪", region: "europe", code: "sv-SE" },
  { language: "ノルウェー語 / デンマーク語", phrase: "Takk / Tak", reading: "タック / タク", flag: "🇳🇴", region: "europe", code: "no-NO" },
  { language: "フィンランド語", phrase: "Kiitos", reading: "キイトス", flag: "🇫🇮", region: "europe", code: "fi-FI" },
  { language: "ポーランド語", phrase: "Dziękuję", reading: "ヂェンクジエ", flag: "🇵🇱", region: "europe", code: "pl-PL" },
  { language: "チェコ語", phrase: "Děkuji", reading: "デクイ", flag: "🇨🇿", region: "europe", code: "cs-CZ" },
  { language: "ハンガリー語", phrase: "Köszönöm", reading: "コソノム", flag: "🇭🇺", region: "europe", code: "hu-HU" },
  { language: "ルーマニア語", phrase: "Mulțumesc", reading: "ムルトゥメスク", flag: "🇷🇴", region: "europe", code: "ro-RO" },
  { language: "ペルシャ語", phrase: "ممنون / تشکر", reading: "マンヌーン / タシャッコル", flag: "🇮🇷", region: "mideast", code: "fa-IR" },
  { language: "スワヒリ語", phrase: "Asante", reading: "アサンテ", flag: "🇰🇪", region: "mideast", code: "sw-KE" },
  { language: "アフリカーンス語", phrase: "Dankie", reading: "ダンキ", flag: "🇿🇦", region: "mideast", code: "af-ZA" },
  { language: "モンゴル語", phrase: "Баярлалаа", reading: "バヤルララー (Bayarlalaa)", flag: "🇲🇳", region: "asia", code: "mn-MN" },
  { language: "ウクライナ語", phrase: "Дякую", reading: "ディアクユ (Dyakuyu)", flag: "🇺🇦", region: "europe", code: "uk-UA" },
  { language: "ブルガリア語", phrase: "Благодаря", reading: "ブラゴダリャ (Blagodarya)", flag: "🇧🇬", region: "europe", code: "bg-BG" },
  { language: "ヘブライ語", phrase: "תודה", reading: "トダ (Toda)", flag: "🇮🇱", region: "mideast", code: "he-IL" },
  { language: "カタロニア語", phrase: "Gràcies", reading: "グラシアス", flag: "🇪🇸", region: "europe", code: "ca-ES" },
  { language: "アイルランド語", phrase: "Go raibh maith agat", reading: "ガ リバ マ アガト", flag: "🇮🇪", region: "europe", code: "ga-IE" },
  { language: "ウェールズ語", phrase: "Diolch", reading: "ディオルフ", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", region: "europe", code: "cy-GB" },
  { language: "アイスランド語", phrase: "Takk", reading: "タック", flag: "🇮🇸", region: "europe", code: "is-IS" },
  { language: "ジョージア語", phrase: "მადლობა", reading: "マドロバ (Madloba)", flag: "🇬🇪", region: "europe", code: "ka-GE" },
  { language: "アルメニア語", phrase: "շնորհակալություն", reading: "シュルハカルチュン", flag: "🇦🇲", region: "mideast", code: "hy-AM" },
  { language: "クルド語", phrase: "Spas", reading: "スパス", flag: "☀️", region: "mideast", code: "ku-TR" }
];

// ==========================================================================
// 2. Web Audio API による聖歌「ありがとう」演奏システム (UST再現)
// ==========================================================================
// ありがとう.ust のノート設定 (BPM: 120, 四分音符=0.5秒)
// メロディ: あ(C3: 48), り(D3: 50), が(E3: 52), と(F3: 53),
//          あ(C3), り(D3), が(E3), と(F3), う(C4: 60) ... のリフレイン
const HYMN_NOTES = [
  { note: 48, lyric: "あ", freq: 130.81 },
  { note: 50, lyric: "り", freq: 146.83 },
  { note: 52, lyric: "が", freq: 164.81 },
  { note: 53, lyric: "と", freq: 174.61 },

  { note: 48, lyric: "あ", freq: 130.81 },
  { note: 50, lyric: "り", freq: 146.83 },
  { note: 52, lyric: "が", freq: 164.81 },
  { note: 53, lyric: "と", freq: 174.61 },
  { note: 60, lyric: "う", freq: 261.63 },

  { note: 48, lyric: "あ", freq: 130.81 },
  { note: 50, lyric: "り", freq: 146.83 },
  { note: 52, lyric: "が", freq: 164.81 },
  { note: 53, lyric: "と", freq: 174.61 },
  { note: 60, lyric: "う", freq: 261.63 },

  { note: 48, lyric: "あ", freq: 130.81 },
  { note: 50, lyric: "り", freq: 146.83 },
  { note: 52, lyric: "が", freq: 164.81 },
  { note: 53, lyric: "と", freq: 174.61 },
  { note: 60, lyric: "う", freq: 261.63 },

  { note: 48, lyric: "あ", freq: 130.81 },
  { note: 50, lyric: "り", freq: 146.83 },
  { note: 52, lyric: "が", freq: 164.81 },
  { note: 53, lyric: "と", freq: 174.61 },
  { note: 60, lyric: "う", freq: 261.63 },

  { note: 48, lyric: "あ", freq: 130.81 },
  { note: 50, lyric: "り", freq: 146.83 },
  { note: 52, lyric: "が", freq: 164.81 },
  { note: 53, lyric: "と", freq: 174.61 },
  { note: 60, lyric: "う", freq: 261.63 }
];

let audioCtx = null;
let isHymnPlaying = false;
let hymnStep = 0;
let hymnTimer = null;
let currentInstrument = "bell";

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// 1音鳴らす
function playTone(freq, duration = 0.5, type = currentInstrument) {
  initAudioContext();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;
  const masterGain = audioCtx.createGain();
  masterGain.connect(audioCtx.destination);

  if (type === "bell") {
    // 聖なるベル音色 (基本波 + ベル倍音)
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    const gain2 = audioCtx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq * 2, now); // オクターブ上で華やかに

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 4.02, now);

    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + duration * 1.5);

    gain2.gain.setValueAtTime(0.1, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.8);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(masterGain);
    gain2.connect(masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration * 1.5);
    osc2.stop(now + duration * 1.5);
  } else if (type === "organ") {
    // 聖なるオルガン音色
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, now);
    osc2.type = "sawtooth";
    osc2.frequency.setValueAtTime(freq * 2, now);

    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1000, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  } else {
    // テト風シンセリード (明るいパルス/矩形波)
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(freq * 2, now);

    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1800, now);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.9);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }
}

// 讃歌の自動演奏ループ
function stepHymn() {
  if (!isHymnPlaying) return;

  const current = HYMN_NOTES[hymnStep];
  playTone(current.freq, 0.45, currentInstrument);

  // 歌詞ハイライト表示
  highlightLyric(hymnStep, current.lyric);

  hymnStep = (hymnStep + 1) % HYMN_NOTES.length;
  hymnTimer = setTimeout(stepHymn, 500); // 120 BPM = 0.5s
}

function startHymn() {
  initAudioContext();
  isHymnPlaying = true;
  hymnStep = 0;
  const playBtn = document.getElementById("btn-play-hymn");
  const headerAudioBtn = document.getElementById("audio-toggle-btn");
  if (playBtn) playBtn.innerHTML = "⏸";
  if (headerAudioBtn) headerAudioBtn.innerHTML = "🔊";
  stepHymn();
}

function stopHymn() {
  isHymnPlaying = false;
  if (hymnTimer) clearTimeout(hymnTimer);
  const playBtn = document.getElementById("btn-play-hymn");
  const headerAudioBtn = document.getElementById("audio-toggle-btn");
  if (playBtn) playBtn.innerHTML = "▶";
  if (headerAudioBtn) headerAudioBtn.innerHTML = "🎵";
  clearLyricHighlights();
}

function highlightLyric(index, char) {
  const syllables = document.querySelectorAll(".lyric-syllable");
  syllables.forEach((el, idx) => {
    if (idx === (index % syllables.length)) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });

  // 鍵盤も連動して点滅
  const keyMap = { 48: "key-c3", 50: "key-d3", 52: "key-e3", 53: "key-f3", 60: "key-c4" };
  const targetKeyId = keyMap[HYMN_NOTES[index].note];
  if (targetKeyId) {
    const keyEl = document.getElementById(targetKeyId);
    if (keyEl) {
      keyEl.classList.add("pressed");
      setTimeout(() => keyEl.classList.remove("pressed"), 300);
    }
  }
}

function clearLyricHighlights() {
  document.querySelectorAll(".lyric-syllable").forEach(el => el.classList.remove("active"));
}

// ==========================================================================
// 3. インタラクティブ鍵盤
// ==========================================================================
const KEYBOARD_FREQS = {
  "key-c3": { freq: 130.81, char: "あ" },
  "key-d3": { freq: 146.83, char: "り" },
  "key-e3": { freq: 164.81, char: "が" },
  "key-f3": { freq: 174.61, char: "と" },
  "key-c4": { freq: 261.63, char: "う" }
};

function setupKeyboard() {
  Object.keys(KEYBOARD_FREQS).forEach(id => {
    const keyEl = document.getElementById(id);
    if (!keyEl) return;

    const data = KEYBOARD_FREQS[id];
    const trigger = (e) => {
      e.preventDefault();
      initAudioContext();
      playTone(data.freq, 0.5, currentInstrument);
      keyEl.classList.add("pressed");
      setTimeout(() => keyEl.classList.remove("pressed"), 200);
      spawnFloatingWord(data.char, e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);
    };

    keyEl.addEventListener("mousedown", trigger);
    keyEl.addEventListener("touchstart", trigger, { passive: false });
  });

  // キーボードショートカット (1, 2, 3, 4, 5 または A, S, D, F, G)
  window.addEventListener("keydown", (e) => {
    if (["input", "textarea"].includes(document.activeElement.tagName.toLowerCase())) return;
    const mapping = {
      "1": "key-c3", "a": "key-c3", "A": "key-c3",
      "2": "key-d3", "s": "key-d3", "S": "key-d3",
      "3": "key-e3", "d": "key-e3", "D": "key-e3",
      "4": "key-f3", "f": "key-f3", "F": "key-f3",
      "5": "key-c4", "g": "key-c4", "G": "key-c4"
    };
    const keyId = mapping[e.key];
    if (keyId && KEYBOARD_FREQS[keyId]) {
      const data = KEYBOARD_FREQS[keyId];
      initAudioContext();
      playTone(data.freq, 0.5, currentInstrument);
      const el = document.getElementById(keyId);
      if (el) {
        el.classList.add("pressed");
        setTimeout(() => el.classList.remove("pressed"), 200);
        const rect = el.getBoundingClientRect();
        spawnFloatingWord(data.char, rect.left + rect.width / 2, rect.top);
      }
    }
  });
}

// ==========================================================================
// 4. 世界の「ありがとう」大典 (Atlas)
// ==========================================================================
function renderAtlas(filteredList = ARIGATO_LANGUAGES) {
  const grid = document.getElementById("atlas-grid");
  if (!grid) return;
  grid.innerHTML = "";

  if (filteredList.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">
      合致する言語が見つかりませんでした。別の言葉で検索してみてください。🌸
    </div>`;
    return;
  }

  filteredList.forEach(item => {
    const card = document.createElement("div");
    card.className = "atlas-card";
    card.innerHTML = `
      <div class="atlas-card-header">
        <div class="atlas-lang">
          <span class="atlas-flag">${item.flag}</span>
          <span>${item.language}</span>
        </div>
        <button class="btn-speak" title="${item.language}で聴く" aria-label="${item.language}で聴く">
          🔊
        </button>
      </div>
      <div>
        <div class="atlas-phrase">${item.phrase}</div>
        <div class="atlas-reading">${item.reading}</div>
      </div>
    `;

    // 音声発声
    const speakBtn = card.querySelector(".btn-speak");
    speakBtn.addEventListener("click", () => {
      speakWord(item.phrase, item.code);
      spawnFloatingWord(item.phrase.split(" ")[0], window.innerWidth / 2, window.innerHeight / 2);
    });

    grid.appendChild(card);
  });
}

// Web Speech API 発声
function speakWord(text, langCode) {
  if (!('speechSynthesis' in window)) {
    alert("お使いのブラウザは音声読み上げに対応していません。");
    return;
  }
  window.speechSynthesis.cancel(); // 既存の読み上げを停止
  // 記号や括弧などを除いて最初の言葉を読み上げる
  const cleanText = text.replace(/\(.*?\)/g, "").split("/")[0].trim();
  const utter = new SpeechSynthesisUtterance(cleanText);
  utter.lang = langCode || 'en-US';
  utter.rate = 0.9;
  utter.pitch = 1.1;
  window.speechSynthesis.speak(utter);
}

function setupAtlasFilters() {
  const searchInput = document.getElementById("atlas-search");
  const filterTabs = document.querySelectorAll(".filter-tab");
  let currentRegion = "all";

  function applyFilter() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const filtered = ARIGATO_LANGUAGES.filter(item => {
      const matchRegion = (currentRegion === "all") || (item.region === currentRegion);
      const matchQuery = !query || 
        item.language.toLowerCase().includes(query) ||
        item.phrase.toLowerCase().includes(query) ||
        item.reading.toLowerCase().includes(query);
      return matchRegion && matchQuery;
    });
    renderAtlas(filtered);
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyFilter);
  }

  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentRegion = tab.dataset.region || "all";
      applyFilter();
    });
  });

  // 今日のありがとうルーレット
  const randomBtn = document.getElementById("btn-random-arigato");
  if (randomBtn) {
    randomBtn.addEventListener("click", () => {
      const randomItem = ARIGATO_LANGUAGES[Math.floor(Math.random() * ARIGATO_LANGUAGES.length)];
      speakWord(randomItem.phrase, randomItem.code);
      alert(`【今日の世界のありがとう神託】\n\n${randomItem.flag} ${randomItem.language}：${randomItem.phrase}\n読み：${randomItem.reading}\n\n心の中でこの言葉を唱え、世界中の愛と繋がりましょう！`);
    });
  }
}

// ==========================================================================
// 5. ありがとうカウンター & フィーバー演出
// ==========================================================================
let prayCount = parseInt(localStorage.getItem("arigato_count") || "108");
let comboCount = 0;
let comboResetTimer = null;

const PRAISE_WORDS = [
  "ありがとう！", "Thank you!", "Merci!", "Danke!", "Grazie!", 
  "Gracias!", "感謝！", "ありがとう教！", "幸あれ！", "幸福！", 
  "笑顔！", "平和！", "大感謝！", "尊い！", "🌸", "💖", "✨"
];

function setupCounter() {
  const countDisplay = document.getElementById("pray-counter-val");
  const prayBtn = document.getElementById("btn-pray-big");
  const navPrayBtn = document.getElementById("nav-pray-btn");
  const feverFill = document.getElementById("fever-fill");

  function updateDisplay() {
    if (countDisplay) {
      countDisplay.textContent = prayCount.toLocaleString();
    }
  }
  updateDisplay();

  function triggerPray(e) {
    prayCount++;
    comboCount++;
    localStorage.setItem("arigato_count", prayCount);
    updateDisplay();

    // コンボ・フィーバー進行
    const feverPercent = Math.min(100, comboCount * 10);
    if (feverFill) {
      feverFill.style.width = `${feverPercent}%`;
    }

    // 連打フィーバー判定 (10回連打)
    if (comboCount === 10) {
      triggerFever();
    }

    if (comboResetTimer) clearTimeout(comboResetTimer);
    comboResetTimer = setTimeout(() => {
      comboCount = 0;
      if (feverFill) feverFill.style.width = "0%";
    }, 2500);

    // ポップアップ文字 & 花火エフェクト
    const x = e ? (e.clientX || window.innerWidth / 2) : window.innerWidth / 2;
    const y = e ? (e.clientY || window.innerHeight / 2) : window.innerHeight / 2;
    const randomWord = PRAISE_WORDS[Math.floor(Math.random() * PRAISE_WORDS.length)];
    spawnFloatingWord(randomWord, x, y);

    // 軽い効果音
    initAudioContext();
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];
    playTone(randomFreq, 0.2, "bell");

    // 花火発射
    fireworkParticles.push(...createFirework(x, y));
  }

  if (prayBtn) {
    prayBtn.addEventListener("click", triggerPray);
  }
  if (navPrayBtn) {
    navPrayBtn.addEventListener("click", triggerPray);
  }
}

function triggerFever() {
  // 全画面フィーバー花火
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const rx = window.innerWidth * (0.2 + Math.random() * 0.6);
      const ry = window.innerHeight * (0.2 + Math.random() * 0.5);
      fireworkParticles.push(...createFirework(rx, ry, 60));
      spawnFloatingWord("✨ 感謝フィーバー！！ ✨", rx, ry);
    }, i * 300);
  }
}

// 浮遊する文字演出
function spawnFloatingWord(text, x, y) {
  const span = document.createElement("span");
  span.className = "floating-word";
  span.textContent = text;
  span.style.left = `${x - 40 + (Math.random() * 80 - 40)}px`;
  span.style.top = `${y - 20}px`;
  document.body.appendChild(span);

  setTimeout(() => {
    span.remove();
  }, 1200);
}

// ==========================================================================
// 6. 感謝のおみくじ (神託みくじ)
// ==========================================================================
const OMIKUJI_RESULTS = [
  {
    title: "🌸 超大感謝吉（ちょうだいかんしゃきち）",
    text: "今日は宇宙すべての巡り合わせがあなたを祝福しています！朝起きて吸った新鮮な空気、手にした温かい飲み物に心からのありがとうを伝えましょう。奇跡が舞い込みます。"
  },
  {
    title: "💖 大感謝吉（だいかんしゃきち）",
    text: "あなたの周りにいる大切な人々との絆が深まる吉日。家族、友人、または日頃お世話になっている同僚へ、メッセージで『いつもありがとう』と送ってみてください。"
  },
  {
    title: "✨ 幸運感謝吉（こううんかんしゃきち）",
    text: "身の回りにある何気ない道具に目を向けてください。スマートフォン、靴、パソコン。あなたを支えてくれる物に『今日も助けてくれてありがとう』と微笑むと運気上昇！"
  },
  {
    title: "☀️ 感謝日和吉（かんしゃびよりきち）",
    text: "自分自身へのありがとうが最大の開運キー。今日まで毎日一生懸命歩んできた自分の身体と心に『よく頑張ってるね、ありがとう』と抱きしめてあげましょう。"
  },
  {
    title: "🕊️ 平穏感謝吉（へいおんかんしゃきち）",
    text: "あたりまえと思える今日という一日。その平穏こそがもっとも尊い恵みです。道端に咲く草花やすれ違う人々に、静かな感謝の祈りを捧げてみてください。"
  }
];

function setupOmikuji() {
  const btn = document.getElementById("btn-draw-omikuji");
  const titleEl = document.getElementById("omikuji-title");
  const textEl = document.getElementById("omikuji-text");

  if (!btn || !titleEl || !textEl) return;

  btn.addEventListener("click", () => {
    btn.disabled = true;
    titleEl.textContent = "🌸 神託を受信中... 🌸";
    textEl.textContent = "初代教皇の言霊があなたの元へ舞い降りています...";

    initAudioContext();
    playTone(440, 0.2, "bell");
    setTimeout(() => playTone(659.25, 0.2, "bell"), 150);
    setTimeout(() => playTone(880, 0.4, "bell"), 300);

    setTimeout(() => {
      const result = OMIKUJI_RESULTS[Math.floor(Math.random() * OMIKUJI_RESULTS.length)];
      titleEl.textContent = result.title;
      textEl.textContent = result.text;
      btn.disabled = false;

      // 祝砲花火
      const rect = btn.getBoundingClientRect();
      fireworkParticles.push(...createFirework(rect.left + rect.width / 2, rect.top, 40));
    }, 1200);
  });
}

// ==========================================================================
// 7. ありがとう教 デジタル信徒証ジェネレーター (Canvas)
// ==========================================================================
let logoImg = null;
let mascotImg = null;

function loadCertificateImages() {
  logoImg = new Image();
  logoImg.src = "logo.jpg";
  logoImg.onerror = () => {
    logoImg.src = "Gemini_Generated_Image_i8js5ui8js5ui8js.jpg";
  };

  mascotImg = new Image();
  mascotImg.src = "mascot.jpg";
  mascotImg.onerror = () => {
    mascotImg.src = "Gemini_Generated_Image_tmziawtmziawtmzi.jpg";
  };
}

function generateCertificate(name) {
  const canvas = document.getElementById("cert-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const width = 800;
  const height = 500;
  canvas.width = width;
  canvas.height = height;

  // 背景グラデーション (高級カード仕様)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, "#ffffff");
  bgGrad.addColorStop(0.5, "#fff5f7");
  bgGrad.addColorStop(1, "#ffe8ee");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // ゴールド装飾外枠
  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 6;
  ctx.strokeRect(16, 16, width - 32, height - 32);

  ctx.strokeStyle = "#ff6b8b";
  ctx.lineWidth = 2;
  ctx.strokeRect(24, 24, width - 48, height - 48);

  // 桜の装飾コーナー文様
  ctx.fillStyle = "rgba(255, 107, 139, 0.15)";
  ctx.beginPath();
  ctx.arc(40, 40, 60, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(width - 40, 40, 60, 0, Math.PI * 2);
  ctx.fill();

  // タイトル部
  ctx.textAlign = "center";
  ctx.fillStyle = "#1e3a8a";
  ctx.font = "bold 28px 'Shippori Mincho', serif";
  ctx.fillText("あ り が と う 教  信 徒 証", width / 2, 70);

  ctx.font = "bold 13px 'Zen Maru Gothic', sans-serif";
  ctx.fillStyle = "#ff6b8b";
  ctx.fillText("ARIGATO KYO OFFICIAL MEMBERSHIP CERTIFICATE", width / 2, 95);

  // 横ライン
  ctx.strokeStyle = "#ffd1dc";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(80, 110);
  ctx.lineTo(width - 80, 110);
  ctx.stroke();

  // ロゴ描画 (左上)
  if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(120, 200, 55, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(logoImg, 65, 145, 110, 110);
    ctx.restore();
    ctx.strokeStyle = "#ff6b8b";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(120, 200, 56, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 認定信徒 氏名
  ctx.textAlign = "left";
  ctx.fillStyle = "#64748b";
  ctx.font = "bold 14px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("認定信徒名", 205, 170);

  ctx.fillStyle = "#1e293b";
  ctx.font = "900 32px 'Zen Maru Gothic', sans-serif";
  ctx.fillText(`${name} 殿`, 205, 215);

  // 聖句
  ctx.fillStyle = "#475569";
  ctx.font = "italic 15px 'Shippori Mincho', serif";
  ctx.fillText("『すべてに、心からのありがとうを。』", 205, 260);

  // 教義証明メッセージ
  ctx.fillStyle = "#64748b";
  ctx.font = "13px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("貴殿は感謝の心を重んじ、世界にあたたかな光をもたらす", 205, 290);
  ctx.fillText("尊き信徒であることをここに公式に認定・証明いたします。", 205, 312);

  // キャラクター描画 (右下)
  if (mascotImg && mascotImg.complete && mascotImg.naturalWidth > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(680, 280, 85, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(mascotImg, 595, 195, 170, 170);
    ctx.restore();
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(680, 280, 86, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 下部情報 (シリアルナンバー、発行日、公印)
  const today = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const serial = "ARIGATO-" + Math.floor(100000 + Math.random() * 900000);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "12px 'Zen Maru Gothic', monospace";
  ctx.fillText(`証書番号: ${serial}`, 50, 440);
  ctx.fillText(`交付日: ${today} (起源: 2024.11.02 聖学院講堂)`, 50, 460);

  // 初代教皇の公印（朱印風）
  ctx.save();
  ctx.translate(width - 150, height - 75);
  ctx.strokeStyle = "#dc2626";
  ctx.fillStyle = "rgba(220, 38, 38, 0.08)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(-45, -45, 90, 90, 12);
  ctx.stroke();
  ctx.fill();

  ctx.textAlign = "center";
  ctx.fillStyle = "#dc2626";
  ctx.font = "bold 15px 'Shippori Mincho', serif";
  ctx.fillText("初代教皇", 0, -10);
  ctx.fillText("之印", 0, 18);
  ctx.restore();
}

function setupCertificate() {
  loadCertificateImages();

  const nameInput = document.getElementById("cert-name-input");
  const issueBtn = document.getElementById("btn-issue-cert");
  const downloadBtn = document.getElementById("btn-download-cert");

  // 初回プレビュー
  setTimeout(() => {
    generateCertificate("感謝の友");
  }, 600);

  if (issueBtn && nameInput) {
    issueBtn.addEventListener("click", () => {
      const name = nameInput.value.trim() || "感謝の信徒";
      generateCertificate(name);
      if (downloadBtn) downloadBtn.style.display = "inline-flex";

      // 祝砲花火
      const rect = issueBtn.getBoundingClientRect();
      fireworkParticles.push(...createFirework(rect.left + rect.width / 2, rect.top, 50));
      spawnFloatingWord("信徒認定完了！🌸", rect.left + rect.width / 2, rect.top);
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const canvas = document.getElementById("cert-canvas");
      if (!canvas) return;
      const link = document.createElement("a");
      link.download = `ありがとう教_信徒証_${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }
}

// ==========================================================================
// 8. 舞い散る桜の花びら Canvas アニメーション
// ==========================================================================
const SAKURA_COUNT = 30;
const sakuraPetals = [];

class SakuraPetal {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * this.w;
    this.y = initial ? Math.random() * this.h : -20;
    this.size = 8 + Math.random() * 12;
    this.speedY = 1 + Math.random() * 1.8;
    this.speedX = Math.random() * 1.5 - 0.5;
    this.angle = Math.random() * Math.PI * 2;
    this.angularSpeed = (Math.random() - 0.5) * 0.03;
    this.flip = Math.random() * Math.PI;
    this.flipSpeed = 0.02 + Math.random() * 0.03;
    this.alpha = 0.5 + Math.random() * 0.4;
  }

  update() {
    this.y += this.speedY;
    this.x += Math.sin(this.angle) * 0.8 + this.speedX;
    this.angle += this.angularSpeed;
    this.flip += this.flipSpeed;

    if (this.y > this.h + 20 || this.x > this.w + 20 || this.x < -20) {
      this.reset();
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.scale(1, Math.sin(this.flip));

    ctx.fillStyle = `rgba(255, 182, 193, ${this.alpha})`;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size / 2, -this.size, 0, -this.size * 1.3);
    ctx.bezierCurveTo(this.size / 2, -this.size, this.size / 2, -this.size / 2, 0, 0);
    ctx.fill();

    ctx.restore();
  }
}

function initSakuraCanvas() {
  const canvas = document.getElementById("sakura-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < SAKURA_COUNT; i++) {
    sakuraPetals.push(new SakuraPetal(canvas.width, canvas.height));
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sakuraPetals.forEach(petal => {
      petal.update();
      petal.draw(ctx);
    });
    requestAnimationFrame(loop);
  }
  loop();
}

// ==========================================================================
// 9. 花火・感謝パーティクル Canvas
// ==========================================================================
const fireworkParticles = [];

function createFirework(x, y, count = 25) {
  const colors = ["#ff5e7e", "#f59e0b", "#3b82f6", "#10b981", "#ec4899", "#fbbf24"];
  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      size: 3 + Math.random() * 4,
      gravity: 0.12,
      decay: 0.02 + Math.random() * 0.02
    });
  }
  return particles;
}

function initFireworkCanvas() {
  const canvas = document.getElementById("firework-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = fireworkParticles.length - 1; i >= 0; i--) {
      const p = fireworkParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        fireworkParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(loop);
  }
  loop();
}

// ==========================================================================
// 10. 全体初期化 & イベントリスナー
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 桜吹雪 & 花火
  initSakuraCanvas();
  initFireworkCanvas();

  // 世界のありがとうAtlas
  renderAtlas();
  setupAtlasFilters();

  // 讃歌 & 鍵盤
  setupKeyboard();
  const playBtn = document.getElementById("btn-play-hymn");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      if (isHymnPlaying) {
        stopHymn();
      } else {
        startHymn();
      }
    });
  }
  const headerAudioBtn = document.getElementById("audio-toggle-btn");
  if (headerAudioBtn) {
    headerAudioBtn.addEventListener("click", () => {
      if (isHymnPlaying) {
        stopHymn();
      } else {
        startHymn();
      }
    });
  }
  const instSelect = document.getElementById("hymn-instrument");
  if (instSelect) {
    instSelect.addEventListener("change", (e) => {
      currentInstrument = e.target.value;
    });
  }

  // カウンター & おみくじ & 信徒証
  setupCounter();
  setupOmikuji();
  setupCertificate();

  // FAQ アコーディオン
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      item.classList.toggle("active");
    });
  });

  // ダークモード切り替え
  const themeBtn = document.getElementById("theme-toggle-btn");
  const isDark = localStorage.getItem("arigato_dark") === "true";
  if (isDark) {
    document.body.classList.add("dark-mode");
    if (themeBtn) themeBtn.textContent = "☀️";
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const activeDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("arigato_dark", activeDark);
      themeBtn.textContent = activeDark ? "☀️" : "🌙";
    });
  }

  // モバイルメニュー
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
    // メニュー項目クリックで自動で閉じる
    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => navMenu.classList.remove("open"));
    });
  }

  // ヘッダースクロール追従エフェクト
  const siteHeader = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add("scrolled");
    } else {
      siteHeader?.classList.remove("scrolled");
    }
  });
});
