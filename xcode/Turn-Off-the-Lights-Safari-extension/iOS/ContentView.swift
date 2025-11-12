//
//  ContentView.swift
//  Turn Off the Lights
//
//  Created by Stefan Van Damme on 26/07/2025.
//

import SwiftUI

struct ContentView: View {
    @StateObject private var networkMonitor = NetworkMonitor()
    @AppStorage("hasSeenWelcome") private var hasSeenWelcome: Bool = false
    @State private var showingWelcomeGuide = false
    
    var body: some View {
        ZStack{
            TabView {
                HomeView()
                .tabItem {
                    Label("Home", systemImage: "house")
                }
            
                VideosView()
                .tabItem {
                    Label("Videos", systemImage: "movieclapper")
                }
                
                NewsView()
                .tabItem {
                    Label("News", systemImage: "newspaper")
                }
                
                HelpView()
                .tabItem {
                    Label("More", systemImage: "ellipsis")
                }
            }
            .accessibilityHidden(!networkMonitor.isConnected)
            
            if !networkMonitor.isConnected {
                offlineFullScreenPanel
                    .transition(.opacity)
                   .animation(.easeInOut, value: networkMonitor.isConnected)
                   .edgesIgnoringSafeArea(.all)
                   .zIndex(1)
            }
        }
        .onAppear {
            if !hasSeenWelcome {
                showingWelcomeGuide = true
            }
        }
        .sheet(isPresented: $showingWelcomeGuide) {
            GuideView()
                .onDisappear {
                      hasSeenWelcome = true
                }
                .interactiveDismissDisabled()
        }
    }
    
    var offlineFullScreenPanel: some View {
            VStack(spacing: 20) {
                Spacer()
                Image(systemName: "wifi.slash")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 80, height: 80)
                    .foregroundStyle(.tint)
                    .accessibilityHidden(true)
                Text("No Internet Connection")
                    .font(.title)
                    .foregroundStyle(.primary)
                    .bold()
                Text("Please check your network settings and try again.")
                    .font(.body)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 40)
                Spacer()
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(.background)
            .accessibilityElement(children: .combine)
            .accessibilityLabel(Text("No Internet Connection. Please check your network settings and try again."))
            .accessibilityHint(Text("The main content is unavailable while offline."))
        }
}

#Preview {
    ContentView()
}
