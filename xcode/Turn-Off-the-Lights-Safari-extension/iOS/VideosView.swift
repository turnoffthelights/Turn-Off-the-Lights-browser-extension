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

struct VideosView: View {
    @State private var videoProducts: [VideoApp] = VideoService.fallbackVideos()

    var body: some View {
        NavigationStack {
            Group {
                GeometryReader { geometry in
                    // Determine number of columns based on screen width
                    let isWideScreen = geometry.size.width > 600
                    if isWideScreen {
                        // iPad / visionOS layout (3-column grid)
                        let columns = Array(repeating: GridItem(.flexible(), spacing: 16), count: isWideScreen ? 3 : 1)
                        
                        Form {
                            Section {
                                VideoHeader()
                            }

                            VStack{
                                Section {
                                    LazyVGrid(columns: columns, spacing: 16) {
                                        ForEach(videoProducts) { video in
                                            Button {
                                                StefanFunctions().openyoutubevideo(youtubeId: video.appDownloadLink)
                                            } label: {
                                                VideoCard(video: video)
                                            }
                                            .buttonStyle(.plain)
                                            .buttonBorderShape(.roundedRectangle(radius: 12))
                                        }
                                    }
                                    .listRowInsets(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 0))
                                    .listRowBackground(Color.clear)
                                }
                                .padding(.bottom, 16)
                                
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
                                .padding(.bottom, 16)
                            }
                            .listRowInsets(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 0))
                            .listRowBackground(Color.clear)
                        }
                        .formStyle(.grouped)
                    }else{
                        // iPhone: keep list/form style
                        Form {
                            Section {
                                VideoHeader()
                            }
                            
                            Section {
                                List(videoProducts) { video in
                                    Button {
                                        StefanFunctions().openyoutubevideo(youtubeId: video.appDownloadLink)
                                    } label: {
                                        VideoRow(video: video)
                                            .frame(maxWidth: .infinity, alignment: .leading)
                                    }
                                    .buttonStyle(.plain)
                                    .buttonBorderShape(.roundedRectangle(radius: 12))
                                    .accessibilityLabel(Text("Open video: \(video.appName)"))
                                    .accessibilityHint(Text("Opens in your web browser"))
                                }
                            }
                            
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
                        }
                        .formStyle(.grouped)
                    }
                }
            }
            .navigationTitle("Videos")
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

struct VideoCard: View {
    @State private var thumbnailImage: UIImage?
    let video: VideoApp

    private let cardHeight: CGFloat = 260

    @Environment(\.colorScheme) private var colorScheme
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            ZStack {
                Rectangle()
                    .fill(Color.secondary.opacity(0.15))
                    .aspectRatio(16/9, contentMode: .fit)
                    .overlay(
                        Group {
                            if let image = thumbnailImage {
                                Image(uiImage: image)
                                    .resizable()
                                    .scaledToFill()
                            } else {
                                Image(systemName: "photo")
                                    .font(.system(size: 40))
                                    .foregroundColor(.secondary)
                            }
                        }
                    )
                    .clipped()
                    .accessibilityHidden(true)
            }
            .frame(maxWidth: .infinity)
            .cornerRadius(10)

            Text(video.appName)
                .font(.headline)
                .multilineTextAlignment(.leading)
                .lineLimit(nil)
                .fixedSize(horizontal: false, vertical: true)

            Spacer(minLength: 0)
        }
        .padding(12)
        .frame(maxWidth: .infinity)
        .frame(height: cardHeight)
        .background(backgroundView)
        .onAppear {
            fetchThumbnail()
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(Text(video.appName))
    }
    
    private var backgroundView: some View {
    #if os(visionOS)
            // visionOS uses glass-like material
            RoundedRectangle(cornerRadius: 14)
                .fill(.regularMaterial)
    #else
            // iOS 16–26 keeps the custom design
            RoundedRectangle(cornerRadius: 14)
                .fill(Color(colorScheme == .dark ? Color(uiColor: .secondarySystemBackground) : .white))
                .shadow(color: .black.opacity(colorScheme == .dark ? 0.4 : 0.08),
                        radius: 6, x: 0, y: 2)
    #endif
    }

    private func fetchThumbnail() {
        let url = URL(string: "https://img.youtube.com/vi/\(video.appDownloadLink)/maxresdefault.jpg")!
        URLSession.shared.dataTask(with: url) { data, _, _ in
            if let data = data {
                DispatchQueue.main.async {
                    self.thumbnailImage = UIImage(data: data)
                }
            }
        }.resume()
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
