//
//  NetworkViewController.swift
//  Turn Off the Lights for Safari (iOS)
//
//  Created by Stefan Van Damme on 13/07/2021.
//

import UIKit

class NetworkViewController: UIViewController {

    @IBOutlet weak var imgnetworkoffline: UIImageView!
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        self.imgnetworkoffline.isHidden = false
        // default set
        self.imgnetworkoffline.frame.origin.y+=10
        self.imgnetworkoffline.alpha = 0
        UIView.animate(withDuration: 1.5, delay: 0.0, options: .curveEaseIn, animations: {
                self.imgnetworkoffline.frame.origin.y-=10
                self.imgnetworkoffline.alpha = 1
        },completion: nil)
    }

}
