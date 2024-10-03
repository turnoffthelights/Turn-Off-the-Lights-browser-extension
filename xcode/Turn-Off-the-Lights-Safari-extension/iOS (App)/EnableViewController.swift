//
//  EnableViewController.swift
//  Turn Off the Lights for Safari (iOS)
//
//  Created by Stefan Van Damme on 16/06/2021.
//

import Foundation
import UIKit
import AVFoundation
import AVKit
import AudioToolbox

class EnableViewController: UIViewController,AVPlayerViewControllerDelegate{
    @IBOutlet weak var videolayer: UIView!
    @IBOutlet weak var imageinspiration: UIImageView!
    override func viewDidLoad(){
        super.viewDidLoad()
        addvideo()
        settranslationtext()
    }
    
    @IBOutlet weak var lbleasysetup: UILabel!
    @IBOutlet weak var lblactivate: UILabel!
    @IBOutlet weak var lblwatchvideo: UIButton!
    @IBOutlet weak var lblstep1: UILabel!
    @IBOutlet weak var lblstep2: UILabel!
    @IBOutlet weak var lblstep3: UILabel!
    @IBOutlet weak var lblstep4: UILabel!
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }

    let textBold = [NSAttributedString.Key.font : UIFont.boldSystemFont(ofSize: 14)]
    func settranslationtext(){
        lbleasysetup.text = Stefanfunctions().i18string(text: "lbleasytosetup").uppercased()
        lblactivate.text = Stefanfunctions().i18string(text: "lblactivate")
        lblwatchvideo.setTitle(Stefanfunctions().i18string(text: "lblwatchvideo"), for: .normal)

        // steps list
        lblstep1.text = Stefanfunctions().i18string(text: "lblstep1")
        
        let part2a = Stefanfunctions().i18string(text: "lblstep2a") + " "
        let part2b = Stefanfunctions().i18string(text: "lblstep2b")
        let part2c = " " + Stefanfunctions().i18string(text: "lblstep2c")
        let attributedString = NSMutableAttributedString(string:part2a)
        attributedString.append(NSMutableAttributedString(string:part2b, attributes:textBold))
        attributedString.append(NSMutableAttributedString(string:part2c))
        lblstep2.attributedText = attributedString

        let part3a = Stefanfunctions().i18string(text: "lblstep3a") + " "
        let part3b = Stefanfunctions().i18string(text: "lblstep3b")
        let part3c = Stefanfunctions().i18string(text: "lblstep3c") + " "
        let part3d = Stefanfunctions().i18string(text: "lblstep3d")
        let attributedString3 = NSMutableAttributedString(string:part3a)
        attributedString3.append(NSMutableAttributedString(string:part3b, attributes:textBold))
        attributedString3.append(NSMutableAttributedString(string:part3c))
        attributedString3.append(NSMutableAttributedString(string:part3d, attributes:textBold))
        lblstep3.attributedText = attributedString3

        let part4a = Stefanfunctions().i18string(text: "lblstep4a") + " "
        let part4b = Stefanfunctions().i18string(text: "lblstep4b")
        let attributedString4 = NSMutableAttributedString(string:part4a)
        attributedString4.append(NSMutableAttributedString(string:part4b, attributes:textBold))
        lblstep4.attributedText = attributedString4
    }
        
    private var player: AVQueuePlayer!
    private var playerLayer: AVPlayerLayer!
    private var playerItem: AVPlayerItem!
    private var playerLooper: AVPlayerLooper!

    // Fixed to update size on iPad to full size
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        playerLayer.frame = videolayer.layer.bounds
    }
    
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
        playerLayer.frame = videolayer.layer.bounds

        videolayer.layer.insertSublayer(playerLayer, at: 1)
        player.play()
        
//        playerLayer.cornerRadius = 15
//        playerLayer.maskedCorners = [.layerMaxXMaxYCorner,.layerMaxXMinYCorner,.layerMinXMaxYCorner,.layerMinXMinYCorner]
//        playerLayer.masksToBounds = true
     
        // poster avplayer
        imageinspiration.image = Stefanfunctions().imagePreview(from: pathURL, in: 0.0)
    }
    
    @IBAction func opentutorialvideo(_ sender: Any) {
        var path = Bundle.main.path(forResource: "enable-safari-extension-iphone", ofType: "mp4")
        if UIDevice.current.userInterfaceIdiom == .pad {
            path = Bundle.main.path(forResource: "enable-safari-extension-ipad", ofType: "mov")
        }else{
            path = Bundle.main.path(forResource: "enable-safari-extension-iphone", ofType: "mp4")
        }
        let url = NSURL(fileURLWithPath: path!)
        let player = AVPlayer(url:url as URL)
        playerController = AVPlayerViewController()
        playerController.player = player
        playerController.allowsPictureInPicturePlayback = true
        playerController.delegate = self
        playerController.player?.play()
        self.present(playerController,animated:true,completion:nil)
    }
    
    var playerController = AVPlayerViewController()
    func didfinishplaying(note : NSNotification)
    {
       playerController.dismiss(animated: true,completion: nil)
       let alertview = UIAlertController(title:"finished",message:"video finished",preferredStyle: .alert)
       alertview.addAction(UIAlertAction(title:"Ok",style: .default, handler: nil))
       self.present(alertview,animated:true,completion: nil)
    }

    func playerViewController(_ playerViewController: AVPlayerViewController, restoreUserInterfaceForPictureInPictureStopWithCompletionHandler completionHandler: @escaping (Bool) -> Void) {
       let currentviewController =  navigationController?.visibleViewController

       if currentviewController != playerViewController
       {
           currentviewController?.present(playerViewController,animated: true,completion:nil)
       }
    }

}
