const state = {
  hex: '#1471EB',
  mode: 'art',
  theme: 'apple',
  focus: false,
  editingWidgets: false,
  widgets: ['hex', 'rgb', 'hsl', 'contrast']
};

const els = {
  body: document.body,
  clickLayer: document.querySelector('#clickLayer'),
  bigSwatch: document.querySelector('#bigSwatch'),
  hexBadge: document.querySelector('#hexBadge'),
  copyHexBtn: document.querySelector('#copyHexBtn'),
  colorInput: document.querySelector('#colorInput'),
  hexInput: document.querySelector('#hexInput'),
  rgbInput: document.querySelector('#rgbInput'),
  eyeDropperBtn: document.querySelector('#eyeDropperBtn'),
  imageUpload: document.querySelector('#imageUpload'),
  imageSampler: document.querySelector('#imageSampler'),
  canvas: document.querySelector('#canvas'),
  modeTabs: [...document.querySelectorAll('.mode-tab')],
  themeTabs: [...document.querySelectorAll('.theme-tab')],
  modeLabel: document.querySelector('#modeLabel'),
  colorName: document.querySelector('#colorName'),
  colorDescription: document.querySelector('#colorDescription'),
  modeInsightTitle: document.querySelector('#modeInsightTitle'),
  modeInsightSubtitle: document.querySelector('#modeInsightSubtitle'),
  modeInsightGrid: document.querySelector('#modeInsightGrid'),
  addCreativeWidgetBtn: document.querySelector('#addCreativeWidgetBtn'),
  themeTag: document.querySelector('#themeTag'),
  themeTitle: document.querySelector('#themeTitle'),
  themeDescription: document.querySelector('#themeDescription'),
  primaryTokenBtn: document.querySelector('#primaryTokenBtn'),
  secondaryTokenBtn: document.querySelector('#secondaryTokenBtn'),
  copyThemeBtn: document.querySelector('#copyThemeBtn'),
  focusViewBtn: document.querySelector('#focusViewBtn'),
  themeTokens: document.querySelector('#themeTokens'),
  creativePalette: document.querySelector('#creativePalette'),
  samplePhoto: document.querySelector('#samplePhoto'),
  photoTag: document.querySelector('#photoTag'),
  photoBriefTitle: document.querySelector('#photoBriefTitle'),
  photoBriefText: document.querySelector('#photoBriefText'),
  photoLighting: document.querySelector('#photoLighting'),
  photoWB: document.querySelector('#photoWB'),
  photoSubject: document.querySelector('#photoSubject'),
  photoEdit: document.querySelector('#photoEdit'),
  customizeBtn: document.querySelector('#customizeBtn'),
  resetWidgetsBtn: document.querySelector('#resetWidgetsBtn'),
  widgetGrid: document.querySelector('#widgetGrid'),
  widgetGallery: document.querySelector('#widgetGallery'),
  galleryItems: document.querySelector('#galleryItems'),
  nearbyTones: document.querySelector('#nearbyTones'),
  colorAudio: document.querySelector('#colorAudio'),
  musicToggleBtn: document.querySelector('#musicToggleBtn'),
  musicPrevBtn: document.querySelector('#musicPrevBtn'),
  musicNextBtn: document.querySelector('#musicNextBtn'),
  musicReloadBtn: document.querySelector('#musicReloadBtn'),
  musicTitle: document.querySelector('#musicTitle'),
  musicHint: document.querySelector('#musicHint'),
  musicMatchText: document.querySelector('#musicMatchText'),
  toast: document.querySelector('#toast')
};

const widgetCatalog = [
  ['hex', 'HEX', 'Exact web or software color code.'],
  ['rgb', 'RGB', 'Screen color values.'],
  ['hsl', 'HSL', 'Hue, saturation, lightness.'],
  ['contrast', 'Contrast Text', 'Best black/white text.'],
  ['wcag', 'WCAG', 'Readable text contrast grade.'],
  ['css', 'CSS Variable', 'Ready-to-paste CSS token.'],
  ['cmyk', 'CMYK', 'Print-oriented approximation.'],
  ['complement', 'Complement', 'Opposite hue pairing.'],
  ['uiRole', 'Best UI Use', 'Where this color fits in UI.'],
  ['paletteRole', 'Palette Role', 'Accent, trust, warning, etc.'],
  ['mood', 'Mood', 'Creative emotional read.'],
  ['luminance', 'Luminance', 'Perceived brightness.'],
  ['temperature', 'Temperature', 'Warm, cool, or neutral.'],
  ['undertone', 'Undertone', 'Subtle hue bias.'],
  ['photoUse', 'Photo Use', 'Where a photographer might use it.'],
  ['gradeHint', 'Grade Hint', 'Simple color grading direction.'],
  ['whiteBalance', 'WB Feel', 'Creative white-balance feeling.'],
  ['commonItem', 'Common Item', 'Everyday object with similar color.'],
  ['natureMatch', 'Nature Match', 'Natural reference point.'],
  ['iconicMatch', 'Iconic Match', 'Cultural or design-world association.'],
  ['fashionUse', 'Fashion Use', 'How this color wears.'],
  ['roomUse', 'Interior Use', 'Where it fits in a room.'],
  ['material', 'Material', 'Material this color feels like.'],
  ['season', 'Season', 'Seasonal color direction.'],
  ['soundtrack', 'Soundtrack', 'Music mood for this color.'],
  ['celebrityVibe', 'Celebrity Vibe', 'Style-vibe association, not a factual favorite.']
];

const widgetIcons = {
  hex: '⌗', rgb: '🌈', hsl: '◎', contrast: '◐', wcag: '✓', css: '{}', cmyk: '✦',
  complement: '↔', uiRole: '▣', paletteRole: '◩', mood: '✧', luminance: '☼',
  temperature: '℃', undertone: '◌', photoUse: '📷', gradeHint: '🎚', whiteBalance: '◒',
  commonItem: '◼', natureMatch: '🌿', iconicMatch: '★', fashionUse: '◈', roomUse: '▤',
  material: '◆', season: '✺', soundtrack: '♫', celebrityVibe: '✦'
};

const musicFallback = [
  { number: 1, name: 'Merry Christmas', color: 'Yellow Green' },
  { number: 2, name: 'Blue Hour Walk', color: 'Blue' },
  { number: 3, name: 'Velvet Room', color: 'Violet' },
  { number: 4, name: 'Warm Window', color: 'Orange' },
  { number: 5, name: 'Soft Porcelain', color: 'White' },
  { number: 6, name: 'Graphite Rain', color: 'Gray' },
  { number: 7, name: 'Rose Magazine', color: 'Pink' },
  { number: 8, name: 'Red Carpet', color: 'Red' },
  { number: 9, name: 'Deep Forest', color: 'Green' },
  { number: 10, name: 'Sea Glass', color: 'Cyan' },
  { number: 11, name: 'Amber Street', color: 'Yellow' },
  { number: 12, name: 'Coffee Sketchbook', color: 'Brown' }
];

let musicIndex = [...musicFallback];
let currentMusic = null;

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.slice(0,2), 16),
    g: parseInt(clean.slice(2,4), 16),
    b: parseInt(clean.slice(4,6), 16)
  };
}

