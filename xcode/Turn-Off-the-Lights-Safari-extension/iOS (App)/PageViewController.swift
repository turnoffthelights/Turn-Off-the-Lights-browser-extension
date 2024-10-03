//
//  PageViewController.swift
//  PageControl
//
//  Created by Stefan Van Damme on 10/06/2021.
//

import UIKit

class PageViewController: UIPageViewController, UIPageViewControllerDelegate, UIPageViewControllerDataSource, UIScrollViewDelegate {

    var pageControl = UIPageControl()
    
    // MARK: UIPageViewControllerDataSource
    
    lazy var orderedViewControllers: [UIViewController] = {
        return [self.newVc(viewController: "walk1"),
                self.newVc(viewController: "walk2"),
                self.newVc(viewController: "walk3"),
                self.newVc(viewController: "walk4"),
                self.newVc(viewController: "walk5"),
                self.newVc(viewController: "walk6"),
                self.newVc(viewController: "walk7")]
    }()

    var finalButton = UIButton()
    var skipButton = UIButton()
    var nextButton = UIButton()
    override func viewDidLoad() {
        super.viewDidLoad()
        self.dataSource = self
        self.delegate = self
        
        // This sets up the first view that will show up on our page control
        if let firstViewController = orderedViewControllers.first {
            setViewControllers([firstViewController],
                               direction: .forward,
                               animated: true,
                               completion: nil)
        }

        configurePageControl()
        
        // skip button
        addskipButton()
        // next button
        addNextButton()
        // final button
        addFinalButton()
        
        for subview in view.subviews {
            if let scrollView = subview as? UIScrollView {
                scrollView.delegate = self
            }
        }
    }
    
