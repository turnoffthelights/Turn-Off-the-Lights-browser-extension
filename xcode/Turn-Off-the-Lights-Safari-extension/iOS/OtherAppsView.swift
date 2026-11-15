//
//  OtherAppsView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 26/07/2025.
//

import SwiftUI

/// One shelf of the "Other Apps" page. Raw values are the `category`
/// strings index.json may carry per entry. `CaseIterable` order is the
/// section order on the page — Seasonal leads so the featured card and
/// the top shelf tell one story; the long Safari tail goes last.
enum OtherAppCategory: String, CaseIterable {
    case seasonal, games, utilities, safari

    /// The section header for the shelf.
    var title: LocalizedStringKey {
        switch self {
        case .seasonal:  "Seasonal"
        case .games:     "Games"
        case .utilities: "Utilities"
        case .safari:    "Safari Extensions"
        }
    }
}

extension OtherApp {
    /// The shelf this app lands on. Trusts `category` when it names a
    /// known shelf; catalog entries written before the field existed
    /// fall back to a name sniff — every Safari extension is titled
    /// "… for Safari" — with Utilities as the catch-all, so nothing
    /// sorts worse than the old flat list did.
    var appCategory: OtherAppCategory {
        category.flatMap(OtherAppCategory.init(rawValue:))
            ?? (name.hasSuffix("for Safari") ? .safari : .utilities)
    }
}

/// The season the featured card dresses for — December pushes the
/// Christmas tree, the last week of October pushes Halloween, and the
/// Lunar New Year window pushes the festival app. Every other day is
/// the regular slot for the flagship sibling.
enum FeaturedSeason {
    case regular, christmas, halloween, lunarNewYear

    /// Picks the season for the current date. The featured card dresses
    /// up three times a year: the whole of December is Christmas, the
    /// last week of October through November 1st is Halloween, and a
    /// week before Lunar New Year through the Lantern Festival.
    static var current: FeaturedSeason {
        // The lunisolar check runs first — its window can reach into
        // February, never December or October, so it can't steal a day
        // from the other two.
        if inLunarNewYearWindow(.now) { return .lunarNewYear }
        let month = Calendar.current.component(.month, from: .now)
        let day = Calendar.current.component(.day, from: .now)
        switch (month, day) {
        case (12, _):            return .christmas
        case (10, 26...31),
             (11, 1):            return .halloween
        default:                 return .regular
        }
    }

    /// True while the Lunar New Year window is open. The festival rides
    /// the Chinese lunisolar calendar, so its Gregorian date moves every
    /// year — instead of a month/day rule this asks the Chinese calendar
    /// for the first day of the first month. The card dresses up a week
    /// early and stays dressed through the Lantern Festival — the
    /// fifteenth day — coming down the morning after.
    private static func inLunarNewYearWindow(_ date: Date) -> Bool {
        var chinese = Calendar(identifier: .chinese)
        chinese.timeZone = Calendar.current.timeZone
        // `date` can sit either side of the boundary it checks: in the
        // run-up week it still belongs to the old lunar year, so the
        // candidates are the lunar year containing it and the next one.
        guard let lunarYear = chinese.dateComponents([.year],
                                                     from: date).year
        else { return false }
        let today = Calendar.current.startOfDay(for: date)
        for year in [lunarYear, lunarYear + 1] {
            var dayOne = DateComponents()
            dayOne.year = year
            dayOne.month = 1
            dayOne.day = 1
            dayOne.isLeapMonth = false
            guard let newYear = chinese.date(from: dayOne),
                  let start = Calendar.current.date(byAdding: .day,
                                                    value: -7, to: newYear),
                  // Day 16's midnight — the festival's fifteenth day
                  // stays inside, the morning after it the card is gone.
                  let end = Calendar.current.date(byAdding: .day,
                                                  value: 15, to: newYear)
            else { continue }
            if today >= start && today < end { return true }
        }
        return false
    }
}

/// An app's icon — fetched from the catalog's server, with a plain
/// rounded swatch as the stand-in while it loads or when it can't, so
/// a missing icon never breaks a row.
struct OtherAppIcon: View {
    let url: URL?
    var size: CGFloat = 50
    var cornerRadius: CGFloat = 10

    var body: some View {
        AsyncImage(url: url) { phase in
            if case .success(let image) = phase {
                image.resizable().scaledToFit()
            } else {
                Color.secondary.opacity(0.2)
            }
        }
        .frame(width: size, height: size)
        .clipShape(RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
        .accessibilityHidden(true)
    }
}

/// The full "Other Apps" page pushed from the More screen. The catalog
/// is shelved by `OtherAppCategory` so the long list reads in sections,
/// a season-pinned featured card leads it, and `.searchable` collapses
/// the shelves into one flat results list while the field has text.
/// A tap opens the App Store page in Safari via `Link`.
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
        Form {
            if searchText.isEmpty {
                if let featured = featuredApp, let url = featured.storeURL {
                    Section {
                        Link(destination: url) {
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
                        .accessibilityLabel("Open app page: \(featured.name)")
                        .accessibilityHint("Opens in your web browser")
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
        .searchable(text: $searchText, prompt: "Search apps")
        .onAppear { store.load() }
    }

    /// One shelf row: icon, name, and a `Link` to the store page —
    /// extracted because the shelves and the flat search results share it.
    @ViewBuilder
    private func row(for app: OtherApp) -> some View {
        if let url = app.storeURL {
            Link(destination: url) {
                HStack(spacing: 12) {
                    OtherAppIcon(url: store.iconURL(for: app))
                    Text(app.name)
                }
            }
            .accessibilityLabel("Open app page: \(app.name)")
            .accessibilityHint("Opens in your web browser")
        }
    }
}

#Preview {
    OtherAppsView()
}
