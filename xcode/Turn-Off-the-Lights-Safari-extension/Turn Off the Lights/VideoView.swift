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

struct VideoView: View {
    let videoProducts: [VideoApp] =  [
          VideoApp(appName: "⚡️Introduction Turn Off the Lights for Safari on iOS", appDownloadLink: "GSEqAjzy_hg"),
          VideoApp(appName: "🔵How to enable Safari Extension iOS?", appDownloadLink: "la3l4IQrtbo"),
          VideoApp(appName: "🔵How to enable the Night Owl profile on iOS?", appDownloadLink: "vubVpLm8ldk"),
          VideoApp(appName: "🔵How to enable the Eye Protection profile on iOS?", appDownloadLink: "3TNYUG9O-u8"),
          VideoApp(appName: "🔵How to enable the Video Lover profile on iOS?", appDownloadLink: "Rm8nKaPlnSI"),
          VideoApp(appName: "🔵How to open the Turn Off the Lights Options page on iOS?", appDownloadLink: "91DmhjsCb_Y"),
          // -- general videos
          VideoApp(appName: "🔔Introduction - Turn Off the Lights Browser Extension version 4", appDownloadLink: "yONZVLA72ZM"),
          VideoApp(appName: "🌿Turn Off the Lights Browser Extension Version 4 - The Ultimate and Valuable Tool!", appDownloadLink: "oWg0rMvCJng"),
          VideoApp(appName: "🎁Double Click - Will make you see the useful HIDDEN Menu!", appDownloadLink: "nsmGfOAgcoE"),
          VideoApp(appName: "🕯How enable the Night Mode feature?", appDownloadLink: "mbO37Ac5ny8"),
          VideoApp(appName: "🔵How to enable the water reflection feature in the Turn Off the Lights browser extension?", appDownloadLink: "klMYXTbFzok"),
          VideoApp(appName: "🔵How to enable the Atmosphere Lighting Vivid Mode in the Turn Off the Lights browser extension?", appDownloadLink: "GOARYksUcEM"),
          VideoApp(appName: "🔵How to enable the Audio Visualizer on YouTube? (and other HTML5 video websites)", appDownloadLink: "V5uDBWCzrEQ"),
          VideoApp(appName: "🔵How to enable the block 60fps on YouTube?", appDownloadLink: "P9_tK6p-YOU")
      ]
    
    @State private var player = AVPlayer(url: Bundle.main.url(forResource: "forest", withExtension: "mov")!)
    @State private var isMuted = true
    
    
    var body: some View {
        NavigationStack{
            Form{
                Section{
                    ZStack (alignment:.leading) {
                    VideoPlayerViewController(player: player, showsPlaybackControls: false)
                        .edgesIgnoringSafeArea(.all)
                        .onAppear {
                            self.player.play()
                            self.player.isMuted = true
                            self.player.actionAtItemEnd = .none
                            NotificationCenter.default.addObserver(forName: .AVPlayerItemDidPlayToEndTime, object: self.player.currentItem, queue: nil) { _ in
                                self.player.seek(to: .zero)
                                self.player.play()
                            }
                        }.frame(height:100)
                        
                        HStack {
                            Image("share-lamp")
                                .resizable()
                                .aspectRatio(contentMode: .fit)
                                .frame(width: 72, height: 72)
                                .cornerRadius(8)
                            VStack(alignment: .leading){
                                Text("Turn Off the Lights")
                                    .foregroundStyle(.white)
                                Button(action: {
                                    // Handle subscription button action
                                    if let url = URL(string: "https://www.youtube.com/@turnoffthelights?sub_confirmation=1") {
                                        StefanFunctions().openURL(url)
                                    }
                                }) {
                                    Text("Subscribe")
                                }
                                .buttonStyle(.borderedProminent)
                                .tint(.blue)
                                .controlSize(.small)
                            }
                            
                        }.padding(.horizontal, 25)
                    }
                }
                .listRowInsets(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 0))
 
                Section(){
                    // List of video products
                    List(videoProducts, id: \.appName) { video in
                        NavigationLink(destination: SafariView(url: video.youtubeURL)) {
                            VideoRow(video: video)
                        }
                    }
                }
                
            }
            .formStyle(.grouped)
            .navigationTitle("Videos")
        }
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
        HStack(alignment: .top, spacing: 12) {
            Text("")
            if let thumbnailImage = thumbnailImage {
                Image(uiImage: thumbnailImage)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(maxWidth: 280, maxHeight: 157)
                    .cornerRadius(8)
            } else {
                Image(systemName: "photo")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(maxWidth: 280, maxHeight: 157)
                    .cornerRadius(8)
            }
            VStack(alignment: .leading){
                Text(video.appName)
                    .font(.headline)
                Text("Thumbnail Image")
                    .font(.subheadline)
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
                self.thumbnailImage = UIImage(data: data)
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

struct VideoApp {
    let appName: String
    let appDownloadLink: String

    var youtubeURL: URL {
        return URL(string: "https://www.youtube.com/watch?v=\(appDownloadLink)")!
    }
}

#Preview {
    VideoView()
}
