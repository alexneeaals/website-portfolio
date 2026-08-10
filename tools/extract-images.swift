// Одноразовый скрипт: достаёт изображения из исходных PDF в assets/img/_raw/.
// Запуск из папки site/:  swift tools/extract-images.swift
//
// Изображения в PDF лежат готовыми JPEG-потоками, поэтому пишутся побайтово —
// без перекодирования и потери качества. Векторные развороты (планы, схемы)
// растрируются отдельно через PDFKit.

import Foundation
import CoreGraphics
import PDFKit
import AppKit

let cwd = FileManager.default.currentDirectoryPath
let src = URL(fileURLWithPath: cwd).deletingLastPathComponent()   // ../ = папка с PDF
let out = URL(fileURLWithPath: cwd).appendingPathComponent("assets/img/_raw")
try? FileManager.default.createDirectory(at: out, withIntermediateDirectories: true)

/// Пишет все растровые XObject'ы страницы в отдельные файлы.
func extractRasters(pdf: String, prefix: String, pages: [Int]) {
    guard let doc = CGPDFDocument(src.appendingPathComponent(pdf) as CFURL) else {
        print("!! не открылся \(pdf)"); return
    }
    for pi in pages {
        guard let page = doc.page(at: pi), let d = page.dictionary else { continue }
        var res: CGPDFDictionaryRef?
        CGPDFDictionaryGetDictionary(d, "Resources", &res)
        var xo: CGPDFDictionaryRef?
        guard let r = res, CGPDFDictionaryGetDictionary(r, "XObject", &xo), let x = xo else { continue }

        // ApplyFunction — C-функция без захвата, поэтому состояние передаём через box.
        final class Box { var page = 0; var prefix = ""; var out = URL(fileURLWithPath: "/") }
        let box = Box(); box.page = pi; box.prefix = prefix; box.out = out
        let info = Unmanaged.passUnretained(box).toOpaque()

        CGPDFDictionaryApplyFunction(x, { key, obj, info in
            let box = Unmanaged<Box>.fromOpaque(info!).takeUnretainedValue()
            var st: CGPDFStreamRef?
            guard CGPDFObjectGetValue(obj, .stream, &st), let s = st else { return }
            let sd = CGPDFStreamGetDictionary(s)!

            // Пропускаем всё, что не изображение (формы, маски).
            var subtype: UnsafePointer<Int8>?
            CGPDFDictionaryGetName(sd, "Subtype", &subtype)
            guard let sub = subtype, String(cString: sub) == "Image" else { return }

            var fmt = CGPDFDataFormat.raw
            guard let data = CGPDFStreamCopyData(s, &fmt) as Data? else { return }
            var w: CGPDFInteger = 0, h: CGPDFInteger = 0
            CGPDFDictionaryGetInteger(sd, "Width", &w)
            CGPDFDictionaryGetInteger(sd, "Height", &h)
            if w < 300 || h < 300 { return }        // иконки и мелочь не нужны

            let name = String(cString: key)
            let ext = (fmt == .jpegEncoded) ? "jpg" : (fmt == .JPEG2000 ? "jp2" : "bin")
            let file = String(format: "%@-p%02d-%@-%dx%d.%@", box.prefix, box.page, name, w, h, ext)
            try? data.write(to: box.out.appendingPathComponent(file))
            print("  \(file)  \(data.count / 1024) KB")
        }, info)
        print("страница \(pi) ✓")
    }
}

/// Растрирует прямоугольную область страницы (для векторных планов и схем).
/// rect задаётся в долях от размера страницы, отсчёт от левого верхнего угла.
func renderRegion(pdf: String, page pi: Int, rect: CGRect, name: String, scale: CGFloat = 2.0) {
    guard let doc = PDFDocument(url: src.appendingPathComponent(pdf)),
          let page = doc.page(at: pi - 1) else { print("!! \(pdf) стр \(pi)"); return }
    let b = page.bounds(for: .mediaBox)
    let x = b.minX + rect.minX * b.width
    let w = rect.width * b.width
    let h = rect.height * b.height
    let y = b.maxY - rect.minY * b.height - h          // PDF считает Y снизу

    let px = Int(w * scale), py = Int(h * scale)
    guard let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: px, pixelsHigh: py,
                                     bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true,
                                     isPlanar: false, colorSpaceName: .deviceRGB,
                                     bytesPerRow: 0, bitsPerPixel: 0) else { return }
    NSGraphicsContext.saveGraphicsState()
    let ctx = NSGraphicsContext(bitmapImageRep: rep)!
    NSGraphicsContext.current = ctx
    let cg = ctx.cgContext
    cg.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))
    cg.fill(CGRect(x: 0, y: 0, width: CGFloat(px), height: CGFloat(py)))
    cg.scaleBy(x: scale, y: scale)
    cg.translateBy(x: -x, y: -y)
    page.draw(with: .mediaBox, to: cg)
    NSGraphicsContext.restoreGraphicsState()

    let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.92])!
    try? data.write(to: out.appendingPathComponent("\(name).jpg"))
    print("  \(name).jpg  \(px)x\(py)  \(data.count / 1024) KB")
}

print("== портфолио проектов.pdf ==")
extractRasters(pdf: "портфолио проектов.pdf", prefix: "pf", pages: Array(1...21))

print("\n== коллаж из макета ==")
extractRasters(pdf: "русская версия.pdf", prefix: "mock", pages: [1])

print("\n== векторные развороты ==")
// Мастер-план «Родного» и схема зонирования Rosé & Stone — вектор, не растр.
renderRegion(pdf: "портфолио проектов.pdf", page: 14, rect: CGRect(x: 0.30, y: 0.10, width: 0.68, height: 0.86), name: "vec-rodnoe-masterplan")
renderRegion(pdf: "портфолио проектов.pdf", page: 8,  rect: CGRect(x: 0.02, y: 0.02, width: 0.96, height: 0.62), name: "vec-picnic-maf")
renderRegion(pdf: "портфолио проектов.pdf", page: 12, rect: CGRect(x: 0.02, y: 0.25, width: 0.50, height: 0.70), name: "vec-wanderers-map")

print("\nГотово → assets/img/_raw/")
