//
//  FeedParser.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 16/06/2021.
//

import Foundation

class FeedParser: NSObject, XMLParserDelegate {
    fileprivate var rssItems = [(title: String, description: String, pubDate: String, link: String, imageURL: String?)]()
  
    fileprivate var currentElement = ""
  
    fileprivate var currentTitle = "" {
        didSet {
          currentTitle = currentTitle.trimmingCharacters(in: CharacterSet.whitespacesAndNewlines)
        }
    }
  
    fileprivate var currentDescription = "" {
        didSet {
          currentDescription = currentDescription.trimmingCharacters(in: CharacterSet.whitespacesAndNewlines)
        }
    }
  
    fileprivate var currentPubDate = "" {
        didSet {
          currentPubDate = currentPubDate.trimmingCharacters(in: CharacterSet.whitespacesAndNewlines)
        }
    }
    
    fileprivate var currentLink = "" {
        didSet {
        currentLink = currentLink.trimmingCharacters(in: CharacterSet.whitespacesAndNewlines)
        }
    }
    fileprivate var currentImageURL: String?
  
    fileprivate var parserCompletionHandler: (([(title: String, description: String, pubDate: String, link: String, imageURL: String?)]) -> Void)?
  
    func parseFeed(feedURL: String, completionHandler: (([(title: String, description: String, pubDate: String, link: String, imageURL: String?)]) -> Void)?) -> Void {
        parserCompletionHandler = completionHandler
        
        guard let feedURL = URL(string:feedURL) else {
          print("feed URL is invalid")
          return
        }
    
        URLSession.shared.dataTask(with: feedURL, completionHandler: { data, response, error in
            if let error = error {
                print(error)
                return
            }

            guard let data = data else {
                print("No data fetched")
                return
            }

            DispatchQueue.main.async {
                let parser = XMLParser(data: data)
                parser.delegate = self
                parser.parse()
            }
        }).resume()
    }
  
    func parserDidStartDocument(_ parser: XMLParser) {
        rssItems.removeAll()
    }
  
    func parser(_ parser: XMLParser, didStartElement elementName: String, namespaceURI: String?, qualifiedName qName: String?, attributes attributeDict: [String : String] = [:]) {
        currentElement = elementName
        if currentElement == "item" {
          currentTitle = ""
          currentDescription = ""
          currentPubDate = ""
          currentLink = ""
          currentImageURL = nil
        }
        if elementName == "media:content" {
            // Only take this as image if it is not a video
            if let medium = attributeDict["medium"], medium == "image", let url = attributeDict["url"], currentImageURL == nil {
                currentImageURL = url
            }
        } else if elementName == "media:thumbnail", let url = attributeDict["url"], currentImageURL == nil {
            currentImageURL = url
        } else if elementName == "enclosure", let url = attributeDict["url"], currentImageURL == nil {
            currentImageURL = url
        }
    }
  
    func parser(_ parser: XMLParser, foundCharacters string: String) {
        switch currentElement {
            case "title":
                currentTitle += string
            case "content:encoded":
                currentDescription += string
            case "pubDate":
                currentPubDate += string
            case "link":
                currentLink += string
            default:
                break
        }
    }
  
    func parser(_ parser: XMLParser, didEndElement elementName: String, namespaceURI: String?, qualifiedName qName: String?) {
        if elementName == "item" {
            if currentImageURL == nil {
                currentImageURL = Self.firstImageSrc(inHTML: currentDescription)
            }
            let rssItem = (title: currentTitle, description: currentDescription, pubDate: currentPubDate, link: currentLink, imageURL: currentImageURL)
            rssItems.append(rssItem)
        }
    }
  
    func parserDidEndDocument(_ parser: XMLParser) {
        if Thread.isMainThread {
            parserCompletionHandler?(rssItems)
        } else {
            DispatchQueue.main.async { [rssItems] in
                self.parserCompletionHandler?(rssItems)
            }
        }
    }

    func parser(_ parser: XMLParser, parseErrorOccurred parseError: Error) {
        print(parseError.localizedDescription)
    }
    
    private static func firstImageSrc(inHTML html: String) -> String? {
        let pattern = "<img[^>]+src=[\"']([^\"'>]+)[\"']"
        if let regex = try? NSRegularExpression(pattern: pattern, options: [.caseInsensitive]) {
            let range = NSRange(html.startIndex..<html.endIndex, in: html)
            if let match = regex.firstMatch(in: html, options: [], range: range),
               match.numberOfRanges >= 2,
               let srcRange = Range(match.range(at: 1), in: html) {
                return String(html[srcRange])
            }
        }
        return nil
    }
}
