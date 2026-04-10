import { drawRadar } from './chart.js'
import { generateShareImage } from './share.js'

const LEVEL_LABEL = { L: '低', M: '中', H: '高' }
const LEVEL_CLASS = { L: 'level-low', M: 'level-mid', H: 'level-high' }

/**
 * 渲染测试结果
 */
export function renderResult(result, userLevels, dimOrder, dimDefs, config) {
  const { primary, secondary, rankings, mode } = result

  // Kicker
  const kicker = document.getElementById('result-kicker')
  if (mode === 'smoker') kicker.textContent = '隐藏画像已激活'
  else if (mode === 'balanced') kicker.textContent = '系统强制兜底'
  else kicker.textContent = '你的主类型'

  // 主类型
  document.getElementById('result-code').textContent = primary.code
  document.getElementById('result-name').textContent = primary.cn

  // 匹配度
  document.getElementById('result-badge').textContent =
    `匹配度 ${primary.similarity}%` + (primary.exact != null ? ` · 精准命中 ${primary.exact}/15 维` : '')

  // 角色卡：名称、代码、tagline、图片
  document.getElementById('char-type-name').textContent = primary.cn
  document.getElementById('char-type-code').textContent = primary.code
  document.getElementById('char-tagline').textContent = primary.intro || ''
  
  // 插入图片到 char-illus 区域
  const illusEl = document.getElementById('char-illus')
  illusEl.innerHTML = ''
  const img = document.createElement('img')
  img.src = `/HBTI/images/${primary.code}.png`
  img.alt = primary.cn
  img.style.width = '160px'
  img.style.height = 'auto'
  img.style.display = 'block'
  illusEl.appendChild(img)

  // Intro & 描述
  document.getElementById('result-intro').textContent = primary.intro || ''
  document.getElementById('result-desc').textContent = primary.desc || ''

  // 次要匹配
  const secEl = document.getElementById('result-secondary')
  if (secondary && (mode === 'smoker' || mode === 'balanced')) {
    secEl.style.display = ''
    document.getElementById('secondary-info').textContent =
      `${secondary.code}（${secondary.cn}）· 匹配度 ${secondary.similarity}%`
  } else {
    secEl.style.display = 'none'
  }

  // 雷达图
  const canvas = document.getElementById('radar-chart')
  drawRadar(canvas, userLevels, dimOrder, dimDefs)

  // 维度详情
  const detailEl = document.getElementById('dimensions-detail')
  detailEl.innerHTML = ''
  for (const dim of dimOrder) {
    const level = userLevels[dim] || 'M'
    const def = dimDefs[dim]
    if (!def) continue

    const row = document.createElement('div')
    row.className = 'dim-row'
    row.innerHTML = `
      <div class="dim-header">
        <span class="dim-name">${def.name}</span>
        <span class="dim-level ${LEVEL_CLASS[level]}">${LEVEL_LABEL[level]}</span>
      </div>
      <div class="dim-desc">${def.levels[level]}</div>
    `
    detailEl.appendChild(row)
  }

  // TOP 5
  const topEl = document.getElementById('top-list')
  topEl.innerHTML = ''
  const top5 = rankings.slice(0, 5)
  top5.forEach((t, i) => {
    const item = document.createElement('div')
    item.className = 'top-item'
    item.innerHTML = `
      <span class="top-rank">#${i + 1}</span>
      <span class="top-code">${t.code}</span>
      <span class="top-name">${t.cn}</span>
      <span class="top-sim">${t.similarity}%</span>
    `
    topEl.appendChild(item)
  })

  // 免责声明
  document.getElementById('disclaimer').textContent =
    mode === 'normal' ? config.display.funNote : config.display.funNoteSpecial

  // 下载分享图
  const btnDownload = document.getElementById('btn-download')
  btnDownload.onclick = () => {
    generateShareImage(primary, userLevels, dimOrder, dimDefs, mode)
  }

  // 复制 AI Agent 命令
  const btnAgent = document.getElementById('btn-agent')
  btnAgent.onclick = () => {
    const cmd = `git clone https://github.com/pingfanfan/SBTI.git && cd SBTI && npm install && npm run dev`
    navigator.clipboard.writeText(cmd).then(() => {
      btnAgent.textContent = '已复制!'
      setTimeout(() => { btnAgent.textContent = '复制一键部署命令' }, 2000)
    })
  }
}

/**
 * 根据类型 code 返回对应的 SVG 角色插图字符串
 * 共分为几个视觉风格组，未匹配到的走默认通用人形
 */
