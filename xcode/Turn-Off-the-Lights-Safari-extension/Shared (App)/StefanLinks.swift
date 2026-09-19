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
        return "https://apps.apple.com/app/id1569818870"
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
    let url: String
    let icon: String
    let hidden: Bool?
    let platforms: [String]?
}

/// Fetches the shared "Other Apps" list from a remote JSON file so every app
/// shows the same content without shipping an update. Falls back to the last
/// cached copy, then to a bundled snapshot when offline.
class OtherAppsStore: ObservableObject {
    @Published private(set) var apps: [OtherApp] = []

    private let remoteURL = URL(string: "https://www.stefanvd.net/apps/apps.json")!

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

    // Offline snapshot — keep in sync with the hosted apps.json
    private static let bundledJSON = """
    {"version":2,"apps":[
    {"id":"turn-off-the-lights","name":"Turn Off the Lights for Safari","url":"https://apps.apple.com/app/id1273998507","icon":"icons/turn-off-the-lights.png"},
    {"id":"turn-off-the-lights-mobile","name":"Turn Off the Lights for Mobile","url":"https://apps.apple.com/app/id1044081431","icon":"icons/turn-off-the-lights-mobile.png","platforms":["ios"]},
    {"id":"my-christmas-tree","name":"My Christmas Tree","url":"https://apps.apple.com/app/id1062397646","icon":"icons/my-christmas-tree.png"},
    {"id":"my-halloween","name":"My Halloween","url":"https://apps.apple.com/app/id6755063458","icon":"icons/my-halloween.png"},
    {"id":"my-easter-bunny","name":"My Easter Bunny","url":"https://apps.apple.com/app/id6738970939","icon":"icons/my-easter-bunny.png"},
    {"id":"my-lunar-new-year","name":"My Lunar New Year","url":"https://apps.apple.com/app/id1596469569","icon":"icons/my-lunar-new-year.png"},
    {"id":"sunrise","name":"Sunrise","url":"https://apps.apple.com/app/id1530008755","icon":"icons/sunrise.png"},
    {"id":"hard-disk","name":"Hard Disk","url":"https://apps.apple.com/app/id1043842695","icon":"icons/hard-disk.png"},
    {"id":"date-today","name":"Date Today","url":"https://apps.apple.com/app/id1523093827","icon":"icons/date-today.png"},
    {"id":"date-today-for-safari","name":"Date Today for Safari","url":"https://apps.apple.com/app/id1526278803","icon":"icons/date-today-for-safari.png"},
    {"id":"traffic-blinker","name":"Traffic Blinker","url":"https://apps.apple.com/app/id1073990483","icon":"icons/traffic-blinker.png","platforms":["ios"]},
    {"id":"home-tab","name":"Home Tab for Safari","url":"https://apps.apple.com/app/id1585512140","icon":"icons/home-tab.png"},
    {"id":"aerial-view-tab","name":"Aerial View Tab for Safari","url":"https://apps.apple.com/app/id1434326741","icon":"icons/aerial-view-tab.png"},
    {"id":"proper-menubar","name":"Proper Menubar for Safari","url":"https://apps.apple.com/app/id6756031331","icon":"icons/proper-menubar.png"},
    {"id":"zoom","name":"Zoom for Safari","url":"https://apps.apple.com/app/id1423085875","icon":"icons/zoom.png"},
    {"id":"full-screen","name":"Full Screen for Safari","url":"https://apps.apple.com/app/id1462623715","icon":"icons/full-screen.png"},
    {"id":"snow","name":"Snow for Safari","url":"https://apps.apple.com/app/id6755977850","icon":"icons/snow.png"},
    {"id":"ambient-aurea","name":"Ambient Aurea for Safari","url":"https://apps.apple.com/app/id1549194944","icon":"icons/ambient-aurea.png"},
    {"id":"font-size-increase","name":"Font Size Increase for Safari","url":"https://apps.apple.com/app/id6756031354","icon":"icons/font-size-increase.png"},
    {"id":"font-size-decrease","name":"Font Size Decrease for Safari","url":"https://apps.apple.com/app/id6756031162","icon":"icons/font-size-decrease.png"},
    {"id":"rotate-that-video-player","name":"Rotate that Video Player","url":"https://apps.apple.com/app/id6756031106","icon":"icons/rotate-that-video-player.png"},
    {"id":"print","name":"Print for Safari","url":"https://apps.apple.com/app/id6475040701","icon":"icons/print.png"},
    {"id":"aurora-player","name":"Aurora Player","url":"https://apps.apple.com/app/id1043744348","icon":"icons/aurora-player.png","platforms":["macos"]},
    {"id":"headly","name":"Headly","url":"https://apps.apple.com/app/id6759742272","icon":"icons/headly.png"},
    {"id":"the-canada-race","name":"The Canada Race","url":"https://apps.apple.com/app/id1416358359","icon":"icons/the-canada-race.png"},
    {"id":"finance-toolbar","name":"Finance Toolbar","url":"https://apps.apple.com/app/id1044095759","icon":"icons/finance-toolbar.png","platforms":["macos"]},
    {"id":"cpu-check","name":"CPU Check","url":"https://apps.apple.com/app/id1043840644","icon":"icons/cpu-check.png","platforms":["macos"]},
    {"id":"memory-check","name":"Memory Check","url":"https://apps.apple.com/app/id1462188561","icon":"icons/memory-check.png","platforms":["macos"]},
    {"id":"turn-off-the-lights-desktop","name":"Turn Off the Lights - Desktop","url":"https://apps.apple.com/app/id1043732024","icon":"icons/turn-off-the-lights-desktop.png","platforms":["macos"]},
    {"id":"fast-shutdown","name":"Fast Shutdown","url":"https://apps.apple.com/app/id1043724056","icon":"icons/fast-shutdown.png","platforms":["macos"]},
    {"id":"my-recent-documents","name":"My Recent Documents","url":"https://apps.apple.com/app/id1252412682","icon":"icons/my-recent-documents.png","platforms":["macos"]},
    {"id":"hello-office","name":"Hello Office","url":"https://apps.apple.com/app/id1569818870","icon":"icons/hello-office.png","hidden":true}
    ]}
    """

    static var bundledApps: [OtherApp] {
        (try? JSONDecoder().decode(OtherAppsRoot.self, from: Data(bundledJSON.utf8)))?.apps ?? []
    }
}
