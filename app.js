// BAR Sales Target & Performance Management System Logic
// Year is fixed to 2026 as per local date 2026-07-15

const CURRENT_YEAR = 2026;

// LocalStorage Keys
const STORAGE_KEY_SETTINGS = 'ryomakan_portal_settings';
const STORAGE_KEY_DAILY_DATA = 'ryomakan_portal_daily_data';
const STORAGE_KEY_TASKS = 'ryomakan_portal_tasks';
const STORAGE_KEY_MENU = 'ryomakan_portal_menu_items';
const STORAGE_KEY_CLOUD_URL = 'ryomakan_portal_cloud_url';
const STORAGE_KEY_EQUIPMENT = 'ryomakan_portal_equipment';

// Default Cafe & Bar Menu items based on the provided image
const defaultMenu = {
  plans: [
    { id: 'p1', name: 'ライト', price: '¥1,500', features: ['2ドリンク', '2H遊び放題'], desc: 'ちょい飲み遊びに最適なプラン！', theme: 'pink' },
    { id: 'p2', name: 'スタンダード', price: '¥2,500', features: ['2H飲み放題', '2H遊び放題', 'お菓子掴みどり'], desc: 'ちょうどよく遊べる人気のプラン！', theme: 'cyan' },
    { id: 'p3', name: 'プレミアム', price: '¥3,500', features: ['2H飲み放題', '2H遊び放題', 'お菓子掴みどり', '2Hショット飲み放題'], desc: 'リッチに遊べる豪華プラン！', theme: 'yellow' }
  ],
  items: [
    // DRINK - Highball
    { id: 'm1', name: '知多ハイボール', price: '-1200', category: 'drink_highball' },
    { id: 'm2', name: 'AOハイボール', price: '-1200', category: 'drink_highball' },
    { id: 'm3', name: 'Makers Mark', price: '-800', category: 'drink_highball' },
    
    // DRINK - Shot
    { id: 'm4', name: 'テキーラ', price: '-500', category: 'drink_shot' },
    { id: 'm5', name: 'コカレロ', price: '-500', category: 'drink_shot' },
    { id: 'm6', name: 'クライナー', price: '-500', category: 'drink_shot' },
    
    // FOOD - Fry
    { id: 'm7', name: 'からあげ', price: '-580', category: 'food_fry' },
    { id: 'm8', name: 'ポテトフライ', price: '-420', category: 'food_fry' },
    { id: 'm9', name: 'フランクフルト', price: '-400', category: 'food_fry' },
    { id: 'm10', name: 'お菓子掴み取り', price: '-500', category: 'food_fry' },
    
    // FOOD - Dessert
    { id: 'm11', name: 'バニラアイス', price: '-700', category: 'food_dessert' },
    
    // FOOD - Otsumami
    { id: 'm12', name: 'ピスタチオ', price: '', category: 'food_otsumami' },
    { id: 'm13', name: 'クリームチーズクラッカー', price: '', category: 'food_otsumami' },
    { id: 'm14', name: 'ナチョス', price: '', category: 'food_otsumami' },
    { id: 'm15', name: 'ハイカカオチョコレート', price: '', category: 'food_otsumami' },
    { id: 'm16', name: 'オリーブのマリネ', price: '', category: 'food_otsumami' },
    { id: 'm17', name: 'ミックスナッツ', price: '', category: 'food_otsumami' },
    { id: 'm18', name: 'ポテトチップス', price: '', category: 'food_otsumami' },
    
    // PLAY - Chinchiro
    { id: 'm19', name: 'ゾロ目', price: '1杯無料', category: 'play_chinchiro' },
    { id: 'm20', name: '合計が偶数', price: '1杯半額', category: 'play_chinchiro' },
    { id: 'm21', name: '合計が奇数', price: '倍量倍額', category: 'play_chinchiro' },
    
    // PLAY - Punishment
    { id: 'm22', name: 'クライナーセット (クライナー×3)', price: '- 1200', category: 'play_punishment' },
    { id: 'm23', name: 'クライナーセット (クライナー×5)', price: '- 2100', category: 'play_punishment' },
    { id: 'm24', name: 'テキーラセット (テキーラ×3)', price: '- 1200', category: 'play_punishment' },
    { id: 'm25', name: 'テキーラセット (テキーラ×5)', price: '- 2100', category: 'play_punishment' }
  ]
};

const defaultEquipment = [
  // リキュール
  { id: 'eq1', name: 'カシス', category: 'リキュール', qty: 1 },
  { id: 'eq2', name: 'ジントニック', category: 'リキュール', qty: 1 },
  { id: 'eq3', name: '巨峰', category: 'リキュール', qty: 1 },
  { id: 'eq4', name: 'トマト', category: 'リキュール', qty: 3 },
  { id: 'eq5', name: 'シークワーサー', category: 'リキュール', qty: 3 },
  { id: 'eq6', name: 'グレープフルーツ', category: 'リキュール', qty: 2 },
  { id: 'eq7', name: 'ゆず', category: 'リキュール', qty: 2 },
  { id: 'eq8', name: 'ホワイトサワー', category: 'リキュール', qty: 2 },
  { id: 'eq9', name: 'モヒート', category: 'リキュール', qty: 3 },
  { id: 'eq10', name: 'ピーチ', category: 'リキュール', qty: 0 },
  { id: 'eq11', name: 'レモンサワー', category: 'リキュール', qty: 0 },
  { id: 'eq12', name: '紀行梅酒', category: 'リキュール', qty: 0 },
  { id: 'eq13', name: 'SUI', category: 'リキュール', qty: 4 },
  { id: 'eq14', name: '大隅麦焼酎', category: 'リキュール', qty: 0 },
  { id: 'eq15', name: 'マンゴヤン', category: 'リキュール', qty: 1 },
  { id: 'eq16', name: 'マリブ', category: 'リキュール', qty: 2 },
  { id: 'eq17', name: 'カルーア', category: 'リキュール', qty: 2 },
  { id: 'eq18', name: 'PARAISO', category: 'リキュール', qty: 1 },
  { id: 'eq19', name: 'カンパリ', category: 'リキュール', qty: 2 },
  { id: 'eq20', name: 'コカレロ', category: 'リキュール', qty: 2 },
  { id: 'eq21', name: 'ビーファーター', category: 'リキュール', qty: 2 },
  { id: 'eq22', name: 'ビーファーターいちご', category: 'リキュール', qty: 3 },
  // シロップ
  { id: 'eq23', name: 'パイン', category: 'シロップ', qty: 5 },
  { id: 'eq24', name: 'ライム', category: 'シロップ', qty: 4 },
  { id: 'eq25', name: 'レモン', category: 'シロップ', qty: 4 },
  { id: 'eq26', name: 'ブルー', category: 'シロップ', qty: 4 },
  { id: 'eq27', name: 'カシス', category: 'シロップ', qty: 1 },
  { id: 'eq28', name: 'ザクロ', category: 'シロップ', qty: 4 },
  // ジュース
  { id: 'eq29', name: 'コーラ', category: 'ジュース', qty: 32 },
  { id: 'eq30', name: 'ジンジャー', category: 'ジュース', qty: 36 },
  { id: 'eq31', name: 'オレンジ', category: 'ジュース', qty: 2 },
  { id: 'eq32', name: 'アップル', category: 'ジュース', qty: 2 },
  { id: 'eq33', name: 'ウーロン', category: 'ジュース', qty: 0 },
  { id: 'eq34', name: '牛乳', category: 'ジュース', qty: 1 },
  // ビール
  { id: 'eq35', name: 'ビール樽', category: 'ビール', qty: 0 },
  { id: 'eq36', name: '生ビール', category: 'ビール', qty: 0 },
  { id: 'eq37', name: 'ノンアルビール', category: 'ビール', qty: 0 },
  { id: 'eq38', name: 'のどごし生', category: 'ビール', qty: 24 },
  // ウイスキー
  { id: 'eq39', name: '角', category: 'ウイスキー', qty: 1 },
  { id: 'eq40', name: 'ジムビーム', category: 'ウイスキー', qty: 1 },
  { id: 'eq41', name: '知多', category: 'ウイスキー', qty: 4 },
  { id: 'eq42', name: 'AO', category: 'ウイスキー', qty: 2 },
  { id: 'eq43', name: 'メーカーズマーク', category: 'ウイスキー', qty: 1 },
  // クライナー
  { id: 'eq44', name: 'クライナー オリジナル', category: 'クライナー', qty: 0 },
  // ウォッカ
  { id: 'eq45', name: 'スミノフ', category: 'ウォッカ', qty: 2 },
  { id: 'eq46', name: 'SKYY', category: 'ウォッカ', qty: 2 },
  // スピリッツ
  { id: 'eq47', name: 'SUI翠', category: 'スピリッツ', qty: 3 },
  // テキーラ
  { id: 'eq48', name: 'サウザーシルバー', category: 'テキーラ', qty: 2 },
  { id: 'eq49', name: 'サウザーゴールド', category: 'テキーラ', qty: 1 }
];

// Default Settings
const defaultSettings = {
  monthlyTargets: {
    7: 700000,
    8: 850000,
    9: 1000000,
    10: 1200000,
    11: 1300000,
    12: 1500000
  },
  weeklyTargetBase: 210000, // Weekly target for July
  weekdayTargets: {
    1: 60000,  // Mon (Event)
    2: 0,      // Tue (Closed/0)
    3: 15000,  // Wed (Regular)
    4: 0,      // Thu (Closed/0)
    5: 60000,  // Fri (Event)
    6: 60000,  // Sat (Event - standard)
    0: 15000   // Sun (Regular)
  },
  satBeerGardenJulyTarget: 70000, // July Saturday target
  calcMode: 'proportional' // 'proportional' or 'absolute'
};

