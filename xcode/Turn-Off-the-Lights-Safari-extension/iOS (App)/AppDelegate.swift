//
//  AppDelegate.swift
//  iOS (App)
//
//  Created by Stefan Van Damme on 10/06/2021.
//

import UIKit
import Network

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        monitorNetwork()
        return true
    }

    let monitor = NWPathMonitor()
    let queue = DispatchQueue(label: "Monitor")
    func monitorNetwork(){
        monitor.pathUpdateHandler = { path in
            if path.status == .satisfied {
                //print("There is internet")
                UserDefaults.standard.set(true, forKey: "connected")

                NotificationCenter.default.post(name: Notification.Name(rawValue: "callbackonline"), object: nil)
            } else {
                //print("No internet")
                UserDefaults.standard.set(false, forKey: "connected")

                NotificationCenter.default.post(name: Notification.Name(rawValue: "calloffline"), object: nil)
            }
        }
        monitor.start(queue: queue)
    }

}
