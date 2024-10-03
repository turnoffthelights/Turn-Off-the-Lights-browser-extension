//
//  MasterViewController.swift
//  Turn Off the Lights for Safari (iOS)
//
//  Created by Stefan Van Damme on 22/06/2021.
//

import UIKit

class MasterViewController: UITabBarController,UITabBarControllerDelegate {
    
    // MARK: - UIViewController
    override func viewDidLoad() {
        super.viewDidLoad()
        self.delegate = self
        
        NotificationCenter.default.addObserver(self, selector: #selector(self.goofflinemessage(notification:)), name: Notification.Name("calloffline"), object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(self.goonlinemessage(notification:)), name: Notification.Name("callbackonline"), object: nil)
    }
    
    var messageofflinevisible = false
    @objc func goofflinemessage(notification: Notification){
        DispatchQueue.main.asyncAfter(deadline: .now()+0.3, execute: {
            let storyboard = UIStoryboard(name: "Main", bundle: nil)
            let vc = storyboard.instantiateViewController(withIdentifier: "statusnetwork")
            vc.modalTransitionStyle = .coverVertical
            vc.modalPresentationStyle = .pageSheet
            vc.isModalInPresentation = true
            self.present(vc, animated: true)
            self.messageofflinevisible = true
        })
    }
    
    @objc func goonlinemessage(notification: Notification){
        if(self.messageofflinevisible == true){
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                //this place to call segue or manually load the view.
                self.dismiss(animated: true, completion: nil);
                self.messageofflinevisible = false
            }
        }
    }
    
    func tabBarController(_ tabBarController: UITabBarController, didSelect viewController: UIViewController) {
        let tabBarIndex = tabBarController.selectedIndex
        //print("tabBarIndex: ",tabBarIndex)
        let defaults = UserDefaults(suiteName: "group.stefanvd.turnoffthelightsforsafari")
        defaults!.set(tabBarIndex, forKey: "currentopentab")
    }

    override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
        let defaults = UserDefaults(suiteName: "group.stefanvd.turnoffthelightsforsafari")
        let getcurrenttab = defaults!.integer(forKey: "currentopentab")
        if traitCollection.horizontalSizeClass == .compact {
            // iPhone size
            self.selectedIndex = getcurrenttab
        } else {
            // iPad size
        }
    }
    
    override func tabBar(_ tabBar: UITabBar, didSelect item: UITabBarItem) {
        guard let barItemView = item.value(forKey: "view") as? UIView else { return }

        let timeInterval: TimeInterval = 0.3
           let propertyAnimator = UIViewPropertyAnimator(duration: timeInterval, dampingRatio: 0.5) {
           barItemView.transform = CGAffineTransform.identity.scaledBy(x: 0.9, y: 0.9)
        }
        propertyAnimator.addAnimations({ barItemView.transform = .identity }, delayFactor: CGFloat(timeInterval))
        propertyAnimator.startAnimation()
        
        let generator = UISelectionFeedbackGenerator()
        generator.selectionChanged()
    }

}
