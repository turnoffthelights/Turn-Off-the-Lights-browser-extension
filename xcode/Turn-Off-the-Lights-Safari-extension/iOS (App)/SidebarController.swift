//
//  SidebarController.swift
//  Turn Off the Lights for Safari (iOS)
//
//  Created by Stefan Van Damme on 22/06/2021.
//

import UIKit

class SidebarController: UITableViewController {
    
    // MARK: - UIViewController
    override func viewDidLoad() {
        super.viewDidLoad()

        // home first tab is selected
        let indexPath = IndexPath(row: 0, section: 0);
        self.tableView.selectRow(at: indexPath, animated: false, scrollPosition: UITableView.ScrollPosition.none)
        self.tableView(self.tableView, didSelectRowAt: indexPath)
    }
    

    // remove the marge on top for each table
    override func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return CGFloat.leastNonzeroMagnitude
    }
    
    // remove the marge on bottom for each table
    override func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        return CGFloat.leastNonzeroMagnitude
    }
    
    let defaults = UserDefaults(suiteName: "group.stefanvd.turnoffthelightsforsafari")
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if indexPath.section == 0 && indexPath.row == 0 {
            savecurrentab(number:0)
        }
            
        if indexPath.section == 1 && indexPath.row == 0 {
            savecurrentab(number:1)
        }
        
        if indexPath.section == 2 && indexPath.row == 0 {
            savecurrentab(number:2)
        }
        
        if indexPath.section == 3 && indexPath.row == 0 {
            savecurrentab(number:3)
        }
    }
    
    func savecurrentab(number:Int){
        defaults!.set(number, forKey: "currentopentab")
        defaults!.synchronize()
    }
}
