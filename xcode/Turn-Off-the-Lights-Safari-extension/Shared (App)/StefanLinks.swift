//
//  StefanLinks.swift
//  Turn Off the Lights for Safari
//
//  Created by Stefan Van Damme on 19/11/2024.
//

import Foundation

#if os(iOS) || os(visionOS)
import UIKit
#elseif os(macOS)
import AppKit
#endif

class StefanLinks {
    func openURL(_ url: URL) {
#if os(iOS) || os(visionOS)
        UIApplication.shared.open(url, options: [:], completionHandler: nil)
#elseif os(watchOS)
        WKExtension.shared().openSystemURL(url)
#elseif os(macOS)
        NSWorkspace.shared.open(url)
#endif
    }
    
    func linkredirectionoptions() -> String{
        return "https://www.turnoffthelights.com/browser/extension/options/"
    }
    
    func linktranslate() -> String{
        return "https://www.turnoffthelights.com/browser/extension/translate/"
    }
    
    func linkdeveloperwebsite() -> String{
        return "https://www.turnoffthelights.com"
    }
    
    func linkdeveloperblog() -> String{
        return "https://www.turnoffthelights.com/blog/"
    }
    
    func linkdeveloper() -> String{
        return "https://www.turnoffthelights.com/developer/"
    }

    func linksocial() -> String{
        return "https://www.turnoffthelights.com/social/"
    }
    
    func linkdonate() -> String{
        return "https://www.turnoffthelights.com/donate/"
    }
    
    func linksupport() -> String{
        return "https://www.turnoffthelights.com/support/"
    }
    
    func linkdeveloperblogfeed() -> String{
        return "https://www.turnoffthelights.com/blog/feed/"
    }
    
    func linkprivacy() -> String{
        return "https://www.turnoffthelights.com/privacy/"
    }
    
    func linksourcecode() -> String{
        return "https://github.com/turnoffthelights/Turn-Off-the-Lights-browser-extension"
    }
    
    func linkappstore() -> String{
        return "https://apps.apple.com/app/id1273998507"
    }
    
    // Other apps
    func webapphellooffice() -> String{
        return "https://apps.apple.com/app/id1569818870"
    }
    
    func webappcanadarace() -> String{
        return "https://apps.apple.com/app/id1416358359"
    }
    
    func webapphometab() -> String{
        return "https://apps.apple.com/app/id1585512140"
    }
    
    func webappturnoffthelights() -> String{
        return "https://apps.apple.com/app/id1273998507"
    }
    
    func webappzoom() -> String{
        return "https://apps.apple.com/app/id1423085875"
    }
    
    func webappdatetoday() -> String{
        return "https://apps.apple.com/app/id1523093827"
    }
    
    func webappharddisk() -> String{
        return "https://apps.apple.com/app/id1043842695"
    }
    
    func webappsunrise() -> String{
        return "https://apps.apple.com/app/id1530008755"
    }
    
    func webapptrafficblinker() -> String{
        return "https://apps.apple.com/app/id1073990483"
    }
   
    func webappmylunarnewyear() -> String{
        return "https://apps.apple.com/app/id1596469569"
    }
    
    func webappmychristmastree() -> String{
        return "https://apps.apple.com/app/id1062397646"
    }
    
}
