#!/bin/bash
# Раскладывает сырые картинки из assets/img/_raw в папки проектов,
# даёт осмысленные имена и ужимает до 1800px по длинной стороне.
# Запуск из папки site/:  bash tools/build-assets.sh
set -e

RAW="assets/img/_raw"
IMG="assets/img"

# put <исходник> <куда> — копирует и ужимает
put () {
  local src="$RAW/$1" dst="$IMG/$2"
  if [ ! -f "$src" ]; then echo "  !! нет $1"; return; fi
  mkdir -p "$(dirname "$dst")"
  cp "$src" "$dst"
  sips -Z 1800 -s format jpeg -s formatOptions 82 "$dst" --out "$dst" >/dev/null 2>&1
  echo "  $2"
}

echo "→ Портрет и коллаж"
put "pf-p01-X1-848x1280.jpg"    "portrait.jpg"
put "pf-p16-X1-2752x1536.jpg"   "collage/01-lake.jpg"
put "pf-p04-X2-848x1264.jpg"    "collage/02-interior.jpg"
put "pf-p17-X1-2752x1536.jpg"   "collage/03-farms.jpg"
put "pf-p03-X1-1344x896.jpg"    "collage/04-pool.jpg"
put "mock-p01-X3-400x600.jpg"   "collage/05-arches.jpg"
put "pf-p10-X3-2131x1935.jpg"   "collage/06-identity.jpg"

echo "→ bagstory"
put "pf-p03-X2-1792x2400.jpg"   "projects/bagstory/hero.jpg"
put "pf-p03-X4-768x1376.jpg"    "projects/bagstory/01-app.jpg"
put "pf-p03-X6-768x1376.jpg"    "projects/bagstory/02-journeys.jpg"

echo "→ menok-spa"
put "pf-p04-X1-2048x1373.jpg"   "projects/menok-spa/hero.jpg"
put "pf-p04-X2-848x1264.jpg"    "projects/menok-spa/01-interior.jpg"
put "pf-p04-X3-4096x2896.jpg"   "projects/menok-spa/02-plan.jpg"
put "pf-p05-X2-2048x2048.jpg"   "projects/menok-spa/03-signage.jpg"
put "pf-p05-X5-2961x2212.jpg"   "projects/menok-spa/04-packaging.jpg"
put "pf-p05-X4-2400x1792.jpg"   "projects/menok-spa/05-soap.jpg"
put "pf-p05-X7-1120x957.jpg"    "projects/menok-spa/06-cream.jpg"
put "pf-p05-X6-1024x1024.jpg"   "projects/menok-spa/07-flags.jpg"

echo "→ rebirth-forum"
put "pf-p06-X2-1280x960.jpg"    "projects/rebirth-forum/hero.jpg"
put "pf-p06-X1-1280x896.jpg"    "projects/rebirth-forum/01-stage.jpg"
put "pf-p06-X3-1280x910.jpg"    "projects/rebirth-forum/02-badges.jpg"

echo "→ moscow-picnic"
put "pf-p08-X2-2526x1688.jpg"   "projects/moscow-picnic/hero.jpg"
put "pf-p08-X3-2444x2584.jpg"   "projects/moscow-picnic/01-sizes.jpg"
put "pf-p08-X1-1126x1432.jpg"   "projects/moscow-picnic/02-app.jpg"

echo "→ rose-stone"
put "pf-p10-X1-2048x1136.jpg"   "projects/rose-stone/hero.jpg"
put "pf-p10-X2-1395x1530.jpg"   "projects/rose-stone/01-zoning.jpg"
put "pf-p10-X3-2131x1935.jpg"   "projects/rose-stone/02-identity.jpg"
put "pf-p11-X1-4096x2368.jpg"   "projects/rose-stone/03-label.jpg"
put "pf-p11-X2-4000x3000.jpg"   "projects/rose-stone/04-bottle.jpg"
put "pf-p03-X1-1344x896.jpg"    "projects/rose-stone/05-pool.jpg"
put "pf-p03-X5-2560x1435.jpg"   "projects/rose-stone/06-fields.jpg"

echo "→ valley-wanderers"
put "pf-p13-X1-1536x768.jpg"    "projects/valley-wanderers/hero.jpg"
put "pf-p12-X1-4000x2650.jpg"   "projects/valley-wanderers/01-map.jpg"
put "pf-p13-X3-4096x2705.jpg"   "projects/valley-wanderers/02-navigation.jpg"
put "pf-p13-X2-816x1456.jpg"    "projects/valley-wanderers/03-lantern.jpg"
put "pf-p09-X1-1024x768.jpg"    "projects/valley-wanderers/04-plan.jpg"

echo "→ rodnoe"
put "pf-p16-X1-2752x1536.jpg"   "projects/rodnoe/hero.jpg"
put "pf-p14-X1-4096x2829.jpg"   "projects/rodnoe/01-masterplan.jpg"
put "pf-p15-X2-2048x2048.jpg"   "projects/rodnoe/02-architecture.jpg"

echo "→ agrobiotuscany"
put "pf-p17-X1-2752x1536.jpg"   "projects/agrobiotuscany/hero.jpg"

echo "→ mesto-history"
put "pf-p19-X3-4096x2731.jpg"   "projects/mesto-history/hero.jpg"
put "pf-p19-X2-2560x1706.jpg"   "projects/mesto-history/01-apparel.jpg"
put "pf-p19-X1-1920x1080.jpg"   "projects/mesto-history/02-cards.jpg"
put "pf-p19-X10-1196x1192.jpg"  "projects/mesto-history/03-sticker-a.jpg"
put "pf-p19-X5-1146x1146.jpg"   "projects/mesto-history/04-sticker-b.jpg"
put "pf-p19-X9-1204x1200.jpg"   "projects/mesto-history/05-sticker-c.jpg"

echo "→ meshchovsk"
put "pf-p20-X2-4000x3000.jpg"   "projects/meshchovsk/hero.jpg"
put "pf-p20-X3-3000x2250.jpg"   "projects/meshchovsk/01-tote.jpg"
put "pf-p20-X4-3000x2250.jpg"   "projects/meshchovsk/02-pattern.jpg"

echo "→ novosibirsk"
put "pf-p21-X5-4096x2731.jpg"   "projects/novosibirsk/hero.jpg"
put "pf-p21-X1-4096x2511.jpg"   "projects/novosibirsk/01-scheme.jpg"
put "pf-p21-X2-4096x3027.jpg"   "projects/novosibirsk/02-navigation.jpg"
put "pf-p21-X4-2667x4000.jpg"   "projects/novosibirsk/03-facade.jpg"
put "pf-p21-X3-445x663.jpg"     "projects/novosibirsk/04-bikes.jpg"

echo
echo "Готово. Сырые файлы остались в $RAW — их можно удалить."