function buildCharSVG(code) {
  const c = (code || '').toUpperCase()

  // 颜色取项目的 accent 绿系
  const body  = '#5a7a5c'
  const skin  = '#f5cba7'
  const dark  = '#3d5443'
  const light = '#8aac8c'
  const bg    = '#c8deca'

  // --- 高压/焦虑系：手举起、汗珠 ---
  if (['ANX','STRESS','OVERTHINK','WIKI-R','OBSESS','PANIC-B'].includes(c)) {
    return `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="115" rx="26" ry="28" fill="${body}"/>
      <rect x="54" y="76" width="13" height="14" rx="4" fill="${skin}"/>
      <ellipse cx="60" cy="67" rx="19" ry="20" fill="${skin}"/>
      <ellipse cx="60" cy="51" rx="19" ry="12" fill="${dark}"/>
      <ellipse cx="44" cy="61" rx="7" ry="9" fill="${dark}"/>
      <ellipse cx="76" cy="61" rx="7" ry="9" fill="${dark}"/>
      <ellipse cx="52" cy="66" rx="4.5" ry="5" fill="white"/>
      <ellipse cx="68" cy="66" rx="4.5" ry="5" fill="white"/>
      <circle cx="52" cy="67" r="2.5" fill="#333"/>
      <circle cx="68" cy="67" r="2.5" fill="#333"/>
      <circle cx="53.2" cy="65.5" r="1" fill="white"/>
      <circle cx="69.2" cy="65.5" r="1" fill="white"/>
      <path d="M46 60 Q52 56 58 60" stroke="${dark}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M62 60 Q68 56 74 60" stroke="${dark}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M53 78 Q60 74 67 78" stroke="#c0896b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <ellipse cx="78" cy="57" rx="3" ry="4.5" fill="#b0d4ea"/>
      <path d="M34 100 Q24 86 27 76" stroke="${body}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <ellipse cx="27" cy="74" rx="6" ry="6" fill="${skin}"/>
      <path d="M86 100 Q96 86 93 76" stroke="${body}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <ellipse cx="93" cy="74" rx="6" ry="6" fill="${skin}"/>
      <rect x="44" y="140" width="12" height="10" rx="3" fill="${dark}"/>
      <rect x="64" y="140" width="12" height="10" rx="3" fill="${dark}"/>
      <circle cx="96" cy="42" r="2.5" fill="${light}" opacity="0.7"/>
      <circle cx="103" cy="33" r="4" fill="${light}" opacity="0.55"/>
      <circle cx="111" cy="22" r="7" fill="${light}" opacity="0.45"/>
      <text x="108" y="26" font-size="8" fill="${dark}" text-anchor="middle" font-family="sans-serif">?!</text>
    </svg>`
  }

  // --- 久坐/懒系：坐姿或趴着 ---
  if (['SED','SLOTH','ZOMBIE','DEAD','WRECK','JOKER','MEH'].includes(c)) {
    return `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="118" width="100" height="12" rx="6" fill="${bg}"/>
      <rect x="18" y="92" width="84" height="32" rx="10" fill="${body}"/>
      <rect x="26" y="76" width="12" height="18" rx="4" fill="${skin}"/>
      <rect x="82" y="76" width="12" height="18" rx="4" fill="${skin}"/>
      <rect x="54" y="72" width="12" height="14" rx="4" fill="${skin}"/>
      <ellipse cx="60" cy="62" rx="19" ry="20" fill="${skin}"/>
      <ellipse cx="60" cy="46" rx="19" ry="12" fill="${dark}"/>
      <ellipse cx="52" cy="61" rx="4" ry="4.5" fill="white"/>
      <ellipse cx="68" cy="61" rx="4" ry="4.5" fill="white"/>
      <circle cx="52" cy="62.5" r="2.2" fill="#333"/>
      <circle cx="68" cy="62.5" r="2.2" fill="#333"/>
      <path d="M52 70 Q60 74 68 70" stroke="#c0896b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M48 56 Q52 59 56 56" stroke="${dark}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M64 56 Q68 59 72 56" stroke="${dark}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <rect x="44" y="128" width="14" height="16" rx="4" fill="${dark}"/>
      <rect x="62" y="128" width="14" height="16" rx="4" fill="${dark}"/>
      <text x="90" y="50" font-size="18" text-anchor="middle" font-family="sans-serif" fill="${light}" opacity="0.7">z</text>
      <text x="100" y="38" font-size="14" text-anchor="middle" font-family="sans-serif" fill="${light}" opacity="0.55">z</text>
      <text x="108" y="26" font-size="10" text-anchor="middle" font-family="sans-serif" fill="${light}" opacity="0.4">z</text>
    </svg>`
  }

  // --- 高压职场/奋斗系：领带 + 公文包姿态 ---
  if (['GRIND','H3','STRESS','TRUST-D','COPY-P'].includes(c)) {
    return `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="115" rx="26" ry="28" fill="${body}"/>
      <rect x="54" y="76" width="13" height="14" rx="4" fill="${skin}"/>
      <rect x="56" y="82" width="8" height="20" rx="2" fill="${dark}"/>
      <ellipse cx="60" cy="67" rx="19" ry="20" fill="${skin}"/>
      <ellipse cx="60" cy="51" rx="19" ry="12" fill="${dark}"/>
      <ellipse cx="52" cy="66" rx="4.5" ry="5" fill="white"/>
      <ellipse cx="68" cy="66" rx="4.5" ry="5" fill="white"/>
      <circle cx="52" cy="67" r="2.5" fill="#333"/>
      <circle cx="68" cy="67" r="2.5" fill="#333"/>
      <path d="M54 75 Q60 77 66 75" stroke="#c0896b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M34 102 Q30 115 32 128" stroke="${body}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <ellipse cx="32" cy="130" rx="6" ry="6" fill="${skin}"/>
      <path d="M86 102 Q96 112 92 126" stroke="${body}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <rect x="88" y="118" width="20" height="14" rx="4" fill="${dark}"/>
      <rect x="91" y="114" width="6" height="6" rx="2" fill="${dark}"/>
      <rect x="103" y="114" width="6" height="6" rx="2" fill="${dark}"/>
      <rect x="44" y="140" width="12" height="10" rx="3" fill="${dark}"/>
      <rect x="64" y="140" width="12" height="10" rx="3" fill="${dark}"/>
    </svg>`
  }

  // --- 健康/运动系：跑步姿态 ---
  if (['RATIO','DR.PRO','DATA-D','CLUELESS','BAL-S'].includes(c)) {
    return `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="55" cy="108" rx="22" ry="26" fill="${body}"/>
      <rect x="49" y="72" width="12" height="14" rx="4" fill="${skin}"/>
      <ellipse cx="55" cy="63" rx="18" ry="19" fill="${skin}"/>
      <ellipse cx="55" cy="48" rx="18" ry="11" fill="${dark}"/>
      <ellipse cx="47" cy="62" rx="4" ry="4.5" fill="white"/>
      <ellipse cx="63" cy="62" rx="4" ry="4.5" fill="white"/>
      <circle cx="47" cy="63" r="2.2" fill="#333"/>
      <circle cx="63" cy="63" r="2.2" fill="#333"/>
      <path d="M49 72 Q55 76 61 72" stroke="#c0896b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M33 90 Q20 78 24 66" stroke="${body}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <ellipse cx="24" cy="64" rx="6" ry="6" fill="${skin}"/>
      <path d="M77 90 Q88 80 84 68" stroke="${body}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <ellipse cx="84" cy="66" rx="6" ry="6" fill="${skin}"/>
      <path d="M43 132 Q36 144 28 148" stroke="${body}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="M67 132 Q76 140 80 150" stroke="${dark}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <circle cx="88" cy="42" r="6" fill="#f5e642" opacity="0.8"/>
      <path d="M85 42 L91 42 M88 39 L88 45 M86 40 L90 44 M90 40 L86 44" stroke="#e8a82a" stroke-width="1" stroke-linecap="round"/>
    </svg>`
  }

  // --- 默认通用站姿 ---
  return `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="115" rx="26" ry="28" fill="${body}"/>
    <rect x="54" y="76" width="13" height="14" rx="4" fill="${skin}"/>
    <ellipse cx="60" cy="67" rx="19" ry="20" fill="${skin}"/>
    <ellipse cx="60" cy="51" rx="19" ry="12" fill="${dark}"/>
    <ellipse cx="52" cy="66" rx="4.5" ry="5" fill="white"/>
    <ellipse cx="68" cy="66" rx="4.5" ry="5" fill="white"/>
    <circle cx="52" cy="67" r="2.5" fill="#333"/>
    <circle cx="68" cy="67" r="2.5" fill="#333"/>
    <circle cx="53.2" cy="65.5" r="1" fill="white"/>
    <circle cx="69.2" cy="65.5" r="1" fill="white"/>
    <path d="M54 75 Q60 77 66 75" stroke="#c0896b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M34 100 Q28 114 30 130" stroke="${body}" stroke-width="10" stroke-linecap="round" fill="none"/>
    <ellipse cx="30" cy="131" rx="6" ry="6" fill="${skin}"/>
    <path d="M86 100 Q92 114 90 130" stroke="${body}" stroke-width="10" stroke-linecap="round" fill="none"/>
    <ellipse cx="90" cy="131" rx="6" ry="6" fill="${skin}"/>
    <rect x="44" y="140" width="12" height="10" rx="3" fill="${dark}"/>
    <rect x="64" y="140" width="12" height="10" rx="3" fill="${dark}"/>
  </svg>`
}
