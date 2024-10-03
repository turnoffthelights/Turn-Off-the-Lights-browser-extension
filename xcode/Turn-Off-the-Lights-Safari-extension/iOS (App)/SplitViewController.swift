//
//  SplitViewController.swift
//  Turn Off the Lights for Safari (iOS)
//
//  Created by Stefan Van Damme on 22/06/2021.
//

import UIKit

class SplitViewController: UISplitViewController {
    
    // MARK: - UIViewController
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // split code check if offline, then show this offline panel
        Stefanfunctions().checkoffline()
    }
    
    override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
        if traitCollection.horizontalSizeClass == .compact {
            // iPhone size
        } else {
            // iPad size
        }
    }

}
