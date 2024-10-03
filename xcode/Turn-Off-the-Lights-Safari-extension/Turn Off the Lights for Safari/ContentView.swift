//
//  ContentView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 28/02/2024.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            HomeView()
            .tabItem {
                Label(Stefanfunctions().i18string(text: "lblhome"), systemImage: "house.fill")
            }
        
            VideoView()
            .tabItem {
                Label(Stefanfunctions().i18string(text: "lblvideos"), systemImage: "movieclapper.fill")
            }
            
            NewsView()
            .tabItem {
                Label(Stefanfunctions().i18string(text: "lblnews"), systemImage: "newspaper.fill")
            }
            
            SettingsView()
            .tabItem {
                Label(Stefanfunctions().i18string(text: "lblsettings"), systemImage: "gearshape.fill")
            }
        }
    }
}

#Preview(windowStyle: .automatic) {
    ContentView()
}