// Default Tasks for Demo
const defaultTasks = [
  { id: 't1', name: 'インスタで毎週土曜ビアガーデン告知', category: 'インスタ', assignee: ['なな'], deadline: '2026-07-18', notes: 'リール動画で雰囲気をアピールする', completed: false },
  { id: 't2', name: 'ビアガーデン用食材の買い出し', category: 'イベント', assignee: ['たいよう'], deadline: '2026-07-18', notes: 'ビール、おつまみ、氷の追加手配', completed: false },
  { id: 't3', name: 'メニュー表の更新（夏のおすすめドリンク）', category: '通常営業', assignee: ['れんれん'], deadline: '2026-07-20', notes: 'フローズンカクテルを追加', completed: false },
  { id: 't4', name: '中旬の売上集計と報告', category: '全体', assignee: ['ながいさん'], deadline: '2026-07-15', notes: 'オーナーへの中間報告資料作成', completed: false },
  { id: 't5', name: '店内エアコンのフィルター清掃', category: '全体', assignee: ['そーちゃん'], deadline: '2026-07-16', notes: '営業開始前に実施すること', completed: false }
];

// Application State
let appSettings = {};
let dailyData = {}; // Keyed by YYYY-MM-DD
let tasks = []; // Array of task objects
let menuData = {}; // Cafe & Bar Menu items list
let equipment = []; // Cafe & Bar Equipment & Stock list
let cloudUrl = ''; // Google Sheets (GAS Web App) Sync API URL
let activeMonth = 7; // Current active month (July)
let activeTab = 'dashboard';
let selectedDateStr = ''; // YYYY-MM-DD format

// Charts references
let cumulativeTrendChart = null;
let monthlyComparisonChart = null;
let weekdayPerformanceChart = null;

// Theme Helper Functions
function setTheme(theme, triggerRender = true) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    if (theme === 'light') {
      btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      btn.title = 'ダークモードへ切り替え';
    } else {
      btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      btn.title = 'ライトモードへ切り替え';
    }
  }
  if (triggerRender && typeof renderApp === 'function' && selectedDateStr) {
    renderApp();
  }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme, false);

  loadData();
  setupEventListeners();
  updateClock();
  setInterval(updateClock, 10000);
  
  // Set global select to current month (July as per local time, local time is July 15)
  const today = new Date();
  const currentLocalMonth = today.getMonth() + 1; // 7
  activeMonth = (currentLocalMonth >= 7 && currentLocalMonth <= 12) ? currentLocalMonth : 7;
  document.getElementById('global-month-select').value = activeMonth;

  // Set default selected date for detail panel to today or first day of active month
  const todayStr = formatDate(today);
  const isTodayInActiveMonth = today.getMonth() + 1 === activeMonth;
  selectedDateStr = isTodayInActiveMonth ? todayStr : `${CURRENT_YEAR}-${String(activeMonth).padStart(2, '0')}-01`;
  
  // Set deadline input minimum/default to today in task form
  document.getElementById('task-deadline').value = todayStr;

  renderApp();

  // If cloud URL exists, trigger async fetch to sync from Google Sheets
  if (cloudUrl) {
    await fetchFromCloud();
    renderApp();
  }
});

// Load settings, daily data, and tasks from local storage
function loadData() {
  const savedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
  if (savedSettings) {
    appSettings = JSON.parse(savedSettings);
    appSettings = { ...defaultSettings, ...appSettings };
  } else {
    appSettings = JSON.parse(JSON.stringify(defaultSettings));
  }

  const savedDailyData = localStorage.getItem(STORAGE_KEY_DAILY_DATA);
  if (savedDailyData) {
    dailyData = JSON.parse(savedDailyData);
  } else {
    dailyData = {};
  }

  // Clear simulated July data and load user-specified real July data (Run once)
  const JULY_INIT_KEY = 'ryomakan_portal_july_real_init_v2';
  if (!localStorage.getItem(JULY_INIT_KEY)) {
    // Clear July 2026 dates
    const julyDates = getDatesInMonth(7);
    julyDates.forEach(date => {
      const dateStr = formatDate(date);
      delete dailyData[dateStr];
    });

    // Populate user inputs for July
    dailyData["2026-07-03"] = { actualSales: 68700, customers: 25, event: "みやまきプチ同窓会", shifts: [], memo: "" };
    dailyData["2026-07-06"] = { actualSales: 94000, customers: 30, event: "学生社会人交流会", shifts: [], memo: "" };
    dailyData["2026-07-08"] = { actualSales: 1300, customers: 3, event: "通常営業", shifts: [], memo: "" };
    dailyData["2026-07-10"] = { actualSales: 14880, customers: 7, event: "イベント日", shifts: [], memo: "" };
    dailyData["2026-07-11"] = { actualSales: 48800, customers: 30, event: "ビアガーデン", shifts: [], memo: "" };
    dailyData["2026-07-12"] = { actualSales: 800, customers: 1, event: "通常営業", shifts: [], memo: "" };

    localStorage.setItem(STORAGE_KEY_DAILY_DATA, JSON.stringify(dailyData));
    localStorage.setItem(JULY_INIT_KEY, 'true');
  }

  const savedTasks = localStorage.getItem(STORAGE_KEY_TASKS);
  if (savedTasks) {
    tasks = JSON.parse(savedTasks).map(t => ({
      ...t,
      assignee: Array.isArray(t.assignee) ? t.assignee : (t.assignee ? [t.assignee] : [])
    }));
  } else {
    tasks = JSON.parse(JSON.stringify(defaultTasks));
  }

  const savedMenu = localStorage.getItem(STORAGE_KEY_MENU);
  if (savedMenu) {
    menuData = JSON.parse(savedMenu);
  } else {
    menuData = JSON.parse(JSON.stringify(defaultMenu));
  }

  const savedEquipment = localStorage.getItem(STORAGE_KEY_EQUIPMENT);
  if (savedEquipment) {
    equipment = JSON.parse(savedEquipment).map(item => ({
      ...item,
      updatedAt: item.updatedAt || '2026-07-05'
    }));
  } else {
    equipment = defaultEquipment.map(item => ({
      ...item,
      updatedAt: '2026-07-05'
    }));
  }

  cloudUrl = localStorage.getItem(STORAGE_KEY_CLOUD_URL) || 'https://script.google.com/macros/s/AKfycbwapXUGoq-kv12IUbM4BD1wqvs_CGaoaYGG8K12Pj55GTdhgGYPahMTNEMGYcxY7UGkmA/exec';

  populateSettingsForm();
}

// Populate UI form inputs in Settings Tab
function populateSettingsForm() {
  for (let m = 7; m <= 12; m++) {
    const input = document.getElementById(`target-m${m}`);
    if (input) input.value = appSettings.monthlyTargets[m];
  }
  
  document.getElementById('target-week-base').value = appSettings.weeklyTargetBase;

  const radios = document.getElementsByName('calc-mode');
  radios.forEach(radio => {
    if (radio.value === appSettings.calcMode) {
      radio.checked = true;
    }
  });

  for (let d = 0; d < 7; d++) {
    const dayKey = d === 0 ? 'sun' : d === 1 ? 'mon' : d === 2 ? 'tue' : d === 3 ? 'wed' : d === 4 ? 'thu' : d === 5 ? 'fri' : 'sat';
    const input = document.getElementById(`def-${dayKey}`);
    if (input) input.value = appSettings.weekdayTargets[d];
  }

  const urlInput = document.getElementById('settings-cloud-url');
  if (urlInput) {
    urlInput.value = cloudUrl;
  }
  updateCloudStatusUI();
}

// Save data to localStorage
function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(appSettings));
  localStorage.setItem(STORAGE_KEY_DAILY_DATA, JSON.stringify(dailyData));
  localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
  localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(menuData));
  localStorage.setItem(STORAGE_KEY_EQUIPMENT, JSON.stringify(equipment));
  
  // Asynchronously trigger cloud upload if cloud sync is configured
  if (cloudUrl) {
    uploadToCloud();
  }
}

// Update clock in sidebar
function updateClock() {
  const clockEl = document.getElementById('system-time');
  if (clockEl) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clockEl.textContent = `${year}/${month}/${day} ${hours}:${minutes}`;
  }
}

