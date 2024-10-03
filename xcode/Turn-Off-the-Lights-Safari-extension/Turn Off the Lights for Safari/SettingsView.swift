//
//  SettingsView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 28/02/2024.
//

import SwiftUI

struct SettingsView: View {
    @Environment(\.dismiss) var dismiss

    @State private var selectedNavigationItem: String? = "lblhelp"
    let navigationItems = ["lblhelp"]

    var body: some View {
        NavigationSplitView {
            List(navigationItems, id: \.self, selection: $selectedNavigationItem) { navigationItem in
               
                   HStack(spacing: 16) {
                       image(for: navigationItem)
                       Text(Stefanfunctions().i18string(text: navigationItem))
                   }
               
            }
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    HStack(spacing:16){
                        
                        Text(Stefanfunctions().i18string(text: "lblsettings"))
                            .font(.title)
                    }
                }
            }
        } detail: {
           if let selectedNavigationItem = selectedNavigationItem {
               destination(for: selectedNavigationItem) // Show detail view based on selection
           }
        }
        
    }

    // Function to determine destination based on navigation item
        func destination(for navigationItem: String) -> some View {
            switch navigationItem {
            case "lblhelp":
                return AnyView(HelpView())
            default:
                return AnyView(EmptyView()) // Handle default case or provide a fallback view
            }
        }
        
        // Function to determine image based on navigation item
        func image(for navigationItem: String) -> some View {
            switch navigationItem {
            case "lblhelp":
                return Image(systemName: "questionmark.circle.fill")
            default:
                return Image(systemName: "circle") // Provide a default image or handle default case
            }
        }
    
    func opentranslate(_ sender: Any) {
        if let url = URL(string: Stefanfunctions().webtranslate()) {
            UIApplication.shared.open(url)
        }
    }
    
    func openURL(_ url: URL) {
        guard let absoluteURL = URL(string: url.absoluteString) else { return }
        UIApplication.shared.open(absoluteURL)
    }
}

#Preview {
    SettingsView()
}
