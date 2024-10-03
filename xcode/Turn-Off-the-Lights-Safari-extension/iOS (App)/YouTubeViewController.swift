//
//  YouTubeViewController.swift
//  Turn Off the Lights for Safari (iOS)
//
//  Created by Stefan Van Damme on 24/08/2022.
//

import Foundation
import UIKit
import SafariServices
import AVFoundation
import AVKit
import AudioToolbox

class YouTubeViewController: UIViewController {
    @IBOutlet weak var ytvideolayer: UIView!
    @IBOutlet weak var ytimageinspiration: UIImageView!

    @IBOutlet weak var ytcollectionView: UICollectionView!
    let bigcellId = "VideoiPadCell1"

    struct VideoApp {
        var appName : String
        var appDownloadLink : String
    }
    
    var videoproducts : Array<VideoApp> =  [
        VideoApp(appName: "⚡️Introduction Turn Off the Lights for Safari on iOS 15 and higher", appDownloadLink: "GSEqAjzy_hg"),
        VideoApp(appName: "🔵How to enable Safari Extension iOS 15 and higher?", appDownloadLink: "la3l4IQrtbo"),
        VideoApp(appName: "🔵How to enable the Night Owl profile on iOS 15 and higher?", appDownloadLink: "vubVpLm8ldk"),
        VideoApp(appName: "🔵How to enable the Eye Protection profile on iOS 15 and higher?", appDownloadLink: "3TNYUG9O-u8"),
        VideoApp(appName: "🔵How to enable the Video Lover profile on iOS 15 and higher?", appDownloadLink: "Rm8nKaPlnSI"),
        VideoApp(appName: "🔵How to open the Turn Off the Lights Options page on iOS 15 and higher?", appDownloadLink: "91DmhjsCb_Y"),
        // -- general videos
        VideoApp(appName: "🔔Introduction - Turn Off the Lights Browser Extension version 4", appDownloadLink: "yONZVLA72ZM"),
        VideoApp(appName: "🌿Turn Off the Lights Browser Extension Version 4 - The Ultimate and Valuable Tool!", appDownloadLink: "oWg0rMvCJng"),
        VideoApp(appName: "🎁Double Click - Will make you see the useful HIDDEN Menu!", appDownloadLink: "nsmGfOAgcoE"),
        VideoApp(appName: "🕯How enable the Night Mode feature?", appDownloadLink: "mbO37Ac5ny8"),
        VideoApp(appName: "🔵How to enable the water reflection feature in the Turn Off the Lights browser extension?", appDownloadLink: "klMYXTbFzok"),
        VideoApp(appName: "🔵How to enable the Atmosphere Lighting Vivid Mode in the Turn Off the Lights browser extension?", appDownloadLink: "GOARYksUcEM"),
        VideoApp(appName: "🔵How to enable the Audio Visualizer on YouTube? (and other HTML5 video websites)", appDownloadLink: "V5uDBWCzrEQ"),
        VideoApp(appName: "🔵How to enable the block 60fps on YouTube?", appDownloadLink: "P9_tK6p-YOU")
    ]
    
    override func viewDidLoad(){
        super.viewDidLoad()

        //ipad cell
        let CellTypeOne = UINib(nibName: bigcellId, bundle: nil)

        ytcollectionView.register(CellTypeOne, forCellWithReuseIdentifier: bigcellId)

        ytcollectionView.reloadData()
        
        addvideo()
    }
    
    @IBAction func openyoutube(_ sender: Any) {
        Stefanfunctions().openweb(text:"https://www.youtube.com/c/turnoffthelights?sub_confirmation=1")
    }
    
    private var player: AVQueuePlayer!
    private var playerLayer: AVPlayerLayer!
    private var playerItem: AVPlayerItem!
    private var playerLooper: AVPlayerLooper!
    