function rgbToHex(r,g,b) {
  return '#' + [r,g,b].map(v => clamp(Math.round(v),0,255).toString(16).padStart(2,'0')).join('').toUpperCase();
}

function rgbToHsl(r,g,b) {
  r/=255; g/=255; b/=255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h=0, s=0, l=(max+min)/2;
  if (max !== min) {
    const d=max-min;
    s = l > .5 ? d/(2-max-min) : d/(max+min);
    if (max === r) h = (g-b)/d + (g < b ? 6 : 0);
    else if (max === g) h = (b-r)/d + 2;
    else h = (r-g)/d + 4;
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s*100), l: Math.round(l*100) };
}

function hslToRgb(h,s,l) {
  h = ((h % 360) + 360) % 360;
  s/=100; l/=100;
  const c=(1-Math.abs(2*l-1))*s;
  const x=c*(1-Math.abs((h/60)%2-1));
  const m=l-c/2;
  let r=0,g=0,b=0;
  if (h < 60) [r,g,b]=[c,x,0];
  else if (h < 120) [r,g,b]=[x,c,0];
  else if (h < 180) [r,g,b]=[0,c,x];
  else if (h < 240) [r,g,b]=[0,x,c];
  else if (h < 300) [r,g,b]=[x,0,c];
  else [r,g,b]=[c,0,x];
  return { r:(r+m)*255, g:(g+m)*255, b:(b+m)*255 };
}

function inRange(h,[a,b]) { return a <= b ? h >= a && h <= b : h >= a || h <= b; }

const basicNames = [
  [[345,15],'red'], [[16,44],'orange'], [[45,69],'yellow'], [[70,165],'green'],
  [[166,194],'cyan'], [[195,255],'blue'], [[256,289],'purple'], [[290,344],'pink']
];

const cbNames = [
  [[345,15],'warm red / crimson'], [[16,35],'orange-red / rust'], [[36,55],'orange-yellow / amber'],
  [[56,75],'yellow / lemon'], [[76,145],'yellow-green / leaf'], [[146,175],'blue-green / teal'],
  [[176,205],'cyan / aqua'], [[206,245],'blue / azure'], [[246,285],'blue-purple / violet'],
  [[286,325],'purple-pink / magenta'], [[326,344],'pink-red / rose']
];

const artNames = [
  [[345,15],'Vermilion Signal','A bold, confident red with poster-like energy.'],
  [[16,44],'Apricot Glow','A warm orange tone with cheerful editorial character.'],
  [[45,69],'Solar Ochre','A golden yellow with gallery-light warmth.'],
  [[70,165],'Botanical Sage','A fresh green that feels calm, natural, and softly modern.'],
  [[166,194],'Sea Glass Teal','A crisp teal with a clean refreshing feel.'],
  [[195,255],'Luminous Azure','A clean, modern blue with a polished digital feel.'],
  [[256,289],'Electric Iris','A vivid violet-blue that feels creative and futuristic.'],
  [[290,344],'Magenta Bloom','A saturated pink-purple with bright editorial quality.']
];

function chooseHue(list, h) {
  const found = list.find(item => inRange(h, item[0]));
  return found || list[0];
}

function getTemperature(h) {
  if (h <= 45 || h >= 330) return 'warm';
  if (h <= 90) return 'golden';
  if (h <= 170) return 'natural';
  if (h <= 255) return 'cool';
  return 'expressive';
}

function getCommonItem(hsl) {
  if (hsl.s < 8) return hsl.l < 25 ? 'charcoal pencil' : hsl.l > 78 ? 'porcelain cup' : 'concrete wall';
  if (hsl.h <= 20 || hsl.h >= 345) return hsl.l < 45 ? 'red velvet curtain' : 'ripe tomato skin';
  if (hsl.h <= 45) return hsl.l < 45 ? 'terracotta pot' : 'orange peel';
  if (hsl.h <= 70) return 'lemon candy wrapper';
  if (hsl.h <= 155) return hsl.l < 42 ? 'pine needle' : 'fresh matcha';
  if (hsl.h <= 190) return 'sea-glass bottle';
  if (hsl.h <= 245) return hsl.l < 42 ? 'navy notebook' : 'app icon blue';
  if (hsl.h <= 285) return 'violet gel pen';
  return hsl.l < 45 ? 'plum lipstick' : 'magenta highlighter';
}

function getNatureMatch(hsl) {
  if (hsl.s < 8) return hsl.l < 25 ? 'basalt stone' : hsl.l > 78 ? 'cloud edge' : 'river pebble';
  if (hsl.h <= 20 || hsl.h >= 345) return 'hibiscus petal';
  if (hsl.h <= 45) return 'desert clay';
  if (hsl.h <= 70) return 'sunlit pollen';
  if (hsl.h <= 155) return 'new leaf growth';
  if (hsl.h <= 190) return 'shallow lagoon';
  if (hsl.h <= 245) return 'blue hour sky';
  if (hsl.h <= 285) return 'twilight iris';
  return 'bougainvillea bloom';
}

function getIconicMatch(hsl) {
  if (hsl.s < 8) return 'gallery neutral / museum wall';
  if (hsl.h <= 20 || hsl.h >= 345) return 'editorial red-carpet accent';
  if (hsl.h <= 45) return 'mid-century orange poster';
  if (hsl.h <= 70) return 'vintage film warmth';
  if (hsl.h <= 155) return 'botanical brand palette';
  if (hsl.h <= 190) return 'spa / wellness aqua';
  if (hsl.h <= 245) return 'tech keynote blue';
  if (hsl.h <= 285) return 'luxury violet lighting';
  return 'fashion-week magenta';
}

function getFashionUse(hsl) {
  if (hsl.s < 8) return hsl.l < 35 ? 'tailored minimalist base' : 'soft neutral layering';
  if (hsl.l < 28) return 'evening statement color';
  if (hsl.l > 78) return 'spring accent or airy accessory';
  if (hsl.h <= 45 || hsl.h >= 345) return 'confident statement piece';
  if (hsl.h <= 165) return 'natural casualwear accent';
  if (hsl.h <= 245) return 'clean technical outerwear';
  return 'creative editorial accent';
}

function getRoomUse(hsl) {
  if (hsl.s < 8) return 'walls, stone, shelves, calm base';
  if (hsl.l < 30) return 'accent wall or dramatic reading corner';
  if (hsl.l > 80) return 'background wall tint or bedding';
  if (hsl.h <= 45 || hsl.h >= 345) return 'warm dining or entry accent';
  if (hsl.h <= 165) return 'plants, ceramics, calm studio corner';
  if (hsl.h <= 245) return 'office, bathroom, or tech workspace';
  return 'creative studio or vanity accent';
}

function getMaterialFeel(hsl) {
  if (hsl.s < 8) return hsl.l < 35 ? 'matte graphite' : 'smooth plaster';
  if (hsl.l < 25) return 'velvet shadow';
  if (hsl.s > 70 && hsl.l > 45) return 'gloss enamel';
  if (hsl.h <= 45 || hsl.h >= 345) return 'warm lacquer';
  if (hsl.h <= 165) return 'brushed ceramic';
  if (hsl.h <= 245) return 'polished glass';
  return 'silk satin';
}

