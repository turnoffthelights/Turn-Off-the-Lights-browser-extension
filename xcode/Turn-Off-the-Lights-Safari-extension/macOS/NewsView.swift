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

    var body: some View {
        NavigationStack {
            Form {
                if isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle())
                        .listRowBackground(Color.clear)
                } else {
                    ForEach(rssItems ?? [], id: \.link) { item in
                        Button {
                            if let url = URL(string: item.link) {
                                StefanLinks().openURL(url)
                            }
                        } label: {
                            VStack(alignment: .center, spacing: 8) {
                                HStack(spacing: 16){
                                    VStack(alignment: .leading, spacing: 8) {
                                        Text(item.title)
                                            .font(.headline)
                                            .foregroundStyle(.primary)
                                        Text(item.description.withoutHtmlTags)
                                            .font(.subheadline)
                                            .foregroundStyle(.secondary)
                                            .lineLimit(3)
                                        Text(item.pubDate.formattedPubDateLocalized())
                                            .font(.caption)
                                            .foregroundStyle(.secondary)
                                    }
                                    Spacer()
                                    VStack{
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
                                                        .accessibilityLabel(Text("Article image"))
                                                case .failure(_):
                                                    placeholderThumb
                                                case .empty:
                                                    placeholderThumb
                                                        .redacted(reason: .placeholder)
                                                @unknown default:
                                                    placeholderThumb
                                                }
                                            }
                                        } else {
                                            placeholderThumb
                                        }
                                    }
                                }
                            }
                        }
                        .buttonStyle(.plain)
                    }
                    
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
                    }
                    .listRowInsets(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 0))
                    .listRowBackground(Color.clear)
                    
                }
            }
            .formStyle(.grouped)
            .navigationTitle("News")
        }
        .onAppear(perform: loadData)
    }

    private var placeholderThumb: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 8)
                .fill(Color(.tertiarySystemFill))
                .frame(width: 120, height: 120)
            Image(systemName: "photo")
                .foregroundStyle(.primary)
                .accessibilityHidden(true)
        }
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
        .frame(width: 500, height: 600)
}
