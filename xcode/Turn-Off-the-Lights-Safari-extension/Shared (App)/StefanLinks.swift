//
//  StefanLinks.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 19/11/2024.
//

import Combine
import Foundation

#if os(iOS) || os(visionOS)
import UIKit
#elseif os(macOS)
import AppKit
#endif

class StefanLinks {
    func openURL(_ url: URL) {
#if os(iOS) || os(visionOS)
        UIApplication.shared.open(url, options: [:], completionHandler: nil)
#elseif os(watchOS)
        WKExtension.shared().openSystemURL(url)
#elseif os(macOS)
        NSWorkspace.shared.open(url)
#endif
    }
    
    func linkredirectionoptions() -> String{
        return "https://www.turnoffthelights.com/browser/extension/options/"
    }
    
    func linktranslate() -> String{
        return "https://www.turnoffthelights.com/browser/extension/translate/"
    }
    
    func linkdeveloperwebsite() -> String{
        return "https://www.turnoffthelights.com"
    }
    
    func linkdeveloperblog() -> String{
        return "https://www.turnoffthelights.com/blog/"
    }
    
    func linkdeveloper() -> String{
        return "https://www.turnoffthelights.com/developer/"
    }

    func linksocial() -> String{
        return "https://www.turnoffthelights.com/social/"
    }
    
    func linkdonate() -> String{
        return "https://www.turnoffthelights.com/donate/"
    }
    
    func linksupport() -> String{
        return "https://www.turnoffthelights.com/support/"
    }
    
    func linkdeveloperblogfeed() -> String{
        return "https://www.turnoffthelights.com/blog/feed/"
    }
    
    func linkprivacy() -> String{
        return "https://www.turnoffthelights.com/privacy/"
    }
    
    func linksourcecode() -> String{
        return "https://github.com/turnoffthelights/Turn-Off-the-Lights-browser-extension"
    }
    
    func linkappstore() -> String{
        return "https://apps.apple.com/app/id1273998507"
    }
    
    // Other apps
    func webapphellooffice() -> String{
        return "https://apps.apple.com/app/id6797568013"
    }
    
    func webappcanadarace() -> String{
        return "https://apps.apple.com/app/id1416358359"
    }
    
    func webapphometab() -> String{
        return "https://apps.apple.com/app/id1585512140"
    }
    
    func webappturnoffthelights() -> String{
        return "https://apps.apple.com/app/id1273998507"
    }
    
    func webappzoom() -> String{
        return "https://apps.apple.com/app/id1423085875"
    }
    
    func webappdatetoday() -> String{
        return "https://apps.apple.com/app/id1523093827"
    }
    
    func webappharddisk() -> String{
        return "https://apps.apple.com/app/id1043842695"
    }
    
    func webappsunrise() -> String{
        return "https://apps.apple.com/app/id1530008755"
    }
    
    func webapptrafficblinker() -> String{
        return "https://apps.apple.com/app/id1073990483"
    }
   
    func webappmylunarnewyear() -> String{
        return "https://apps.apple.com/app/id1596469569"
    }
    
    func webappmychristmastree() -> String{
        return "https://apps.apple.com/app/id1062397646"
    }
    
    func webappfullscreen() -> String{
        return "https://apps.apple.com/app/id1462623715"
    }
    
    func webappsnow() -> String{
        return "https://apps.apple.com/app/id6755977850"
    }
    
    func webappfontsizeincrease() -> String{
        return "https://apps.apple.com/app/id6756031354"
    }
    
    func webappfontsizedecrease() -> String{
        return "https://apps.apple.com/app/id6756031162"
    }
    
    func webapprotatethatvideoplayer() -> String{
        return "https://apps.apple.com/app/id6756031106"
    }
    
    func webappprint() -> String{
        return "https://apps.apple.com/app/id6475040701"
    }
}

// MARK: - Other apps (remote list)

struct OtherApp: Codable, Identifiable {
    let id: String
    let name: String
    let icon: String
    let hidden: Bool?
    let platforms: [String]?
    /// Per-platform store links, e.g. {"apple": "...", "android": "..."}.
    /// "apple" covers every Apple platform; a specific key like "ios" or
    /// "macos" can override it for a platform-exclusive listing.
    let urls: [String: String]

