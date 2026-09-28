//
//  VideoView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 26/07/2025.
//

import SwiftUI
import SafariServices
import AVFoundation
import AVKit
import WebKit

struct VideosView: View {
    @State private var videoProducts: [VideoApp] = VideoService.fallbackVideos()
    @State private var selectedVideoID: VideoApp.ID?

    private var selectedVideo: VideoApp? {
        videoProducts.first { $0.id == selectedVideoID }
    }

    var body: some View {
        NavigationSplitView {
            List(selection: $selectedVideoID) {
                Section {
                    VideoHeader()
                }
                .listSectionSeparator(.hidden, edges: .top)

                Section {
                    ForEach(videoProducts) { video in
                        VideoRow(video: video)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .tag(video.id)
                            .listRowSeparator(.visible)
                            .listRowSeparatorTint(Color(uiColor: .separator))
                            .accessibilityLabel(Text("Play video: \(video.appName)"))
                            .accessibilityHint(Text("Plays the video in the detail pane"))
                    }
                }
                .listSectionSeparator(.hidden, edges: [.top, .bottom])

                Section {
                    Button {
                        if let url = URL(string: "https://www.youtube.com/@turnoffthelights/videos") {
                            StefanFunctions().openURL(url)
                        }
                    } label: {
                        HStack {
                            Image(systemName: "play.rectangle.on.rectangle")
                            Text("See more videos")
                        }
                        .frame(maxWidth: .infinity, alignment: .center)
                    }
                    .buttonStyle(.borderedProminent)
                    .accessibilityHint(Text("Opens in your web browser"))
                }
                .listRowInsets(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 0))
                .listRowBackground(Color.clear)
                .listSectionSeparator(.hidden)
            }
            .navigationTitle("Videos")
        } detail: {
            if let video = selectedVideo {
                VideoDetailView(video: video)
            } else {
                ContentUnavailableView {
                    Label("Select a Video", systemImage: "play.rectangle")
                } description: {
                    Text("Choose a video from the list to watch it here.")
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(Color(uiColor: .systemGroupedBackground))
            }
        }
        .onAppear {
            loadLatestVideos()
        }
    }

    private func loadLatestVideos() {
        VideoService.shared.fetchLatestVideos { [self] videos in
            videoProducts = videos
        }
    }
}

struct VideoDetailView: View {
    let video: VideoApp

    var body: some View {
        Form {
            Section {
                YouTubeEmbedView(videoID: video.appDownloadLink)
                    .aspectRatio(16.0 / 9.0, contentMode: .fit)
                    .cornerRadius(12)
                    .accessibilityLabel(Text("Video player: \(video.appName)"))
            }
            .listRowInsets(EdgeInsets())
            .listRowBackground(Color.clear)

            Section() {
                VStack(alignment: .leading){
                    Text(video.appName)
                        .font(.headline)
                        .listRowSeparator(.hidden)
                        .accessibilityHeading(.h1)
                    
                    Button {
                        StefanFunctions().openyoutubevideo(youtubeId: video.appDownloadLink)
                    } label: {
                        HStack {
                            Image(systemName: "play.rectangle.on.rectangle")
                            Text("Watch on YouTube")
                        }
                        .frame(maxWidth: .infinity, alignment: .center)
                    }
                    .buttonStyle(.borderedProminent)
                    .accessibilityHint(Text("Opens in the YouTube app or your web browser"))
                }
            }
        }
        .formStyle(.grouped)
        .navigationTitle(video.appName)
        .toolbarTitleDisplayMode(.inline)
        .toolbar {
            if let url = video.youtubeURL {
                ShareLink(item: url)
            }
        }
    }
}

private struct VideoHeader: View{
    @State private var player = AVPlayer(url: Bundle.main.url(forResource: "forest", withExtension: "mov")!)
    
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @Environment(\.colorScheme) private var colorScheme
    @Environment(\.accessibilityReduceTransparency) private var reduceTransparency
 
    var body: some View {
        VStack(spacing: 0) {
            ZStack(alignment: .leading) {
                VideoPlayerViewController(player: player, showsPlaybackControls: false)
                    .frame(height: 100)
                    .onAppear {
                        player.play()
                        player.isMuted = true
                        player.actionAtItemEnd = .none
                        NotificationCenter.default.addObserver(
                            forName: .AVPlayerItemDidPlayToEndTime,
                            object: player.currentItem,
                            queue: nil
                        ) { _ in
                            player.seek(to: .zero)
                            player.play()
                        }
                    }
                    .accessibilityHidden(true)
                    .overlay(alignment: .bottomLeading) {
                        Group {
                            if reduceTransparency {
                                LinearGradient(
                                    colors: [
                                        Color.black.opacity(colorScheme == .dark ? 0.55 : 0.65),
                                        Color.black.opacity(colorScheme == .dark ? 0.35 : 0.45),
                                        Color.clear
                                    ],
                                    startPoint: .bottom,
                                    endPoint: .top
                                )
                            } else {
                                LinearGradient(
                                    colors: [
                                        Color.black.opacity(0.55),
                                        Color.black.opacity(0.30),
                                        Color.clear
                                    ],
                                    startPoint: .bottom,
                                    endPoint: .top
                                )
                            }
                        }
                        .frame(height: 100)
                        .accessibilityHidden(true)
                    }

                HStack {
                    Image("share-lamp")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 72, height: 72)
                        .cornerRadius(8)
                        .accessibilityLabel(Text("Turn Off the Lights channel avatar"))
                    VStack(alignment: .leading) {
                        Text("Turn Off the Lights")
                            .foregroundStyle(.white)
                        Button("Subscribe") {
                            if let url = URL(string: "https://www.youtube.com/@turnoffthelights?sub_confirmation=1") {
                                StefanFunctions().openURL(url)
                            }
                        }
                        .buttonStyle(.borderedProminent)
                        .tint(.blue)
                        .controlSize(.small)
                        .accessibilityHint(Text("Opens in your web browser"))
                    }
                }
                .padding(.horizontal, 25)
            }
        }
        .listRowInsets(EdgeInsets())
        .listRowBackground(Color.clear)
    }
}

