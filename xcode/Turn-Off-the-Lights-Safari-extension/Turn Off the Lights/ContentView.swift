//
//  ContentView.swift
//  Turn Off the Lights
//
//  Created by Stefan Van Damme on 26/07/2025.
//

import SwiftUI

struct ContentView: View {
    @StateObject private var networkMonitor = NetworkMonitor()
    // Track whether user has seen the welcome guide before
    @AppStorage("hasSeenWelcome") private var hasSeenWelcome: Bool = false
    // Control showing the welcome guide sheet
    @State private var showingWelcomeGuide = false
    
    var body: some View {
        ZStack{
            TabView {
                HomeView()
                .tabItem {
                    Label("Home", systemImage: "house.fill")
                }
            
                VideoView()
                .tabItem {
                    Label("Videos", systemImage: "movieclapper.fill")
                }
                
                NewsView()
                .tabItem {
                    Label("News", systemImage: "newspaper.fill")
                }
                
                HelpView()
                .tabItem {
                    Label("More", systemImage: "ellipsis")
                }
            }
            
            // Overlay offline panel
            if !networkMonitor.isConnected {
                offlineFullScreenPanel
                    .transition(.opacity)
                   .animation(.easeInOut, value: networkMonitor.isConnected)
                   .edgesIgnoringSafeArea(.all) // Make sure it covers safe areas too
                   .zIndex(1)
            }
        }
        .onAppear {
            if !hasSeenWelcome {
                showingWelcomeGuide = true
            }
        }
        // Present the welcome guide modally
        .sheet(isPresented: $showingWelcomeGuide) {
            GuideView()
                .onDisappear {
                      hasSeenWelcome = true
                }
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
        }
}

#Preview {
    ContentView()
}