function getSeason(hsl) {
  if (hsl.s < 8) return 'all-season neutral';
  if (hsl.h <= 45 || hsl.h >= 345) return hsl.l < 45 ? 'autumn / winter' : 'summer festival';
  if (hsl.h <= 75) return 'late spring';
  if (hsl.h <= 165) return 'spring / early summer';
  if (hsl.h <= 245) return hsl.l < 45 ? 'winter night' : 'clear summer';
  return 'nightlife / winter editorial';
}

function getSoundtrack(hsl) {
  if (hsl.s < 8) return 'ambient piano';
  if (hsl.h <= 45 || hsl.h >= 345) return hsl.l < 45 ? 'slow cinematic strings' : 'upbeat pop';
  if (hsl.h <= 75) return 'sunny indie pop';
  if (hsl.h <= 165) return 'acoustic / nature field recording';
  if (hsl.h <= 245) return 'clean synthwave';
  return 'dream pop / neon electronic';
}

function getCelebrityVibe(hsl) {
  if (hsl.s < 8) return 'minimalist red-carpet tailoring';
  if (hsl.h <= 20 || hsl.h >= 345) return 'bold red-carpet confidence';
  if (hsl.h <= 45) return 'retro pop-star warmth';
  if (hsl.h <= 75) return 'playful sunshine-stage look';
  if (hsl.h <= 165) return 'calm eco-luxury styling';
  if (hsl.h <= 245) return 'clean tech-founder keynote energy';
  if (hsl.h <= 285) return 'cinematic sci-fi premiere mood';
  return 'high-fashion editorial energy';
}

function getPhotoProfile(hsl) {
  if (hsl.s < 10) return { name:'neutral tonal scene', desc:'Low saturation suggests quiet documentary color, soft light, and understated grading.', wb:'neutral studio', use:'minimal still life or architecture', light:'large softbox', hint:'lean on contrast, texture, and light shape' };
  if (hsl.h <= 25 || hsl.h >= 345) return { name:hsl.l < 42 ? 'moody tungsten red' : 'golden-hour warmth', desc:'Warm, intimate, cinematic energy.', wb:'warm / tungsten', use:'portrait, food, performance', light:'low sun / warm rim', hint:'protect skin tones and deepen shadows' };
  if (hsl.h <= 55) return { name:'late-afternoon amber', desc:'Sunlit warmth for lifestyle and travel scenes.', wb:'warm sunset', use:'travel, lifestyle, editorial', light:'low sun', hint:'lift shadows and keep whites creamy' };
  if (hsl.h <= 85) return { name:'sunlit citrus frame', desc:'Bright, optimistic, and playful.', wb:'sunny daylight', use:'product, playful fashion, spring scenes', light:'clean daylight', hint:'keep contrast clean and color focal' };
  if (hsl.h <= 165) return { name:'fresh botanical scene', desc:'Natural and restorative.', wb:'fresh daylight', use:'landscape, interiors, calm portrait work', light:'diffused daylight', hint:'preserve natural greens' };
  if (hsl.h <= 220) return { name:'blue-hour editorial cool', desc:'Cool, modern, trustworthy, and cinematic.', wb:'cool blue hour', use:'urban portrait, water, product, tech', light:'blue-hour side light', hint:'protect highlights and keep cool shadows' };
  if (hsl.h <= 285) return { name:'neon twilight violet', desc:'Imaginative and stylized.', wb:'cool-magenta grade', use:'stylized portrait, nightlife, music visuals', light:'neon rim light', hint:'separate subject with rim light' };
  return { name:'editorial magenta glow', desc:'Expressive and playful.', wb:'creative magenta cast', use:'fashion, beauty, branded portraiture', light:'colored gel key light', hint:'support with calm neutrals' };
}

function colorName(rgb, hsl, mode = state.mode) {
  if (hsl.s < 7) {
    const name = hsl.l < 12 ? 'Black' : hsl.l > 90 ? 'White' : 'Gray';
    if (mode === 'art') return { name: name === 'Black' ? 'Charcoal Black' : name === 'White' ? 'Porcelain White' : 'Graphite Gray', desc:'A neutral tone where brightness and texture matter more than hue.' };
    if (mode === 'chemist') return { name:'pH 7 neutral gray', desc:'A chemistry-inspired neutral read. This is a visual analogy, not a real pH test.' };
    if (mode === 'colorblind') return { name: hsl.l < 35 ? 'dark gray / black' : hsl.l > 75 ? 'light gray / white' : 'middle gray', desc:'Clear neutral label based mainly on brightness.' };
    if (mode === 'photographer') return { name:'neutral tonal scene', desc:'A low-saturation photography palette for light, texture, and quiet composition.' };
    return { name: name.toLowerCase(), desc:'A simple basic color name.' };
  }

  if (mode === 'kindergarten') return { name: chooseHue(basicNames, hsl.h)[1], desc:'A simple basic color name that young children can recognize quickly.' };
  if (mode === 'colorblind') {
    const tone = hsl.l < 35 ? 'dark' : hsl.l > 72 ? 'light' : hsl.s > 70 ? 'bright' : 'muted';
    return { name:`${tone} ${chooseHue(cbNames, hsl.h)[1]}`, desc:'A precise plain-language label designed to reduce color confusion.' };
  }
  if (mode === 'chemist') {
    let ph, label;
    if (hsl.h >= 345 || hsl.h <= 18) { ph='pH 1–3'; label='acidic red'; }
    else if (hsl.h <= 42) { ph='pH 3–5'; label='acidic orange'; }
    else if (hsl.h <= 70) { ph='pH 5–6.5'; label='weak acidic yellow'; }
    else if (hsl.h <= 155) { ph='pH 6.5–8'; label='near-neutral green'; }
    else if (hsl.h <= 205) { ph='pH 8–10'; label='weak basic blue-green'; }
    else if (hsl.h <= 260) { ph='pH 10–12'; label='basic blue'; }
    else { ph='pH 12–14'; label='strong basic violet'; }
    const strength = hsl.s < 30 ? 'dilute' : hsl.s > 70 ? 'vivid' : 'moderate';
    return { name:`${ph}: ${strength} ${label}`, desc:'A universal-indicator-style analogy. It identifies visual similarity only, not actual pH.' };
  }
  if (mode === 'photographer') {
    const p = getPhotoProfile(hsl);
    return { name:p.name, desc:`${p.desc} Best use: ${p.use}. White-balance feel: ${p.wb}.` };
  }

  const art = chooseHue(artNames, hsl.h);
  return { name: art[1], desc: art[2] };
}

function luminance(rgb) {
  const f = x => {
    x /= 255;
    return x <= .03928 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4;
  };
  return .2126 * f(rgb.r) + .7152 * f(rgb.g) + .0722 * f(rgb.b);
}

function contrastRatio(a,b) {
  const l1 = luminance(a), l2 = luminance(b);
  return (Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);
}

function contrastText(rgb) {
  return contrastRatio(rgb, {r:0,g:0,b:0}) >= contrastRatio(rgb,{r:255,g:255,b:255}) ? 'Black' : 'White';
}