// Set up UI event handlers
function setupEventListeners() {
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      menuItems.forEach(i => i.classList.remove('active'));
      const clickedBtn = e.currentTarget;
      clickedBtn.classList.add('active');

      const btnId = clickedBtn.id;
      document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));

      const titleEl = document.getElementById('page-title');
      if (btnId === 'nav-dashboard') {
        activeTab = 'dashboard';
        document.getElementById('section-dashboard').classList.add('active');
        titleEl.textContent = 'ダッシュボード';
        titleEl.className = 'neon-title-cyan';
        document.getElementById('page-subtitle').textContent = '全体の目標達成状況と売上トレンド';
      } else if (btnId === 'nav-sheet') {
        activeTab = 'sheet';
        document.getElementById('section-sheet').classList.add('active');
        titleEl.textContent = '月別実績入力';
        titleEl.className = 'neon-title-pink';
        document.getElementById('page-subtitle').textContent = '日々の売上・客数とイベント成果 of 入力';
      } else if (btnId === 'nav-tasks') {
        activeTab = 'tasks';
        document.getElementById('section-tasks').classList.add('active');
        titleEl.textContent = 'タスク管理';
        titleEl.className = 'neon-title-cyan';
        document.getElementById('page-subtitle').textContent = 'やることリストの登録、担当・分類の整理';
      } else if (btnId === 'nav-menu') {
        activeTab = 'menu';
        document.getElementById('section-menu').classList.add('active');
        titleEl.textContent = 'メニュー一覧';
        titleEl.className = 'neon-title-pink';
        document.getElementById('page-subtitle').textContent = 'Cafe & Bar 龍馬館 の料金プラン・単品メニュー';
      } else if (btnId === 'nav-equipment') {
        activeTab = 'equipment';
        document.getElementById('section-equipment').classList.add('active');
        titleEl.textContent = '備品・在庫管理';
        titleEl.className = 'neon-title-cyan';
        document.getElementById('page-subtitle').textContent = '商品在庫・備品数量の確認と増減・管理';
      } else if (btnId === 'nav-analytics') {
        activeTab = 'analytics';
        document.getElementById('section-analytics').classList.add('active');
        titleEl.textContent = '曜日・客数分析';
        titleEl.className = 'neon-title-cyan';
        document.getElementById('page-subtitle').textContent = '曜日別のパフォーマンスと客単価の傾向';
      } else if (btnId === 'nav-settings') {
        activeTab = 'settings';
        document.getElementById('section-settings').classList.add('active');
        titleEl.textContent = 'システム設定';
        titleEl.className = 'neon-title-purple';
        document.getElementById('page-subtitle').textContent = '月間目標値、基本ルール、計算モードの設定';
      }
      renderApp();
    });
  });

  // Menu Edit Mode Toggle
  const editToggle = document.getElementById('menu-edit-mode-toggle');
  if (editToggle) {
    editToggle.addEventListener('change', (e) => {
      const isEditMode = e.target.checked;
      document.getElementById('menu-add-form-container').style.display = isEditMode ? 'block' : 'none';
      renderMenuTab();
    });
  }

  // Menu Item Creation Submit
  const menuForm = document.getElementById('menu-item-form');
  if (menuForm) {
    menuForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addNewMenuItem();
    });
  }

  // Global Month Selector
  const monthSelect = document.getElementById('global-month-select');
  monthSelect.addEventListener('change', (e) => {
    activeMonth = parseInt(e.target.value);
    
    // Auto-update selectedDateStr to first of selected month to avoid mismatch
    selectedDateStr = `${CURRENT_YEAR}-${String(activeMonth).padStart(2, '0')}-01`;
    
    renderApp();
  });

  // Quick Save Button in Header
  document.getElementById('quick-save-btn').addEventListener('click', () => {
    saveDailyDataFromTable();
    saveToLocalStorage();
    showToast('データを保存しました！');
    renderApp();
  });

  // Theme Toggle Button in Header
  document.getElementById('theme-toggle-btn').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // Apply Settings Button
  document.getElementById('apply-settings-btn').addEventListener('click', () => {
    for (let m = 7; m <= 12; m++) {
      appSettings.monthlyTargets[m] = parseInt(document.getElementById(`target-m${m}`).value) || 0;
    }

    appSettings.weeklyTargetBase = parseInt(document.getElementById('target-week-base').value) || 0;

    const radios = document.getElementsByName('calc-mode');
    radios.forEach(radio => {
      if (radio.checked) {
        appSettings.calcMode = radio.value;
      }
    });

    for (let d = 0; d < 7; d++) {
      const dayKey = d === 0 ? 'sun' : d === 1 ? 'mon' : d === 2 ? 'tue' : d === 3 ? 'wed' : d === 4 ? 'thu' : d === 5 ? 'fri' : 'sat';
      appSettings.weekdayTargets[d] = parseInt(document.getElementById(`def-${dayKey}`).value) || 0;
    }

    saveToLocalStorage();
    showToast('システム設定を更新し、目標値を再計算しました！');
    renderApp();
  });

  // Export Data Button
  document.getElementById('export-data-btn').addEventListener('click', () => {
    const exportObj = {
      settings: appSettings,
      dailyData: dailyData,
      tasks: tasks,
      menu: menuData
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ryomakan_portal_data_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('データをJSON形式で書き出しました。');
  });

  // Import Data Button logic
  document.getElementById('import-file-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.settings && imported.dailyData) {
          appSettings = imported.settings;
          dailyData = imported.dailyData;
          tasks = (imported.tasks || []).map(t => ({
            ...t,
            assignee: Array.isArray(t.assignee) ? t.assignee : (t.assignee ? [t.assignee] : [])
          }));
          menuData = imported.menu || defaultMenu;
          saveToLocalStorage();
          populateSettingsForm();
          showToast('データを正常に取り込みました！', 'success');
          renderApp();
        } else {
          showToast('インポートファイルの形式が正しくありません。', 'danger');
        }
      } catch (err) {
        showToast('JSONファイルの読み込みに失敗しました。', 'danger');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // clear input
  });

  // Connection Test Button
  document.getElementById('test-cloud-btn').addEventListener('click', async () => {
    const inputUrl = document.getElementById('settings-cloud-url').value.trim();
    if (!inputUrl) {
      localStorage.removeItem(STORAGE_KEY_CLOUD_URL);
      cloudUrl = '';
      updateCloudStatusUI();
      showToast('スプレッドシート連携を解除しました。', 'danger');
      return;
    }

    showToast('スプレッドシートへ接続テスト中...', 'success');
    const success = await testCloudConnection(inputUrl);
    if (success) {
      localStorage.setItem(STORAGE_KEY_CLOUD_URL, inputUrl);
      cloudUrl = inputUrl;
      showToast('スプレッドシート連携に成功しました！', 'success');
      updateCloudStatusUI();
      await fetchFromCloud();
      renderApp();
    } else {
      showToast('接続に失敗しました。URLが正しいか、Google Apps Scriptの設定が「全員(Anyone)」になっているか確認してください。', 'danger');
    }
  });

  // Copy GAS Code Button
  document.getElementById('copy-gas-code-btn').addEventListener('click', () => {
    const codeArea = document.getElementById('gas-script-box');
    codeArea.select();
    document.execCommand('copy');
    showToast('GASコードをクリップボードにコピーしました！');
  });

  // Reset All Button
  document.getElementById('reset-all-btn').addEventListener('click', () => {
    if (confirm('すべての入力データと設定を消去して初期状態に戻しますか？この操作は取り消せません。')) {
      localStorage.removeItem(STORAGE_KEY_SETTINGS);
      localStorage.removeItem(STORAGE_KEY_DAILY_DATA);
      localStorage.removeItem(STORAGE_KEY_TASKS);
      localStorage.removeItem(STORAGE_KEY_MENU);
      localStorage.removeItem(STORAGE_KEY_EQUIPMENT);
      loadData();
      showToast('データを初期化しました。', 'danger');
      renderApp();
    }
  });

  // Fill Dummy Data Button
  document.getElementById('fill-dummy-btn').addEventListener('click', () => {
    generateDummyDataForActiveMonth();
    showToast(`${activeMonth}月のデモ用実績データを自動生成しました！`);
    renderApp();
  });

  // Daily Detail Panel Save Button
  document.getElementById('save-detail-btn').addEventListener('click', () => {
    saveDailyDetailFromPanel();
    saveToLocalStorage();
    showToast(`${selectedDateStr} の詳細・シフト情報を保存しました！`);
    renderApp();
  });

  // Task Creation Form Submit
  document.getElementById('task-creation-form').addEventListener('submit', (e) => {
    e.preventDefault();
    addNewTask();
  });

  // Task Filters Event Handlers
  document.getElementById('filter-category').addEventListener('change', renderTasksTab);
  document.getElementById('filter-assignee').addEventListener('change', renderTasksTab);
  document.getElementById('filter-status').addEventListener('change', renderTasksTab);

  // Equipment Event Handlers
  const eqForm = document.getElementById('equipment-add-form');
  if (eqForm) {
    eqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addNewEquipmentItem();
    });
  }

  const eqSearch = document.getElementById('equipment-search');
  if (eqSearch) {
    eqSearch.addEventListener('input', () => {
      renderEquipmentTab();
    });
  }

  const eqFilter = document.getElementById('equipment-filter-cat');
  if (eqFilter) {
    eqFilter.addEventListener('change', () => {
      renderEquipmentTab();
    });
  }
}

// Show toast alert
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.className = 'toast';
  if (type === 'danger') {
    toast.classList.add('danger');
  }
  toast.querySelector('.toast-message').textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Generate all dates in a month for CURRENT_YEAR
function getDatesInMonth(monthNum) {
  const dates = [];
  const date = new Date(CURRENT_YEAR, monthNum - 1, 1);
  while (date.getMonth() === monthNum - 1) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
}

// Calculate targets for each day in a specific month
function getDailyTargetsForMonth(monthNum) {
  const dates = getDatesInMonth(monthNum);
  const monthTarget = appSettings.monthlyTargets[monthNum] || 0;
  const julyTarget = appSettings.monthlyTargets[7] || 700000;
  const monthRatio = monthTarget / julyTarget;

  const rawDays = dates.map(date => {
    const dayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon...
    const dateStr = formatDate(date);
    
    let eventName = '';
    if (dailyData[dateStr] && dailyData[dateStr].event !== undefined) {
      eventName = dailyData[dateStr].event;
    } else {
      if (monthNum === 7 && dayOfWeek === 6) {
        eventName = 'ビアガーデン';
      } else if (dayOfWeek === 1 || dayOfWeek === 5 || dayOfWeek === 6) {
        eventName = 'イベント日';
      } else if (dayOfWeek === 3 || dayOfWeek === 0) {
        eventName = '通常営業';
      } else {
        eventName = '定休日';
      }
    }

    let rawBase = 0;
    if (monthNum === 7 && dayOfWeek === 6) {
      rawBase = appSettings.satBeerGardenJulyTarget; // 70k for Saturday in July
    } else {
      rawBase = appSettings.weekdayTargets[dayOfWeek];
    }

    return {
      date,
      dateStr,
      dayOfWeek,
      eventName,
      rawBase
    };
  });

  if (appSettings.calcMode === 'proportional') {
    const totalRawBase = rawDays.reduce((sum, d) => sum + d.rawBase, 0);
    const scaleFactor = totalRawBase > 0 ? monthTarget / totalRawBase : 0;
    
    return rawDays.map(d => {
      const target = Math.round((d.rawBase * scaleFactor) / 100) * 100;
      return {
        ...d,
        target
      };
    });
  } else {
    return rawDays.map(d => {
      const target = Math.round((d.rawBase * monthRatio) / 100) * 100;
      return {
        ...d,
        target
      };
    });
  }
}

// Get scaled weekly target for the month
function getWeeklyTargetForMonth(monthNum) {
  const monthTarget = appSettings.monthlyTargets[monthNum] || 0;
  const julyTarget = appSettings.monthlyTargets[7] || 700000;
  const ratio = monthTarget / julyTarget;
  return Math.round(appSettings.weeklyTargetBase * ratio);
}

