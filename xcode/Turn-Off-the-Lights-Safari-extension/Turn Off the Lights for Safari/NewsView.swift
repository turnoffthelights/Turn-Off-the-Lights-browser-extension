//
//  NewsView.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 01/03/2024.
//

import SwiftUI
import SafariServices

extension String {
    var withoutHtmlTags: String {
        return self.replacingOccurrences(of: "<[^>]+>", with: "", options: .regularExpression, range: nil).replacingOccurrences(of: "&[^;]+;", with: "", options: .regularExpression, range: nil)
    }
}

struct NewsView: View {
    @State private var rssItems: [(title: String, description: String, pubDate: String, link: String)]?
        @State private var isLoading = true

        var body: some View {
            VStack {
                Text(Stefanfunctions().i18string(text: "lblnews"))
                    .font(.largeTitle)
                    .padding(.top, 20)
                    .padding(.bottom, 10)
                
                if isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle())
                } else {
                    List {
                        ForEach(rssItems ?? [], id: \.link) { item in
                            VStack(alignment: .leading, spacing: 8) {
                                Text(item.title)
                                    .font(.headline)
                                Text(item.description.withoutHtmlTags)
                                    .font(.subheadline)
                                    .foregroundColor(.secondary)
                                    .lineLimit(3) // Limit to maximum 3 lines
                                Text(item.pubDate)
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                        }
                    }
                }
            }
            .onAppear(perform: loadData)
            .navigationBarTitle("News")
        }

    private func loadData() {
        let feedParser = FeedParser()
        let feedURL = "https://www.turnoffthelights.com/blog/feed/"
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

#Preview {
    NewsView()
}