function rgbToCmyk(rgb) {
  const r=rgb.r/255, g=rgb.g/255, b=rgb.b/255;
  const k=1-Math.max(r,g,b);
  if (k === 1) return { c:0,m:0,y:0,k:100 };
  return {
    c: Math.round(((1-r-k)/(1-k))*100),
    m: Math.round(((1-g-k)/(1-k))*100),
    y: Math.round(((1-b-k)/(1-k))*100),
    k: Math.round(k*100)
  };
}

function complement(hsl) {
  const rgb = hslToRgb((hsl.h + 180) % 360, hsl.s, hsl.l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function uiRole(hsl) {
  if (hsl.s < 10) return ['Neutral base','Works for cards, borders, quiet backgrounds, and text systems.'];
  if (hsl.l < 24) return ['Hero dark','Best for dramatic headers, dark cards, or premium branding.'];
  if (hsl.l > 82) return ['Soft background','Good for page backgrounds, badges, and tinted surfaces.'];
  if (hsl.s > 65 && hsl.l > 38 && hsl.l < 66) return ['Primary accent','Strong enough for buttons, links, highlights, and active states.'];
  return ['Supporting accent','Best as a secondary highlight, chart color, or decorative tone.'];
}

function paletteRole(hsl) {
  if (hsl.s < 10) return 'Neutral';
  if (hsl.h <= 25 || hsl.h >= 345) return 'Alert / passion';
  if (hsl.h <= 55) return 'Energy / warmth';
  if (hsl.h <= 80) return 'Notice / optimism';
  if (hsl.h <= 165) return 'Success / nature';
  if (hsl.h <= 220) return 'Trust / information';
  if (hsl.h <= 285) return 'Premium / imagination';
  return 'Creative / expression';
}

function getWcag(rgb) {
  const black = contrastRatio(rgb,{r:0,g:0,b:0});
  const white = contrastRatio(rgb,{r:255,g:255,b:255});
  const best = black >= white ? { text:'black', ratio:black } : { text:'white', ratio:white };
  const grade = best.ratio >= 7 ? 'AAA' : best.ratio >= 4.5 ? 'AA' : best.ratio >= 3 ? 'Large only' : 'Fail';
  return { best, grade };
}

function getWidget(key, rgb, hsl) {
  const cmyk = rgbToCmyk(rgb);
  const wcag = getWcag(rgb);
  const photo = getPhotoProfile(hsl);
  const [role, roleSub] = uiRole(hsl);
  const lum = luminance(rgb);
  const map = {
    hex: ['HEX', state.hex, 'Exact code for web and design files.'],
    rgb: ['RGB', `${rgb.r}, ${rgb.g}, ${rgb.b}`, 'Screen-based red, green, blue values.'],
    hsl: ['HSL', `${hsl.h}°, ${hsl.s}%, ${hsl.l}%`, 'Most intuitive format for adjusting color.'],
    contrast: ['Contrast Text', contrastText(rgb), 'Best simple text color on this swatch.'],
    wcag: ['WCAG', wcag.grade, `Use ${wcag.best.text} text. Contrast ${wcag.best.ratio.toFixed(2)}:1.`],
    css: ['CSS Variable', `--accent: ${state.hex};`, 'Copy-ready website design token.'],
    cmyk: ['CMYK', `${cmyk.c} ${cmyk.m} ${cmyk.y} ${cmyk.k}`, 'Approximate print mix: C M Y K.'],
    complement: ['Complement', complement(hsl), 'Opposite hue for energetic contrast.'],
    uiRole: ['Best UI Use', role, roleSub],
    paletteRole: ['Palette Role', paletteRole(hsl), 'How this hue usually behaves in systems or branding.'],
    mood: ['Mood', getMood(hsl), 'Useful for branding, illustration, and direction.'],
    luminance: ['Luminance', lum.toFixed(3), lum < .12 ? 'Very dark perceptual brightness.' : lum > .62 ? 'Very bright perceptual brightness.' : 'Middle perceptual brightness.'],
    temperature: ['Temperature', getTemperature(hsl), 'The emotional warmth of the hue.'],
    undertone: ['Undertone', getUndertone(hsl), 'Subtle bias beneath the main color.'],
    photoUse: ['Photo Use', photo.use, 'A creative suggestion, not a strict rule.'],
    gradeHint: ['Grade Hint', photo.hint, 'Simple guidance for editing or grading.'],
    whiteBalance: ['WB Feel', photo.wb, 'Creative white-balance impression.'],
    commonItem: ['Common Item', getCommonItem(hsl), 'An everyday object with similar color impression.'],
    natureMatch: ['Nature Match', getNatureMatch(hsl), 'A natural-world reference for the hue.'],
    iconicMatch: ['Iconic Match', getIconicMatch(hsl), 'A cultural/design association, not a factual claim.'],
    fashionUse: ['Fashion Use', getFashionUse(hsl), 'How this color might behave in clothing or styling.'],
    roomUse: ['Interior Use', getRoomUse(hsl), 'Where this color can work in a physical space.'],
    material: ['Material', getMaterialFeel(hsl), 'The surface or texture this color suggests.'],
    season: ['Season', getSeason(hsl), 'Seasonal color direction for palettes or moodboards.'],
    soundtrack: ['Soundtrack', getSoundtrack(hsl), 'A playful music mood associated with this color.'],
    celebrityVibe: ['Celebrity Vibe', getCelebrityVibe(hsl), 'Style-vibe association, not a verified favorite color.']
  };
  const [label, value, sub] = map[key] || ['Widget','—',''];
  return { label, value, sub };
}


function getWidgetDetail(key, rgb, hsl) {
  const w = getWidget(key, rgb, hsl);
  const detailMap = {
    hex: ['Digital identity', 'HEX is the most stable compact label for this color. Use it when you need exact matching across CSS, design files, notes, and handoff.', 'Best for: copying into code, Figma, slides, palettes, and documentation.'],
    rgb: ['Screen recipe', 'RGB describes how much red, green, and blue light a screen uses. It is practical for digital graphics and pixel-level color work.', 'Best for: screen design, canvas sampling, image processing, and web graphics.'],
    hsl: ['Adjustable color logic', 'HSL is often easier than RGB because hue controls color family, saturation controls intensity, and lightness controls brightness.', 'Best for: generating tints, shades, hover states, and palette variations.'],
    contrast: ['Text safety check', 'This chooses whether black or white text is likely more readable on top of the current color.', 'Best for: buttons, labels, badges, and fast accessibility decisions.'],
    wcag: ['Accessibility signal', 'WCAG contrast is a readability signal. It helps decide whether text has enough contrast against this color.', 'Best for: UI text, charts, public-facing tools, and color-blind-friendly design.'],
    css: ['Design token', 'A CSS variable lets you reuse this color consistently across an entire interface instead of hard-coding it everywhere.', 'Best for: frontend themes, reusable components, and style systems.'],
    cmyk: ['Print approximation', 'CMYK is an approximate print translation. It will not be perfect on every printer, but it gives a useful print-oriented direction.', 'Best for: posters, handouts, print mockups, and brand sheets.'],
    complement: ['Opposite energy', 'The complement sits across the color wheel. It can create tension, emphasis, and visual energy when used carefully.', 'Best for: call-to-action accents, contrast details, and palette counterpoints.'],
    uiRole: ['Interface behavior', 'This estimates what job the color should do in an interface: primary action, background, neutral, or supporting accent.', 'Best for: app UI, dashboards, buttons, and design systems.'],
    paletteRole: ['Semantic role', 'Colors often carry semantic expectations: blue can feel informational, green can feel natural, red can feel urgent.', 'Best for: brand systems, charts, labels, and visual hierarchy.'],
    mood: ['Emotional read', 'This is a creative interpretation of the color’s emotional temperature, intensity, and atmosphere.', 'Best for: branding, moodboards, illustration, and presentation tone.'],
    luminance: ['Perceived brightness', 'Luminance estimates how bright the color feels to the eye, not just how high its RGB numbers are.', 'Best for: contrast, layering, shadows, and readable UI states.'],
    temperature: ['Warm or cool', 'Temperature describes whether the color leans warm, cool, natural, golden, or expressive.', 'Best for: photography grading, room mood, and palette balance.'],
    undertone: ['Hidden color bias', 'Undertone is the subtle bias beneath the main color. It explains why two similar colors can feel different.', 'Best for: fashion, interiors, skin-tone-sensitive photography, and paint choices.'],
    photoUse: ['Photography direction', 'This suggests the kind of subject or scene where the color could naturally become part of the visual story.', 'Best for: portraits, product shoots, landscape moods, and cinematic planning.'],
    gradeHint: ['Editing move', 'A grading hint is a small direction for how to push the photo without making it feel random or overedited.', 'Best for: Lightroom, color grading, mood references, and shot planning.'],
    whiteBalance: ['Temperature feeling', 'White balance changes whether a photo feels cool, warm, clinical, nostalgic, or cinematic.', 'Best for: photographer mode, lighting plans, and color moodboards.'],
    commonItem: ['Everyday reference', 'A common item makes the color easier to imagine and describe without relying only on technical values.', 'Best for: explaining colors to non-designers, kids, clients, and collaborators.'],
    natureMatch: ['Natural anchor', 'Nature references make palettes feel more grounded because people already know those color relationships intuitively.', 'Best for: art direction, environmental design, landscape palettes, and branding.'],
    iconicMatch: ['Cultural association', 'This is a loose cultural/design association. It is meant to spark direction, not make a factual brand claim.', 'Best for: moodboards, naming, pitch decks, and visual storytelling.'],
    fashionUse: ['Wearability', 'This suggests how the color behaves on clothing: statement, neutral, accent, editorial, or seasonal.', 'Best for: styling, costume direction, fashion boards, and personal palettes.'],
    roomUse: ['Interior placement', 'Some colors work best as walls, some as accents, some as small objects. This estimates that role.', 'Best for: rooms, furniture accents, studio corners, and material boards.'],
    material: ['Surface imagination', 'Material feel translates color into texture: glass, velvet, ceramic, graphite, silk, lacquer, and more.', 'Best for: product design, rendering prompts, interiors, and tactile moodboards.'],
    season: ['Seasonal timing', 'Season is a creative shortcut that tells you when this color feels most natural or expressive.', 'Best for: campaigns, event graphics, outfits, and seasonal palettes.'],
    soundtrack: ['Color as sound', 'This playful card maps color to a music mood, making the palette feel more cinematic and memorable.', 'Best for: presentation atmosphere, video moodboards, and creative brainstorming.'],
    celebrityVibe: ['Style aura', 'This is not a factual favorite-color claim. It describes the kind of public style energy the color suggests.', 'Best for: fashion mood, editorial direction, and playful design language.']
  };

  const fallback = ['More detail', `This widget explains ${w.label.toLowerCase()} for the selected color.`, 'Best for: creative interpretation and practical design decisions.'];
  const [title, copy, use] = detailMap[key] || fallback;
  return { title, copy, use };
}

function getMood(hsl) {
  if (hsl.s < 10) return 'quiet, balanced, minimal';
  if (hsl.h <= 25 || hsl.h >= 335) return hsl.l < 45 ? 'dramatic, urgent, bold' : 'energetic, passionate, social';
  if (hsl.h <= 55) return 'warm, welcoming, active';
  if (hsl.h <= 85) return 'sunny, optimistic, playful';
  if (hsl.h <= 160) return 'fresh, natural, restorative';
  if (hsl.h <= 220) return 'calm, trustworthy, technical';
  if (hsl.h <= 285) return 'imaginative, premium, focused';
  return 'expressive, creative, playful';
}

function getUndertone(hsl) {
  if (hsl.s < 8) return 'Neutral';
  if (hsl.h <= 30 || hsl.h >= 330) return 'Red';
  if (hsl.h <= 70) return 'Golden';
  if (hsl.h <= 155) return 'Green';
  if (hsl.h <= 230) return 'Blue';
  if (hsl.h <= 300) return 'Violet';
  return 'Rose';
}

function getInsights(rgb, hsl) {
  const photo = getPhotoProfile(hsl);
  const art = colorName(rgb,hsl,'art');
  const basic = chooseHue(basicNames,hsl.h)[1];
  const clear = chooseHue(cbNames,hsl.h)[1];

  if (state.mode === 'chemist') return {
    title:'Chemist intelligence',
    subtitle:'Indicator-style, material, concentration, and lab-note interpretation.',
    cards:[
      ['Indicator reading', colorName(rgb,hsl,'chemist').name, 'A visual analogy, not a real pH test.'],
      ['Concentration feel', hsl.s > 70 ? 'high chroma / strong solution' : hsl.s < 30 ? 'dilute / washed solution' : 'moderate concentration', 'Based on saturation.'],
      ['Material analogy', getMaterialFeel(hsl), 'How the color feels as a physical surface.'],
      ['Lab note', `record as ${state.hex}`, 'HEX is the stable identifier; names are interpretation layers.']
    ]
  };

  if (state.mode === 'kindergarten') return {
    title:'Kindergarten intelligence',
    subtitle:'Simple language, familiar examples, and friendly emotional cues.',
    cards:[
      ['Basic name', basic, 'The simplest classroom-level label.'],
      ['Looks like', getCommonItem(hsl), 'A familiar object that helps children recognize the color.'],
      ['Nature example', getNatureMatch(hsl), 'A real-world outdoor reference.'],
      ['Feeling', hsl.l > 72 ? 'light and happy' : hsl.l < 32 ? 'dark and quiet' : 'clear and noticeable', 'A simple emotional description.']
    ]
  };

  if (state.mode === 'colorblind') return {
    title:'Color-blind clarity',
    subtitle:'Unambiguous communication: hue family, brightness, saturation, and accessibility.',
    cards:[
      ['Clear label', clear, 'More specific than one-word color names.'],
      ['Brightness cue', hsl.l > 70 ? 'light' : hsl.l < 35 ? 'dark' : 'medium', 'Brightness often matters more than hue.'],
      ['Saturation cue', hsl.s > 65 ? 'vivid' : hsl.s < 28 ? 'muted' : 'moderate', 'Saturation helps distinguish similar colors.'],
      ['Use with', 'pattern + label', 'Do not rely on color alone in charts, maps, or buttons.']
    ]
  };

  if (state.mode === 'photographer') return {
    title:'Photographer intelligence',
    subtitle:'Lighting, white balance, subject direction, and grading hints.',
    cards:[
      ['Photo use', photo.use, 'Best subject direction for this color family.'],
      ['White balance', photo.wb, 'Creative temperature feel.'],
      ['Lighting', photo.light, 'Suggested lighting style.'],
      ['Editing move', photo.hint, 'A simple grading note.']
    ]
  };

  return {
    title:'Art intelligence',
    subtitle:'Pigment, material, cultural, and visual-direction clues.',
    cards:[
      ['Professional name', art.name, 'A polished art/design name.'],
      ['Common item', getCommonItem(hsl), 'A familiar object with similar color character.'],
      ['Iconic match', getIconicMatch(hsl), 'A design-world or cultural association, not a factual claim.'],
      ['Celebrity vibe', getCelebrityVibe(hsl), 'A style association, not a verified favorite color.']
    ]
  };
}

function getThemeTokens(hsl) {
  const comp = complement(hsl);
  const softRgb = hslToRgb(hsl.h, Math.max(10, hsl.s*.25), 95);
  const borderRgb = hslToRgb(hsl.h, Math.max(15, hsl.s*.35), state.theme === 'dark' ? 22 : 86);
  const bg = state.theme === 'dark' ? '#020617' : state.theme === 'minimal' ? '#FFFFFF' : rgbToHex(softRgb.r, softRgb.g, softRgb.b);
  const surface = state.theme === 'dark' ? '#0F172A' : '#FFFFFF';
  const text = state.theme === 'dark' ? '#F8FAFC' : '#101828';
  const border = state.theme === 'minimal' ? '#E5E7EB' : rgbToHex(borderRgb.r, borderRgb.g, borderRgb.b);
  return { Accent: state.hex, Background: bg, Surface: surface, Text: text, Border: border, Complement: comp };
}

function getCreativePalette(hsl) {
  const roles = [
    ['Ink Shadow', hsl.h, Math.max(16,hsl.s*.52), 14],
    ['Deep Base', hsl.h, Math.max(18,hsl.s*.48), 31],
    ['Hero Color', hsl.h, Math.max(34,Math.min(92,hsl.s)), 50],
    ['Soft Wash', hsl.h, Math.max(14,hsl.s*.25), 88],
    ['Warm Counter', (hsl.h+180)%360, Math.max(28,hsl.s*.70), 58],
    ['Quiet Neutral', hsl.h, Math.max(6,hsl.s*.08), hsl.l < 45 ? 92 : 20]
  ];
  return roles.map(([name,h,s,l]) => {
    const rgb = hslToRgb(h,s,l);
    return { name, hex: rgbToHex(rgb.r,rgb.g,rgb.b) };
  });
}

function setColor(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return;
  state.hex = rgbToHex(rgb.r,rgb.g,rgb.b);
  render();
}

function setThemeVars(rgb,hsl) {
  const comp = complement(hsl);
  const root = document.documentElement;
  root.style.setProperty('--accent', state.hex);
  root.style.setProperty('--accent-rgb', `${rgb.r},${rgb.g},${rgb.b}`);
  root.style.setProperty('--complement', comp);
  root.style.setProperty('--glow', `rgba(${rgb.r},${rgb.g},${rgb.b},.22)`);
  root.style.setProperty('--soft', `rgba(${rgb.r},${rgb.g},${rgb.b},.10)`);

  document.body.classList.remove('theme-apple','theme-soft','theme-bold','theme-dark','theme-minimal');
  document.body.classList.add(`theme-${state.theme}`);
  document.body.dataset.theme = state.theme;
  document.body.classList.toggle('focus-view', state.focus);
}

function render() {
  const rgb = hexToRgb(state.hex);
  const hsl = rgbToHsl(rgb.r,rgb.g,rgb.b);
  setThemeVars(rgb,hsl);

  const named = colorName(rgb,hsl);
  els.bigSwatch.style.background = state.hex;
  els.hexBadge.textContent = state.hex;
  els.colorInput.value = state.hex;
  els.hexInput.value = state.hex;
  els.rgbInput.value = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
  els.modeLabel.textContent = `${state.mode.replace('colorblind','color blind')} mode`;
  els.colorName.textContent = named.name;
  els.colorDescription.textContent = named.desc;

  els.modeTabs.forEach(btn => btn.classList.toggle('active', btn.dataset.mode === state.mode));
  els.themeTabs.forEach(btn => btn.classList.toggle('active', btn.dataset.theme === state.theme));
  els.focusViewBtn.textContent = state.focus ? 'Full view' : 'Focus view';

  renderInsights(rgb,hsl);
  renderTheme(hsl);
  renderCreativePalette(hsl);
  renderPhoto(hsl);
  renderWidgets(rgb,hsl);
  renderTones(hsl);
  updateMusic(rgb,hsl);
}

function renderInsights(rgb,hsl) {
  const insights = getInsights(rgb,hsl);
  els.modeInsightTitle.textContent = insights.title;
  els.modeInsightSubtitle.textContent = insights.subtitle;
  els.modeInsightGrid.innerHTML = insights.cards.map(([label,value,sub]) =>
    `<article class="mode-card" data-click><span>${label}</span><strong>${value}</strong><p>${sub}</p></article>`
  ).join('');
}

function renderTheme(hsl) {
  const tokens = getThemeTokens(hsl);
  const label = state.theme[0].toUpperCase() + state.theme.slice(1);
  els.themeTag.textContent = `${label} theme`;
  els.themeTitle.textContent = `${label} ${chooseHue(cbNames,hsl.h)[1].split('/')[0].trim()} theme`;
  els.themeDescription.textContent =
    state.theme === 'apple' ? 'Glassy, polished, interface-ready surfaces with a confident accent.' :
    state.theme === 'soft' ? 'Pastel, gentle, airy, and quiet — useful for lifestyle and calm interfaces.' :
    state.theme === 'bold' ? 'High-energy, bright, more saturated, and presentation-friendly.' :
    state.theme === 'dark' ? 'Cinematic dark surface with the color acting like a luminous accent.' :
    'Clean neutral system where the selected color is used only where it matters.';
  els.primaryTokenBtn.textContent = `Primary · ${tokens.Accent}`;
  els.secondaryTokenBtn.textContent = `Secondary · ${tokens.Complement}`;

  els.themeTokens.innerHTML = Object.entries(tokens).map(([name,value]) =>
    `<button type="button" class="token-chip" style="background:${value}" data-copy="${value}" data-click><span>${name}</span><strong>${value}</strong></button>`
  ).join('');
}

function renderCreativePalette(hsl) {
  els.creativePalette.innerHTML = getCreativePalette(hsl).map(item =>
    `<button type="button" class="creative-chip" style="background:${item.hex}" data-copy="${item.hex}" data-click><span>${item.name}</span><strong>${item.hex}</strong></button>`
  ).join('');
}

function renderPhoto(hsl) {
  const photo = getPhotoProfile(hsl);
  els.photoTag.textContent = photo.name;
  els.photoBriefTitle.textContent = photo.name.replace(/\b\w/g, c => c.toUpperCase());
  els.photoBriefText.textContent = `${photo.desc} Use it for ${photo.use}. Editing direction: ${photo.hint}.`;
  els.photoLighting.textContent = photo.light;
  els.photoWB.textContent = photo.wb;
  els.photoSubject.textContent = photo.use;
  els.photoEdit.textContent = photo.hint;
}

function renderWidgets(rgb,hsl) {
  els.widgetGrid.innerHTML = state.widgets.map((key, index) => {
    const w = getWidget(key,rgb,hsl);
    const d = getWidgetDetail(key,rgb,hsl);
    const remove = state.editingWidgets ? `<button type="button" class="widget-remove" data-remove-widget="${index}" data-click>−</button>` : '';
    return `<article class="widget-card ${state.editingWidgets ? 'editing' : ''}" data-widget-key="${key}" data-click>
      <div class="widget-flip">
        <section class="widget-face widget-front">
          ${remove}
          <div class="widget-top"><div class="widget-icon">${widgetIcons[key] || '✦'}</div><span class="widget-label">${w.label}</span></div>
          <strong class="widget-value">${w.value}</strong>
          <p class="widget-sub">${w.sub}</p>
          <span class="widget-flip-hint">${state.editingWidgets ? 'Edit mode' : 'Click to flip'}</span>
        </section>
        <section class="widget-face widget-back">
          <span class="widget-back-label">Detail · ${w.label}</span>
          <strong class="widget-detail-title">${d.title}</strong>
          <p class="widget-detail-copy">${d.copy}</p>
          <div class="widget-detail-use">${d.use}</div>
          <span class="widget-flip-hint">Click to return</span>
        </section>
      </div>
    </article>`;
  }).join('');

  // Keep the original working widget-gallery behavior.
  els.widgetGallery.classList.toggle('hidden', !state.editingWidgets);
  els.customizeBtn.textContent = state.editingWidgets ? 'Done' : 'Customize widgets';
  els.galleryItems.innerHTML = widgetCatalog.map(([key,label,hint]) => {
    const added = state.widgets.includes(key);
    return `<button type="button" class="gallery-item" ${added ? 'disabled' : ''} data-add-widget="${key}" data-click>
      <strong>${added ? '✓ ' : '+ '}${label}</strong><span>${hint}</span>
    </button>`;
  }).join('');
}

function renderTones(hsl) {
  els.nearbyTones.innerHTML = [18,34,50,66,82].map(l => {
    const rgb = hslToRgb(hsl.h, Math.max(12, Math.min(92, hsl.s)), l);
    const hex = rgbToHex(rgb.r,rgb.g,rgb.b);
    return `<button type="button" class="tone-chip" style="background:${hex}" data-color="${hex}" data-click><span>${hex}</span></button>`;
  }).join('');
}

function getMusicFamily(hsl) {
  if (hsl.s < 8) return hsl.l > 86 ? 'White' : 'Gray';
  if (hsl.l < 28 && hsl.h >= 15 && hsl.h <= 55) return 'Brown';
  if (hsl.h <= 15 || hsl.h >= 345) return 'Red';
  if (hsl.h <= 38) return 'Orange';
  if (hsl.h <= 62) return 'Yellow';
  if (hsl.h <= 88) return 'Yellow Green';
  if (hsl.h <= 160) return 'Green';
  if (hsl.h <= 195) return 'Cyan';
  if (hsl.h <= 250) return 'Blue';
  if (hsl.h <= 292) return 'Violet';
  return 'Pink';
}

function updateMusic(rgb,hsl) {
  const family = getMusicFamily(hsl);
  const track = musicIndex.find(t => t.color.toLowerCase() === family.toLowerCase()) ||
                musicIndex.find(t => t.color.toLowerCase().includes(family.toLowerCase())) ||
                musicIndex[0];
  currentMusic = track;
  els.musicMatchText.textContent = `Matched color family: ${family}`;
  if (!track) return;
  els.musicTitle.textContent = `${track.number}. ${track.name}`;
  els.musicHint.textContent = `${track.color} · expects music/${track.number}.mp3`;
  const desired = `music/${track.number}.mp3`;
  if (!els.colorAudio.src.endsWith(desired)) {
    const wasPlaying = !els.colorAudio.paused;
    els.colorAudio.src = desired;
    els.colorAudio.load();
    if (wasPlaying) els.colorAudio.play().catch(() => {});
  }
}

function parseMusicIndex(text) {
  return text.split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith('#')).map(line => {
    const parts = line.split(' - ').map(p => p.trim());
    if (parts.length < 3) return null;
    const number = Number(parts[0]);
    if (!Number.isFinite(number)) return null;
    return { number, name: parts[1], color: parts.slice(2).join(' - ') };
  }).filter(Boolean);
}

async function loadMusicIndex() {
  try {
    const res = await fetch('./music/index.txt', { cache: 'no-store' });
    if (!res.ok) throw new Error('missing');
    const parsed = parseMusicIndex(await res.text());
    if (parsed.length) musicIndex = parsed;
    showToast('Music index loaded');
  } catch {
    musicIndex = [...musicFallback];
  }
  render();
}

function cycleMusic(dir) {
  if (!musicIndex.length) return;
  let idx = musicIndex.findIndex(t => currentMusic && t.number === currentMusic.number);
  if (idx < 0) idx = 0;
  idx = (idx + dir + musicIndex.length) % musicIndex.length;
  currentMusic = musicIndex[idx];
  els.musicTitle.textContent = `${currentMusic.number}. ${currentMusic.name}`;
  els.musicHint.textContent = `${currentMusic.color} · expects music/${currentMusic.number}.mp3`;
  els.colorAudio.src = `music/${currentMusic.number}.mp3`;
  els.colorAudio.load();
  if (!els.colorAudio.paused) els.colorAudio.play().catch(() => {});
}

function toggleMusic() {
  if (!currentMusic) return;
  if (els.colorAudio.paused) {
    els.colorAudio.play().then(() => {
      els.musicToggleBtn.textContent = 'Ⅱ';
      document.querySelector('.music-panel').classList.add('playing');
    }).catch(() => {
      showToast(`Add music/${currentMusic.number}.mp3`);
      els.musicHint.textContent = `Could not play music/${currentMusic.number}.mp3. Add that file to /music.`;
    });
  } else {
    els.colorAudio.pause();
  }
}

function showToast(text) {
  els.toast.textContent = text;
  els.toast.classList.add('show');
  setTimeout(() => els.toast.classList.remove('show'), 950);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied');
  } catch {
    showToast('Copy unavailable');
  }
}

