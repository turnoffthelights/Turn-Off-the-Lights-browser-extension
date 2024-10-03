//
//  LicensesViewController.swift
//  Turn Off the Lights for Safari (iOS)
//
//  Created by Stefan Van Damme on 18/06/2021.
//

import Foundation
import UIKit
import SafariServices

class LicensesViewController: UITableViewController, SFSafariViewControllerDelegate{
    
    override func viewDidLoad(){
        super.viewDidLoad()
        navigationItem.largeTitleDisplayMode = .never
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if indexPath.section == 0 {
            // section Browser extension
            if indexPath.row == 0 {
                Stefanfunctions().openweb(text:"http://creativecommons.org/licenses/GPL/2.0/")
            }
        }
        
        tableView.deselectRow(at: indexPath, animated: true)
    }

}
