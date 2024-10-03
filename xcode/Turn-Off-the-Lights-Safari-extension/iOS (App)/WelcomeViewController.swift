//
//  WelcomeViewController.swift
//  Turn Off the Lights for Safari (iOS)
//
//  Created by Stefan Van Damme on 13/06/2021.
//

import Foundation
import UIKit
import SafariServices
import LinkPresentation

class WelcomeViewController: UIViewController, UIActivityItemSource {
    var metadata: LPLinkMetadata?

    let defaults = UserDefaults(suiteName: "group.stefanvd.turnoffthelightsforsafari")
    
    func activityViewControllerLinkMetadata(_ activityViewController: UIActivityViewController) -> LPLinkMetadata? {
        let metadata = LPLinkMetadata()
        metadata.originalURL = URL(string: "https://www.turnoffthelights.com")
        metadata.url = metadata.originalURL
        metadata.title = Stefanfunctions().i18string(text: "lblplaceholder")
        metadata.imageProvider = NSItemProvider.init(contentsOf:Bundle.main.url(forResource: "share-lamp", withExtension: "png"))
        return metadata
    }

    func activityViewControllerPlaceholderItem(_ activityViewController: UIActivityViewController) -> Any {
        return Stefanfunctions().i18string(text: "lblplaceholder")
    }

    let websitelink = "https://www.turnoffthelights.com"
    func activityViewController(_ activityViewController: UIActivityViewController, itemForActivityType activityType: UIActivity.ActivityType?) -> Any? {
        if activityType == .postToTwitter {
            return Stefanfunctions().i18string(text: "lblsharetwitter") + " " + websitelink
        } else {
            return Stefanfunctions().i18string(text: "lblshareregular") + " " + websitelink
        }
    }
    
    func activityViewController(_ activityViewController: UIActivityViewController, subjectForActivityType activityType: UIActivity.ActivityType?) -> String {
        return Stefanfunctions().i18string(text: "lblemailsubject")
    }
    
    @IBAction func openoptions(_ sender: Any) {
        Stefanfunctions().openweb(text:"https://www.turnoffthelights.com/browser/extension/options/")
    }
    
    @IBOutlet weak var collectionView: UICollectionView!
    let bigcellId = "BigiPadCell1"
    let smallcellId = "SmalliPadCell1"

    struct App {
        var appName : String
        var appDes : String
        var appImage : String
        var appButton : String
        var appDownloadLink : String
    }
    
    var products : Array<App> =  [
        App(appName: "", appDes: "", appImage: "", appButton: "", appDownloadLink: ""),
        App(appName: Stefanfunctions().i18string(text: "strworldpremiere"), appDes: Stefanfunctions().i18string(text: "strdesworldpremiere"), appImage: "lock.shield.fill", appButton: Stefanfunctions().i18string(text: "strfindout"), appDownloadLink: "https://www.turnoffthelights.com/blog/"),
        App(appName: Stefanfunctions().i18string(text: "strtranslator"), appDes: Stefanfunctions().i18string(text: "strdestranslator"), appImage: "rectangle.3.group.bubble.left.fill", appButton: Stefanfunctions().i18string(text: "strfindout"), appDownloadLink: "https://www.turnoffthelights.com/translator/"),
        App(appName: Stefanfunctions().i18string(text: "strdeveloper"), appDes: Stefanfunctions().i18string(text: "strdesdeveloper"), appImage: "chevron.left.forwardslash.chevron.right", appButton: Stefanfunctions().i18string(text: "strfindout"), appDownloadLink: "https://www.turnoffthelights.com/developer/"),
        App(appName: Stefanfunctions().i18string(text: "strsocial"), appDes: Stefanfunctions().i18string(text: "strdessocial"), appImage: "heart.circle.fill", appButton: Stefanfunctions().i18string(text: "strfindout"), appDownloadLink: "https://www.turnoffthelights.com/social/")
    ]

    override func viewDidLoad(){
        super.viewDidLoad()
        
        // debug
        //defaults!.set(false, forKey: "launchedBefore")
        
        //ipad cell
        let CellTypeOne = UINib(nibName: bigcellId, bundle: nil)
        let CellTypeTwo = UINib(nibName: smallcellId, bundle: nil)

        collectionView.register(CellTypeOne, forCellWithReuseIdentifier: bigcellId)
        collectionView.register(CellTypeTwo, forCellWithReuseIdentifier: smallcellId)

        collectionView.reloadData()
        
        NotificationCenter.default.addObserver(self, selector: #selector(self.gorefreshcollection(notification:)), name: Notification.Name("callcloseinstallpanel"), object: nil)
    }
    
    @objc func gorefreshcollection(notification: Notification){
        defaults!.set(true, forKey: "launchedBefore")
        collectionView.reloadData()
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        if traitCollection.horizontalSizeClass == .compact {
            // iPhone size
            self.navigationItem.title = "Turn Off the Lights"
        } else {
            // large iPad size
            self.navigationItem.title = ""
        }
    }
    
    override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
        if traitCollection.horizontalSizeClass == .compact {
            // iPhone size
            self.navigationItem.title = "Turn Off the Lights"
        } else {
            // large iPad size
            self.navigationItem.title = ""
        }
    }
    