function clickEffect(e) {
  const clickable = e.target.closest('[data-click], button, .file-btn');
  if (!clickable || clickable.disabled) return;

  const mark = document.createElement('span');
  mark.className = 'art-click';
  mark.style.left = `${e.clientX}px`;
  mark.style.top = `${e.clientY}px`;
  els.clickLayer.appendChild(mark);
  mark.addEventListener('animationend', () => mark.remove());

  clickable.classList.remove('click-pop');
  void clickable.offsetWidth;
  clickable.classList.add('click-pop');
}

function handleDocumentClick(e) {
  clickEffect(e);

  const colorBtn = e.target.closest('[data-color]');
  if (colorBtn) return setColor(colorBtn.dataset.color);

  const copyBtn = e.target.closest('[data-copy]');
  if (copyBtn) return copyText(copyBtn.dataset.copy);

  const fold = e.target.closest('.fold-header');
  if (fold) {
    const section = fold.closest('[data-fold-section]');
    const open = section.classList.toggle('open');
    fold.setAttribute('aria-expanded', String(open));
    return;
  }

  const remove = e.target.closest('[data-remove-widget]');
  if (remove) {
    state.widgets.splice(Number(remove.dataset.removeWidget), 1);
    return render();
  }

  const add = e.target.closest('[data-add-widget]');
  if (add && !add.disabled) {
    if (!state.widgets.includes(add.dataset.addWidget)) state.widgets.push(add.dataset.addWidget);
    return render();
  }

  // Flip only dashboard widgets, not gallery buttons, and not while customizing.
  const widgetCard = e.target.closest('.widget-card');
  if (widgetCard && !state.editingWidgets && !e.target.closest('button')) {
    widgetCard.classList.toggle('flipped');
    return;
  }
}

