//
//  AboutController.swift
//  Date Today
//
//  Created by Stefan Van Damme on 26/09/2020.
//

import Foundation
import UIKit
import StoreKit

class AboutAnimatedbox: UIButton {

    override var isHighlighted: Bool {
        didSet {
            let transform: CGAffineTransform = isHighlighted ? .init(scaleX: 0.95, y: 0.95) : .identity
            animate(transform)
        }
    }

}

private extension AboutAnimatedbox {
    private func animate(_ transform: CGAffineTransform) {
        UIView.animate(
            withDuration: 0.4,
            delay: 0,
            usingSpringWithDamping: 0.5,
            initialSpringVelocity: 3,
            options: [.curveEaseInOut],
            animations: {
                self.transform = transform
            }
        )
    }
}

class AboutController: UITableViewController{
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        navigationController?.navigationBar.prefersLargeTitles = true
        NotificationCenter.default.addObserver(self, selector: #selector(self.gobackabout(notification:)), name: Notification.Name("callbackpageabout"), object: nil)
    }

    @objc func gobackabout(notification: Notification){
        self.navigationController?.popToRootViewController(animated: true)
    }
    
    @IBOutlet weak var btntranslate: UIButton!
    @IBOutlet weak var btnreview: UIButton!
    @IBOutlet weak var lblversionnumber: UILabel!
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        lblversionnumber.text = version()
        navigationItem.largeTitleDisplayMode = .always
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()

        //--corner
        btntranslate.layer.cornerRadius = 10
        btntranslate.layer.maskedCorners = [.layerMaxXMaxYCorner,.layerMaxXMinYCorner,.layerMinXMaxYCorner,.layerMinXMinYCorner]
        btnreview.layer.cornerRadius = 10
        btnreview.layer.maskedCorners = [.layerMaxXMaxYCorner,.layerMaxXMinYCorner,.layerMinXMaxYCorner,.layerMinXMinYCorner]
        //--
    }
    
    func version() -> String {
        let dictionary = Bundle.main.infoDictionary!
        let version = dictionary["CFBundleShortVersionString"] as! String
        let build = dictionary["CFBundleVersion"] as! String
        return "\(version) (\(build))"
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if indexPath.section == 0 {
            if indexPath.row == 0 {
                // call to welcome guide
                NotificationCenter.default.post(name: Notification.Name(rawValue: "goguide"), object: nil)
            }
        } else if indexPath.section == 1 {
            if indexPath.row == 0 {
                openweb()
            }else if indexPath.row == 1 {
                opensupport()
            }
        }else if indexPath.section == 2 {
            if indexPath.row == 0 {
                
            }else if indexPath.row == 1 {
                openreview()
            }else if indexPath.row == 2 {
                openshare()
            }
        } else if indexPath.section == 3 {
            //about version
        }
        
        tableView.deselectRow(at: indexPath, animated: true)
    }
    
    func openweb() {
        Stefanfunctions().openweb(text:"https://www.turnoffthelights.com")
    }
    func opensupport() {
        Stefanfunctions().openweb(text:"https://www.turnoffthelights.com/support/")
    }

    var productURL = URL(string: "https://itunes.apple.com/app/id1273998507")!
    func openreview() {
        
    // 1.
    var components = URLComponents(url: productURL, resolvingAgainstBaseURL: false)

    // 2.
    components?.queryItems = [
      URLQueryItem(name: "action", value: "write-review")
    ]

    // 3.
    guard let writeReviewURL = components?.url else {
      return
    }

    // 4.
    UIApplication.shared.open(writeReviewURL)
    }

    @IBOutlet weak var cellshare: UIView!
    func openshare() {
//        #if targetEnvironment(simulator)
//        let alert = UIAlertController(title: "Share", message: "Share is not available in the iOS simulator", preferredStyle: UIAlertController.Style.alert)
//        alert.addAction(UIAlertAction(title: "OK", style: UIAlertAction.Style.default, handler: nil))
//            self.present(alert, animated: true, completion: nil)
//        #else
//        #endif
        let activityVC = UIActivityViewController(activityItems: [productURL], applicationActivities: nil)

        //Apps to be excluded sharing to
        activityVC.excludedActivityTypes = [
                UIActivity.ActivityType.print,
                UIActivity.ActivityType.addToReadingList
            ]
        // Check if user is on iPad and present popover
        if UIDevice.current.userInterfaceIdiom == .pad {
            activityVC.popoverPresentationController?.sourceView = self.view
        }
        // Present share activityView on regular iPhone
        self.present(activityVC, animated: true, completion: nil)
    }

    @IBAction func opentranslate(_ sender: Any) {
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)
        
        if let url = URL(string: "https://www.turnoffthelights.com/browser/extension/translate/") {
            UIApplication.shared.open(url)
        }
    }
    
    @IBAction func openreview(_ sender: Any) {
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)
        
        openreview()
    }
}
