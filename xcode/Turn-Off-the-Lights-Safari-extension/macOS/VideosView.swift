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
    let videoProducts: [VideoApp] =  [
        // general videos
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
        // previous campaign videos
          VideoApp(appName: "🌿Turn Off the Lights Browser Extension Version 4 - The Ultimate and Valuable Tool!", appDownloadLink: "oWg0rMvCJng"),
          VideoApp(appName: "🎁Double Click - Will make you see the useful HIDDEN Menu!", appDownloadLink: "nsmGfOAgcoE"),
          VideoApp(appName: "🕯How enable the Night Mode feature?", appDownloadLink: "mbO37Ac5ny8"),
          VideoApp(appName: "🔵How to enable the water reflection feature in the Turn Off the Lights browser extension?", appDownloadLink: "klMYXTbFzok"),
          VideoApp(appName: "🔵How to enable the Atmosphere Lighting Vivid Mode in the Turn Off the Lights browser extension?", appDownloadLink: "GOARYksUcEM"),
          VideoApp(appName: "🔵How to enable the Audio Visualizer on YouTube? (and other HTML5 video websites)", appDownloadLink: "V5uDBWCzrEQ"),
      ]
    
    private let player = AVPlayer(url: Bundle.main.url(forResource: "forest", withExtension: "mov")!)
    
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @Environment(\.colorScheme) private var colorScheme
    @Environment(\.accessibilityReduceTransparency) private var reduceTransparency
 
    var body: some View {
        NavigationStack{
            Form{
                Section{
                    ZStack(alignment:.leading) {
                        VStack(spacing:0){
                            VideoPlayerView(player: player, showsPlaybackControls: false)
                                .frame(height: 100)
                                .edgesIgnoringSafeArea(.all)
                                .allowsHitTesting(false)
                                .onAppear {
                                    if reduceMotion == false {
                                        startLoopingVideo()
                                    } else {
                                        stopVideo()
                                    }
                                }
                                .onChange(of: reduceMotion) { _, newValue in
                                    if newValue == false {
                                        startLoopingVideo()
                                    } else {
                                        stopVideo()
                                    }
                                }
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
                                }
                        }
                        
                        HStack {
                            Image("share-lamp")
                                .resizable()
                                .aspectRatio(contentMode: .fit)
                                .frame(width: 72, height: 72)
                                .cornerRadius(8)
                            VStack(alignment: .leading, spacing: 6){
                                Text("Turn Off the Lights")
                                    .font(.headline)
                                    .foregroundStyle(.white)
                                    .shadow(color: .black.opacity(0.6), radius: 2, x: 0, y: 1)
                                Button(action: {
                                    if let url = URL(string: "https://www.youtube.com/@turnoffthelights?sub_confirmation=1") {
                                        StefanFunctions().openURL(url)
                                    }
                                }) {
                                    Text("Subscribe")
                                        .font(.subheadline.weight(.semibold))
                                }
                                .buttonStyle(.borderedProminent)
                                .controlSize(.small)
                            }
                            
                        }
                        .padding(.horizontal, 25)
                    }
                }
                .padding(-10)
 
                Section(){
                    ScrollView {
                        let columns = Array(repeating: GridItem(.flexible(), spacing: 16, alignment: .top), count: 3)
                        LazyVGrid(columns: columns, alignment: .leading, spacing: 16) {
                            ForEach(videoProducts, id: \.appName) { video in
                                Button {
                                    StefanLinks().openURL(video.youtubeURL)
                                } label: {
                                    VideoCard(video: video)
                                }
                                .buttonStyle(.plain)
                            }
                        }
                        .padding(.horizontal)
                        .padding(.vertical, 8)
                    }
                    .listRowInsets(EdgeInsets())
                    .listRowBackground(Color.clear)
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
                }
                .listRowInsets(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 0))
                .listRowBackground(Color.clear)
                
            }
            .formStyle(.grouped)
            .navigationTitle("Videos")
            
        }
    }
    
    private func startLoopingVideo() {
        player.isMuted = true
        player.actionAtItemEnd = .none
        player.play()
        NotificationCenter.default.addObserver(
            forName: .AVPlayerItemDidPlayToEndTime,
            object: player.currentItem,
            queue: nil
        ) { _ in
            player.seek(to: .zero)
            player.play()
        }
    }

    private func stopVideo() {
        player.pause()
    }
}