function applyModeDefaults(mode) {
  const groups = {
    art: ['commonItem','iconicMatch','material'],
    chemist: ['cmyk','material','temperature'],
    kindergarten: ['commonItem','natureMatch','season'],
    colorblind: ['wcag','contrast','luminance'],
    photographer: ['photoUse','gradeHint','whiteBalance']
  };
  (groups[mode] || []).forEach(key => {
    if (!state.widgets.includes(key) && state.widgets.length < 7) state.widgets.push(key);
  });
}

function exportTheme() {
  const rgb = hexToRgb(state.hex);
  const hsl = rgbToHsl(rgb.r,rgb.g,rgb.b);
  const tokens = getThemeTokens(hsl);
  const palette = getCreativePalette(hsl);
  return [
    'COLOR LAB THEME',
    `Source color: ${state.hex}`,
    `Mode: ${state.mode}`,
    `Theme style: ${state.theme}`,
    '',
    'Theme tokens:',
    ...Object.entries(tokens).map(([k,v]) => `- ${k}: ${v}`),
    '',
    'Creative palette:',
    ...palette.map(p => `- ${p.name}: ${p.hex}`),
    '',
    `Mood: ${getMood(hsl)}`,
    `Common item: ${getCommonItem(hsl)}`,
    `Nature match: ${getNatureMatch(hsl)}`,
    `Iconic match: ${getIconicMatch(hsl)}`
  ].join('\n');
}

