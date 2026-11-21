//
//  OtherAppsView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 28/02/2024.
//

import SwiftUI

/// The full "Other Apps" window. The catalog is shelved by
/// `OtherAppCategory` so the long list reads in sections, a
/// season-pinned featured card leads it, and `.searchable` collapses
/// the shelves into one flat results list while the field has text.
/// A click opens the App Store page in the default browser.
struct OtherAppsView: View {
    /// This app's own entry id in index.json, so it never promotes itself.
    var selfID = "turn-off-the-lights"

    @StateObject private var store = OtherAppsStore()
    @State private var searchText = ""

    /// One non-empty shelf: which category, which apps.
    private struct Shelf: Identifiable {
        let category: OtherAppCategory
        let apps: [OtherApp]
        var id: OtherAppCategory { category }
    }

    private var apps: [OtherApp] { store.visibleApps(excluding: selfID) }

    /// Every shelf that has something on it, in `OtherAppCategory`
    /// declaration order — a catalog with no games simply skips that
    /// header rather than showing an empty section.
    private var shelves: [Shelf] {
        OtherAppCategory.allCases.compactMap { category in
            let members = apps.filter { $0.appCategory == category }
            return members.isEmpty ? nil : Shelf(category: category, apps: members)
        }
    }

    /// Flat matches while the search field has text — the shelves and
    /// the featured card step aside so results read as one list.
    private var searchResults: [OtherApp] {
        apps.filter { $0.name.localizedCaseInsensitiveContains(searchText) }
    }

    /// The season the featured card is dressed for right now.
    private var season: FeaturedSeason { .current }

    /// The app the top card pushes, pinned to the season — December
    /// leads with the Christmas tree, October with Halloween, the lunar
    /// window with Lunar New Year; every other day spotlights Who's at
    /// the Door?, the newest game in the catalog. The featured app also
    /// stays in its own shelf, like the App Store front page.
    private var featuredApp: OtherApp? {
        let featuredID = switch season {
        case .christmas:    "my-christmas-tree"
        case .halloween:    "my-halloween"
        case .lunarNewYear: "my-lunar-new-year"
        case .regular:      "whosatthedoor"
        }
        return apps.first { $0.id == featuredID }
    }

    /// The featured card's caption — a season-flavored nudge rather
    /// than a repeat of the app's name.
    private var featuredCaption: LocalizedStringKey {
        switch season {
        case .christmas:    "Decorate a tree for the holidays"
        case .halloween:    "Something spooky for the season"
        case .lunarNewYear: "Celebrate the new year"
        case .regular:      "A knock-knock reaction game"
        }
    }

    var body: some View {
        NavigationStack {
            Form {
                if searchText.isEmpty {
                    if let featured = featuredApp {
                        Section {
                            Button {
                                if let url = featured.storeURL {
                                    StefanLinks().openURL(url)
                                }
                            } label: {
                                HStack(spacing: 14) {
                                    OtherAppIcon(url: store.iconURL(for: featured), size: 64, cornerRadius: 14)
                                    VStack(alignment: .leading, spacing: 2) {
                                        Text(featured.name).font(.headline)
                                        Text(featuredCaption)
                                            .font(.caption)
                                            .foregroundStyle(.secondary)
                                    }
                                }
                                .padding(.vertical, 4)
                            }
                            .buttonStyle(.link)
                            .accessibilityLabel(Text("Open app page: \(featured.name)"))
                            .accessibilityHint(Text("Opens in your web browser"))
                        } header: {
                            Text("Featured")
                        }
                    }
                    ForEach(shelves) { shelf in
                        Section(shelf.category.title) {
                            ForEach(shelf.apps, content: row)
                        }
                    }
                } else {
                    Section {
                        ForEach(searchResults, content: row)
                        if searchResults.isEmpty {
                            Text("No apps match “\(searchText)”")
                                .foregroundStyle(.secondary)
                        }
                    }
                }
            }
            .formStyle(.grouped)
            .navigationTitle("Other Apps")
        }
        .searchable(text: $searchText, prompt: "Search apps")
        .onAppear { store.load() }
    }

    /// One shelf row: icon, name, and a button that opens the store
    /// page — extracted because the shelves and the flat search
    /// results share it.
    @ViewBuilder
    private func row(for app: OtherApp) -> some View {
        Button {
            if let url = app.storeURL {
                StefanLinks().openURL(url)
            }
        } label: {
            HStack(spacing: 10) {
                OtherAppIcon(url: store.iconURL(for: app))
                Text(app.name)
            }
        }
        .buttonStyle(.link)
        .accessibilityLabel(Text("Open app page: \(app.name)"))
        .accessibilityHint(Text("Opens in your web browser"))
    }
}

#Preview {
    OtherAppsView()
}