// Format Date object to YYYY-MM-DD
function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Format Date object to MM/DD
function formatDateShort(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${m}/${d}`;
}

// Format currency
function formatYen(val) {
  if (val === 0) return '休み';
  return '¥' + Number(val).toLocaleString('ja-JP');
}

// Get day of week string in Japanese
function getDayJp(dayOfWeek) {
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return days[dayOfWeek];
}

// Get day of week class for badges
function getDayClass(dayOfWeek) {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return 'day-' + days[dayOfWeek];
}

// Save inputs from Sheet Table back to local dailyData state
function saveDailyDataFromTable() {
  if (activeTab !== 'sheet') return;
  
  const rows = document.querySelectorAll('#sales-table-body tr');
  rows.forEach(row => {
    if (row.classList.contains('weekly-total-row')) return;

    const dateStr = row.getAttribute('data-date');
    if (!dateStr) return;

    const eventInput = row.querySelector('.input-event');
    const salesInput = row.querySelector('.input-actual-sales');
    const customersInput = row.querySelector('.input-actual-customers');
    const memoInput = row.querySelector('.input-memo');

    if (!dailyData[dateStr]) {
      dailyData[dateStr] = {};
    }

    dailyData[dateStr].event = eventInput ? eventInput.value : '';
    dailyData[dateStr].actualSales = salesInput ? (parseInt(salesInput.value) || 0) : 0;
    dailyData[dateStr].customers = customersInput ? (parseInt(customersInput.value) || 0) : 0;
    dailyData[dateStr].memo = memoInput ? memoInput.value : '';
  });
}

// Generate Demo/Dummy data for testing analytics
function generateDummyDataForActiveMonth() {
  const dailyTargets = getDailyTargetsForMonth(activeMonth);

  dailyTargets.forEach(d => {
    const isClosed = d.dayOfWeek === 2 || d.dayOfWeek === 4; // Tue, Thu
    
    let actualSales = 0;
    let customers = 0;
    let memo = '';
    let shifts = [];

    if (!isClosed && d.target > 0) {
      const variance = 0.8 + Math.random() * 0.45;
      actualSales = Math.round((d.target * variance) / 100) * 100;

      const avgSpend = 3000 + Math.floor(Math.random() * 2500);
      customers = Math.max(1, Math.round(actualSales / avgSpend));

      // Generate shifts
      const staffList = ['たいよう', 'なな', 'れんれん'];
      const numStaff = 1 + Math.floor(Math.random() * 2); // 1 or 2 staff
      for (let s = 0; s < numStaff; s++) {
        const randStaff = staffList[Math.floor(Math.random() * staffList.length)];
        if (!shifts.includes(randStaff)) {
          shifts.push(randStaff);
        }
      }

      if (Math.random() > 0.7) {
        if (d.eventName.includes('ビアガーデン')) {
          memo = 'ビアガーデン盛況、満席時間帯あり';
        } else if (d.eventName.includes('イベント')) {
          memo = '週末イベント賑わう';
        } else {
          memo = '常連客メインで安定';
        }
      }
    } else {
      if (Math.random() > 0.95) {
        actualSales = 12000;
        customers = 3;
        shifts = ['たいよう'];
        memo = '特別予約営業';
      }
    }

    dailyData[d.dateStr] = {
      ...dailyData[d.dateStr],
      event: d.eventName,
      actualSales,
      customers,
      shifts,
      memo
    };
  });

  saveToLocalStorage();
}

// Master Render Function
function renderApp() {
  const dailyTargets = getDailyTargetsForMonth(activeMonth);
  const weeklyTarget = getWeeklyTargetForMonth(activeMonth);

  // Compute month totals
  let totalTarget = 0;
  let totalActual = 0;
  let totalCustomers = 0;
  let activeDaysCount = 0;

  dailyTargets.forEach(d => {
    totalTarget += d.target;
    const actual = dailyData[d.dateStr] ? (dailyData[d.dateStr].actualSales || 0) : 0;
    const cust = dailyData[d.dateStr] ? (dailyData[d.dateStr].customers || 0) : 0;
    
    totalActual += actual;
    totalCustomers += cust;
    if (actual > 0) {
      activeDaysCount++;
    }
  });

  const progressPct = totalTarget > 0 ? (totalActual / totalTarget) * 100 : 0;
  const avgSpend = totalCustomers > 0 ? Math.round(totalActual / totalCustomers) : 0;

  // Render KPIs
  document.getElementById('kpi-month-target').textContent = formatYen(appSettings.monthlyTargets[activeMonth]);
  document.getElementById('kpi-month-actual').textContent = formatYen(totalActual);
  
  const progressBadge = document.getElementById('kpi-month-progress-badge');
  progressBadge.textContent = progressPct.toFixed(1) + '%';
  if (progressPct >= 100) {
    progressBadge.className = 'trend-badge';
  } else if (progressPct >= 70) {
    progressBadge.className = 'trend-badge';
  } else {
    progressBadge.className = 'trend-badge danger';
  }

  document.getElementById('kpi-target-type').textContent = 
    appSettings.calcMode === 'proportional' ? '比率調整モード適用中' : '絶対値モード（ July比率 ）';

  document.getElementById('kpi-week-target').textContent = formatYen(weeklyTarget);
  document.getElementById('kpi-week-status').textContent = `${activeMonth}月の週目標 (換算値)`;

  document.getElementById('kpi-customers-spend').textContent = `${totalCustomers.toLocaleString('ja-JP')}人 / ${formatYen(avgSpend)}`;
  document.getElementById('kpi-avg-spend-desc').textContent = `営業稼働日数: ${activeDaysCount}日`;

  const progressBarFill = document.getElementById('dashboard-progress-fill');
  const progressPercentLabel = document.getElementById('dashboard-progress-pct');
  if (progressBarFill && progressPercentLabel) {
    const fillWidth = Math.min(100, progressPct);
    progressBarFill.style.width = fillWidth + '%';
    progressPercentLabel.textContent = progressPct.toFixed(1) + '%';
  }

  // Render specific tab contents
  if (activeTab === 'dashboard') {
    renderDashboardCalendar();
    renderDailyDetailPanel();
    renderDashboardCharts(dailyTargets);
  } else if (activeTab === 'sheet') {
    renderMonthlySheetTable(dailyTargets, weeklyTarget);
  } else if (activeTab === 'tasks') {
    renderTasksTab();
  } else if (activeTab === 'menu') {
    renderMenuTab();
  } else if (activeTab === 'equipment') {
    renderEquipmentTab();
  } else if (activeTab === 'analytics') {
    renderAnalyticsTab(dailyTargets);
  }
}

// ----------------------------------------------------
// TAB: DASHBOARD CALENDAR & DETAIL PANEL RENDER
// ----------------------------------------------------
function renderDashboardCalendar() {
  const gridEl = document.getElementById('dashboard-calendar-grid');
  gridEl.innerHTML = '';

  document.getElementById('calendar-month-title').innerHTML = 
    `<i class="fa-solid fa-calendar-days"></i> ${CURRENT_YEAR}年${activeMonth}月 カレンダー`;

  const dates = getDatesInMonth(activeMonth);
  const dailyTargets = getDailyTargetsForMonth(activeMonth);

  // Pad cells for first day of the month alignment starting on Friday
  // JS day: 0=Sun, 1=Mon, ..., 6=Sat
  // Calendar col order starting Friday: Fri(5), Sat(6), Sun(0), Mon(1), Tue(2), Wed(3), Thu(4)
  const firstDay = dates[0].getDay();
  const prefixBlanks = (firstDay - 5 + 7) % 7;
  
  for (let i = 0; i < prefixBlanks; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-cell other-month';
    gridEl.appendChild(emptyCell);
  }

  dailyTargets.forEach(d => {
    const cell = document.createElement('div');
    const actual = dailyData[d.dateStr] || {};
    const shiftsList = actual.shifts || [];
    
    // Calendar classes
    let cellClass = 'calendar-cell';
    if (d.dayOfWeek === 2 || d.dayOfWeek === 4) {
      cellClass += ' closed-day';
    } else if (d.dayOfWeek === 6) {
      cellClass += ' weekend-sat-cell';
    } else if (d.dayOfWeek === 0) {
      cellClass += ' weekend-sun-cell';
    }

    if (d.dateStr === selectedDateStr) {
      cellClass += ' active-select';
    }
    cell.className = cellClass;
    cell.setAttribute('data-date', d.dateStr);

    // Check for pending/incomplete tasks for this day
    const dayTasks = tasks.filter(t => t.deadline === d.dateStr && !t.completed);
    let taskIndicatorHtml = '';
    if (dayTasks.length > 0) {
      taskIndicatorHtml = `<div class="cell-task-indicator"><div class="dot-indicator" title="未完了タスク ${dayTasks.length}件"></div></div>`;
    }

    // Shift badges
    let shiftBadgesHtml = '';
    if (shiftsList.length > 0) {
      shiftBadgesHtml = `<div class="cell-shifts">`;
      shiftsList.forEach(s => {
        let badgeClass = 'mini-shift-badge';
        if (s === 'たいよう') badgeClass += ' shift-taiyou';
        else if (s === 'なな') badgeClass += ' shift-nana';
        else if (s === 'れんれん') badgeClass += ' shift-renren';
        shiftBadgesHtml += `<span class="${badgeClass}">${s.substring(0,2)}</span>`;
      });
      shiftBadgesHtml += `</div>`;
    }

    const targetFormatted = d.target > 0 ? (d.target / 1000) + 'k' : '休み';

    cell.innerHTML = `
      <div class="cell-header">
        <span class="cell-date">${d.date.getDate()}</span>
        ${taskIndicatorHtml}
      </div>
      <div class="cell-target">${targetFormatted}</div>
      ${shiftBadgesHtml}
    `;

    cell.addEventListener('click', () => {
      selectedDateStr = d.dateStr;
      
      // Update selected class in DOM
      document.querySelectorAll('.calendar-cell').forEach(c => c.classList.remove('active-select'));
      cell.classList.add('active-select');
      
      renderDailyDetailPanel();
    });

    gridEl.appendChild(cell);
  });
}

function renderDailyDetailPanel() {
  const panel = document.getElementById('daily-detail-panel');
  if (!panel) return;

  const dateParts = selectedDateStr.split('-');
  if (dateParts.length !== 3) return;

  const dateObj = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
  const dayOfWeek = dateObj.getDay();

  // Update headers
  document.getElementById('detail-date-badge').className = `day-badge ${getDayClass(dayOfWeek)}`;
  document.getElementById('detail-date-badge').textContent = `${dateParts[1]}/${dateParts[2]} (${getDayJp(dayOfWeek)})`;
  document.getElementById('detail-date-str').value = selectedDateStr;

  // Compute calculated target for the day
  const dailyTargets = getDailyTargetsForMonth(activeMonth);
  const matchedDay = dailyTargets.find(d => d.dateStr === selectedDateStr);
  const dailyTargetVal = matchedDay ? matchedDay.target : 0;
  const defaultEventName = matchedDay ? matchedDay.eventName : '';

  const targetSalesEl = document.getElementById('detail-target-sales');
  const eventBadgeEl = document.getElementById('detail-event-badge');

  if (dailyTargetVal > 0) {
    targetSalesEl.textContent = formatYen(dailyTargetVal);
    targetSalesEl.className = 'detail-val font-bold text-accent';
    
    eventBadgeEl.textContent = defaultEventName;
    if (defaultEventName.includes('ビアガーデン')) {
      eventBadgeEl.className = 'badge badge-beer';
    } else if (defaultEventName.includes('イベント')) {
      eventBadgeEl.className = 'badge badge-event';
    } else {
      eventBadgeEl.className = 'badge badge-normal';
    }
  } else {
    targetSalesEl.textContent = '休み (定休日)';
    targetSalesEl.className = 'detail-val font-bold text-secondary';
    eventBadgeEl.textContent = '定休日';
    eventBadgeEl.className = 'badge badge-closed';
  }

  // Load saved actual sales, customers, memo, shifts
  const actual = dailyData[selectedDateStr] || {};
  
  document.getElementById('detail-actual-sales').value = actual.actualSales || '';
  document.getElementById('detail-actual-customers').value = actual.customers || '';
  document.getElementById('detail-memo').value = actual.memo || '';

  // Load shifts (Checkboxes)
  const shiftInputs = document.getElementsByName('detail-shift');
  const savedShifts = actual.shifts || [];
  shiftInputs.forEach(cb => {
    cb.checked = savedShifts.includes(cb.value);
  });

  // Render Today's Tasks
  const tasksListEl = document.getElementById('detail-tasks-list');
  tasksListEl.innerHTML = '';

  const dayTasks = tasks.filter(t => t.deadline === selectedDateStr);
  if (dayTasks.length > 0) {
    dayTasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.className = `today-task-item ${task.completed ? 'completed' : ''}`;
      
      const checkId = `detail-task-check-${task.id}`;
      taskDiv.innerHTML = `
        <input type="checkbox" id="${checkId}" ${task.completed ? 'checked' : ''} style="cursor: pointer;">
        <label for="${checkId}" style="cursor: pointer; flex-grow: 1;">
          <strong>[${task.category}]</strong> ${task.name} (${task.assignee})
        </label>
      `;

      // Quick complete toggle checkbox inside detail panel
      taskDiv.querySelector('input').addEventListener('change', (e) => {
        task.completed = e.target.checked;
        saveToLocalStorage();
        showToast(`タスク「${task.name}」を${task.completed ? '完了' : '未完了'}に更新しました`);
        renderApp();
      });

      tasksListEl.appendChild(taskDiv);
    });
  } else {
    tasksListEl.innerHTML = `<p class="text-secondary text-sm">本日締切のタスクはありません。</p>`;
  }
}

// Save detailed inputs from right panel
function saveDailyDetailFromPanel() {
  const dateStr = document.getElementById('detail-date-str').value;
  if (!dateStr) return;

  const actualSales = parseInt(document.getElementById('detail-actual-sales').value) || 0;
  const customers = parseInt(document.getElementById('detail-actual-customers').value) || 0;
  const memo = document.getElementById('detail-memo').value;

  // Read shifts checkboxes
  const shifts = [];
  const shiftInputs = document.getElementsByName('detail-shift');
  shiftInputs.forEach(cb => {
    if (cb.checked) {
      shifts.push(cb.value);
    }
  });

  // Keep event name from initial template or current database
  const dailyTargets = getDailyTargetsForMonth(activeMonth);
  const matchedDay = dailyTargets.find(d => d.dateStr === dateStr);
  const defaultEventName = matchedDay ? matchedDay.eventName : '';
  const currentEvent = dailyData[dateStr] ? (dailyData[dateStr].event || defaultEventName) : defaultEventName;

  dailyData[dateStr] = {
    ...dailyData[dateStr],
    actualSales,
    customers,
    memo,
    shifts,
    event: currentEvent
  };
}

// ----------------------------------------------------
// TAB: MONTHLY SHEET RENDER
// ----------------------------------------------------
function renderMonthlySheetTable(dailyTargets, weeklyTarget) {
  const tableBody = document.getElementById('sales-table-body');
  tableBody.innerHTML = '';

  document.getElementById('sheet-month-title').textContent = `${activeMonth}月の売上・成果入力シート`;
  document.getElementById('sheet-mode-badge').textContent = 
    appSettings.calcMode === 'proportional' ? '比率調整モード' : '絶対値モード';
  document.getElementById('sheet-mode-badge').className = 
    appSettings.calcMode === 'proportional' ? 'badge badge-event' : 'badge badge-beer';

  let currentWeekRows = [];
  let weekIndex = 1;

  dailyTargets.forEach((d, idx) => {
    const actual = dailyData[d.dateStr] || { event: d.eventName, actualSales: 0, customers: 0, shifts: [], memo: '' };
    const dateObj = d.date;
    const dayOfWeek = d.dayOfWeek;
    const spend = actual.customers > 0 ? Math.round(actual.actualSales / actual.customers) : 0;
    const savedShifts = actual.shifts || [];

    // Build row class
    let rowClass = '';
    if (dayOfWeek === 6) { // Sat
      rowClass = d.eventName.includes('ビアガーデン') ? 'beer-garden-row' : 'weekend-sat';
    } else if (dayOfWeek === 0) { // Sun
      rowClass = 'weekend-sun';
    } else if (d.eventName.includes('イベント')) {
      rowClass = 'event-row';
    } else if (d.target === 0 && d.dayOfWeek !== 0 && d.dayOfWeek !== 6) {
      rowClass = 'closed-row';
    }

    const tr = document.createElement('tr');
    tr.className = rowClass;
    tr.setAttribute('data-date', d.dateStr);

    const dateFormatted = formatDateShort(dateObj);

    // Event badges
    let badgeHtml = '';
    if (d.eventName.includes('ビアガーデン')) {
      badgeHtml = `<span class="badge badge-beer"><i class="fa-solid fa-beer-mug-empty"></i> ${d.eventName}</span>`;
    } else if (d.eventName.includes('イベント')) {
      badgeHtml = `<span class="badge badge-event"><i class="fa-solid fa-star"></i> ${d.eventName}</span>`;
    } else if (d.target === 0) {
      badgeHtml = `<span class="badge badge-closed">定休</span>`;
    } else {
      badgeHtml = `<span class="badge badge-normal">通常</span>`;
    }

    // Shift Mini buttons toggles (Taiyou, Nana, Renren)
    const isTaiyouChecked = savedShifts.includes('たいよう');
    const isNanaChecked = savedShifts.includes('なな');
    const isRenrenChecked = savedShifts.includes('れんれん');

    const shiftTogglesHtml = `
      <div class="shift-checkbox-group" style="gap: 4px; margin-top: 0;">
        <button type="button" class="mini-shift-badge ${isTaiyouChecked ? 'shift-taiyou' : ''}" data-staff="たいよう" style="cursor:pointer; border:1px solid var(--border-color); font-weight:bold;">たい</button>
        <button type="button" class="mini-shift-badge ${isNanaChecked ? 'shift-nana' : ''}" data-staff="なな" style="cursor:pointer; border:1px solid var(--border-color); font-weight:bold;">なな</button>
        <button type="button" class="mini-shift-badge ${isRenrenChecked ? 'shift-renren' : ''}" data-staff="れんれん" style="cursor:pointer; border:1px solid var(--border-color); font-weight:bold;">れん</button>
      </div>
    `;

    tr.innerHTML = `
      <td><strong>${dateFormatted}</strong></td>
      <td><span class="day-badge ${getDayClass(dayOfWeek)}">${getDayJp(dayOfWeek)}</span></td>
      <td>
        <div style="display: flex; align-items: center; gap: 6px;">
          <input type="text" class="table-input input-event" value="${actual.event || d.eventName}" style="width: 100px; display: none;">
          <span class="event-text-label">${badgeHtml}</span>
        </div>
      </td>
      <td>${shiftTogglesHtml}</td>
      <td style="text-align: right; font-family: monospace;">${formatYen(d.target)}</td>
      <td>
        <input type="number" class="table-input input-actual-sales" value="${actual.actualSales || ''}" min="0" step="5000" placeholder="0">
      </td>
      <td>
        <input type="number" class="table-input input-actual-customers" value="${actual.customers || ''}" min="0" placeholder="0">
      </td>
      <td style="text-align: right; font-family: monospace;" class="spend-cell">${formatYen(spend)}</td>
      <td>
        <input type="text" class="table-input input-memo" value="${actual.memo || ''}" placeholder="メモ...">
      </td>
    `;

    // Hook click toggles on Mini Shift badges directly in monthly sheet table cell
    tr.querySelectorAll('button[data-staff]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const staffName = e.target.getAttribute('data-staff');
        
        if (!dailyData[d.dateStr]) {
          dailyData[d.dateStr] = { event: d.eventName, actualSales: 0, customers: 0, shifts: [], memo: '' };
        }
        if (!dailyData[d.dateStr].shifts) {
          dailyData[d.dateStr].shifts = [];
        }

        const staffShifts = dailyData[d.dateStr].shifts;
        const sIndex = staffShifts.indexOf(staffName);
        if (sIndex > -1) {
          staffShifts.splice(sIndex, 1);
          e.target.className = 'mini-shift-badge';
        } else {
          staffShifts.push(staffName);
          let badgeClass = 'mini-shift-badge';
          if (staffName === 'たいよう') badgeClass += ' shift-taiyou';
          else if (staffName === 'なな') badgeClass += ' shift-nana';
          else if (staffName === 'れんれん') badgeClass += ' shift-renren';
          e.target.className = badgeClass;
        }

        saveToLocalStorage();
        // Update customer spend calculation and details, keep view intact
        showToast(`${d.dateStr} のシフトを変更しました。`);
      });
    });

    const salesInput = tr.querySelector('.input-actual-sales');
    const custInput = tr.querySelector('.input-actual-customers');
    const spendCell = tr.querySelector('.spend-cell');

    const updateSpend = () => {
      const sVal = parseInt(salesInput.value) || 0;
      const cVal = parseInt(custInput.value) || 0;
      const sp = cVal > 0 ? Math.round(sVal / cVal) : 0;
      spendCell.textContent = formatYen(sp);
    };

    salesInput.addEventListener('input', updateSpend);
    custInput.addEventListener('input', updateSpend);

    tableBody.appendChild(tr);
    currentWeekRows.push({ target: d.target, dateStr: d.dateStr });

    // Weekly sub-totals (Weeks run Friday to Thursday)
    if (dayOfWeek === 4 || idx === dailyTargets.length - 1) {
      let weekTargetSum = currentWeekRows.reduce((sum, r) => sum + r.target, 0);
      let weekActualSum = currentWeekRows.reduce((sum, r) => {
        const actualVal = dailyData[r.dateStr] ? (dailyData[r.dateStr].actualSales || 0) : 0;
        return sum + actualVal;
      }, 0);
      
      const weekProgress = weekTargetSum > 0 ? (weekActualSum / weekTargetSum) * 100 : 0;
      const weekVsBaseProgress = weeklyTarget > 0 ? (weekActualSum / weeklyTarget) * 100 : 0;

      const subtotalTr = document.createElement('tr');
      subtotalTr.className = 'weekly-total-row';
      subtotalTr.innerHTML = `
        <td colspan="4" style="text-align: right;"><strong>第 ${weekIndex} 週 合計:</strong></td>
        <td style="text-align: right; font-family: monospace;">${formatYen(weekTargetSum)}</td>
        <td style="text-align: right; font-family: monospace; font-weight: 800;">${formatYen(weekActualSum)}</td>
        <td colspan="2" style="font-size: 11px;">
          週進捗: <span class="${weekProgress >= 100 ? 'text-success' : 'text-secondary'}">${weekProgress.toFixed(1)}%</span>
        </td>
        <td style="font-size: 11px;">
          週目標達成率 (目標 ${formatYen(weeklyTarget)}): 
          <span style="font-weight: 800; color: ${weekVsBaseProgress >= 100 ? '#10b981' : '#f59e0b'}">${weekVsBaseProgress.toFixed(1)}%</span>
        </td>
      `;
      tableBody.appendChild(subtotalTr);

      currentWeekRows = [];
      weekIndex++;
    }
  });
}

// ----------------------------------------------------
// TAB: TASKS MANAGEMENT RENDER & LOGIC
// ----------------------------------------------------
function addNewTask() {
  const name = document.getElementById('task-name').value;
  const category = document.getElementById('task-category').value;
  const deadline = document.getElementById('task-deadline').value;
  const notes = document.getElementById('task-notes').value;

  const checkedNodes = document.querySelectorAll('input[name="task-assignee-check"]:checked');
  const assignee = Array.from(checkedNodes).map(node => node.value);

  if (!name || !deadline) return;
  
  if (assignee.length === 0) {
    showToast('担当者を少なくとも1名選択してください。', 'danger');
    return;
  }

  const newTask = {
    id: 'task_' + Date.now(),
    name,
    category,
    assignee,
    deadline,
    notes,
    completed: false
  };

  tasks.push(newTask);
  saveToLocalStorage();
  showToast(`タスク「${name}」を追加しました！`);
  
  // Clear form
  document.getElementById('task-name').value = '';
  document.getElementById('task-notes').value = '';
  document.querySelectorAll('input[name="task-assignee-check"]').forEach(cb => cb.checked = false);

  renderApp();
}

function toggleTaskStatus(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    saveToLocalStorage();
    showToast(`タスクを${task.completed ? '完了' : '未完了'}に更新しました`);
    renderApp();
  }
}

function deleteTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task && confirm(`タスク「${task.name}」を削除しますか？`)) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveToLocalStorage();
    showToast('タスクを削除しました', 'danger');
    renderApp();
  }
}

function renderTasksTab() {
  const tableBody = document.getElementById('task-table-body');
  const noTasksEl = document.getElementById('no-tasks-message');
  if (!tableBody) return;
  tableBody.innerHTML = '';

  // Get filter inputs
  const filterCat = document.getElementById('filter-category').value;
  const filterAss = document.getElementById('filter-assignee').value;
  const filterStat = document.getElementById('filter-status').value;

  // Filter logic
  const filteredTasks = tasks.filter(task => {
    // Category match
    if (filterCat !== 'all' && task.category !== filterCat) return false;
    // Assignee match
    if (filterAss !== 'all') {
      const assignees = Array.isArray(task.assignee) ? task.assignee : [task.assignee];
      if (!assignees.includes(filterAss)) return false;
    }
    // Status match
    if (filterStat === 'active' && task.completed) return false;
    if (filterStat === 'completed' && !task.completed) return false;

    return true;
  });

  // Sort tasks by deadline date (earliest first)
  filteredTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  if (filteredTasks.length === 0) {
    noTasksEl.style.display = 'block';
  } else {
    noTasksEl.style.display = 'none';
    
    filteredTasks.forEach(task => {
      const tr = document.createElement('tr');
      if (task.completed) {
        tr.className = 'task-row-completed';
      }

      // Classification badge class
      let catBadgeClass = 'badge-cat';
      if (task.category === 'インスタ') catBadgeClass += ' cat-insta';
      else if (task.category === 'イベント') catBadgeClass += ' cat-event';
      else if (task.category === '通常営業') catBadgeClass += ' cat-normal';
      else catBadgeClass += ' cat-all';

      // Date formatted
      const deadlineDate = new Date(task.deadline);
      const deadlineFormatted = `${deadlineDate.getMonth() + 1}/${deadlineDate.getDate()}(${getDayJp(deadlineDate.getDay())})`;

      // Render assignees badges
      const assigneesList = Array.isArray(task.assignee) ? task.assignee : [task.assignee];
      const assigneeHtml = assigneesList.map(a => {
        let badgeClass = 'day-badge';
        if (a === 'たいよう') badgeClass += ' day-mon';
        else if (a === 'なな') badgeClass += ' day-wed';
        else if (a === 'れんれん') badgeClass += ' day-fri';
        else if (a === 'ながいさん') badgeClass += ' day-tue';
        else if (a === 'そーちゃん') badgeClass += ' day-sat';
        else badgeClass += ' day-thu';
        return `<span class="${badgeClass}" style="display: inline-block; padding: 2px 6px; font-size: 11px;">${a}</span>`;
      }).join('');

      tr.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="task-complete-checkbox" ${task.completed ? 'checked' : ''} style="cursor: pointer; width: 16px; height: 16px;">
        </td>
        <td><strong>${task.name}</strong></td>
        <td><span class="${catBadgeClass}">${task.category}</span></td>
        <td><div style="display: flex; flex-wrap: wrap; gap: 4px;">${assigneeHtml}</div></td>
        <td><span class="text-secondary">${deadlineFormatted}</span></td>
        <td><span class="text-secondary text-sm">${task.notes || '—'}</span></td>
        <td style="text-align: center;">
          <button class="btn-icon-danger btn-delete-task" title="タスク削除">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      `;

      // Complete toggle handler
      tr.querySelector('.task-complete-checkbox').addEventListener('change', () => {
        toggleTaskStatus(task.id);
      });

      // Delete task handler
      tr.querySelector('.btn-delete-task').addEventListener('click', () => {
        deleteTask(task.id);
      });

      tableBody.appendChild(tr);
    });
  }
}