    @IBAction func bigshare(_ sender: Any) {
        bigshareaction()
    }
    
    @IBOutlet weak var btnshare: UIBarButtonItem!
    func bigshareaction() {
        let items = [self]
        let ac = UIActivityViewController(activityItems: items, applicationActivities: nil)
        // Check if user is on iPad and present popover
        if UIDevice.current.userInterfaceIdiom == .pad {
            DispatchQueue.main.async {
                if let popoverPresentationController = ac.popoverPresentationController {
                    popoverPresentationController.barButtonItem = self.btnshare
                    popoverPresentationController.permittedArrowDirections = UIPopoverArrowDirection.down;
                }
            }
        }

        let generator = UIImpactFeedbackGenerator(style: .medium)
        generator.impactOccurred()

        // Present share activityView on regular iPhone
        DispatchQueue.main.async {
            self.present(ac, animated: true)
        }
    }
    
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        super.viewWillTransition(to: size, with: coordinator)
        collectionView?.reloadData()
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        collectionView?.collectionViewLayout.invalidateLayout()
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        collectionView?.collectionViewLayout.invalidateLayout()
    }
}

/* Extension ViewController */
extension WelcomeViewController: UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {

        if let sectionHeader = collectionView.dequeueReusableSupplementaryView(ofKind: kind, withReuseIdentifier: "SectionHeader", for: indexPath) as? SectionHeader{
            sectionHeader.sectionHeaderlabel.text = "Safari extension"
            return sectionHeader
        }
        return UICollectionReusableView()
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        // the first cell - explain how to install Safari extension
        if(indexPath.item == 0){
            let dequeuedCell = collectionView.dequeueReusableCell(withReuseIdentifier: smallcellId, for: indexPath)
            
            guard let cellOne = dequeuedCell as? SmalliPadCell1 else {
                fatalError("Wrong cell type for section 0. Expected CellTypeOne")
            }
            
            cellOne.layer.cornerRadius = 10
            return cellOne
        }else{
            let dequeuedCell = collectionView.dequeueReusableCell(withReuseIdentifier: bigcellId, for: indexPath)
            
            guard let cellOne = dequeuedCell as? BigiPadCell1 else {
                fatalError("Wrong cell type for section 0. Expected CellTypeOne")
            }
            
            cellOne.appName.text = products[indexPath.row].appName
            cellOne.imageAppLogo.image = UIImage(systemName: products[indexPath.row].appImage)
            cellOne.appDes.text = products[indexPath.row].appDes
            cellOne.appDownloadButton.tag = indexPath.item
            cellOne.appDownloadButton.addTarget(self, action: #selector(openLinkAction), for: .touchUpInside)
            cellOne.appDownloadButton.setTitle(products[indexPath.row].appButton, for: .normal)
            cellOne.layer.cornerRadius = 10
            return cellOne
        }
    }
    
    @objc func openLinkAction(sender: UIButton!) {
        let btnsendtag: UIButton = sender
        if let url = URL(string: products[btnsendtag.tag].appDownloadLink) {
            UIApplication.shared.open(url, options: [:], completionHandler: nil)
        }
    }
        
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return products.count
    }
        
    func numberOfSectionsInCollectionView(collectionView: UICollectionView) -> Int {
        return 1
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat
    {
        return 20
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        var kWhateverHeightYouWant = 0
        let cellwidth : CGFloat
        let cellheight : CGFloat

        //if UIDevice().userInterfaceIdiom == .phone
        if(traitCollection.horizontalSizeClass == .compact){
            //print("Smaller screen")
            kWhateverHeightYouWant = 320
            if(indexPath.item == 0){
                let launchedBefore = defaults!.bool(forKey: "launchedBefore")
                if launchedBefore {
                    cellwidth = collectionView.frame.size.width - 40 //space 20
                    cellheight = CGFloat(0)
                }else{
                    cellwidth = collectionView.frame.size.width - 40 //space 20
                    cellheight = CGFloat(160)
                }
            }else{
                cellwidth = collectionView.frame.size.width - 40 //space 20
                cellheight = CGFloat(kWhateverHeightYouWant)
            }
        }else{
            //print("Bigger screen")
            kWhateverHeightYouWant = 320
            if(indexPath.item == 0)
            {
                let launchedBefore = defaults!.bool(forKey: "launchedBefore")
                if launchedBefore {
                    cellwidth = (collectionView.frame.size.width) - 40
                    cellheight = CGFloat(0)
                }else{
                    cellwidth = (collectionView.frame.size.width) - 40
                    cellheight = CGFloat(160)
                }
            }
            else
            {
                cellwidth = (collectionView.frame.size.width / 2) - 30
                cellheight = CGFloat(kWhateverHeightYouWant)
            }
        }
        return CGSize(width: cellwidth, height: cellheight)
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        let inset:CGFloat = 20
        return UIEdgeInsets(top: 0, left: inset, bottom: inset, right: inset)
    }
        
}
