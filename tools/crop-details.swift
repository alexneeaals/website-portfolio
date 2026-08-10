// Нарезает дополнительные кадры для кейсов, где в исходном деке
// мало отдельных изображений: разбивает составные листы (размерная
// линейка, коллажи) на части и вырезает детали из крупных планов.
//
// Запуск из папки site/:  swift tools/crop-details.swift

import Foundation
import AppKit

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
    .appendingPathComponent("assets/img/projects")

/// Вырезает область (доли от исходника) и кладёт рядом новым файлом.
func crop(_ project: String, _ from: String, _ to: String,
          x: CGFloat, y: CGFloat, w: CGFloat, h: CGFloat, maxSide: CGFloat = 1800) {
    let src = root.appendingPathComponent(project).appendingPathComponent(from)
    guard let img = NSImage(contentsOf: src),
          let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
        print("  !! не открылся \(project)/\(from)"); return
    }
    let W = CGFloat(cg.width), H = CGFloat(cg.height)
    let rect = CGRect(x: (x * W).rounded(), y: (y * H).rounded(),
                      width: (w * W).rounded(), height: (h * H).rounded())
    guard let cut = cg.cropping(to: rect) else { print("  !! срез \(to)"); return }

    // Ужимаем до разумного размера
    var outW = CGFloat(cut.width), outH = CGFloat(cut.height)
    let k = min(1, maxSide / max(outW, outH))
    outW = (outW * k).rounded(); outH = (outH * k).rounded()

    guard let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: Int(outW), pixelsHigh: Int(outH),
                                     bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
                                     colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0) else {
        print("  !! буфер \(to)"); return
    }
    NSGraphicsContext.saveGraphicsState()
    let ctx = NSGraphicsContext(bitmapImageRep: rep)!
    NSGraphicsContext.current = ctx
    ctx.cgContext.interpolationQuality = .high
    ctx.cgContext.draw(cut, in: CGRect(x: 0, y: 0, width: outW, height: outH))
    NSGraphicsContext.restoreGraphicsState()

    let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.85])!
    let dst = root.appendingPathComponent(project).appendingPathComponent(to)
    try? data.write(to: dst)
    print("  \(project)/\(to)  \(Int(outW))x\(Int(outH))  \(data.count / 1024) KB")
}

// Внимание: у CGImage начало координат в левом верхнем углу,
// поэтому y отсчитывается сверху — как на глаз.

print("→ Пикник в парках: размерная линейка по одному типоразмеру")
crop("moscow-picnic", "01-sizes.jpg", "03-size-s.jpg",  x: 0.015, y: 0.015, w: 0.475, h: 0.475)
crop("moscow-picnic", "01-sizes.jpg", "04-size-m.jpg",  x: 0.510, y: 0.015, w: 0.475, h: 0.475)
crop("moscow-picnic", "01-sizes.jpg", "05-size-l.jpg",  x: 0.015, y: 0.510, w: 0.475, h: 0.475)
crop("moscow-picnic", "01-sizes.jpg", "06-size-xl.jpg", x: 0.510, y: 0.510, w: 0.475, h: 0.475)

// ВАЖНО: сначала детали, и только потом перезапись исходника —
// иначе следующий срез берётся уже из обрезанной картинки.
print("→ Родное: два фрагмента застройки, затем мастер-план плотнее")
crop("rodnoe", "01-masterplan.jpg", "03-zone-west.jpg",  x: 0.00, y: 0.02, w: 0.42, h: 0.70)
crop("rodnoe", "01-masterplan.jpg", "04-zone-lake.jpg",  x: 0.30, y: 0.30, w: 0.48, h: 0.68)
crop("rodnoe", "01-masterplan.jpg", "01-masterplan.jpg", x: 0.00, y: 0.00, w: 1.00, h: 0.64)

print("→ AgroBioTuscany: два фрагмента общего плана")
crop("agrobiotuscany", "hero.jpg", "01-capsule.jpg", x: 0.00, y: 0.14, w: 0.44, h: 0.84)
crop("agrobiotuscany", "hero.jpg", "02-alley.jpg",   x: 0.38, y: 0.06, w: 0.44, h: 0.90)

print("→ BagStory: коллаж путешествий двумя частями")
crop("bagstory", "02-journeys.jpg", "03-journeys-b.jpg", x: 0.0, y: 0.51, w: 1.0, h: 0.49)
crop("bagstory", "02-journeys.jpg", "02-journeys.jpg",   x: 0.0, y: 0.00, w: 1.0, h: 0.49)

print("→ Мещовск: паттерн крупным планом")
crop("meshchovsk", "02-pattern.jpg", "03-pattern-detail.jpg", x: 0.16, y: 0.14, w: 0.56, h: 0.62)

print("\nГотово")
