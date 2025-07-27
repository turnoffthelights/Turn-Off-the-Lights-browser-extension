//
//  GuideView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 26/07/2025.
//

import SwiftUI
import AVKit

struct Page1: View{
    var body: some View{
        VStack{
            VStack{
                HStack{
                    Image(.totlIosGuideLarge1)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 210, height: 100)
                    Image(.totlIosGuideSmall3)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 100, height: 100)
                }
                HStack{
                    Image(.totlIosGuideSmall4)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 100, height: 100)
                    VStack{
                        if #available(iOS 26.0, *) {
                            Image(.template)
                                .resizable()
                                .aspectRatio(contentMode: .fit)
                                .frame(width:64, height:64)
                                .foregroundStyle(.tint)
                                .padding(15)
#if !os(visionOS)
                                .glassEffect(in: .rect(cornerRadius: 16.0))
#else
                                .glassBackgroundEffect(in: .rect(cornerRadius: 16))
#endif
                        }else{
                            Image(.template)
                                .resizable()
                                .aspectRatio(contentMode: .fit)
                                .frame(width:64, height:64)
                                .foregroundStyle(.tint)
                                .padding(15)
                        }
                    }.frame(width: 100, height: 100)

                    Image(.totlIosGuideSmall2)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 100, height: 100)
                }
                HStack{
                    Image(.totlIosGuideSmall1)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 100, height: 100)
                    Image(.totlIosGuideLarge2)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 210, height: 100)
                }
            }
            .padding(.bottom, 32)
            
            
            Text("Welcome")
                .fontWeight(.bold)
                .font(.title)
                .multilineTextAlignment(.center)
                .padding(.bottom, 8)
            Text("Let us walk you through the awesome Turn Off the Lights Safari extension features.")
                .multilineTextAlignment(.center)
            
        }
        .padding()
        
    }
}

struct Page2: View{
    var body: some View{
        ScrollView{
            VStack{
                VStack{
                    Image(systemName: "lock.shield.fill")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .foregroundStyle(.tint)
                        .frame(width:200, height:200)
                }
                .frame(
                      minWidth: 0,
                      maxWidth: .infinity,
                      minHeight: 425,
                      maxHeight: 425,
                      alignment: .center
                    )
                .background(.thinMaterial)
                
                VStack(alignment: .leading){
                    HStack{
                        VStack(alignment: .leading, spacing: 10){
                            Text("Permissions")
                                .font(.subheadline)
                            Text("Privacy and Open-Source")
                                .font(.headline)
                                .fontWeight(.bold)
                                .overlay(
                                    Rectangle()
                                        .frame(height: 4)
                                        .foregroundStyle(.tint)
                                        .offset(y: 16),
                                    alignment: .bottomLeading
                                    
                                )
                        }
                        
                        Spacer()
                        
                        Button(action: {
                            StefanFunctions().openURL(URL(string: StefanLinks().linksourccode())!)
                        }) {
                            HStack(spacing:10) {
                                Text("GitHub")
                            }
                        }
                        .buttonStyle(.bordered)
                        .tint(.blue)
                    }
                    .padding(.bottom, 30)
                    
                    Text("We take your privacy and security very seriously. We have built the Turn Off the Lights browser extension for our users first, to get a great video and web experience available to all. When you add Turn Off the Lights, it says that we can \"Read and change all your data on the websites you visit\". This permission allows Turn Off the Lights to detect the current video player. We had never collected and will never collect any personal data, credit card, browsing history, and password.\n\nFurthermore, the Turn Off the Lights browser extension is free and Open-Source with the source code publicly available on GitHub.")
                    

                    Link("https://github.com/turnoffthelights/Turn-Off-the-Lights-Browser-extension", destination: URL(string: "https://github.com/turnoffthelights/Turn-Off-the-Lights-Browser-extension")!)
                    
                    Spacer(minLength: 100)
                }
                .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity, alignment: .topLeading)
                .padding()
            }
        }
        //.frame(width: .infinity, height: .infinity)
        
    }
}

struct Page3: View{
    var body: some View{
        ScrollView{
            VStack{
                VStack{
                    Image(.totlIosGuideImage1)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width:320, height:320)
                }
                .frame(
                      minWidth: 0,
                      maxWidth: .infinity,
                      minHeight: 425,
                      maxHeight: 425,
                      alignment: .center
                    )
                .background(.thinMaterial)
                
                VStack(alignment: .leading){
                    VStack(alignment: .leading, spacing: 10){
                        Text("Button Action")
                            .font(.subheadline)
                        Text("Video Lover Profile")
                            .font(.headline)
                            .fontWeight(.bold)
                            .overlay(
                                Rectangle()
                                    .frame(height: 4)
                                    .foregroundStyle(.tint)
                                    .offset(y: 16),
                                alignment: .bottomLeading
                                
                            )
                    }
                    .padding(.bottom, 30)
                    
                    Text("You can set 3 types of button actions for the lamp button. The default action is the Video Lover profile, which will dim the web page and highlight the video player if available.")
                    
                    Spacer(minLength: 100)
                }
                .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity, alignment: .topLeading)
                .padding()
            }
        }
        //.frame(width: .infinity, height: .infinity)
        
    }
}