    func addvideo(){
        let path = Bundle.main.path(forResource: "forest", ofType: "mov")
        let pathURL = URL(fileURLWithPath: path!)
        let duration = Int64( ( (Float64(CMTimeGetSeconds(AVAsset(url: pathURL).duration)) *  10.0) - 1) / 10.0 )

        player = AVQueuePlayer()
        player.volume = 0
        playerLayer = AVPlayerLayer(player: player)
        playerItem = AVPlayerItem(url: pathURL)
        playerLooper = AVPlayerLooper(player: player, templateItem: playerItem,
                                      timeRange: CMTimeRange(start: CMTime.zero, end: CMTimeMake(value: duration, timescale: 1)) )
        playerLayer.videoGravity = AVLayerVideoGravity.resizeAspectFill
        playerLayer.frame = ytvideolayer.layer.bounds

        ytvideolayer.layer.insertSublayer(playerLayer, at: 1)
        player.play()
        
//        playerLayer.cornerRadius = 15
//        playerLayer.maskedCorners = [.layerMaxXMaxYCorner,.layerMaxXMinYCorner,.layerMinXMaxYCorner,.layerMinXMinYCorner]
//        playerLayer.masksToBounds = true
     
        // poster avplayer
        ytimageinspiration.image = Stefanfunctions().imagePreview(from: pathURL, in: 0.0)
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }
    
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        super.viewWillTransition(to: size, with: coordinator)
        ytcollectionView?.reloadData()
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        ytcollectionView?.collectionViewLayout.invalidateLayout()
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        ytcollectionView?.collectionViewLayout.invalidateLayout()
        // Fixed to update size on iPad to full size
        playerLayer?.frame = ytvideolayer.layer.bounds
    }
}

/* Extension ViewController */
extension YouTubeViewController: UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {

        return UICollectionReusableView()
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let dequeuedCell = collectionView.dequeueReusableCell(withReuseIdentifier: bigcellId, for: indexPath)
        
        guard let cellOne = dequeuedCell as? VideoiPadCell1 else {
            fatalError("Wrong cell type for section 0. Expected CellTypeOne")
        }
        
        // configure your CellTypeOne
        cellOne.appName.text = videoproducts[indexPath.row].appName
        let url = "https://img.youtube.com/vi/\(videoproducts[indexPath.row].appDownloadLink)/maxresdefault.jpg"
        cellOne.imageAppLogo.downloaded(from: url)
        cellOne.buttonview.tag = indexPath.row
        cellOne.buttonview.addTarget(self, action: #selector(openLinkAction), for: .touchUpInside)
        
        cellOne.layer.cornerRadius = 10
        /*cellOne.layer.shadowColor = UIColor.lightGray.cgColor
        cellOne.layer.shadowOffset = CGSize(width: 0.0, height: 0.0)
        cellOne.layer.shadowRadius = 12.0
        cellOne.layer.shadowOpacity = 0.5
        cellOne.layer.masksToBounds = false*/
        return cellOne
    }
    
    @objc func openLinkAction(sender: UIButton!) {
        let btnsendtag: UIButton = sender
        let youtubeId = videoproducts[btnsendtag.tag].appDownloadLink
        Stefanfunctions().openyoutubevideo(youtubeId: youtubeId)
    }
        
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return videoproducts.count
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
            kWhateverHeightYouWant = 260
            cellwidth = collectionView.frame.size.width - 40 //space 20
            cellheight = CGFloat(kWhateverHeightYouWant)
        }else{
            //print("Bigger screen")
            kWhateverHeightYouWant = 340
            cellwidth = (collectionView.frame.size.width / 2) - 30
            cellheight = CGFloat(kWhateverHeightYouWant)
        }
        return CGSize(width: cellwidth, height: cellheight)
    }

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        let inset:CGFloat = 20
        return UIEdgeInsets(top: 0, left: inset, bottom: inset, right: inset)
    }
        
}

extension UIImageView {
    func downloaded(from url: URL, contentMode mode: UIView.ContentMode = .scaleAspectFit) {
        contentMode = mode
        URLSession.shared.dataTask(with: url) { data, response, error in
            guard
                let httpURLResponse = response as? HTTPURLResponse, httpURLResponse.statusCode == 200,
                let mimeType = response?.mimeType, mimeType.hasPrefix("image"),
                let data = data, error == nil,
                let image = UIImage(data: data)
                else { return }
            DispatchQueue.main.async() {
                self.image = image
            }
            }.resume()
    }
    func downloaded(from link: String, contentMode mode: UIView.ContentMode = .scaleAspectFit) {
        guard let url = URL(string: link) else { return }
        downloaded(from: url, contentMode: mode)
    }
}