struct VideoPlayerViewController: UIViewControllerRepresentable {
    let player: AVPlayer
    let showsPlaybackControls: Bool

    func makeUIViewController(context: Context) -> AVPlayerViewController {
        let viewController = AVPlayerViewController()
        viewController.player = player
        viewController.showsPlaybackControls = showsPlaybackControls
        viewController.videoGravity = .resizeAspectFill
        return viewController
    }

    func updateUIViewController(_ uiViewController: AVPlayerViewController, context: Context) {
        // No update needed
    }
}

struct VideoRow: View {
    @State private var thumbnailImage: UIImage?

    let video: VideoApp

    var body: some View {
        HStack(alignment: .top, spacing: 0) {
            Text("")
            HStack(alignment: .top, spacing: 12){
                if let thumbnailImage = thumbnailImage {
                    Image(uiImage: thumbnailImage)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(maxWidth: 280, maxHeight: 157)
                        .cornerRadius(8)
                        .accessibilityHidden(true)
                } else {
                    Image(systemName: "photo")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(maxWidth: 280, maxHeight: 157)
                        .cornerRadius(8)
                        .accessibilityHidden(true)
                }
                Text(video.appName)
                    .font(.headline)
                    .multilineTextAlignment(.leading)
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
        }
        .onAppear {
            fetchThumbnail()
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(Text(video.appName))
    }

    private func fetchThumbnail() {
        let url = URL(string: "https://img.youtube.com/vi/\(video.appDownloadLink)/maxresdefault.jpg")!

        URLSession.shared.dataTask(with: url) { data, response, error in
            guard let data = data, error == nil else {
                print("Failed to fetch thumbnail:", error?.localizedDescription ?? "")
                return
            }

            DispatchQueue.main.async {
                self.thumbnailImage = UIImage(data: data)
            }
        }.resume()
    }
}

struct YouTubeEmbedView: UIViewRepresentable {
    let videoID: String

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        let webView = WKWebView(frame: .zero, configuration: configuration)
        context.coordinator.load(webView, videoID: videoID)
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        context.coordinator.load(webView, videoID: videoID)
    }

    class Coordinator {
        var loadedVideoID: String?

        // Loading the embed URL directly in WKWebView makes YouTube fail with
        // "Error 153: video player configuration error" because no Referer is
        // sent. Wrapping it in an iframe with a baseURL gives the embed a
        // proper origin, which is what YouTube's player expects.
        func load(_ webView: WKWebView, videoID: String) {
            guard loadedVideoID != videoID else { return }
            loadedVideoID = videoID
            let safeID = videoID.filter { $0.isLetter || $0.isNumber || $0 == "-" || $0 == "_" }
            let html = """
            <!DOCTYPE html>
            <html>
            <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
            html, body { margin: 0; padding: 0; height: 100%; background: #000; }
            iframe { position: fixed; inset: 0; width: 100%; height: 100%; border: 0; }
            </style>
            </head>
            <body>
            <iframe src="https://www.youtube.com/embed/\(safeID)?playsinline=1&rel=0&origin=https%3A%2F%2Fwww.turnoffthelights.com"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; encrypted-media; picture-in-picture"
                    allowfullscreen></iframe>
            </body>
            </html>
            """
            webView.loadHTMLString(html, baseURL: URL(string: "https://www.turnoffthelights.com"))
        }
    }
}

struct WebView: UIViewRepresentable {
    let url: URL

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.isOpaque = false
        webView.backgroundColor = .systemGroupedBackground
        webView.scrollView.backgroundColor = .systemGroupedBackground
        webView.load(URLRequest(url: url))
        context.coordinator.lastRequestedURL = url
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        guard context.coordinator.lastRequestedURL != url else { return }
        context.coordinator.lastRequestedURL = url
        webView.load(URLRequest(url: url))
    }

    class Coordinator {
        var lastRequestedURL: URL?
    }
}

struct SafariView: UIViewControllerRepresentable {
    let url: URL

    func makeUIViewController(context: Context) -> SFSafariViewController {
        let safariViewController = SFSafariViewController(url: url)
        return safariViewController
    }

    func updateUIViewController(_ uiViewController: SFSafariViewController, context: Context) {
        // Update UI if needed
    }
}

#Preview {
    VideosView()
}