// ----------------------------------------------------
// TAB: ANALYTICS RENDER
// ----------------------------------------------------
function renderAnalyticsTab(dailyTargets) {
  const tableBody = document.getElementById('weekday-analytics-body');
  tableBody.innerHTML = '';

  const weekdayStats = {};
  for (let i = 0; i < 7; i++) {
    weekdayStats[i] = { totalSales: 0, totalCustomers: 0, count: 0 };
  }

  let eventTotalSales = 0, eventDaysCount = 0;
  let regularTotalSales = 0, regularDaysCount = 0;

  dailyTargets.forEach(d => {
    const actual = dailyData[d.dateStr];
    if (actual && actual.actualSales > 0) {
      const sales = actual.actualSales;
      const cust = actual.customers || 0;
      const dayOfWeek = d.dayOfWeek;

      weekdayStats[dayOfWeek].totalSales += sales;
      weekdayStats[dayOfWeek].totalCustomers += cust;
      weekdayStats[dayOfWeek].count++;

      const isEvent = actual.event && (actual.event.includes('イベント') || actual.event.includes('ビアガーデン'));
      if (isEvent) {
        eventTotalSales += sales;
        eventDaysCount++;
      } else if (d.target > 0) {
        regularTotalSales += sales;
        regularDaysCount++;
      }
    }
  });

  const renderOrder = [1, 2, 3, 4, 5, 6, 0];
  renderOrder.forEach(d => {
    const stat = weekdayStats[d];
    const avgSales = stat.count > 0 ? Math.round(stat.totalSales / stat.count) : 0;
    const avgCust = stat.count > 0 ? Math.round(stat.totalCustomers / stat.count) : 0;
    const avgSpend = avgCust > 0 ? Math.round(avgSales / avgCust) : 0;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="day-badge ${getDayClass(d)}">${getDayJp(d)}曜日</span></td>
      <td style="text-align: right; font-family: monospace; font-weight: 600;">${formatYen(avgSales)}</td>
      <td style="text-align: right; font-family: monospace;">${avgCust} 人</td>
      <td style="text-align: right; font-family: monospace; color: var(--accent-emerald);">${formatYen(avgSpend)}</td>
      <td style="color: var(--text-muted);">${stat.count} 日営業</td>
    `;
    tableBody.appendChild(tr);
  });

  const avgEventSales = eventDaysCount > 0 ? Math.round(eventTotalSales / eventDaysCount) : 0;
  const avgRegularSales = regularDaysCount > 0 ? Math.round(regularTotalSales / regularDaysCount) : 0;
  const multiplier = avgRegularSales > 0 ? (avgEventSales / avgRegularSales).toFixed(2) : '1.00';

  document.getElementById('analytics-event-sales').textContent = formatYen(avgEventSales);
  document.getElementById('analytics-event-count').textContent = `${eventDaysCount}日稼働`;
  document.getElementById('analytics-regular-sales').textContent = formatYen(avgRegularSales);
  document.getElementById('analytics-regular-count').textContent = `${regularDaysCount}日稼働`;
  
  const multiplierEl = document.getElementById('analytics-sales-multiplier');
  multiplierEl.textContent = `${multiplier}x`;
  if (parseFloat(multiplier) > 1.2) {
    multiplierEl.className = 'kpi-value text-success';
  } else {
    multiplierEl.className = 'kpi-value';
  }

  drawWeekdayPerformanceChart(weekdayStats);
}

// CHARTS RENDER LOGIC
// ----------------------------------------------------
function getChartColors() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  return {
    text: isLight ? '#475569' : '#9ca3af',
    gridMain: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)',
    gridSub: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)'
  };
}

function renderDashboardCharts(dailyTargets) {
  drawMonthlyComparisonChart();
  drawCumulativeTrendChart(dailyTargets);
}

function drawMonthlyComparisonChart() {
  const ctx = document.getElementById('monthlyComparisonChart').getContext('2d');
  if (monthlyComparisonChart) {
    monthlyComparisonChart.destroy();
  }

  const months = [7, 8, 9, 10, 11, 12];
  const targets = [];
  const actuals = [];

  months.forEach(m => {
    targets.push(appSettings.monthlyTargets[m]);
    
    const mDates = getDatesInMonth(m);
    let mActualSum = 0;
    mDates.forEach(date => {
      const dateStr = formatDate(date);
      if (dailyData[dateStr]) {
        mActualSum += dailyData[dateStr].actualSales || 0;
      }
    });
    actuals.push(mActualSum);
  });

  monthlyComparisonChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['7月', '8月', '9月', '10月', '11月', '12月'],
      datasets: [
        {
          label: '目標売上',
          data: targets,
          backgroundColor: 'rgba(99, 102, 241, 0.4)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 1.5,
          borderRadius: 4
        },
        {
          label: '実績売上',
          data: actuals,
          backgroundColor: 'rgba(16, 185, 129, 0.7)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 1.5,
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: getChartColors().text, font: { family: 'Plus Jakarta Sans' } }
        }
      },
      scales: {
        x: {
          grid: { color: getChartColors().gridMain },
          ticks: { color: getChartColors().text }
        },
        y: {
          grid: { color: getChartColors().gridMain },
          ticks: {
            color: getChartColors().text,
            callback: function(value) {
              return (value / 10000) + '万円';
            }
          }
        }
      }
    }
  });
}

function drawCumulativeTrendChart(dailyTargets) {
  const ctx = document.getElementById('cumulativeTrendChart').getContext('2d');
  if (cumulativeTrendChart) {
    cumulativeTrendChart.destroy();
  }

  const labels = [];
  const targetCumulative = [];
  const actualCumulative = [];
  const dailyActuals = [];

  let currentTargetSum = 0;
  let currentActualSum = 0;

  dailyTargets.forEach(d => {
    labels.push(formatDateShort(d.date));
    
    currentTargetSum += d.target;
    targetCumulative.push(currentTargetSum);

    const actual = dailyData[d.dateStr] ? (dailyData[d.dateStr].actualSales || 0) : 0;
    const hasData = dailyData[d.dateStr] !== undefined;

    dailyActuals.push(actual);

    if (hasData && (actual > 0 || Object.keys(dailyData[d.dateStr]).length > 0)) {
      currentActualSum += actual;
      actualCumulative.push(currentActualSum);
    } else {
      actualCumulative.push(null);
    }
  });

  cumulativeTrendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '目標累積',
          data: targetCumulative,
          borderColor: 'rgba(99, 102, 241, 0.5)',
          borderDash: [5, 5],
          borderWidth: 2,
          fill: false,
          pointRadius: 0
        },
        {
          label: '実績累積',
          data: actualCumulative,
          borderColor: 'rgba(16, 185, 129, 1)',
          backgroundColor: 'rgba(16, 185, 129, 0.05)',
          borderWidth: 3,
          fill: true,
          pointBackgroundColor: 'rgba(16, 185, 129, 1)',
          pointRadius: function(context) {
            const index = context.dataIndex;
            return (index === actualCumulative.filter(v => v !== null).length - 1) ? 6 : 2;
          },
          spanGaps: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: getChartColors().text, font: { family: 'Plus Jakarta Sans' } }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + formatYen(context.raw);
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: getChartColors().gridSub },
          ticks: { color: getChartColors().text, maxTicksLimit: 15 }
        },
        y: {
          grid: { color: getChartColors().gridMain },
          ticks: {
            color: getChartColors().text,
            callback: function(value) {
              return (value / 10000) + '万円';
            }
          }
        }
      }
    }
  });
}

function drawWeekdayPerformanceChart(weekdayStats) {
  const ctx = document.getElementById('weekdayPerformanceChart').getContext('2d');
  if (weekdayPerformanceChart) {
    weekdayPerformanceChart.destroy();
  }

  const daysLabel = ['月曜', '火曜', '水曜', '木曜', '金曜', '土曜', '日曜'];
  const mapOrder = [1, 2, 3, 4, 5, 6, 0];

  const avgSalesData = [];
  const avgCustData = [];

  mapOrder.forEach(d => {
    const stat = weekdayStats[d];
    const avgSales = stat.count > 0 ? Math.round(stat.totalSales / stat.count) : 0;
    const avgCust = stat.count > 0 ? Math.round(stat.totalCustomers / stat.count) : 0;
    
    avgSalesData.push(avgSales);
    avgCustData.push(avgCust);
  });

  weekdayPerformanceChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: daysLabel,
      datasets: [
        {
          label: '平均売上 (円)',
          data: avgSalesData,
          backgroundColor: 'rgba(99, 102, 241, 0.7)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          label: '平均客数 (人)',
          data: avgCustData,
          backgroundColor: 'rgba(245, 158, 11, 0.7)',
          borderColor: 'rgba(245, 158, 11, 1)',
          borderWidth: 1,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: getChartColors().text }
        }
      },
      scales: {
        x: {
          grid: { color: getChartColors().gridSub },
          ticks: { color: getChartColors().text }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: { color: getChartColors().gridMain },
          ticks: {
            color: getChartColors().text,
            callback: function(value) { return (value / 1000) + 'k'; }
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: {
            color: getChartColors().text,
            callback: function(value) { return value + '人'; }
          }
        }
      }
    }
  });
}

// ----------------------------------------------------
// TAB: DYNAMIC CAFE & BAR MENU RENDER & CRUD LOGIC
// ----------------------------------------------------
function renderMenuTab() {
  const isEditMode = document.getElementById('menu-edit-mode-toggle').checked;

  // 1. Render Plans
  const plansContainer = document.getElementById('menu-plans-container');
  if (plansContainer) {
    plansContainer.innerHTML = '';
    const plansList = menuData.plans || defaultMenu.plans;
    
    plansList.forEach(plan => {
      const planCard = document.createElement('div');
      planCard.className = `plan-card neon-border-${plan.theme}`;
      
      const featuresHtml = plan.features.map(f => `<li>${f}</li>`).join('');
      
      planCard.innerHTML = `
        <div class="plan-badge bg-neon-${plan.theme}">${plan.name}</div>
        <div class="plan-price color-neon-${plan.theme}">${plan.price}</div>
        <ul class="plan-features">
          ${featuresHtml}
        </ul>
        <div class="plan-description border-top-${plan.theme}">${plan.desc}</div>
      `;
      plansContainer.appendChild(planCard);
    });
  }

  // 2. Render Option Menu Categories
  const categories = [
    { id: 'menu-list-highball', key: 'drink_highball' },
    { id: 'menu-list-shot', key: 'drink_shot' },
    { id: 'menu-list-fry', key: 'food_fry' },
    { id: 'menu-list-dessert', key: 'food_dessert' },
    { id: 'menu-list-otsumami', key: 'food_otsumami' },
    { id: 'menu-list-chinchiro', key: 'play_chinchiro' },
    { id: 'menu-list-punishment', key: 'play_punishment' }
  ];

  const menuItemsList = menuData.items || defaultMenu.items;

  categories.forEach(cat => {
    const listEl = document.getElementById(cat.id);
    if (!listEl) return;
    listEl.innerHTML = '';

    const catItems = menuItemsList.filter(item => item.category === cat.key);
    
    if (catItems.length === 0) {
      listEl.innerHTML = `<li class="text-secondary text-sm" style="list-style:none;">品目がありません。</li>`;
      return;
    }

    catItems.forEach(item => {
      const li = document.createElement('li');
      
      const deleteBtnHtml = isEditMode ? `
        <button class="delete-menu-item-btn" data-id="${item.id}" title="品目を削除">
          <i class="fa-solid fa-square-xmark"></i>
        </button>
      ` : '';

      if (cat.key === 'food_otsumami') {
        li.innerHTML = `
          <div class="menu-item-wrapper">
            <div class="menu-item-left">
              ${deleteBtnHtml}
              <span>${item.name}</span>
            </div>
          </div>
        `;
      } else {
        const priceLabel = item.price.startsWith('-') || item.price.includes('無料') || item.price.includes('半額') || item.price.includes('倍額') 
          ? item.price 
          : `- ${item.price}`;
        
        let priceClass = 'item-price';
        if (priceLabel.includes('無料') || priceLabel.includes('半額') || priceLabel.includes('倍額')) {
          priceClass = 'item-price text-highlight';
        }

        li.className = (cat.key === 'play_chinchiro') ? 'font-neon-thin' : '';
        li.innerHTML = `
          <div class="menu-item-wrapper">
            <div class="menu-item-left">
              ${deleteBtnHtml}
              <span class="item-name">${item.name}</span>
            </div>
            <span class="${priceClass}">${priceLabel}</span>
          </div>
        `;
      }

      if (isEditMode) {
        const btn = li.querySelector('.delete-menu-item-btn');
        if (btn) {
          btn.addEventListener('click', (e) => {
            const itemId = e.currentTarget.getAttribute('data-id');
            deleteMenuItem(itemId);
          });
        }
      }

      listEl.appendChild(li);
    });
  });
}

function addNewMenuItem() {
  const category = document.getElementById('menu-item-category').value;
  const name = document.getElementById('menu-item-name').value;
  const price = document.getElementById('menu-item-price').value;

  if (!name || !category) return;

  const newItem = {
    id: 'menu_' + Date.now(),
    name,
    price,
    category
  };

  if (!menuData.items) {
    menuData.items = [];
  }
  menuData.items.push(newItem);
  saveToLocalStorage();
  showToast(`メニュー「${name}」を追加しました！`);

  document.getElementById('menu-item-name').value = '';
  document.getElementById('menu-item-price').value = '';

  renderMenuTab();
}

function deleteMenuItem(itemId) {
  const item = menuData.items.find(i => i.id === itemId);
  if (item && confirm(`メニュー「${item.name}」を削除しますか？`)) {
    menuData.items = menuData.items.filter(i => i.id !== itemId);
    saveToLocalStorage();
    showToast('品目を削除しました', 'danger');
    renderMenuTab();
  }
}

// ----------------------------------------------------
// GOOGLE SHEETS / GAS CLOUD DATABASE SYNCHRONIZATION
// ----------------------------------------------------
function updateCloudStatusUI() {
  const badge = document.getElementById('cloud-status-badge');
  if (!badge) return;

  if (cloudUrl) {
    badge.textContent = '同期オン（スプレッドシート同期中）';
    badge.className = 'badge badge-success';
  } else {
    badge.textContent = '同期オフ（ローカル保存のみ）';
    badge.className = 'badge badge-normal';
  }
}

async function testCloudConnection(url) {
  try {
    const testData = { ping: true, timestamp: Date.now() };
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain' // Avoid CORS preflight OPTIONS request in GAS
      },
      body: JSON.stringify({ settings: appSettings, dailyData: dailyData, tasks: tasks, menu: menuData, equipment: equipment })
    });
    const result = await response.json();
    return result && result.status === 'success';
  } catch (error) {
    console.error('GAS connection test failed:', error);
    return false;
  }
}

async function uploadToCloud() {
  if (!cloudUrl) return;

  const badge = document.getElementById('cloud-status-badge');
  if (badge) {
    badge.textContent = '同期中...';
    badge.className = 'badge badge-normal';
  }

  try {
    const payload = {
      settings: appSettings,
      dailyData: dailyData,
      tasks: tasks,
      menu: menuData,
      equipment: equipment
    };
    
    await fetch(cloudUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(payload)
    });

    if (badge) {
      badge.textContent = '同期完了 (Google Sheet)';
      badge.className = 'badge badge-success';
    }
  } catch (error) {
    console.error('GAS upload failed:', error);
    if (badge) {
      badge.textContent = '同期エラー (再試行中)';
      badge.className = 'badge badge-normal danger';
    }
  }
}

async function fetchFromCloud() {
  if (!cloudUrl) return;

  const badge = document.getElementById('cloud-status-badge');
  if (badge) {
    badge.textContent = '読込中...';
    badge.className = 'badge badge-normal';
  }

  try {
    const response = await fetch(cloudUrl, {
      method: 'GET',
      mode: 'cors'
    });
    
    const imported = await response.json();
    if (imported && imported.settings && imported.dailyData) {
      // Check if settings are empty (newly initialized sheet database)
      const isEmptyCloudDb = Object.keys(imported.settings).length === 0;

      if (isEmptyCloudDb) {
        console.log('Cloud database is empty. Performing initial upload to populate spreadsheet...');
        if (badge) {
          badge.textContent = '初期アップロード中...';
          badge.className = 'badge badge-normal';
        }
        await uploadToCloud();
        return;
      }

      // Overwrite state
      appSettings = imported.settings;
      dailyData = imported.dailyData;
      tasks = (imported.tasks || []).map(t => ({
        ...t,
        assignee: Array.isArray(t.assignee) ? t.assignee : (t.assignee ? [t.assignee] : [])
      }));
      menuData = imported.menu || defaultMenu;
      equipment = (imported.equipment || defaultEquipment).map(item => ({
        ...item,
        updatedAt: item.updatedAt || '2026-07-05'
      }));

      // Save to local cache
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(appSettings));
      localStorage.setItem(STORAGE_KEY_DAILY_DATA, JSON.stringify(dailyData));
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
      localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(menuData));
      localStorage.setItem(STORAGE_KEY_EQUIPMENT, JSON.stringify(equipment));

      if (badge) {
        badge.textContent = '同期オン（スプレッドシート同期中）';
        badge.className = 'badge badge-success';
      }
      populateSettingsForm();
    }
  } catch (error) {
    console.error('GAS download failed:', error);
    if (badge) {
      badge.textContent = '同期読込エラー';
      badge.className = 'badge badge-normal danger';
    }
  }
}

// ----------------------------------------------------
// TAB: EQUIPMENT & INVENTORY MANAGEMENT RENDER & CRUD
// ----------------------------------------------------
function renderEquipmentTab() {
  const tableBody = document.getElementById('equipment-table-body');
  const noMessageEl = document.getElementById('no-equipment-message');
  
  if (!tableBody) return;
  tableBody.innerHTML = '';

  // Initialize date input default to today
  const dateInput = document.getElementById('eq-item-date');
  if (dateInput && !dateInput.value) {
    dateInput.value = formatDate(new Date());
  }

  const searchVal = (document.getElementById('equipment-search').value || '').toLowerCase().trim();
  const filterCat = document.getElementById('equipment-filter-cat').value;

  // Filter equipment
  const filtered = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchVal);
    const matchesCat = filterCat === 'all' || item.category === filterCat;
    return matchesSearch && matchesCat;
  });

  if (filtered.length === 0) {
    noMessageEl.style.display = 'block';
  } else {
    noMessageEl.style.display = 'none';

    filtered.forEach(item => {
      const tr = document.createElement('tr');
      
      // Stock alert color code
      let qtyClass = '';
      if (item.qty === 0) {
        qtyClass = 'qty-alert-yellow';
      } else if (item.qty === 1) {
        qtyClass = 'qty-alert-red';
      } else if (item.qty === 2) {
        qtyClass = 'qty-alert-orange';
      }

      const dateFormatted = item.updatedAt ? item.updatedAt.replace(/-/g, '/') : '-';
      
      tr.innerHTML = `
        <td><span class="badge badge-normal">${item.category}</span></td>
        <td style="font-weight: 500;">${item.name}</td>
        <td style="text-align: center;">
          <div style="display: inline-flex; align-items: center; gap: 8px;">
            <button class="btn btn-outline" style="padding: 2px 8px; font-size: 11px;" onclick="changeEquipmentQty('${item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
            <input type="number" class="form-control ${qtyClass}" value="${item.qty}" min="0" style="width: 60px; text-align: center; padding: 2px 4px; height: auto;" onchange="updateEquipmentQtyDirect('${item.id}', this.value)">
            <button class="btn btn-outline" style="padding: 2px 8px; font-size: 11px;" onclick="changeEquipmentQty('${item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
          </div>
        </td>
        <td style="text-align: center; color: var(--text-muted); font-size: 12px;">${dateFormatted}</td>
        <td style="text-align: center;">
          <button class="btn btn-outline text-danger" style="padding: 4px 8px; font-size: 11px; border-color: rgba(239, 68, 68, 0.2);" onclick="deleteEquipmentItem('${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
        </td>
      `;

      tableBody.appendChild(tr);
    });
  }
}

function addNewEquipmentItem() {
  const category = document.getElementById('eq-item-category').value;
  const name = document.getElementById('eq-item-name').value.trim();
  const qty = parseInt(document.getElementById('eq-item-qty').value) || 0;
  const entryDate = document.getElementById('eq-item-date').value || formatDate(new Date());

  if (!name) {
    showToast('品目名を入力してください。', 'danger');
    return;
  }

  // Check if item already exists in same category
  const exists = equipment.some(item => item.name.toLowerCase() === name.toLowerCase() && item.category === category);
  if (exists) {
    showToast('このカテゴリーに既に同じ名前の備品が存在します。', 'danger');
    return;
  }

  const newItem = {
    id: 'eq_' + Date.now(),
    name: name,
    category: category,
    qty: qty,
    updatedAt: entryDate
  };

  equipment.push(newItem);
  saveToLocalStorage();
  showToast(`備品「${name}」を追加しました！`);
  
  // Clear inputs
  document.getElementById('eq-item-name').value = '';
  document.getElementById('eq-item-qty').value = '0';
  document.getElementById('eq-item-date').value = formatDate(new Date());

  renderApp();
}

function deleteEquipmentItem(id) {
  const item = equipment.find(eq => eq.id === id);
  if (item && confirm(`備品「${item.name}」を削除しますか？`)) {
    equipment = equipment.filter(eq => eq.id !== id);
    saveToLocalStorage();
    showToast(`備品「${item.name}」を削除しました。`, 'danger');
    renderApp();
  }
}

function changeEquipmentQty(id, delta) {
  const item = equipment.find(eq => eq.id === id);
  if (item) {
    item.qty = Math.max(0, item.qty + delta);
    item.updatedAt = formatDate(new Date());
    saveToLocalStorage();
    renderApp();
  }
}

function updateEquipmentQtyDirect(id, value) {
  const item = equipment.find(eq => eq.id === id);
  if (item) {
    const val = parseInt(value);
    item.qty = isNaN(val) ? 0 : Math.max(0, val);
    item.updatedAt = formatDate(new Date());
    saveToLocalStorage();
    renderApp();
  }
}
