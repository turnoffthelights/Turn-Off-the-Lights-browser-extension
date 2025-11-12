//
//  ContentView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 06/10/2025.
//

import SwiftUI
import SafariServices
import Combine

struct SidebarItem: Identifiable, Hashable, Equatable {
    let id = UUID()
    var name: String
    var systemImage: String

    static func == (lhs: SidebarItem, rhs: SidebarItem) -> Bool {
        lhs.id == rhs.id
    }

    func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
}

struct ContentView: View {
    @State private var sidebarItems: [SidebarItem] = [
        .init(name: "Home", systemImage: "house"),
        .init(name: "Videos", systemImage: "movieclapper"),
        .init(name: "News", systemImage: "newspaper"),
        .init(name: "About", systemImage: "info.circle")
    ]
    @State private var selection: SidebarItem? = nil
    @State private var columnVisibility: NavigationSplitViewVisibility = .automatic

    private let extensionBundleIdentifier = "com.stefanvd.Turn-Off-the-Lights-for-Safari.Extension"
    @State private var isExtensionEnabled: Bool? = nil
    @Environment(\.scenePhase) private var scenePhase
    @State private var pollTimer: Publishers.Autoconnect<Timer.TimerPublisher> = Timer.publish(every: 1.5, on: .main, in: .common).autoconnect()

    var body: some View {
        ZStack {
            NavigationSplitView(columnVisibility: $columnVisibility) {
                List(sidebarItems, selection: $selection) { item in
                    Label(item.name, systemImage: item.systemImage)
                        .tag(item)
                }
                .navigationTitle("Sidebar")
            } detail: {
                if let item = selection {
                    detailView(for: item)
                } else {
                    ContentPlaceholderView()
                }
            }
            .navigationSplitViewColumnWidth(min: 200, ideal: 240, max: 320)
            .onAppear {
                if selection == nil {
                    selection = sidebarItems.first
                }
                refreshExtensionState()
            }
            .onReceive(pollTimer) { _ in
                refreshExtensionState()
            }
            .onChange(of: scenePhase) { _, newPhase in
                if newPhase == .active {
                    refreshExtensionState()
                }
            }
        }
    }

    @ViewBuilder
    private func detailView(for item: SidebarItem) -> some View {
        switch item.name {
        case "Home":
            EnableView()
                .navigationTitle("Home")
        case "Videos":
            VideosView()
                .navigationTitle("Videos")
        case "News":
            NewsView()
                .navigationTitle("News")
        case "About":
            AboutView()
                .navigationTitle("About")
        default:
            EmptyView()
        }
    }

    private func refreshExtensionState() {
        SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: extensionBundleIdentifier) { state, error in
            DispatchQueue.main.async {
                if let _ = error {
                    self.isExtensionEnabled = nil
                } else {
                    self.isExtensionEnabled = state?.isEnabled ?? false
                }
            }
        }
    }
}

private struct DetailView: View {
    var item: SidebarItem
    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: item.systemImage)
                .font(.system(size: 64))
            Text(item.name)
                .font(.largeTitle)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

private struct ContentPlaceholderView: View {
    var body: some View {
        if #available(macOS 14.0, *) {
            ContentUnavailableView(
                "Select an item",
                systemImage: "sidebar.left",
                description: Text("Choose something from the sidebar to get started.")
            )
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        } else {
            VStack(spacing: 12) {
                Image(systemName: "sidebar.left")
                    .font(.system(size: 48))
                    .foregroundStyle(.secondary)
                Text("Select an item")
                    .font(.title2)
                    .foregroundStyle(.secondary)
                Text("Choose something from the sidebar to get started.")
                    .foregroundStyle(.secondary)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
    }
}

#Preview {
    ContentView()
        .frame(minWidth: 800, minHeight: 500)
}