    func addskipButton(){
        var skipconfiguration = UIButton.Configuration.plain()
        skipconfiguration.cornerStyle = .capsule
        skipconfiguration.baseForegroundColor = UIColor.gray
        skipconfiguration.baseBackgroundColor = .none
        skipconfiguration.buttonSize = .medium
        skipconfiguration.title = Stefanfunctions().i18string(text: "lblactionskip")
        skipButton = UIButton(configuration: skipconfiguration, primaryAction: nil)
        skipButton.layer.masksToBounds = true;
        skipButton.alpha = 1.0
        skipButton.addTarget(self, action: #selector(buttonAction), for: .touchUpInside)
        self.view.addSubview(skipButton)
        
        self.skipButton.translatesAutoresizingMaskIntoConstraints = false
        self.skipButton.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor, constant: -20).isActive = true
        self.skipButton.leftAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leftAnchor, constant: 20).isActive = true
    }
    
    func addNextButton(){
        var nextconfiguration = UIButton.Configuration.filled()
        nextconfiguration.cornerStyle = .capsule
        nextconfiguration.baseForegroundColor = UIColor.white
        nextconfiguration.buttonSize = .medium
        nextconfiguration.title = Stefanfunctions().i18string(text: "lblactionnext")
        nextButton = UIButton(configuration: nextconfiguration, primaryAction: nil)
        nextButton.layer.masksToBounds = true;
        nextButton.alpha = 1.0
        nextButton.addTarget(self, action: #selector(nextslide), for: .touchUpInside)
        self.view.addSubview(nextButton)
        
        nextButton.translatesAutoresizingMaskIntoConstraints = false
        nextButton.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor, constant: -20).isActive = true
        nextButton.rightAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.rightAnchor, constant: -20).isActive = true
    }
    
    func addFinalButton(){
        var finalconfiguration = UIButton.Configuration.filled()
        finalconfiguration.cornerStyle = .medium
        finalconfiguration.baseForegroundColor = UIColor.white
        finalconfiguration.buttonSize = .large
        finalconfiguration.title = Stefanfunctions().i18string(text: "lblactionok")

        finalButton = UIButton(configuration: finalconfiguration, primaryAction: nil)
        finalButton.layer.masksToBounds = true;
        finalButton.alpha = 1.0
        finalButton.addTarget(self, action: #selector(buttonAction), for: .touchUpInside)
        self.view.addSubview(finalButton)
        
        finalButton.translatesAutoresizingMaskIntoConstraints = false
        finalButton.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor, constant: -20).isActive = true
        finalButton.rightAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.rightAnchor, constant: -20).isActive = true
        finalButton.leftAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leftAnchor, constant: 20).isActive = true
        finalButton.isHidden = true;

    }
    
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        if currentIndex == 0, scrollView.contentOffset.x + scrollView.contentInset.left < 0 {
           scrollView.contentOffset = CGPoint(x: -scrollView.contentInset.left, y: scrollView.contentOffset.y)
        }
        else if currentIndex == orderedViewControllers.count - 1, scrollView.contentInset.right < 0, scrollView.contentOffset.x + scrollView.contentInset.right > 0 {
           scrollView.contentOffset = CGPoint(x: -scrollView.contentInset.right, y: scrollView.contentOffset.y)
        }
    }

    func scrollViewWillEndDragging(_ scrollView: UIScrollView, withVelocity velocity: CGPoint, targetContentOffset: UnsafeMutablePointer<CGPoint>) {
        if currentIndex == 0, scrollView.contentOffset.x + scrollView.contentInset.left < 0 {
           targetContentOffset.pointee = CGPoint(x: -scrollView.contentInset.left, y: targetContentOffset.pointee.y)
        }
        else if currentIndex == orderedViewControllers.count - 1, scrollView.contentInset.right < 0, scrollView.contentOffset.x + scrollView.contentInset.right > 0 {
           targetContentOffset.pointee = CGPoint(x: -scrollView.contentInset.right, y: targetContentOffset.pointee.y)
        }
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated);
    }
    
    @objc func buttonAction(sender: UIButton!) {
        let appdefaults = UserDefaults.standard
        appdefaults.set(true, forKey: "walkthroughPresented")
        appdefaults.synchronize()
        
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)

        NotificationCenter.default.post(name: Notification.Name(rawValue: "closeguide"), object: nil)
    }

    func configurePageControl() {
        self.pageControl.frame = CGRect()
        
        self.pageControl.currentPageIndicatorTintColor = UIColor { traits in
            traits.userInterfaceStyle == .dark ? .white : UIColor.black
        }
    
        self.pageControl.pageIndicatorTintColor = UIColor { traits in
            traits.userInterfaceStyle == .dark ? .systemGray : UIColor.lightGray
        }
        
        self.pageControl.numberOfPages = orderedViewControllers.count
        self.pageControl.currentPage = 0
        self.pageControl.addTarget(self, action: #selector(pageControlHandle), for: .valueChanged)
        self.view.addSubview(self.pageControl)

        self.pageControl.translatesAutoresizingMaskIntoConstraints = false
        self.pageControl.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor, constant: -27).isActive = true
        self.pageControl.widthAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.widthAnchor, constant: -20).isActive = true
        self.pageControl.heightAnchor.constraint(equalToConstant: 20).isActive = true
        self.pageControl.centerXAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.centerXAnchor).isActive = true
    }
    
    func newVc(viewController: String) -> UIViewController {
        return UIStoryboard(name: "Walkthrough", bundle: nil).instantiateViewController(withIdentifier: viewController)
    }
    
    var currentIndex = 0

    // MARK: Delegate methords
    func pageViewController(_ pageViewController: UIPageViewController, didFinishAnimating finished: Bool, previousViewControllers: [UIViewController], transitionCompleted completed: Bool) {
        let pageContentViewController = pageViewController.viewControllers![0]
        self.pageControl.currentPage = orderedViewControllers.firstIndex(of: pageContentViewController)!
        currentIndex = self.pageControl.currentPage
        hidebuttons(value: currentIndex)
    }
    
    func hidebuttons(value: Int){
        if(value == 6){
            nextButton.isHidden = true;
            skipButton.isHidden = true;
            pageControl.isHidden = true;
            finalButton.isHidden = false;
        } else {
            nextButton.isHidden = false;
            skipButton.isHidden = false;
            pageControl.isHidden = false;
            finalButton.isHidden = true;
        }
    }
    
    // MARK: Data source functions.
    func pageViewController(_ pageViewController: UIPageViewController, viewControllerBefore viewController: UIViewController) -> UIViewController? {
        guard let viewControllerIndex = orderedViewControllers.firstIndex(of: viewController) else {
            return nil
        }
        
        let previousIndex = viewControllerIndex - 1
        
        // User is on the first view controller and swiped left to loop to
        // the last view controller.
        guard previousIndex >= 0 else {
            //return orderedViewControllers.last
            // Uncommment the line below, remove the line above if you don't want the page control to loop.
            return nil
        }
        
        guard orderedViewControllers.count > previousIndex else {
            return nil
        }
        
        return orderedViewControllers[previousIndex]
    }
    
    func pageViewController(_ pageViewController: UIPageViewController, viewControllerAfter viewController: UIViewController) -> UIViewController? {
        guard let viewControllerIndex = orderedViewControllers.firstIndex(of: viewController) else {
            return nil
        }
        
        let nextIndex = viewControllerIndex + 1
        let orderedViewControllersCount = orderedViewControllers.count
        
        // User is on the last view controller and swiped right to loop to
        // the first view controller.
        guard orderedViewControllersCount != nextIndex else {
            //return orderedViewControllers.first
            // Uncommment the line below, remove the line above if you don't want the page control to loop.
            return nil
        }
        
        guard orderedViewControllersCount > nextIndex else {
            return nil
        }
        
        return orderedViewControllers[nextIndex]
    }
    
    @objc func nextslide(sender: UIButton!) {
        pageControl.currentPage += 1
        goToNextPage()
    }
    
    func goToNextPage(animated: Bool = true, completion: ((Bool) -> Void)? = nil) {
        guard let currentPage = viewControllers?[0] else { return }
        guard let nextPage = dataSource?.pageViewController(self, viewControllerAfter: currentPage) else { return }
        
        setViewControllers([nextPage], direction: .forward, animated: animated, completion: completion)
        currentIndex = pageControl.currentPage
        hidebuttons(value: currentIndex)
    }
    
    @objc private func pageControlHandle(sender: UIPageControl){
        //print(sender.currentPage)
        let selectedPage = sender.currentPage
        if(selectedPage > currentIndex){
            setViewControllers([orderedViewControllers[selectedPage]], direction: .forward, animated: true, completion: nil)
        }else{
            setViewControllers([orderedViewControllers[selectedPage]], direction: .reverse, animated: true, completion: nil)
        }
        currentIndex = sender.currentPage
        hidebuttons(value: currentIndex)
    }
    
    override var supportedInterfaceOrientations: UIInterfaceOrientationMask {
        if UIDevice.current.userInterfaceIdiom == .phone {
            return [.portrait, .portraitUpsideDown]
        } else {
            return .all
        }
    }
    
    override var shouldAutorotate: Bool {
        return true
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