struct Page4: View{
    var body: some View{
        ScrollView{
            VStack{
                VStack{
                    Image(.totlIosGuideImage2)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width:320, height:320)
                }
                .frame(
                      minWidth: 0,
                      maxWidth: .infinity,
                      minHeight: 425,
                      maxHeight: 425,
                      alignment: .center
                    )
                .background(.thinMaterial)
                
                VStack(alignment: .leading){
                    HStack{
                        VStack(alignment: .leading, spacing: 10){
                            Text("Button Action")
                                .font(.subheadline)
                            Text("Night Owl Profile")
                                .font(.headline)
                                .fontWeight(.bold)
                                .overlay(
                                    Rectangle()
                                        .frame(height: 4)
                                        .foregroundStyle(.tint)
                                        .offset(y: 16),
                                    alignment: .bottomLeading
                                    
                                )
                        }
                        
                        Spacer()
                        
                        Button(action: {
                            StefanFunctions().openyoutubeapporweb(text: "vubVpLm8ldk")
                        }) {
                            HStack(spacing:10) {
                                Text("Watch Video")
                            }
                        }
                        .buttonStyle(.bordered)
                        .tint(.blue)
                    }
                    .padding(.bottom, 30)
                    
                    Text("The 2nd action you can choose is the Night Owl profile. That makes it possible to convert any website to your personal dark mode theme.")
                    
                    Spacer(minLength: 100)
                }
                .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity, alignment: .topLeading)
                .padding()
            }
        }
        //.frame(width: .infinity, height: .infinity)
        
    }
}

struct Page5: View{
    var body: some View{
        ScrollView{
            VStack{
                VStack{
                    Image(.totlIosGuideImage3)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width:320, height:320)
                }
                .frame(
                      minWidth: 0,
                      maxWidth: .infinity,
                      minHeight: 425,
                      maxHeight: 425,
                      alignment: .center
                    )
                .background(.thinMaterial)
                
                VStack(alignment: .leading){
                    HStack{
                        VStack(alignment: .leading, spacing: 10){
                            Text("Button Action")
                                .font(.subheadline)
                            Text("Eye Protection Profile")
                                .font(.headline)
                                .fontWeight(.bold)
                                .overlay(
                                    Rectangle()
                                        .frame(height: 4)
                                        .foregroundStyle(.tint)
                                        .offset(y: 16),
                                    alignment: .bottomLeading
                                    
                                )
                        }
                        
                        Spacer()
                        
                        Button(action: {
                            StefanFunctions().openyoutubeapporweb(text: "3TNYUG9O-u8")
                        }) {
                            HStack(spacing:10) {
                                Text("Watch Video")
                            }
                        }
                        .buttonStyle(.bordered)
                        .tint(.blue)
                    }
                    .padding(.bottom, 30)
                    
                    Text("The last profile is the \"Eye Protection\" which dims the web page and adds this dark layer to all newly opened websites and will not remove the layer unless you tap the lamp button again.")
                    
                    Spacer(minLength: 100)
                }
                .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity, alignment: .topLeading)
                .padding()
            }
        }
        //.frame(width: .infinity, height: .infinity)
        
    }
}

struct Page6: View{
    var body: some View{
        ScrollView{
            VStack{
                VStack{
                    Image(.totlIosGuideImage4)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width:320, height:320)
                }
                .frame(
                      minWidth: 0,
                      maxWidth: .infinity,
                      minHeight: 425,
                      maxHeight: 425,
                      alignment: .center
                    )
                .background(.thinMaterial)
                
                VStack(alignment: .leading){
                    VStack(alignment: .leading, spacing: 10){
                        Text("Options page")
                            .font(.subheadline)
                        Text("Customizable")
                            .font(.headline)
                            .fontWeight(.bold)
                            .overlay(
                                Rectangle()
                                    .frame(height: 4)
                                    .foregroundStyle(.tint)
                                    .offset(y: 16),
                                alignment: .bottomLeading
                                
                            )
                    }
                    .padding(.bottom, 30)
                    
                    Text("There is so much more you can do. And everything can be customized on the Turn Off the Lights Options page, so it matches your personal style and preferences.")
                    
                    Spacer(minLength: 100)
                }
                .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity, alignment: .topLeading)
                .padding()
            }
        }
        //.frame(width: .infinity, height: .infinity)
        
    }
}

struct CustomVideoPlayer: UIViewControllerRepresentable {
    let player: AVPlayer

    func makeUIViewController(context: Context) -> AVPlayerViewController {
        let controller = AVPlayerViewController()
        controller.player = player
        controller.showsPlaybackControls = false
        controller.videoGravity = .resizeAspectFill
        return controller
    }

    func updateUIViewController(_ uiViewController: AVPlayerViewController, context: Context) {
        // no-op
    }
}


struct Page7: View{
    // AVQueuePlayer with AVPlayerLooper for infinite looping
    private let player: AVQueuePlayer
    private let looper: AVPlayerLooper?

