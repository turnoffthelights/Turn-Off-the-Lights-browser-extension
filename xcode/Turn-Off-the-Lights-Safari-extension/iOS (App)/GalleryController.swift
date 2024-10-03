//
//  GalleryController.swift
//  Date Today
//
//  Created by Stefan Van Damme on 06/10/2020.
//

import Foundation
import UIKit
import SafariServices

@IBDesignable extension UIButton {

    @IBInspectable var borderWidth: CGFloat {
        set {
            layer.borderWidth = newValue
        }
        get {
            return layer.borderWidth
        }
    }

    @IBInspectable var cornerRadius: CGFloat {
        set {
            layer.cornerRadius = newValue
        }
        get {
            return layer.cornerRadius
        }
    }

    @IBInspectable var borderColor: UIColor? {
        set {
            guard let uiColor = newValue else { return }
            layer.borderColor = uiColor.cgColor
        }
        get {
            guard let color = layer.borderColor else { return nil }
            return UIColor(cgColor: color)
        }
    }
}

class GalleryController: UITableViewController,SFSafariViewControllerDelegate{
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navigationItem.largeTitleDisplayMode = .never
    }
    
    @IBOutlet weak var iconmytree: UIImageView!
    @IBOutlet weak var iconsunrise: UIImageView!
    @IBOutlet weak var iconharddisk: UIImageView!
    @IBOutlet weak var icondatetoday: UIImageView!
    @IBOutlet weak var iconmylunarnewyear: UIImageView!
    @IBOutlet weak var iconhometab: UIImageView!
    @IBOutlet weak var iconcanada: UIImageView!
    @IBOutlet weak var iconhellooffice: UIImageView!
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }
    
    func setappicondesign(element:UIImageView){
        element.layer.borderColor = UIColor.separator.cgColor
        element.layer.masksToBounds = true
        element.contentMode = .scaleToFill
        element.layer.borderWidth = 1
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        setappicondesign(element: iconmytree)
        setappicondesign(element: iconsunrise)
        setappicondesign(element: iconharddisk)
        setappicondesign(element: icondatetoday)
        setappicondesign(element: iconmylunarnewyear)
        setappicondesign(element: iconhometab)
        setappicondesign(element: iconcanada)
        setappicondesign(element: iconhellooffice)
    }

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        openapplink(url: stefanappurl[indexPath.row])
        tableView.deselectRow(at: indexPath, animated: true)
    }
    
    var stefanappurl = ["https://apps.apple.com/app/id1062397646", "https://apps.apple.com/app/id1530008755", "https://apps.apple.com/app/id1043842695", "https://apps.apple.com/app/id1523093827", "https://apps.apple.com/app/id1596469569", "https://apps.apple.com/app/id1585512140", "https://apps.apple.com/app/id1416358359", "https://apps.apple.com/app/id1569818870"]
    func openapplink(url: String){
        // check if website exists
        guard let url = URL(string: url) else {
        return
        }

        let safariVC = SFSafariViewController(url: url)
        // Check if user is on iPad and present popover
        if UIDevice.current.userInterfaceIdiom == .pad {
            safariVC.modalPresentationStyle = UIModalPresentationStyle.fullScreen
        }else{
            safariVC.modalPresentationStyle = UIModalPresentationStyle.popover
        }
        safariVC.delegate = self
        present(safariVC, animated: true, completion: nil)
    }
    
    func safariViewControllerDidFinish(_ controller: SFSafariViewController) {
        controller.dismiss(animated: true, completion: nil)
    }
}
