//
//  OtherAppsView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 28/02/2024.
//

import SwiftUI

struct OtherAppsView: View {
    /// This app's own entry id in apps.json, so it never promotes itself.
    var selfID = "turn-off-the-lights"

    @StateObject private var store = OtherAppsStore()

    var body: some View {
        NavigationStack {
            Form {
                Section(header: Text("Explore")) {
                    ForEach(store.visibleApps(excluding: selfID)) { app in
                        Button {
                            if let url = URL(string: app.url) {
                                StefanLinks().openURL(url)
                            }
                        } label: {
                            HStack(spacing:10) {
                                iconView(for: app)
                                Text(app.name)
                            }
                        }
                        .buttonStyle(.link)
                        .accessibilityLabel(Text("Open app page: \(app.name)"))
                        .accessibilityHint(Text("Opens in your web browser"))
                    }
                }
            }
            .formStyle(.grouped)
            .navigationTitle("Other Apps")
        }
        .onAppear { store.load() }
    }

    @ViewBuilder
    private func iconView(for app: OtherApp) -> some View {
        AsyncImage(url: store.iconURL(for: app)) { phase in
            switch phase {
            case .success(let image):
                image.resizable().scaledToFit()
            default:
                Color.secondary.opacity(0.2)
            }
        }
        .frame(width: 50, height: 50)
        .cornerRadius(10)
        .accessibilityHidden(true)
    }
}

#Preview {
    OtherAppsView()
}