document.addEventListener('click', handleDocumentClick);

els.colorInput.addEventListener('input', e => setColor(e.target.value));
els.hexInput.addEventListener('input', e => { if (/^#[0-9a-fA-F]{6}$/.test(e.target.value.trim())) setColor(e.target.value.trim()); });
els.rgbInput.addEventListener('change', e => {
  const parts = e.target.value.split(',').map(v => Number(v.trim()));
  if (parts.length === 3 && parts.every(v => Number.isFinite(v) && v >= 0 && v <= 255)) setColor(rgbToHex(parts[0],parts[1],parts[2]));
});

els.modeTabs.forEach(btn => btn.addEventListener('click', () => {
  state.mode = btn.dataset.mode;
  applyModeDefaults(state.mode);
  render();
}));

els.themeTabs.forEach(btn => btn.addEventListener('click', () => {
  state.theme = btn.dataset.theme;
  render();
}));

els.focusViewBtn.addEventListener('click', () => {
  state.focus = !state.focus;
  render();
});

els.copyHexBtn.addEventListener('click', () => copyText(state.hex));
els.primaryTokenBtn.addEventListener('click', () => copyText(state.hex));
els.secondaryTokenBtn.addEventListener('click', () => {
  const rgb = hexToRgb(state.hex);
  const hsl = rgbToHsl(rgb.r,rgb.g,rgb.b);
  copyText(complement(hsl));
});
els.copyThemeBtn.addEventListener('click', () => copyText(exportTheme()));

els.addCreativeWidgetBtn.addEventListener('click', () => {
  const keys = ['commonItem','natureMatch','iconicMatch','fashionUse','roomUse','material','season','soundtrack','celebrityVibe'];
  const available = keys.filter(k => !state.widgets.includes(k));
  if (available.length) state.widgets.push(available[Math.floor(Math.random()*available.length)]);
  else state.widgets = state.widgets.filter(k => !keys.includes(k)).concat(['commonItem','natureMatch','iconicMatch']);
  render();
});

els.customizeBtn.addEventListener('click', () => {
  state.editingWidgets = !state.editingWidgets;
  render();
});

els.resetWidgetsBtn.addEventListener('click', () => {
  state.widgets = ['hex','rgb','hsl','contrast'];
  state.editingWidgets = false;
  render();
});

els.eyeDropperBtn.addEventListener('click', async () => {
  if (!('EyeDropper' in window)) {
    showToast('Try Chrome/Edge or upload image');
    alert('Your browser does not support the EyeDropper API. Try Chrome or Edge, or upload an image instead.');
    return;
  }
  try {
    const result = await new EyeDropper().open();
    setColor(result.sRGBHex);
  } catch {}
});

els.imageUpload.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    const ctx = els.canvas.getContext('2d', { willReadFrequently: true });
    const scale = Math.min(1, 900 / img.width);
    els.canvas.width = Math.round(img.width * scale);
    els.canvas.height = Math.round(img.height * scale);
    ctx.clearRect(0,0,els.canvas.width,els.canvas.height);
    ctx.drawImage(img,0,0,els.canvas.width,els.canvas.height);
    els.imageSampler.classList.remove('hidden');
  };
  img.src = URL.createObjectURL(file);
});

els.canvas.addEventListener('click', e => {
  const rect = els.canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) * (els.canvas.width / rect.width));
  const y = Math.floor((e.clientY - rect.top) * (els.canvas.height / rect.height));
  const [r,g,b] = els.canvas.getContext('2d').getImageData(x,y,1,1).data;
  setColor(rgbToHex(r,g,b));
});

els.musicToggleBtn.addEventListener('click', toggleMusic);
els.musicPrevBtn.addEventListener('click', () => cycleMusic(-1));
els.musicNextBtn.addEventListener('click', () => cycleMusic(1));
els.musicReloadBtn.addEventListener('click', loadMusicIndex);
els.colorAudio.addEventListener('play', () => {
  els.musicToggleBtn.textContent = 'Ⅱ';
  document.querySelector('.music-panel').classList.add('playing');
});
els.colorAudio.addEventListener('pause', () => {
  els.musicToggleBtn.textContent = '▶';
  document.querySelector('.music-panel').classList.remove('playing');
});
els.colorAudio.addEventListener('ended', () => cycleMusic(1));

loadMusicIndex();
render();