    init() {
        if let url = Bundle.main.url(forResource: "forest", withExtension: "mov") {
            let item = AVPlayerItem(url: url)
            let queuePlayer = AVQueuePlayer()
            self.player = queuePlayer
            self.looper = AVPlayerLooper(player: queuePlayer, templateItem: item)
        } else {
            fatalError("Video file 'forest.mp4' not found in bundle.")
        }
    }
    
    var body: some View{
        ScrollView{
            VStack{
                
                ZStack(alignment: .top){
                    CustomVideoPlayer(player: player)
                                            .frame(height: 220)
                                            .clipped()
                                            .onAppear {
                                                player.play()
                                            }
    
                    VStack{
                        if #available(iOS 26.0, *) {
                            Image(.template)
                                .resizable()
                                .aspectRatio(contentMode: .fit)
                                .frame(width:64, height:64)
                                .foregroundStyle(.tint)
                                .padding(15)
    #if !os(visionOS)
                                .glassEffect(in: .rect(cornerRadius: 16.0))
    #else
                                .glassBackgroundEffect(in: .rect(cornerRadius: 16))
    #endif
                        }else{
                            Image(.template)
                                .resizable()
                                .aspectRatio(contentMode: .fit)
                                .frame(width:64, height:64)
                                .foregroundStyle(.tint)
                                .padding(15)
                        }
                    }
                    .frame(
                        minWidth: 0,
                        maxWidth: .infinity,
                        minHeight: 220,
                        maxHeight: 220,
                        alignment: .center
                    )
                }
                
                VStack(alignment: .leading){
                    HStack{
                        VStack(alignment: .leading, spacing: 10){
                            Text("Easy to set this up")
                                .font(.subheadline)
                            Text("Activate")
                                .font(.headline)
                                .fontWeight(.bold)
                                .overlay(
                                    Rectangle()
                                        .frame(height: 4)
                                        .foregroundStyle(.tint)
                                        .offset(y: 16),
                                    alignment: .bottomLeading
                                    
                                )
                        }
                        
                        Spacer()
                        
                        Button(action: {
                            StefanFunctions().openyoutubeapporweb(text: "la3l4IQrtbo")
                        }) {
                            HStack(spacing:10) {
                                Text("Watch Video")
                            }
                        }
                        .buttonStyle(.bordered)
                        .tint(.blue)
                    }
                    .padding(.bottom, 30)
                    
                    HStack(spacing:20){
                        Image(systemName: "1.circle.fill")
                            .resizable()
                            .foregroundStyle(.tint)
                            .frame(width: 35, height: 35)
                        Text("Leave this app")
                    }
                   
                    HStack(spacing:20){
                        Image(systemName: "2.circle.fill")
                            .resizable()
                            .foregroundStyle(.tint)
                            .frame(width: 35, height: 35)
                        Text("Open the Settings app on your device")
                    }
                    
                    HStack(spacing:20){
                        Image(systemName: "3.circle.fill")
                            .resizable()
                            .foregroundStyle(.tint)
                            .frame(width: 35, height: 35)
                        Text("Search and tap on Safari, tap then on Extensions")
                    }
                    
                    HStack(spacing:20){
                        Image(systemName: "4.circle.fill")
                            .resizable()
                            .foregroundStyle(.tint)
                            .frame(width: 35, height: 35)
                        Text("Enable Turn Off the Lights")
                    }
                    
                    Spacer(minLength: 100)
                }
                .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity, alignment: .topLeading)
                .padding()
            }
        }
        //.frame(width: .infinity, height: .infinity)
        
    }
}

struct GuideView: View {
    @Environment(\.dismiss) private var dismiss
    
    var body: some View {
        ZStack(alignment: .topTrailing) {
            TabView {
                Tab() {
                    Page1()
                }
                Tab() {
                   Page2()
                }
                Tab() {
                    Page3()
                }
                Tab() {
                    Page4()
                }
                Tab() {
                    Page5()
                }
                Tab() {
                    Page6()
                }
                Tab() {
                    Page7()
                }
            }
            .tabViewStyle(.page)
            .indexViewStyle(.page(backgroundDisplayMode: .always))
            
            // Manual Close Button
            #if os(visionOS)
            Button(action: {
                dismiss()
            }) {
                Label("Close", systemImage: "xmark")
                    .labelStyle(.iconOnly)
            }
            .padding(16)
            #else
            Button(action: {
                dismiss()
            }) {
                if #available(iOS 26.0, *) {
                    Image(systemName: "xmark")
                        .font(.system(size: 16, weight: .bold))
                        .frame(width: 36, height: 36)
                        .foregroundStyle(.primary)
                        .background(.ultraThinMaterial, in: Circle())
                        .glassEffect()
                } else {
                    // Fallback on earlier versions
                    Image(systemName: "xmark")
                        .font(.system(size: 16, weight: .bold))
                        .frame(width: 36, height: 36)
                        .foregroundStyle(.primary)
                        .background(.ultraThinMaterial, in: Circle())
                }
            }
            .padding(16)
            .accessibilityLabel("Close")
            #endif
        }
        
        
    }
}

#Preview {
    GuideView()
}
