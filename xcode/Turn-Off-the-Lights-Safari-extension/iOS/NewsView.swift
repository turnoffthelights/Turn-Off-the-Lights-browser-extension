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
    @Environment(\.colorScheme) private var colorScheme

    var body: some View {
        NavigationStack {
            Group {
                if isLoading {
                    Form {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle())
                            .listRowBackground(Color.clear)
                    }
                    .formStyle(.grouped)
                } else {
                    GeometryReader { geometry in
                        // Determine number of columns based on screen width
                        let isWideScreen = geometry.size.width > 600
                        if isWideScreen {
                            // iPad / visionOS layout (2-column grid)
                            let columns = Array(repeating: GridItem(.flexible(), spacing: 16), count: isWideScreen ? 2 : 1)
                            
                            Form {
                                VStack{
                                    LazyVGrid(columns: columns, spacing: 16) {
                                        ForEach(rssItems ?? [], id: \.link) { item in
                                            Button {
                                                if let url = URL(string: item.link) {
                                                    StefanLinks().openURL(url)
                                                }
                                            } label: {
                                                gridCard(for: item)
                                            }
                                            .buttonStyle(.plain)
                                            .buttonBorderShape(.roundedRectangle(radius: 12))
                                        }
                                    }
                                    .padding(.bottom, 16)
                                    
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
                                    .padding(.bottom, 16)
                                }
                                .listRowInsets(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 0))
                                .listRowBackground(Color.clear)
                            }
                        }else{
                            // iPhone: keep list/form style
                            Form{
                                Section {
                                    ForEach(rssItems ?? [], id: \.link) { item in
                                        Button {
                                            if let url = URL(string: item.link) {
                                                StefanLinks().openURL(url)
                                            }
                                        } label: {
                                            VStack(alignment: .center, spacing: 8) {
                                                HStack(spacing: 8){
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
                                                                case .failure(_):
                                                                    placeholderThumb
                                                                        .frame(width: 120, height: 120)
                                                                case .empty:
                                                                    placeholderThumb
                                                                        .redacted(reason: .placeholder)
                                                                        .frame(width: 120, height: 120)
                                                                @unknown default:
                                                                    placeholderThumb
                                                                        .frame(width: 120, height: 120)
                                                                }
                                                            }
                                                        } else {
                                                            placeholderThumb
                                                                .frame(width: 120, height: 120)
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        .buttonStyle(.plain)
                                        .buttonBorderShape(.roundedRectangle(radius: 12))
                                    }
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
                            .formStyle(.grouped)
                        }
                    }
                }
            }
            .navigationTitle("News")
        }
        .onAppear(perform: loadData)
    }

    private func gridCard(for item: (title: String, description: String, pubDate: String, link: String, imageURL: String?)) -> some View {
        VStack {
            VStack(alignment: .leading, spacing: 8) {
                ZStack {
                    RoundedRectangle(cornerRadius: 12)
                        .fill(Color.gray.opacity(0.22))
                        .frame(height: 160)
                    if let urlString = item.imageURL, let url = URL(string: urlString) {
                        AsyncImage(url: url) { phase in
                            switch phase {
                            case .success(let image):
                                image
                                    .resizable()
                                    .scaledToFill()
                                    .frame(height: 160)
                                    .frame(maxWidth: .infinity)
                                    .clipped()
                                    .cornerRadius(12)
                            case .failure(_):
                                placeholderThumb
                                    .frame(height: 160)
                                    .clipShape(RoundedRectangle(cornerRadius: 12))
                            case .empty:
                                placeholderThumb
                                    .redacted(reason: .placeholder)
                                    .frame(height: 160)
                                    .clipShape(RoundedRectangle(cornerRadius: 12))
                            @unknown default:
                                placeholderThumb
                                    .frame(height: 160)
                                    .clipShape(RoundedRectangle(cornerRadius: 12))
                            }
                        }
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                    } else {
                        placeholderThumb
                            .frame(height: 160)
                            .clipShape(RoundedRectangle(cornerRadius: 12))
                    }
                }

                Text(item.title)
                    .font(.headline)
                    .lineLimit(2)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .fixedSize(horizontal: false, vertical: true)

                Text(item.description.withoutHtmlTags)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .lineLimit(3)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .fixedSize(horizontal: false, vertical: true)

                Spacer(minLength: 0)

                Text(item.pubDate.formattedPubDateLocalized())
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            .padding(12)
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .frame(maxWidth: .infinity)
        .frame(height: 340)
        .background(backgroundView)
    }

    private var backgroundView: some View {
    #if os(visionOS)
            // visionOS uses glass-like material
            RoundedRectangle(cornerRadius: 14)
                .fill(.regularMaterial)
    #else
            // iOS 16–26 keeps the custom design
            RoundedRectangle(cornerRadius: 14)
                .fill(Color(colorScheme == .dark ? Color(uiColor: .secondarySystemBackground) : .white))
                .shadow(color: .black.opacity(colorScheme == .dark ? 0.4 : 0.08),
                        radius: 6, x: 0, y: 2)
    #endif
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
}
