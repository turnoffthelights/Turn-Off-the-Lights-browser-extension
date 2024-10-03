//
//  Stefanfunctions.swift
//  Turn Off the Lights for Safari (iOS)
//
//  Created by Stefan Van Damme on 25/08/2022.
//

import UIKit
import AVFoundation
import SafariServices

extension UIApplication {
    func topViewController() -> UIViewController? {
        var topViewController: UIViewController? = nil
        for scene in connectedScenes {
            if let windowScene = scene as? UIWindowScene {
                for window in windowScene.windows {
                    if window.isKeyWindow {
                        topViewController = window.rootViewController
                    }
                }
            }
        }
        while true {
            if let presented = topViewController?.presentedViewController {
                topViewController = presented
            } else if let navController = topViewController as? UINavigationController {
                topViewController = navController.topViewController
            } else if let tabBarController = topViewController as? UITabBarController {
                topViewController = tabBarController.selectedViewController
            } else {
                // Handle any other third party container in `else if` if required
                break
            }
        }
        return topViewController
    }
}

class Stefanfunctions{
    func i18string(text: String) -> String{
        return String.localizedStringWithFormat(NSLocalizedString(text, comment: ""), "")
    }
    
    func openweb(text:String){
        if let url = URL(string: text) {
            UIApplication.shared.open(url)
        }
    }
    
    func checkoffline(){
        DispatchQueue.main.asyncAfter(deadline: .now()+0.3, execute: {
            let connected = UserDefaults.standard.bool(forKey: "connected")
            if(connected == false){
                NotificationCenter.default.post(name: Notification.Name(rawValue: "calloffline"), object: nil)
            }
        })
    }
    
    func imagePreview(from moviePath: URL, in seconds: Double) -> UIImage? {
        let timestamp = CMTime(seconds: seconds, preferredTimescale: 60)
        let asset = AVURLAsset(url: moviePath)
        let generator = AVAssetImageGenerator(asset: asset)
        generator.appliesPreferredTrackTransform = true

        guard let imageRef = try? generator.copyCGImage(at: timestamp, actualTime: nil) else {
            return nil
        }
        return UIImage(cgImage: imageRef)
    }
    
    func opensafaripreview(pageurl: String){
        // redirect through safari
        //UIApplication.shared.open(pageurl, options: [:], completionHandler: nil)
        
        let config = SFSafariViewController.Configuration()
        config.barCollapsingEnabled = true
        config.entersReaderIfAvailable = false
        
        if let url = URL(string: pageurl) {
            let vc = SFSafariViewController(url: url, configuration: config)
            let topController = UIApplication.shared.topViewController()
            topController?.present(vc, animated: true)
        }
    }
    
    func openyoutubevideo(youtubeId: String){
        if let youtubeURL = URL(string: "youtube://\(youtubeId)"),
           UIApplication.shared.canOpenURL(youtubeURL) {
            // redirect to app
            UIApplication.shared.open(youtubeURL, options: [:], completionHandler: nil)
        } else if URL(string: "https://www.youtube.com/watch?v=\(youtubeId)") != nil {
            let thisurlpost = "https://www.youtube.com/watch?v=\(youtubeId)"
            Stefanfunctions().opensafaripreview(pageurl: thisurlpost)
        }
    }
    
}
