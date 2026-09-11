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
    
    private let player: AVPlayer? = {
        guard let url = Bundle.main.url(forResource: "forest", withExtension: "mov") else { return nil }
        return AVPlayer(url: url)
    }()
    
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
                            ForEach(videoProducts) { video in
                                Button {
                                    StefanFunctions().openyoutubevideo(youtubeId: video.appDownloadLink)
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
        .onAppear {
            loadLatestVideos()
        }
    }
    
    private func loadLatestVideos() {
        VideoService.shared.fetchLatestVideos { [self] videos in
            videoProducts = videos
        }
    }
    
    private func startLoopingVideo() {
        guard let player = player else { return }
        player.isMuted = true
        player.actionAtItemEnd = .none
        player.play()
        NotificationCenter.default.addObserver(
            forName: .AVPlayerItemDidPlayToEndTime,
            object: player.currentItem,
            queue: nil
        ) { [weak player] _ in
            player?.seek(to: .zero)
            player?.play()
        }
    }

    private func stopVideo() {
        player?.pause()
    }
}

struct VideoPlayerView: NSViewRepresentable {
    let player: AVPlayer?
    let showsPlaybackControls: Bool

    func makeNSView(context: Context) -> AVPlayerView {
        let playerView = AVPlayerView()
        playerView.controlsStyle = showsPlaybackControls ? .default : .none
        playerView.player = player
        playerView.videoGravity = .resizeAspectFill
        player?.isMuted = true
        player?.actionAtItemEnd = .none
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
        let url = video.thumbnailURL ?? URL(string: "https://img.youtube.com/vi/\(video.appDownloadLink)/maxresdefault.jpg")!

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
        let url = video.thumbnailURL ?? URL(string: "https://img.youtube.com/vi/\(video.appDownloadLink)/maxresdefault.jpg")!
        URLSession.shared.dataTask(with: url) { data, response, error in
            guard let data = data, error == nil else { return }
            DispatchQueue.main.async {
                self.thumbnailImage = NSImage(data: data)
            }
        }.resume()
    }
}

#Preview {
    VideosView()
}
