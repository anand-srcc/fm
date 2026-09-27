/**
 * Financial Management (FM) Master Portal Controller
 * Supports:
 * - Clean White / Light Academic Theme (matching HTML files 1:1)
 * - Switch to Mobile Mode (Dedicated mobile view toggle & mobile bottom navigation bar)
 * - Dynamic Subpart Navigation & Iframe Synchronization
 */

(function () {
  'use strict';

  // State Management
  const state = {
    view: 'dashboard', // 'dashboard' | 'workspace'
    activeType: null, // 'chapter' | 'lab'
    activeItem: null, // chapter or lab object from FM_PORTAL_CONFIG
    activeSubpartId: null,
    sidebarCollapsed: false,
    theme: localStorage.getItem('fm_theme') || 'light', // Light theme by default
    mobileMode: localStorage.getItem('fm_mobile_mode') === 'true',
    labFilter: 'all',
    searchQuery: '',
    searchModalActive: false,
    searchHighlightIdx: 0,
    searchResults: []
  };

  // DOM Elements Cache
  const els = {};

  function initApp() {
    cacheElements();
    applyTheme(state.theme);
    applyMobileMode(state.mobileMode);
    renderDashboard();
    bindEvents();
    handleRouteFromHash();
  }

  function cacheElements() {
    els.appRoot = document.getElementById('app-root');
    els.navLinks = document.querySelectorAll('.nav-link');
    els.themeBtn = document.getElementById('themeToggleBtn');
    els.fullscreenBtn = document.getElementById('fullscreenToggleBtn');
    els.searchTriggerBtn = document.getElementById('searchTriggerBtn');
    els.searchModal = document.getElementById('searchModal');
    els.modalSearchInput = document.getElementById('modalSearchInput');
    els.modalSearchResults = document.getElementById('modalSearchResults');
    els.modalCloseBtn = document.getElementById('modalCloseBtn');
    els.heroSearchInput = document.getElementById('heroSearchInput');

    // Mobile mode elements
    els.mobileToggleBtn = document.getElementById('mobileModeToggleBtn');
    els.mobileModeLabel = document.getElementById('mobileModeLabel');
    els.mobileBottomBar = document.getElementById('mobileBottomBar');
    els.mobileBottomItems = document.querySelectorAll('.mobile-bottom-item');
    els.mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');
    els.mobileDrawerSheet = document.querySelector('.mobile-drawer-sheet');
    els.mobileDrawerTitle = document.getElementById('mobileDrawerTitle');
    els.mobileDrawerClose = document.getElementById('mobileDrawerClose');
    els.mobileDrawerBody = document.getElementById('mobileDrawerBody');
    els.mobileDrawerBtn = document.getElementById('mobileDrawerBtn');

    // Views
    els.dashboardView = document.getElementById('dashboardView');
    els.workspaceView = document.getElementById('workspaceView');

    // Workspace elements
    els.workspaceSidebar = document.getElementById('workspaceSidebar');
    els.sidebarHeaderTitle = document.getElementById('sidebarHeaderTitle');
    els.sidebarHeaderSubtitle = document.getElementById('sidebarHeaderSubtitle');
    els.sidebarFilterInput = document.getElementById('sidebarFilterInput');
    els.sidebarNavContainer = document.getElementById('sidebarNavContainer');
    els.sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    els.breadcrumbHome = document.getElementById('breadcrumbHome');
    els.breadcrumbType = document.getElementById('breadcrumbType');
    els.breadcrumbItem = document.getElementById('breadcrumbItem');
    els.breadcrumbSubpart = document.getElementById('breadcrumbSubpart');
    els.subpartsRibbon = document.getElementById('subpartsRibbon');
    els.contentIframe = document.getElementById('contentIframe');
    els.iframeLoader = document.getElementById('iframeLoader');
    els.btnBackDashboard = document.getElementById('btnBackDashboard');
    els.btnOpenNewTab = document.getElementById('btnOpenNewTab');
    els.btnWsFullscreen = document.getElementById('btnWsFullscreen');

    // Dashboard containers
    els.chaptersGrid = document.getElementById('chaptersGrid');
    els.excelLabsGrid = document.getElementById('excelLabsGrid');
    els.excelFilterBtns = document.querySelectorAll('.excel-filter-btn');
  }

  function bindEvents() {
    // Brand click returns to home
    document.getElementById('brandLogo').addEventListener('click', () => switchView('dashboard'));

    // Top Navigation Links
    els.navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = link.dataset.target;
        handleNavigationTarget(target);
      });
    });

    // Mobile Bottom Bar Navigation Links
    els.mobileBottomItems.forEach(item => {
      item.addEventListener('click', e => {
        const target = item.dataset.target;
        if (target) {
          handleNavigationTarget(target);
          updateMobileBottomActive(target);
        }
      });
    });

    // Mobile Mode Toggle
    els.mobileToggleBtn.addEventListener('click', toggleMobileMode);

    // Mobile Drawer Controls
    if (els.mobileDrawerBtn) {
      els.mobileDrawerBtn.addEventListener('click', () => {
        if (state.view === 'workspace') {
          openMobileDrawer();
        } else {
          // If on home, prompt or jump to chapter 1
          openChapter('ch1');
          setTimeout(openMobileDrawer, 300);
        }
      });
    }
    if (els.mobileDrawerClose) {
      els.mobileDrawerClose.addEventListener('click', closeMobileDrawer);
    }
    if (els.mobileDrawerOverlay) {
      els.mobileDrawerOverlay.addEventListener('click', e => {
        if (e.target === els.mobileDrawerOverlay) closeMobileDrawer();
      });
    }

    // Theme Toggle
    els.themeBtn.addEventListener('click', toggleTheme);

    // Fullscreen Toggle
    els.fullscreenBtn.addEventListener('click', toggleFullscreen);
    if (els.btnWsFullscreen) {
      els.btnWsFullscreen.addEventListener('click', toggleFullscreen);
    }

    // Search Triggers
    els.searchTriggerBtn.addEventListener('click', openSearchModal);
    if (els.heroSearchInput) {
      els.heroSearchInput.addEventListener('click', openSearchModal);
      els.heroSearchInput.addEventListener('focus', openSearchModal);
    }
    els.modalCloseBtn.addEventListener('click', closeSearchModal);
    els.searchModal.addEventListener('click', e => {
      if (e.target === els.searchModal) closeSearchModal();
    });

    // Modal Search Input
    els.modalSearchInput.addEventListener('input', e => {
      handleModalSearch(e.target.value);
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearchModal();
      } else if (e.key === 'Escape') {
        if (state.searchModalActive) closeSearchModal();
        closeMobileDrawer();
      } else if (state.searchModalActive && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter')) {
        handleSearchKeyboard(e);
      }
    });

    // Workspace Controls
    els.sidebarToggleBtn.addEventListener('click', () => {
      // If in mobile mode or small screen, open mobile drawer instead!
      if (window.innerWidth <= 768 || state.mobileMode) {
        openMobileDrawer();
      } else {
        state.sidebarCollapsed = !state.sidebarCollapsed;
        els.workspaceSidebar.classList.toggle('collapsed', state.sidebarCollapsed);
      }
    });

    els.breadcrumbHome.addEventListener('click', () => switchView('dashboard'));
    els.btnBackDashboard.addEventListener('click', () => switchView('dashboard'));

    els.btnOpenNewTab.addEventListener('click', () => {
      if (state.activeItem) {
        let url = state.activeItem.file;
        if (state.activeSubpartId) url += '#' + state.activeSubpartId;
        window.open(url, '_blank');
      }
    });

    // Sidebar Filter input
    els.sidebarFilterInput.addEventListener('input', e => {
      filterSidebarItems(e.target.value);
    });

    // Excel Labs Filter buttons
    els.excelFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        els.excelFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.labFilter = btn.dataset.filter;
        renderExcelLabsGrid();
      });
    });

    // Listen for tab changes communicated from iframe
    window.addEventListener('message', e => {
      if (e.data && e.data.type === 'FM_TAB_CHANGED' && e.data.tabId) {
        onIframeTabChanged(e.data.tabId);
      }
    });

    // Iframe loaded handler
    els.contentIframe.addEventListener('load', () => {
      els.iframeLoader.classList.add('hidden');
      if (state.activeSubpartId) {
        sendTabActivationToIframe(state.activeSubpartId);
      }
    });

    // Hash navigation
    window.addEventListener('hashchange', handleRouteFromHash);
  }

  function handleNavigationTarget(target) {
    if (target === 'dashboard') {
      switchView('dashboard');
    } else if (target === 'excel_labs') {
      if (state.view === 'dashboard') {
        document.getElementById('excelLabsSection').scrollIntoView({ behavior: 'smooth' });
      } else {
        openLab(FM_PORTAL_CONFIG.labs[0].id);
      }
    } else if (target.startsWith('ch')) {
      openChapter(target);
    }
  }

  function updateMobileBottomActive(target) {
    els.mobileBottomItems.forEach(item => {
      item.classList.toggle('active', item.dataset.target === target);
    });
  }

  // ===================================================================
  // MOBILE MODE LOGIC
  // ===================================================================
  function applyMobileMode(isMobile) {
    state.mobileMode = isMobile;
    document.body.classList.toggle('mobile-mode-active', isMobile);
    localStorage.setItem('fm_mobile_mode', isMobile);

    if (els.mobileModeLabel) {
      els.mobileModeLabel.textContent = isMobile ? 'Switch to Desktop Mode' : 'Switch to Mobile Mode';
    }
    if (els.mobileToggleBtn) {
      els.mobileToggleBtn.classList.toggle('active', isMobile);
      els.mobileToggleBtn.innerHTML = isMobile ? '<span>💻</span> <span class="btn-label">Desktop Mode</span>' : '<span>📱</span> <span class="btn-label">Mobile Mode</span>';
    }
  }

  function toggleMobileMode() {
    applyMobileMode(!state.mobileMode);
  }

  function openMobileDrawer() {
    if (!els.mobileDrawerOverlay) return;
    populateMobileDrawer();
    els.mobileDrawerOverlay.classList.add('open');
  }

  function closeMobileDrawer() {
    if (els.mobileDrawerOverlay) {
      els.mobileDrawerOverlay.classList.remove('open');
    }
  }

  function populateMobileDrawer() {
    if (!state.activeItem) return;

    if (state.activeType === 'chapter') {
      els.mobileDrawerTitle.textContent = `Ch 0${state.activeItem.num}: ${state.activeItem.title}`;
      let html = '';
      state.activeItem.categories.forEach(cat => {
        html += `<div style="font-size:0.75rem; font-weight:800; text-transform:uppercase; color:var(--text-muted); margin:12px 0 6px;">${cat.name}</div>`;
        cat.subparts.forEach(sp => {
          const isActive = sp.id === state.activeSubpartId;
          html += `
            <div class="mobile-drawer-item ${isActive ? 'active' : ''}" data-sp-id="${sp.id}" style="padding:10px 12px; border-radius:8px; margin-bottom:4px; background:${isActive ? '#eef3ff' : '#f8fafc'}; color:${isActive ? 'var(--blue)' : 'var(--text-primary)'}; font-weight:${isActive ? '750' : '500'}; font-size:0.85rem; display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
              <span>${sp.title}</span>
              <span style="font-size:0.7rem; background:#fff; padding:2px 6px; border-radius:4px; border:1px solid var(--border-light); font-family:var(--font-mono);">${sp.badge}</span>
            </div>
          `;
        });
      });
      els.mobileDrawerBody.innerHTML = html;
    } else {
      els.mobileDrawerTitle.textContent = state.activeItem.title;
      let html = '<div style="font-size:0.75rem; font-weight:800; text-transform:uppercase; color:var(--text-muted); margin:6px 0 8px;">Active Lab Modules</div>';
      state.activeItem.key_subparts.forEach(sp => {
        const isActive = sp.id === state.activeSubpartId;
        html += `
          <div class="mobile-drawer-item ${isActive ? 'active' : ''}" data-sp-id="${sp.id}" style="padding:10px 12px; border-radius:8px; margin-bottom:4px; background:${isActive ? '#eefbf5' : '#f8fafc'}; color:${isActive ? 'var(--green)' : 'var(--text-primary)'}; font-weight:${isActive ? '750' : '500'}; font-size:0.85rem; display:flex; justify-content:space-between; align-items:center; cursor:pointer;">
            <span>⚡ ${sp.title}</span>
            <span style="font-size:0.7rem; background:#fff; padding:2px 6px; border-radius:4px; border:1px solid var(--border-light);">Excel</span>
          </div>
        `;
      });
      els.mobileDrawerBody.innerHTML = html;
    }

    // Bind click events on drawer items
    els.mobileDrawerBody.querySelectorAll('.mobile-drawer-item').forEach(item => {
      item.addEventListener('click', () => {
        activateSubpart(item.dataset.spId);
        closeMobileDrawer();
      });
    });
  }

  // ===================================================================
  // DASHBOARD RENDERING
  // ===================================================================
  function renderDashboard() {
    renderChapterCards();
    renderExcelLabsGrid();
  }

  function renderChapterCards() {
    els.chaptersGrid.innerHTML = '';
    FM_PORTAL_CONFIG.chapters.forEach(ch => {
      const card = document.createElement('div');
      card.className = `chapter-card ch-${ch.num}`;

      // Pick top subparts for preview
      const previewSubparts = [];
      ch.categories.forEach(cat => {
        cat.subparts.slice(0, 2).forEach(sp => previewSubparts.push(sp));
      });
      const topPreview = previewSubparts.slice(0, 4);

      // Formulas snippet
      const formulasHtml = ch.formulas.slice(0, 2).map(f => `
        <div style="font-size:0.75rem; color:var(--text-secondary); background:#f8fafc; padding:5px 9px; border-radius:6px; border:1px solid var(--border-light); font-family:var(--font-mono); margin-bottom:4px;">
          <strong style="color:var(--text-heading);">${f.name}:</strong> <code>${f.formula}</code>
        </div>
      `).join('');

      card.innerHTML = `
        <div class="chapter-card-banner">
          <div class="card-top-meta">
            <span class="chapter-num-badge" style="border-color:${ch.accent}; color:${ch.accent};">Chapter 0${ch.num}</span>
            <div class="chapter-icon-wrapper">${ch.icon}</div>
          </div>
          <h3 class="chapter-card-title">${ch.title}</h3>
          <p class="chapter-card-desc">${ch.desc}</p>
        </div>
        <div class="chapter-card-body">
          <div style="margin-bottom:12px;">
            <div class="subparts-list-label">
              <span>Key Formulas Preview</span>
              <span style="color:${ch.accent}; font-family:var(--font-mono);">${ch.badge}</span>
            </div>
            ${formulasHtml}
          </div>
          
          <div class="subparts-list-label">
            <span>Explore Subparts & Topics</span>
            <span style="font-family:var(--font-mono);">${countSubparts(ch)} Modules</span>
          </div>

          <div class="subparts-preview-chips">
            ${topPreview.map(sp => `
              <div class="subpart-preview-item" data-ch="${ch.id}" data-sp="${sp.id}">
                <span class="title">⚡ ${sp.title}</span>
                <span class="tag">${sp.badge}</span>
              </div>
            `).join('')}
          </div>

          <div class="card-action-bar">
            <button class="btn-open-chapter" data-ch="${ch.id}">
              <span>Open Chapter ${ch.num} Workspace</span>
              <span>→</span>
            </button>
            <button class="btn-view-all-subparts" data-ch="${ch.id}" title="View all topics">
              <span>All (${countSubparts(ch)})</span>
            </button>
          </div>
        </div>
      `;

      // Bind card buttons
      card.querySelector('.btn-open-chapter').addEventListener('click', () => openChapter(ch.id));
      card.querySelector('.btn-view-all-subparts').addEventListener('click', () => openChapter(ch.id));
      card.querySelectorAll('.subpart-preview-item').forEach(item => {
        item.addEventListener('click', () => {
          openChapter(item.dataset.ch, item.dataset.sp);
        });
      });

      els.chaptersGrid.appendChild(card);
    });
  }

  function countSubparts(ch) {
    let count = 0;
    ch.categories.forEach(cat => {
      count += cat.subparts.length;
    });
    return count;
  }

  function renderExcelLabsGrid() {
    els.excelLabsGrid.innerHTML = '';
    const filteredLabs = FM_PORTAL_CONFIG.labs.filter(lab => {
      if (state.labFilter === 'all') return true;
      if (state.labFilter === 'capital_budgeting') return lab.category.includes('Capital Budgeting');
      if (state.labFilter === 'cost_of_capital') return lab.category.includes('Cost of Capital');
      if (state.labFilter === 'tvm') return lab.category.includes('Time Value');
      return true;
    });

    filteredLabs.forEach(lab => {
      const card = document.createElement('div');
      card.className = 'excel-lab-card';

      const formulasHtml = lab.excel_formulas.map(f => `
        <span class="excel-fn-chip">${f}</span>
      `).join('');

      card.innerHTML = `
        <div class="lab-card-header">
          <div class="lab-icon-box">${lab.icon}</div>
          <span class="lab-category-badge">${lab.badge}</span>
        </div>
        <h4 class="lab-title">${lab.title}</h4>
        <p class="lab-desc">${lab.desc}</p>
        <div class="lab-formula-tags">
          ${formulasHtml}
        </div>
        <div class="lab-card-footer">
          <span>${lab.key_subparts.length} Interactive Tools</span>
          <span class="lab-launch-link">
            <span>Launch Lab</span>
            <span>→</span>
          </span>
        </div>
      `;

      card.addEventListener('click', () => openLab(lab.id));
      els.excelLabsGrid.appendChild(card);
    });
  }

  // ===================================================================
  // NAVIGATION & WORKSPACE LAUNCHING
  // ===================================================================
  function openChapter(chId, subpartId = null) {
    const ch = FM_PORTAL_CONFIG.chapters.find(c => c.id === chId);
    if (!ch) return;

    state.activeType = 'chapter';
    state.activeItem = ch;
    state.activeSubpartId = subpartId || (ch.categories[0]?.subparts[0]?.id || null);

    updateNavPills('ch' + ch.num);
    updateMobileBottomActive('ch' + ch.num);
    setupWorkspaceForChapter(ch);
    switchView('workspace');
    loadWorkspaceContent(ch.file, state.activeSubpartId);
    updateUrlHash();
  }

  function openLab(labId, subpartId = null) {
    const lab = FM_PORTAL_CONFIG.labs.find(l => l.id === labId);
    if (!lab) return;

    state.activeType = 'lab';
    state.activeItem = lab;
    state.activeSubpartId = subpartId || (lab.key_subparts[0]?.id || null);

    updateNavPills('excel_labs');
    updateMobileBottomActive('excel_labs');
    setupWorkspaceForLab(lab);
    switchView('workspace');
    loadWorkspaceContent(lab.file, state.activeSubpartId);
    updateUrlHash();
  }

  function setupWorkspaceForChapter(ch) {
    els.sidebarHeaderTitle.textContent = `Chapter 0${ch.num}: ${ch.title}`;
    els.sidebarHeaderSubtitle.textContent = `${countSubparts(ch)} Study Modules & Tools`;

    els.breadcrumbType.textContent = 'Chapters';
    els.breadcrumbItem.textContent = `Chapter 0${ch.num}`;
    els.breadcrumbSubpart.textContent = getSubpartTitle(ch, state.activeSubpartId) || 'Foundations';

    // Populate Sidebar
    els.sidebarNavContainer.innerHTML = '';
    ch.categories.forEach(cat => {
      const group = document.createElement('div');
      group.className = 'sidebar-group';
      group.innerHTML = `<div class="sidebar-group-title">${cat.name}</div>`;

      cat.subparts.forEach(sp => {
        const item = document.createElement('div');
        item.className = `sidebar-nav-item ${sp.id === state.activeSubpartId ? 'active' : ''}`;
        item.dataset.spId = sp.id;
        item.innerHTML = `
          <span class="item-title">${sp.title}</span>
          <span class="item-badge">${sp.badge}</span>
        `;
        item.addEventListener('click', () => {
          activateSubpart(sp.id);
        });
        group.appendChild(item);
      });
      els.sidebarNavContainer.appendChild(group);
    });

    // Populate Horizontal Ribbon
    renderHorizontalRibbon(getAllSubparts(ch));
  }

  function setupWorkspaceForLab(lab) {
    els.sidebarHeaderTitle.textContent = lab.title;
    els.sidebarHeaderSubtitle.textContent = `Excel Practical & Modeling Lab`;

    els.breadcrumbType.textContent = 'Excel Labs';
    els.breadcrumbItem.textContent = lab.badge;
    els.breadcrumbSubpart.textContent = getLabSubpartTitle(lab, state.activeSubpartId) || 'Dashboard';

    // Populate Sidebar with active Lab tools
    els.sidebarNavContainer.innerHTML = '';

    const curGroup = document.createElement('div');
    curGroup.className = 'sidebar-group';
    curGroup.innerHTML = `<div class="sidebar-group-title">Active Lab Modules</div>`;
    lab.key_subparts.forEach(sp => {
      const item = document.createElement('div');
      item.className = `sidebar-nav-item ${sp.id === state.activeSubpartId ? 'active' : ''}`;
      item.dataset.spId = sp.id;
      item.innerHTML = `
        <span class="item-title">⚡ ${sp.title}</span>
        <span class="item-badge">Excel</span>
      `;
      item.addEventListener('click', () => {
        activateSubpart(sp.id);
      });
      curGroup.appendChild(item);
    });
    els.sidebarNavContainer.appendChild(curGroup);

    // Other Excel Labs quick jump
    const otherGroup = document.createElement('div');
    otherGroup.className = 'sidebar-group';
    otherGroup.innerHTML = `<div class="sidebar-group-title">All Excel Financial Labs</div>`;
    FM_PORTAL_CONFIG.labs.forEach(otherLab => {
      const otherItem = document.createElement('div');
      otherItem.className = `sidebar-nav-item ${otherLab.id === lab.id ? 'active' : ''}`;
      otherItem.innerHTML = `
        <span class="item-title">${otherLab.icon} ${otherLab.title}</span>
        <span class="item-badge">${otherLab.badge}</span>
      `;
      otherItem.addEventListener('click', () => {
        openLab(otherLab.id);
      });
      otherGroup.appendChild(otherItem);
    });
    els.sidebarNavContainer.appendChild(otherGroup);

    // Populate Horizontal Ribbon
    renderHorizontalRibbon(lab.key_subparts);
  }

  function renderHorizontalRibbon(subparts) {
    els.subpartsRibbon.innerHTML = '';
    subparts.forEach(sp => {
      const pill = document.createElement('div');
      pill.className = `ribbon-tab ${sp.id === state.activeSubpartId ? 'active' : ''}`;
      pill.dataset.spId = sp.id;
      pill.textContent = sp.title;
      pill.addEventListener('click', () => activateSubpart(sp.id));
      els.subpartsRibbon.appendChild(pill);
    });
  }

  function loadWorkspaceContent(file, subpartId) {
    els.iframeLoader.classList.remove('hidden');
    const targetUrl = subpartId ? `${file}#${subpartId}` : file;

    const currentSrc = els.contentIframe.getAttribute('src');
    if (currentSrc && currentSrc.split('#')[0] === file) {
      sendTabActivationToIframe(subpartId);
      setTimeout(() => els.iframeLoader.classList.add('hidden'), 150);
    } else {
      els.contentIframe.src = targetUrl;
    }
  }

  function activateSubpart(subpartId) {
    state.activeSubpartId = subpartId;

    // Update sidebar active class
    const sidebarItems = els.sidebarNavContainer.querySelectorAll('.sidebar-nav-item');
    sidebarItems.forEach(item => {
      item.classList.toggle('active', item.dataset.spId === subpartId);
    });

    // Update ribbon active class
    const ribbonTabs = els.subpartsRibbon.querySelectorAll('.ribbon-tab');
    ribbonTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.spId === subpartId);
      if (tab.dataset.spId === subpartId) {
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });

    // Update breadcrumb
    if (state.activeType === 'chapter') {
      els.breadcrumbSubpart.textContent = getSubpartTitle(state.activeItem, subpartId) || subpartId;
    } else {
      els.breadcrumbSubpart.textContent = getLabSubpartTitle(state.activeItem, subpartId) || subpartId;
    }

    sendTabActivationToIframe(subpartId);
    updateUrlHash();
  }

  function sendTabActivationToIframe(tabId) {
    if (!tabId || !els.contentIframe) return;

    // Method 1: postMessage
    try {
      if (els.contentIframe.contentWindow) {
        els.contentIframe.contentWindow.postMessage({
          type: 'FM_ACTIVATE_TAB',
          tabId: tabId
        }, '*');
      }
    } catch (e) {}

    // Method 2: direct window call if same-origin
    try {
      if (els.contentIframe.contentWindow && typeof els.contentIframe.contentWindow.activatePage === 'function') {
        els.contentIframe.contentWindow.activatePage(tabId);
      }
    } catch (e) {}

    // Method 3: update hash
    try {
      if (els.contentIframe.contentWindow && els.contentIframe.contentWindow.location) {
        els.contentIframe.contentWindow.location.hash = tabId;
      }
    } catch (e) {}
  }

  function onIframeTabChanged(tabId) {
    if (state.activeSubpartId !== tabId) {
      state.activeSubpartId = tabId;
      // Update sidebar
      const sidebarItems = els.sidebarNavContainer.querySelectorAll('.sidebar-nav-item');
      sidebarItems.forEach(item => {
        item.classList.toggle('active', item.dataset.spId === tabId);
      });
      // Update ribbon
      const ribbonTabs = els.subpartsRibbon.querySelectorAll('.ribbon-tab');
      ribbonTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.spId === tabId);
      });
      // Update breadcrumb
      if (state.activeType === 'chapter') {
        els.breadcrumbSubpart.textContent = getSubpartTitle(state.activeItem, tabId) || tabId;
      } else {
        els.breadcrumbSubpart.textContent = getLabSubpartTitle(state.activeItem, tabId) || tabId;
      }
      updateUrlHash();
    }
  }

  function filterSidebarItems(query) {
    const q = query.toLowerCase().trim();
    const items = els.sidebarNavContainer.querySelectorAll('.sidebar-nav-item');
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(q) ? 'flex' : 'none';
    });
  }

  function switchView(viewName) {
    state.view = viewName;
    if (viewName === 'dashboard') {
      els.dashboardView.classList.add('active');
      els.workspaceView.classList.remove('active');
      updateNavPills('dashboard');
      updateMobileBottomActive('dashboard');
      window.location.hash = '';
    } else {
      els.dashboardView.classList.remove('active');
      els.workspaceView.classList.add('active');
    }
  }

  function updateNavPills(activeTarget) {
    els.navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.target === activeTarget);
    });
  }

  // ===================================================================
  // SEARCH MODAL & INDEX ENGINE
  // ===================================================================
  function openSearchModal() {
    state.searchModalActive = true;
    els.searchModal.classList.add('active');
    els.modalSearchInput.value = '';
    els.modalSearchInput.focus();
    handleModalSearch('');
  }

  function closeSearchModal() {
    state.searchModalActive = false;
    els.searchModal.classList.remove('active');
  }

  function handleModalSearch(query) {
    const q = query.toLowerCase().trim();
    state.searchQuery = q;
    state.searchResults = [];

    // Search chapters and subparts
    FM_PORTAL_CONFIG.chapters.forEach(ch => {
      ch.categories.forEach(cat => {
        cat.subparts.forEach(sp => {
          if (!q || sp.title.toLowerCase().includes(q) || sp.desc.toLowerCase().includes(q) || sp.badge.toLowerCase().includes(q) || ch.title.toLowerCase().includes(q)) {
            state.searchResults.push({
              type: 'chapter',
              item: ch,
              subpart: sp,
              title: sp.title,
              subtitle: `Chapter 0${ch.num}: ${ch.title} • ${cat.name}`,
              badge: sp.badge,
              icon: ch.icon
            });
          }
        });
      });
      // Also search formulas
      ch.formulas.forEach(form => {
        if (q && (form.name.toLowerCase().includes(q) || form.formula.toLowerCase().includes(q))) {
          state.searchResults.push({
            type: 'formula',
            item: ch,
            title: `Formula: ${form.name}`,
            subtitle: form.formula,
            badge: `Ch 0${ch.num} Formula`,
            icon: '📐'
          });
        }
      });
    });

    // Search Excel labs
    FM_PORTAL_CONFIG.labs.forEach(lab => {
      lab.key_subparts.forEach(sp => {
        if (!q || sp.title.toLowerCase().includes(q) || lab.title.toLowerCase().includes(q) || lab.category.toLowerCase().includes(q)) {
          state.searchResults.push({
            type: 'lab',
            item: lab,
            subpart: sp,
            title: sp.title,
            subtitle: `${lab.title} • ${lab.category}`,
            badge: 'Excel Lab',
            icon: lab.icon
          });
        }
      });
    });

    renderSearchResults();
  }

  function renderSearchResults() {
    els.modalSearchResults.innerHTML = '';
    const results = state.searchResults.slice(0, 30);
    state.searchHighlightIdx = 0;

    if (results.length === 0) {
      els.modalSearchResults.innerHTML = `
        <div style="padding:32px 16px; text-align:center; color:var(--text-muted);">
          No topics or formulas found for "<strong>${state.searchQuery}</strong>". Try searching for "NPV", "IRR", "Annuity", "WACC", or "=RATE".
        </div>
      `;
      return;
    }

    results.forEach((res, idx) => {
      const item = document.createElement('div');
      item.className = `search-result-item ${idx === 0 ? 'highlighted' : ''}`;
      item.innerHTML = `
        <div class="result-item-main">
          <span class="result-item-icon">${res.icon}</span>
          <div class="result-item-text">
            <h4>${res.title}</h4>
            <p>${res.subtitle}</p>
          </div>
        </div>
        <span class="result-item-badge">${res.badge}</span>
      `;

      item.addEventListener('click', () => {
        selectSearchResult(res);
      });
      els.modalSearchResults.appendChild(item);
    });
  }

  function handleSearchKeyboard(e) {
    const items = els.modalSearchResults.querySelectorAll('.search-result-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      state.searchHighlightIdx = (state.searchHighlightIdx + 1) % items.length;
      updateSearchHighlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      state.searchHighlightIdx = (state.searchHighlightIdx - 1 + items.length) % items.length;
      updateSearchHighlight(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const res = state.searchResults[state.searchHighlightIdx];
      if (res) selectSearchResult(res);
    }
  }

  function updateSearchHighlight(items) {
    items.forEach((item, idx) => {
      item.classList.toggle('highlighted', idx === state.searchHighlightIdx);
      if (idx === state.searchHighlightIdx) {
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  function selectSearchResult(res) {
    closeSearchModal();
    if (res.type === 'chapter' || res.type === 'formula') {
      openChapter(res.item.id, res.subpart?.id);
    } else if (res.type === 'lab') {
      openLab(res.item.id, res.subpart?.id);
    }
  }

  // ===================================================================
  // ROUTING & URL SYNC
  // ===================================================================
  function updateUrlHash() {
    if (state.view === 'workspace' && state.activeItem) {
      const sub = state.activeSubpartId ? `/${state.activeSubpartId}` : '';
      window.location.hash = `#/${state.activeType}/${state.activeItem.id}${sub}`;
    }
  }

  function handleRouteFromHash() {
    const hash = window.location.hash.replace('#/', '');
    if (!hash) {
      if (state.view !== 'dashboard') switchView('dashboard');
      return;
    }

    const parts = hash.split('/');
    const type = parts[0]; // 'chapter' or 'lab'
    const id = parts[1];
    const subpartId = parts[2] || null;

    if (type === 'chapter') {
      openChapter(id, subpartId);
    } else if (type === 'lab') {
      openLab(id, subpartId);
    }
  }

  // ===================================================================
  // UTILITIES & HELPERS
  // ===================================================================
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fm_theme', theme);
    els.themeBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }

  function toggleTheme() {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    state.theme = nextTheme;
    applyTheme(nextTheme);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  function getSubpartTitle(chapter, subpartId) {
    for (const cat of chapter.categories) {
      for (const sp of cat.subparts) {
        if (sp.id === subpartId) return sp.title;
      }
    }
    return null;
  }

  function getLabSubpartTitle(lab, subpartId) {
    for (const sp of lab.key_subparts) {
      if (sp.id === subpartId) return sp.title;
    }
    return null;
  }

  function getAllSubparts(chapter) {
    const list = [];
    chapter.categories.forEach(cat => {
      cat.subparts.forEach(sp => list.push(sp));
    });
    return list;
  }

  // Launch on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
