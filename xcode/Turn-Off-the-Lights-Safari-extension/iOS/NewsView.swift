//
//  NewsView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 26/07/2025.
//

import SwiftUI
import SafariServices

extension String {
    var withoutHtmlTags: String {
        return self.replacingOccurrences(of: "<[^>]+>", with: "", options: .regularExpression, range: nil).replacingOccurrences(of: "&[^;]+;", with: "", options: .regularExpression, range: nil)
    }
}

struct NewsView: View {
    @State private var rssItems: [(title: String, description: String, pubDate: String, link: String, imageURL: String?)]?
    @State private var isLoading = true
    @State private var selectedLink: String?

    private var selectedItem: (title: String, description: String, pubDate: String, link: String, imageURL: String?)? {
        rssItems?.first { $0.link == selectedLink }
    }

    var body: some View {
        NavigationSplitView {
            Group {
                if isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle())
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .background(Color(uiColor: .systemBackground))
                } else {
                    List(selection: $selectedLink) {
                        Section {
                            ForEach(rssItems ?? [], id: \.link) { item in
                                NewsRow(item: item)
                                    .tag(item.link)
                                    .listRowSeparator(.visible)
                                    .listRowSeparatorTint(Color(uiColor: .separator))
                                    .accessibilityHint(Text("Reads the article in the detail pane"))
                            }
                        }
                        .listSectionSeparator(.hidden, edges: [.top, .bottom])
                        
                        Section {
                            Button {
                                if let url = URL(string: "https://www.turnoffthelights.com/blog/") {
                                    StefanLinks().openURL(url)
                                }
                            } label: {
                                HStack {
                                    Image(systemName: "newspaper")
                                    Text("Read more news")
                                }
                                .frame(maxWidth: .infinity, alignment: .center)
                            }
                            .buttonStyle(.borderedProminent)
                            .accessibilityHint(Text("Opens in your web browser"))
                        }
                        .listRowInsets(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 0))
                        .listRowBackground(Color.clear)
                        .listSectionSeparator(.hidden)
                    }
                    .listStyle(.insetGrouped)
                }
            }
            .navigationTitle("News")
        } detail: {
            if let item = selectedItem, let url = URL(string: item.link) {
                ArticleView(title: item.title, url: url)
            } else {
                ContentUnavailableView {
                    Label("Select an Article", systemImage: "newspaper")
                } description: {
                    Text("Choose a story from the list to read it here.")
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(Color(uiColor: .systemGroupedBackground))
            }
        }
        .onAppear(perform: loadData)
    }

    private func loadData() {
        let feedParser = FeedParser()
        let feedURL = StefanLinks().linkdeveloperblogfeed()
        let newFeedURL = feedURL + "?v=" + gettimenow()

        feedParser.parseFeed(feedURL: newFeedURL) { rssItems in
            self.rssItems = rssItems
            self.isLoading = false
        }
    }

    private func gettimenow() -> String {
        let calendar = Calendar.current
        let time = calendar.dateComponents([.hour, .minute, .second], from: Date())
        return "\(time.hour!):\(time.minute!):\(time.second!)"
    }
}

private struct NewsRow: View {
    let item: (title: String, description: String, pubDate: String, link: String, imageURL: String?)

    var body: some View {
        HStack(spacing: 8) {
            VStack(alignment: .leading, spacing: 8) {
                Text(item.title)
                    .font(.headline)
                Text(item.description.withoutHtmlTags)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .lineLimit(3)
                Text(item.pubDate.formattedPubDateLocalized())
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            Spacer()
            VStack {
                if let urlString = item.imageURL, let url = URL(string: urlString) {
                    AsyncImage(url: url) { phase in
                        switch phase {
                        case .success(let image):
                            image
                                .resizable()
                                .aspectRatio(contentMode: .fit)
                                .frame(height: 120)
                                .frame(maxWidth: 120)
                                .cornerRadius(8)
                        case .failure(_):
                            NewsRow.placeholderThumb
                                .frame(width: 120, height: 120)
                        case .empty:
                            NewsRow.placeholderThumb
                                .redacted(reason: .placeholder)
                                .frame(width: 120, height: 120)
                        @unknown default:
                            NewsRow.placeholderThumb
                                .frame(width: 120, height: 120)
                        }
                    }
                } else {
                    NewsRow.placeholderThumb
                        .frame(width: 120, height: 120)
                }
            }
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel(Text(item.title))
    }

    private static var placeholderThumb: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 8)
                .fill(Color(.tertiarySystemFill))
                .frame(width: 120, height: 120)
            Image(systemName: "photo")
                .foregroundStyle(.primary)
                .accessibilityHidden(true)
        }
    }
}

private struct ArticleView: View {
    let title: String
    let url: URL

    var body: some View {
        WebView(url: url)
            .ignoresSafeArea(edges: .all)
            .background(Color(uiColor: .systemGroupedBackground))
            .navigationTitle(title)
            .toolbarTitleDisplayMode(.inline)
            .toolbar {
                ShareLink(item: url)
                Button {
                    StefanFunctions().openURL(url)
                } label: {
                    Label("Open in Safari", systemImage: "safari")
                }
                .accessibilityHint(Text("Opens in your web browser"))
            }
    }
}

extension String {
    func formattedPubDateLocalized() -> String {
        let possibleFormats = [
            "EEE, dd MMM yyyy, HH:mm:ss Z",
            "EEE, dd MMM yyyy HH:mm:ss Z"
        ]
        
        var date: Date? = nil
        let parser = DateFormatter()
        parser.locale = Locale(identifier: "en_US_POSIX")
        
        for format in possibleFormats {
            parser.dateFormat = format
            if let parsed = parser.date(from: self) {
                date = parsed
                break
            }
        }
        
        guard let parsedDate = date else { return self }
        
        let output = DateFormatter()
        output.locale = .current
        output.timeZone = .current
        
        output.dateFormat = DateFormatter.dateFormat(
            fromTemplate: "EEEE, MMM d, yyyy, HH:mm",
            options: 0,
            locale: .current
        )
        
        return output.string(from: parsedDate)
    }
}

#Preview {
    NewsView()
}
