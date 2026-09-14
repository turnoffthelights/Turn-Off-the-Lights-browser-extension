//
//  VideoService.swift
//  Turn Off the Lights for Safari
//
//  Fetches the latest YouTube video list from the Turn Off the Lights website
//  and falls back to a bundled list if the endpoint is unavailable.
//

import Foundation

struct RemoteVideo: Codable {
    let id: String
    let title: String
    let thumbnailUrl: String
    let channelTitle: String?
    let viewCount: String?
    let publishedAt: String?
    let description: String?
}

struct VideoApp: Identifiable {
    let id: String
    let appName: String
    let appDownloadLink: String
    let thumbnailURL: URL?

    var youtubeURL: URL? {
        URL(string: "https://www.youtube.com/watch?v=\(appDownloadLink)")
    }

    init(appName: String, appDownloadLink: String, thumbnailURL: URL? = nil) {
        self.id = appDownloadLink
        self.appName = appName
        self.appDownloadLink = appDownloadLink
        self.thumbnailURL = thumbnailURL
    }

    init(remote: RemoteVideo) {
        self.id = remote.id
        self.appName = remote.title
        self.appDownloadLink = remote.id
        self.thumbnailURL = URL(string: remote.thumbnailUrl)
    }
}

class VideoService {
    static let shared = VideoService()
    private let remoteURL = URL(string: "https://www.turnoffthelights.com/video/public/videos.json")!
    private static let maxVideoCount = 15

    func fetchLatestVideos(completion: @escaping ([VideoApp]) -> Void) {
        URLSession.shared.dataTask(with: remoteURL) { data, response, _ in
            let result: [VideoApp]
            if let data = data,
               let httpResponse = response as? HTTPURLResponse,
               (200...299).contains(httpResponse.statusCode),
               let remote = try? JSONDecoder().decode([RemoteVideo].self, from: data) {
                result = remote.map { VideoApp(remote: $0) }
            } else {
                result = Self.fallbackVideos()
            }
            DispatchQueue.main.async {
                completion(Array(result.prefix(Self.maxVideoCount)))
            }
        }.resume()
    }

    static func fallbackVideos() -> [VideoApp] {
        var items: [VideoApp] = []

        #if os(visionOS)
        let visionItems: [VideoApp] = [
            VideoApp(appName: "Top 3 Features you need to use in Safari on Apple Vision Pro", appDownloadLink: "O2TdgJ1jvH4"),
            VideoApp(appName: "How to Enable a Safari Extension in Apple Vision Pro", appDownloadLink: "QKZr29xNd8c"),
            VideoApp(appName: "How to open the Safari Extension Options page on visionOS", appDownloadLink: "Qo84K2VFWeo")
        ]
        items.insert(contentsOf: visionItems, at: 0)
        #endif

        #if os(iOS)
        let iosItems: [VideoApp] = [
            VideoApp(appName: "⚡️Introduction Turn Off the Lights for Safari on iOS", appDownloadLink: "GSEqAjzy_hg"),
            VideoApp(appName: "🔵How to enable Safari Extension iOS?", appDownloadLink: "la3l4IQrtbo"),
            VideoApp(appName: "🔵How to enable the Night Owl profile on iOS?", appDownloadLink: "vubVpLm8ldk"),
            VideoApp(appName: "🔵How to enable the Eye Protection profile on iOS?", appDownloadLink: "3TNYUG9O-u8"),
            VideoApp(appName: "🔵How to enable the Video Lover profile on iOS?", appDownloadLink: "Rm8nKaPlnSI"),
            VideoApp(appName: "🔵How to open the Turn Off the Lights Options page on iOS?", appDownloadLink: "91DmhjsCb_Y")
        ]
        items.insert(contentsOf: iosItems, at: 0)
        #endif

        let generalItems: [VideoApp] = [
            VideoApp(appName: "How to enable Atmosphere Lighting Vivid Mode", appDownloadLink: "3xo2y4fFpV0"),
            VideoApp(appName: "How to Dim All Open Tabs (Dark EVERYTHING!)", appDownloadLink: "ZlIkUB8_RwE"),
            VideoApp(appName: "How to Enable the YouTube Video Filters", appDownloadLink: "jIsS0fypXgI"),
            VideoApp(appName: "Explore All 12 Dynamic Background Effects", appDownloadLink: "SwjK_qAOQ1A"),
            VideoApp(appName: "Click through the dimmed dark layer", appDownloadLink: "NxbpQaciN4M"),
            VideoApp(appName: "How to Boost YouTube Performance by Blocking 60FPS", appDownloadLink: "TRDP6a9D2g4"),
            VideoApp(appName: "How to enable the YouTube Video Zoom In/Out button", appDownloadLink: "zndSApclxV4"),
            VideoApp(appName: "How to Open the Extension Options page (in 3 Ways)", appDownloadLink: "NNMURORIieQ"),
            VideoApp(appName: "How to Watch YouTube in 4K (No More Potato Quality!)", appDownloadLink: "HhKqhSkBY_0"),
            VideoApp(appName: "How to change Night Mode Switch Position", appDownloadLink: "K6cbVuv-U-s"),
            VideoApp(appName: "How to set Multiple Opacity for Each Website", appDownloadLink: "OjVJcjdLNk8"),
            VideoApp(appName: "Secret Custom color picker for Night Mode on all websites", appDownloadLink: "vx2FfB57NRA"),
            VideoApp(appName: "🌿Turn Off the Lights Browser Extension Version 4 - The Ultimate and Valuable Tool!", appDownloadLink: "oWg0rMvCJng"),
            VideoApp(appName: "🎁Double Click - Will make you see the useful HIDDEN Menu!", appDownloadLink: "nsmGfOAgcoE"),
            VideoApp(appName: "🕯How enable the Night Mode feature?", appDownloadLink: "mbO37Ac5ny8"),
            VideoApp(appName: "🔵How to enable the water reflection feature in the Turn Off the Lights browser extension?", appDownloadLink: "klMYXTbFzok"),
            VideoApp(appName: "🔵How to enable the Atmosphere Lighting Vivid Mode in the Turn Off the Lights browser extension?", appDownloadLink: "GOARYksUcEM"),
            VideoApp(appName: "🔵How to enable the Audio Visualizer on YouTube? (and other HTML5 video websites)", appDownloadLink: "V5uDBWCzrEQ")
        ]
        items.append(contentsOf: generalItems)

        return Array(items.prefix(maxVideoCount))
    }
}