struct VideoPlayerView: NSViewRepresentable {
    let player: AVPlayer
    let showsPlaybackControls: Bool

    func makeNSView(context: Context) -> AVPlayerView {
        let playerView = AVPlayerView()
        playerView.controlsStyle = showsPlaybackControls ? .default : .none
        playerView.player = player
        playerView.videoGravity = .resizeAspectFill
        player.isMuted = true
        player.actionAtItemEnd = .none
        return playerView
    }

    func updateNSView(_ nsView: AVPlayerView, context: Context) {
        nsView.player = player
    }
}

struct VideoRow: View {
    @State private var thumbnailImage: NSImage?

    let video: VideoApp

    var body: some View {
        HStack(alignment: .top, spacing: 0) {
            Text("")
            HStack(alignment: .top, spacing: 12){
                ZStack {
                    RoundedRectangle(cornerRadius: 8)
                        .fill(Color.gray.opacity(0.25))
                        .frame(width: 280, height: 157)
                    if let thumbnailImage = thumbnailImage {
                        Image(nsImage: thumbnailImage)
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 280, height: 157)
                            .cornerRadius(8)
                    } else {
                        Image(systemName: "photo")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 64, height: 64)
                            .foregroundStyle(.secondary)
                    }
                }
                Text(video.appName)
                    .font(.headline)
                    .foregroundStyle(.primary)
            }
        }
        .onAppear {
            fetchThumbnail()
        }
    }

    private func fetchThumbnail() {
        let url = URL(string: "https://img.youtube.com/vi/\(video.appDownloadLink)/maxresdefault.jpg")!

        URLSession.shared.dataTask(with: url) { data, response, error in
            guard let data = data, error == nil else {
                print("Failed to fetch thumbnail:", error?.localizedDescription ?? "")
                return
            }

            DispatchQueue.main.async {
                self.thumbnailImage = NSImage(data: data)
            }
        }.resume()
    }
}

struct VideoCard: View {
    @State private var thumbnailImage: NSImage?
    let video: VideoApp

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            ZStack {
                RoundedRectangle(cornerRadius: 8)
                    .fill(Color.gray.opacity(0.22))
                    .aspectRatio(16/9, contentMode: .fit)
                if let image = thumbnailImage {
                    Image(nsImage: image)
                        .resizable()
                        .aspectRatio(16/9, contentMode: .fit)
                        .cornerRadius(8)
                } else {
                    Image(systemName: "photo")
                        .font(.system(size: 28, weight: .regular))
                        .foregroundStyle(.secondary)
                        .padding(12)
                }
            }
            Text(video.appName)
                .font(.headline)
                .multilineTextAlignment(.leading)
                .lineLimit(nil)
                .foregroundStyle(.primary)
                .frame(maxWidth: .infinity, alignment: .topLeading)
        }
        .onAppear {
            fetchThumbnail()
        }
    }

    private func fetchThumbnail() {
        let url = URL(string: "https://img.youtube.com/vi/\(video.appDownloadLink)/maxresdefault.jpg")!
        URLSession.shared.dataTask(with: url) { data, response, error in
            guard let data = data, error == nil else { return }
            DispatchQueue.main.async {
                self.thumbnailImage = NSImage(data: data)
            }
        }.resume()
    }
}

struct VideoApp {
    let appName: String
    let appDownloadLink: String

    var youtubeURL: URL {
        return URL(string: "https://www.youtube.com/watch?v=\(appDownloadLink)")!
    }
}

#Preview {
    VideosView()
}
