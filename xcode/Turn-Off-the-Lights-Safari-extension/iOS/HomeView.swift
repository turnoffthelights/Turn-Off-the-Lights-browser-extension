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
//                Color(uiColor: .systemGroupedBackground)
//                           .ignoresSafeArea()
                Rectangle()
                    .fill(gradient)
                    .edgesIgnoringSafeArea(.all)
                    .accessibilityHidden(true)
#endif
                    
                GeometryReader { geometry in
                    // Determine number of columns based on screen width
                    let isWideScreen = geometry.size.width > 600
                    if isWideScreen {
                        // iPad / visionOS layout (2-column grid)
                        let columns = Array(repeating: GridItem(.flexible(), spacing: 16), count: isWideScreen ? 2 : 1)
                        
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
                    }else{
                        ScrollView {
                            Text("Safari Extension")
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .padding(.horizontal)
                            
                            let columns = Array(repeating: GridItem(.flexible(), spacing: 16), count: isWideScreen ? 2 : 1)
                            
                            LazyVGrid(columns: columns, spacing: 20) {
                                ForEach(mainSectionItems, id: \.appName) { item in
                                    CellView(item: item)
                                }
                            }
                            .padding()
                        }
                    }
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
                    .accessibilityHint(Text("Opens in your web browser"))
                }
                
#if !os(visionOS)
                if #available(iOS 26.0, macOS 15.0, *) {
                    ToolbarSpacer(.fixed, placement: .primaryAction)
                }
#endif
                
                ToolbarItemGroup(placement: .primaryAction) {
                    ShareLink("",
                              item: URL(string: StefanLinks().linkappstore())!,
                              subject: Text("FREE Turn Off the Lights Safari extension"),
                              message: Text("Download the free Turn Off the Lights Safari extension to get Dark Mode on all websites. Try it yourself! via @TurnOfftheLight  \(StefanLinks().linkdeveloperwebsite())"))
                    .accessibilityLabel(Text("Share App"))
                    .accessibilityHint(Text("Opens the system share menu"))
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
                        .accessibilityHidden(true)
                    
                    Spacer()
                    
                    Button(action: {
                        if let url = URL(string: item.appDownloadLink) {
                            StefanFunctions().openURL(url)
                        }
                    }) {
                        Text(item.appButton)
                            .font(.subheadline)
                    }
                    //.buttonStyle(.borderedProminent)
#if os(visionOS)
                    .buttonStyle(.borderedProminent)
#else
                    .buttonStyle(.glass)
#endif
                    .controlSize(.large)
                    .padding(.top, 8)
                    .accessibilityHint(Text("Opens in your web browser"))
                    .accessibilityLabel(Text("\(item.appButton): \(item.appName)"))
                }
            }
            .padding()
            .frame(minWidth: 0, maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
#if !os(visionOS)
            .glassEffect(in: .rect(cornerRadius: 16.0))
#else
            .background(.regularMaterial)
            .cornerRadius(16)
#endif
            .frame(height: 220)
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
                        .accessibilityHidden(true)
                    
                    Spacer()
                    
                    Button(action: {
                        if let url = URL(string: item.appDownloadLink) {
                            StefanFunctions().openURL(url)
                        }
                    }) {
                        Text(item.appButton)
                            .font(.subheadline)
                    }
                    .buttonStyle(.borderedProminent)
                    //.buttonStyle(.glass)
                    .controlSize(.large)
                    .padding(.top, 8)
                    .accessibilityHint(Text("Opens in your web browser"))
                    .accessibilityLabel(Text("\(item.appButton): \(item.appName)"))
                }
            }
            .padding()
            .frame(minWidth: 0, maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
            //.glassEffect(in: .rect(cornerRadius: 16.0))
            .cornerRadius(16.0)
            .frame(height: 220)
        }
    }
}

#Preview {
    HomeView()
}