    /// Store listing for the current platform. Falls back to the shared
    /// "apple" link and then to any platform's link so a tap never dead-ends.
    var storeURL: URL? {
    #if os(macOS)
        let preferred = ["macos", "apple"]
    #elseif os(visionOS)
        let preferred = ["visionos", "apple"]
    #elseif os(watchOS)
        let preferred = ["watchos", "apple"]
    #elseif os(tvOS)
        let preferred = ["tvos", "apple"]
    #else
        let preferred = ["ios", "apple"]
    #endif
        for key in preferred {
            if let url = urls[key].flatMap(URL.init(string:)) { return url }
        }
        return urls.values.lazy.compactMap { URL(string: $0) }.first
    }
}

/// Fetches the shared "Other Apps" list from a remote JSON file so every app
/// shows the same content without shipping an update. Falls back to the last
/// cached copy, then to a bundled snapshot when offline.
class OtherAppsStore: ObservableObject {
    @Published private(set) var apps: [OtherApp] = []

    private let remoteURL = URL(string: "https://www.stefanvd.net/apps/index.json")!

    private var cacheFileURL: URL {
        FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
            .appendingPathComponent("other-apps.json")
    }

    func load() {
        if apps.isEmpty {
            if let data = try? Data(contentsOf: cacheFileURL), let cached = decode(data), !cached.isEmpty {
                apps = cached
            } else {
                apps = Self.bundledApps
            }
        }
        let request = URLRequest(url: remoteURL, cachePolicy: .reloadIgnoringLocalCacheData, timeoutInterval: 15)
        URLSession.shared.dataTask(with: request) { [weak self] data, _, _ in
            guard let self = self, let data = data, let fetched = self.decode(data), !fetched.isEmpty else { return }
            try? data.write(to: self.cacheFileURL, options: .atomic)
            DispatchQueue.main.async { self.apps = fetched }
        }.resume()
    }

    func visibleApps(excluding selfID: String) -> [OtherApp] {
#if os(macOS)
        let platform = "macos"
#else
        let platform = "ios"
#endif
        return apps.filter { $0.id != selfID && $0.hidden != true && ($0.platforms?.contains(platform) ?? true) }
    }

    /// Resolves a relative icon path (e.g. "icons/zoom.png") against the JSON location;
    /// absolute URLs are used as-is.
    func iconURL(for app: OtherApp) -> URL? {
        if app.icon.hasPrefix("http") { return URL(string: app.icon) }
        return URL(string: app.icon, relativeTo: remoteURL)?.absoluteURL
    }

    private func decode(_ data: Data) -> [OtherApp]? {
        (try? JSONDecoder().decode(OtherAppsRoot.self, from: data))?.apps
    }

    private struct OtherAppsRoot: Codable {
        let apps: [OtherApp]
    }

