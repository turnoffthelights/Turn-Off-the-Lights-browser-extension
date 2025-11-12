//
//  StefanFunctions.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 28/02/2024.
//

import Foundation
#if os(iOS) || os(visionOS)
import UIKit
#elseif os(macOS)
import AppKit
#endif

class StefanFunctions{
    func i18string(text: String) -> String{
        return String.localizedStringWithFormat(NSLocalizedString(text, comment: ""), "")
    }

    func openURL(_ url: URL) {
        #if os(iOS) || os(visionOS)
        UIApplication.shared.open(url, options: [:], completionHandler: nil)
        #elseif os(macOS)
        NSWorkspace.shared.open(url)
        #endif
    }
    
    func openyoutubeapporweb(text:String){
        let youtubeId = text
        StefanFunctions().openyoutubevideo(youtubeId: youtubeId)
    }
    
    func openyoutubevideo(youtubeId: String){
#if os(iOS) || os(visionOS)
        if let youtubeURL = URL(string: "youtube://\(youtubeId)"),
            UIApplication.shared.canOpenURL(youtubeURL) {
            
            // redirect to app
            UIApplication.shared.open(youtubeURL, options: [:], completionHandler: nil)

        } else if URL(string: "https://www.youtube.com/watch?v=\(youtubeId)") != nil {
            let thisurlpost = "https://www.youtube.com/watch?v=\(youtubeId)"
            openURL(URL(string: thisurlpost)!)
        }
#elseif os(macOS)
        let thisurlpost = "https://www.youtube.com/watch?v=\(youtubeId)"
        openURL(URL(string: thisurlpost)!)
#endif
        

    }
}
