//
//  HomeView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 26/07/2025.
//

import SwiftUI

struct Item {
    var appName: String
    var appDes: String
    var appImage: String
    var appButton: String
    var appDownloadLink: String
}

struct HomeView: View {
    @Environment(\.horizontalSizeClass) var horizontalSizeClass
    @Environment(\.colorScheme) var colorScheme
    
    let mainSectionItems = [
        Item(appName: "WORLD PREMIERE", appDes: "Browser Extension use Manifest V3 for better Privacy, Performance, and Security.", appImage: "lock.shield.fill", appButton: "Find out more", appDownloadLink: StefanLinks().linkdeveloperblog()),
        Item(appName: "TRANSLATOR COMMUNITY", appDes: "Help Translate our Browser Extension!", appImage: "rectangle.3.group.bubble.left.fill", appButton: "Find out more", appDownloadLink: StefanLinks().linktranslate()),
        Item(appName: "DEVELOPER COMMUNITY", appDes: "Find, and Report Issues!", appImage: "chevron.left.forwardslash.chevron.right", appButton: "Find out more", appDownloadLink: StefanLinks().linkdeveloper()),
        Item(appName: "SOCIAL COMMUNITY", appDes: "Follow and interact with other members!", appImage: "heart.circle.fill", appButton: "Find out more", appDownloadLink: StefanLinks().linksocial())
    ]
    
    var columns: [GridItem] {
            // Use 1 column (vertical layout) for compact size class (iPhone),
            // and 2 columns for regular size class (iPad).
            let columnCount = (horizontalSizeClass == .compact) ? 1 : 2
            return Array(repeating: GridItem(.flexible(), spacing: 20), count: columnCount)
        }
    
    var gradient: LinearGradient {
        let backgroundColor: Color

        #if os(iOS) || os(visionOS)
        backgroundColor = Color(UIColor.systemBackground)
        #elseif os(macOS)
        backgroundColor = Color(nsColor: NSColor.windowBackgroundColor)
        #endif

        let opacity = colorScheme == .dark ? 0.35 : 0.05

        return LinearGradient(
            colors: [backgroundColor, Color.blue.opacity(opacity), backgroundColor, backgroundColor],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
    }
    
    var body: some View {
        NavigationStack {
            ZStack{
#if !os(visionOS)
                Rectangle()
                    .fill(gradient)
                    .edgesIgnoringSafeArea(.all)
#endif
                
                ScrollView {
                    Text("Safari Extension")
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.horizontal)
                    
                    LazyVGrid(columns: columns, spacing: 20) {
                        ForEach(mainSectionItems, id: \.appName) { item in
                            CellView(item: item)
                        }
                    }
                    .padding()
                }
            }
            .navigationTitle("Turn Off the Lights")
            //.toolbarTitleDisplayMode(.inlineLarge)
            .toolbar {
                ToolbarItemGroup(placement: .primaryAction) {
                    Button(action: {
                        StefanFunctions().openURL(URL(string: StefanLinks().linkredirectionoptions())!)
                    }) {
                        Label("Options", systemImage: "gear")
                            .labelStyle(.titleOnly)
                    }
                }
      
#if !os(visionOS)
                if #available(iOS 26.0, macOS 15.0, *) {
                    ToolbarSpacer(.fixed, placement: .primaryAction)
                }
#endif
                
                ToolbarItemGroup(placement: .primaryAction) {                    
                    ShareLink("",
                              item: URL(string: StefanLinks().linkappstore())!,
                              subject: Text("sharesubject"),
                              message: Text(String(format: NSLocalizedString("sharemessage", comment: ""),
                                                   StefanLinks().linkdeveloperwebsite())))
                }
                
            }
            
        }
    }
}

struct CellView: View {
    let item: Item
    
    var body: some View {
        if #available(iOS 26.0, macOS 26.0, *) {
            VStack(alignment: .leading, spacing: 8) {
                Text(item.appName.uppercased())
                    .font(.headline)
                
                Text(item.appDes)
                    .font(.subheadline)
                
                Spacer()
                
                HStack {
                    Image(systemName: item.appImage)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 64, height: 64)
                        .foregroundStyle(.tint)
                    
                    Spacer() // Pushes the button to the right
                    
                    Button(action: {
                        // Action to perform when the button is tapped
                        if let url = URL(string: item.appDownloadLink) {
#if os(iOS)
                            UIApplication.shared.open(url, options: [:], completionHandler: nil)
#elseif os(macOS)
                            NSWorkspace.shared.open(url)
#endif
                        }
                    }) {
                        Text(item.appButton)
                            .font(.subheadline)
                    }
                    //.buttonStyle(.borderedProminent)
                    .buttonStyle(.glass)
                    .controlSize(.large)
                    .padding(.top, 8) // Add some top padding to the button
                }
            }
            .padding()
            .frame(minWidth: 0, maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
#if !os(visionOS)
            .glassEffect(in: .rect(cornerRadius: 16.0))
#else
    .glassBackgroundEffect(in: .rect(cornerRadius: 16))
#endif
            .frame(height: 320)
        } else {
            // Fallback on earlier versions
            VStack(alignment: .leading, spacing: 8) {
                Text(item.appName.uppercased())
                    .font(.headline)
                
                Text(item.appDes)
                    .font(.subheadline)
                
                Spacer()
                
                HStack {
                    Image(systemName: item.appImage)
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 64, height: 64)
                        .foregroundStyle(.tint)
                    
                    Spacer() // Pushes the button to the right
                    
                    Button(action: {
                        // Action to perform when the button is tapped
                        if let url = URL(string: item.appDownloadLink) {
#if os(iOS)
                            UIApplication.shared.open(url, options: [:], completionHandler: nil)
#elseif os(macOS)
                            NSWorkspace.shared.open(url)
#endif
                        }
                    }) {
                        Text(item.appButton)
                            .font(.subheadline)
                    }
                    .buttonStyle(.borderedProminent)
                    //.buttonStyle(.glass)
                    .controlSize(.large)
                    .padding(.top, 8) // Add some top padding to the button
                }
            }
            .padding()
            .frame(minWidth: 0, maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
            //.glassEffect(in: .rect(cornerRadius: 16.0))
            .cornerRadius(16.0)
            .frame(height: 320)
        }
    }
}


#Preview {
    HomeView()
}
