//
//  ViewController.swift
//  Shared (App)
//
//  Created by Stefan Van Damme on 10/06/2021.
//

import WebKit
import UIKit

class ViewController: UIViewController{

    private let imageView:UIImageView = {
        let imageView = UIImageView(frame: CGRect(x:0 , y: 0, width: 128, height: 128))
        imageView.image = UIImage(named:"LargeIcon")
        return imageView
    }()
    
    override func viewDidAppear(_ animated: Bool) {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(startmainapp(_:)),
            name: NSNotification.Name(rawValue: "startmainapp"),
            object: nil)
        
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(openwelcomeguide(_:)),
            name: NSNotification.Name(rawValue: "goguide"),
            object: nil)
        
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(closewelcomeguide(_:)),
            name: NSNotification.Name(rawValue: "closeguide"),
            object: nil)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.addSubview(imageView)
    }

    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
         DispatchQueue.main.asyncAfter(deadline: .now(), execute: {
             // it will provide you with the correct width and height, that depending on the current Landscape or Portrait mode
             let size = self.imageView.frame.height
             let diffX = self.view.bounds.size.width - size
             let diffY = self.view.bounds.size.height - size
             self.imageView.frame = CGRect(x: diffX/2, y: diffY/2, width: 128, height: 128)
         })
     }
    
    @objc func startmainapp(_ notification: Notification) {
        DispatchQueue.main.asyncAfter(deadline: .now()+0.3, execute: {
            let storyboard = UIStoryboard(name: "Main", bundle: nil)
            let vc = storyboard.instantiateViewController(withIdentifier: "mainapp")
            vc.modalTransitionStyle = .crossDissolve
            vc.modalPresentationStyle = .fullScreen
            self.present(vc, animated: true)
            Stefanfunctions().checkoffline()
        })
    }
    
    var showedintro = false
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        if(showedintro == false){
            imageView.center = view.center
            // Heart beat effect
            let popForce = 0.8
            let duration = 3
            let delay = 0.5
            let animation = CAKeyframeAnimation(keyPath: "transform.scale")
            animation.values = [0, 0.1 * popForce, 0.015 * popForce, 0.2 * popForce, 0]
            animation.keyTimes = [0, 0.25, 0.35, 0.55, 1]
            animation.timingFunction = CAMediaTimingFunction(name: CAMediaTimingFunctionName.easeInEaseOut)
            animation.duration = CFTimeInterval(duration/2)
            animation.isAdditive = true
            animation.repeatCount = Float(3)
            animation.beginTime = CACurrentMediaTime() + CFTimeInterval(delay/2)
            self.imageView.layer.add(animation, forKey: "pop")

            // Remove zoom out effect
            DispatchQueue.main.asyncAfter(deadline: .now()+3.0) {
                self.animate()
            }
            showedintro = true
        }
    }
    
    private func animate(){
        UIView.animate(withDuration: 1, animations: {
            let size = self.view.frame.size.width * 3
            let diffX = size - self.view.frame.size.width
            let diffY = self.view.frame.size.height - size
            self.imageView.frame = CGRect(x: -(diffX/2), y: diffY/2, width: size, height: size)
        })

        UIView.animate(withDuration: 1.5, animations: {
            self.imageView.alpha = 0
        }, completion: { done in
            if done { self.navopenview() }
        })
    }
    
    func navopenview(){
        DispatchQueue.main.asyncAfter(deadline: .now()+0.3, execute: {
            // Debug
            //self.showWalkthrough()
            
            let appdefaults = UserDefaults.standard
            if !appdefaults.bool(forKey: "walkthroughPresented") {
                self.showWalkthrough()
            }else{
                // regular open the app
                self.showmainapp()
            }
        })
    }

    @IBAction func opensafaripref(_ sender: Any) {
//        UIApplication.shared.openURL(NSURL(string: "prefs:root=Safari")! as URL)
        guard let url = URL(string: "calshow://") else { return }
        UIApplication.shared.open(url)
    }
    
    @IBAction func showmainapp(){
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        let vc = storyboard.instantiateViewController(withIdentifier: "mainapp")
        // Animate loadingVC over the existing views on screen
        vc.modalTransitionStyle = .crossDissolve
        vc.modalPresentationStyle = .overCurrentContext
        self.present(vc, animated: true)
    }
    
    //----- welcome guide
    @objc func openwelcomeguide(_ notification: Notification) {
        self.dismiss(animated: true, completion: {
            self.showWalkthrough()
        });//This is intended to dismiss the Info sceen.
    }
    
    @IBAction func showWalkthrough(){
        switch UIDevice.current.userInterfaceIdiom {
        case .phone:
            iphonewelcomeguide()
            //print("yes I am an iPhone");
            // It's an iPhone
        case .pad:
            iphonewelcomeguide()
            //print("yes I am an iPad");
            // It's an iPad
        case .unspecified:
            iphonewelcomeguide()
            //print("yes Apple secret device?");
            // Uh, oh! What could it be?
        default:
            iphonewelcomeguide()
            //print("yes I am an default iPod Touch");
        }
    }
    
    func iphonewelcomeguide(){
        let storyboard = UIStoryboard(name: "Walkthrough", bundle: nil)
        let vc = storyboard.instantiateViewController(withIdentifier: "startguide")
        vc.modalTransitionStyle = .coverVertical
        if UIDevice.current.userInterfaceIdiom == .phone {
            // rotation limit work only in fullscreen mode
            //vc.modalPresentationStyle = .fullScreen
            vc.modalPresentationStyle = .pageSheet
        } else {
            vc.modalPresentationStyle = .pageSheet
        }
        vc.isModalInPresentation = true
        self.present(vc, animated: true)
    }
    
    @objc func closewelcomeguide(_ notification: Notification) {
        //self.dismiss(animated: true, completion: nil)
        // close the guide, and go back the homeapp
        self.dismiss(animated: true, completion: {
            self.showmainapp()
        })
    }
    
}