    // Offline snapshot — keep in sync with the hosted index.json
    private static let bundledJSON = """
    {"version":1,"apps":[
    {"id":"turn-off-the-lights","name":"Turn Off the Lights for Safari","icon":"icons/turn-off-the-lights.png","urls":{"apple":"https://apps.apple.com/app/id1273998507"}},
    {"id":"turn-off-the-lights-mobile","name":"Turn Off the Lights for Mobile","icon":"icons/turn-off-the-lights-mobile.png","platforms":["ios"],"urls":{"apple":"https://apps.apple.com/app/id1044081431"}},
    {"id":"my-christmas-tree","name":"My Christmas Tree","icon":"icons/my-christmas-tree.png","urls":{"apple":"https://apps.apple.com/app/id1062397646"}},
    {"id":"my-halloween","name":"My Halloween","icon":"icons/my-halloween.png","urls":{"apple":"https://apps.apple.com/app/id6755063458"}},
    {"id":"my-easter-bunny","name":"My Easter Bunny","icon":"icons/my-easter-bunny.png","urls":{"apple":"https://apps.apple.com/app/id6738970939"}},
    {"id":"my-lunar-new-year","name":"My Lunar New Year","icon":"icons/my-lunar-new-year.png","urls":{"apple":"https://apps.apple.com/app/id1596469569"}},
    {"id":"sunrise","name":"Sunrise","icon":"icons/sunrise.png","urls":{"apple":"https://apps.apple.com/app/id1530008755"}},
    {"id":"hard-disk","name":"Hard Disk","icon":"icons/hard-disk.png","urls":{"apple":"https://apps.apple.com/app/id1043842695"}},
    {"id":"date-today","name":"Date Today","icon":"icons/date-today.png","urls":{"apple":"https://apps.apple.com/app/id1523093827"}},
    {"id":"date-today-for-safari","name":"Date Today for Safari","icon":"icons/date-today-for-safari.png","urls":{"apple":"https://apps.apple.com/app/id1526278803"}},
    {"id":"traffic-blinker","name":"Traffic Blinker","icon":"icons/traffic-blinker.png","platforms":["ios"],"urls":{"apple":"https://apps.apple.com/app/id1073990483"}},
    {"id":"home-tab","name":"Home Tab for Safari","icon":"icons/home-tab.png","urls":{"apple":"https://apps.apple.com/app/id1585512140"}},
    {"id":"aerial-view-tab","name":"Aerial View Tab for Safari","icon":"icons/aerial-view-tab.png","urls":{"apple":"https://apps.apple.com/app/id1434326741"}},
    {"id":"proper-menubar","name":"Proper Menubar for Safari","icon":"icons/proper-menubar.png","urls":{"apple":"https://apps.apple.com/app/id6756031331"}},
    {"id":"zoom","name":"Zoom for Safari","icon":"icons/zoom.png","urls":{"apple":"https://apps.apple.com/app/id1423085875"}},
    {"id":"full-screen","name":"Full Screen for Safari","icon":"icons/full-screen.png","urls":{"apple":"https://apps.apple.com/app/id1462623715"}},
    {"id":"snow","name":"Snow for Safari","icon":"icons/snow.png","urls":{"apple":"https://apps.apple.com/app/id6755977850"}},
    {"id":"ambient-aurea","name":"Ambient Aurea for Safari","icon":"icons/ambient-aurea.png","urls":{"apple":"https://apps.apple.com/app/id1549194944"}},
    {"id":"font-size-increase","name":"Font Size Increase for Safari","icon":"icons/font-size-increase.png","urls":{"apple":"https://apps.apple.com/app/id6756031354"}},
    {"id":"font-size-decrease","name":"Font Size Decrease for Safari","icon":"icons/font-size-decrease.png","urls":{"apple":"https://apps.apple.com/app/id6756031162"}},
    {"id":"rotate-that-video-player","name":"Rotate that Video Player","icon":"icons/rotate-that-video-player.png","urls":{"apple":"https://apps.apple.com/app/id6756031106"}},
    {"id":"print","name":"Print for Safari","icon":"icons/print.png","urls":{"apple":"https://apps.apple.com/app/id6475040701"}},
    {"id":"aurora-player","name":"Aurora Player","icon":"icons/aurora-player.png","platforms":["macos"],"urls":{"apple":"https://apps.apple.com/app/id1043744348"}},
    {"id":"headly","name":"Headly","icon":"icons/headly.png","urls":{"apple":"https://apps.apple.com/app/id6759742272"}},
    {"id":"the-canada-race","name":"The Canada Race","icon":"icons/the-canada-race.png","urls":{"apple":"https://apps.apple.com/app/id1416358359"}},
    {"id":"finance-toolbar","name":"Finance Toolbar","icon":"icons/finance-toolbar.png","platforms":["macos"],"urls":{"apple":"https://apps.apple.com/app/id1044095759"}},
    {"id":"cpu-check","name":"CPU Check","icon":"icons/cpu-check.png","platforms":["macos"],"urls":{"apple":"https://apps.apple.com/app/id1043840644"}},
    {"id":"memory-check","name":"Memory Check","icon":"icons/memory-check.png","platforms":["macos"],"urls":{"apple":"https://apps.apple.com/app/id1462188561"}},
    {"id":"turn-off-the-lights-desktop","name":"Turn Off the Lights - Desktop","icon":"icons/turn-off-the-lights-desktop.png","platforms":["macos"],"urls":{"apple":"https://apps.apple.com/app/id1043732024"}},
    {"id":"fast-shutdown","name":"Fast Shutdown","icon":"icons/fast-shutdown.png","platforms":["macos"],"urls":{"apple":"https://apps.apple.com/app/id1043724056"}},
    {"id":"my-recent-documents","name":"My Recent Documents","icon":"icons/my-recent-documents.png","platforms":["macos"],"urls":{"apple":"https://apps.apple.com/app/id1252412682"}},
    {"id":"hello-office","name":"Hello Office","icon":"icons/hello-office.png","urls":{"apple":"https://apps.apple.com/app/id6797568013","android":"https://play.google.com/store/apps/details?id=com.stefanvd.helloofficegame"}}
    ]}
    """

    static var bundledApps: [OtherApp] {
        (try? JSONDecoder().decode(OtherAppsRoot.self, from: Data(bundledJSON.utf8)))?.apps ?? []
    }
}
